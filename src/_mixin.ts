const hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * Type guard that ensures that the value can be coerced to Object
 * to weed out host objects that do not derive from Object.
 * This function is used to check if we want to deep copy an object or not.
 * Note: In ES6 it is possible to modify an object's Symbol.toStringTag property, which will
 * change the value returned by `toString`. This is a rare edge case that is difficult to handle,
 * so it is not handled here.
 * @param  value The value to check
 * @return       If the value is coercible into an Object
 */
function shouldDeepCopyObject(value: any): value is Object {
	return Object.prototype.toString.call(value) === '[object Object]';
}

export function copyArray<T>(array: T[], inherited: boolean): T[] {
	return array.map((item: T): T => {
		if (Array.isArray(item)) {
			return <any>copyArray(<any>item, inherited);
		}

		return !shouldDeepCopyObject(item) ?
			item :
			_mixin({
				deep: true,
				inherited: inherited,
				sources: <Array<T>>[item],
				target: <T>{}
			});
	});
}

export interface MixinArgs<T extends {}, U extends {}> {
	deep: boolean;
	inherited: boolean;
	// sources: (U | null | undefined)[];
	sources: U[];
	target: T;
}

export default function _mixin<T extends {}, U extends {}>(kwArgs: MixinArgs<T, U>): T & U {
	const deep = kwArgs.deep;
	const inherited = kwArgs.inherited;
	const target = kwArgs.target;

	for (const name in kwArgs.sources) {
		const source = kwArgs.sources[name];
		if (source === null || source === undefined) {
			continue;
		}
		for (const key in source) {
			if (inherited || hasOwnProperty.call(source, key)) {
				let value: any = (<any>source)[key];

				if (deep) {
					if (Array.isArray(value)) {
						value = copyArray(value, inherited);
					}
					else if (shouldDeepCopyObject(value)) {
						value = _mixin({
							deep: true,
							inherited: inherited,
							sources: <U[]>[value],
							target: {}
						});
					}
				}

				(<any>target)[key] = value;
			}
		}
	}

	return <T & U>target;
}
