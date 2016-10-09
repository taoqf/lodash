/*
* @Author:				taoqf
* @Date:				2016-06-15 11:59:02
* @Last Modified by:	taoqf
* @Last Modified time:	2016-06-17 15:54:37
* @CopyRight			飞道科技
*/
import createPadding from './_createPadding';
import stringSize from './_stringSize';
import toInteger from './toInteger';
import toString from './toString';

/**
 * Pads `string` on the right side if it's shorter than `length`. Padding
 * characters are truncated if they exceed `length`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to pad.
 * @param {number} [length=0] The padding length.
 * @param {string} [chars=' '] The string used as padding.
 * @returns {string} Returns the padded string.
 * @example
 *
 * _.padEnd('abc', 6);
 * // => 'abc   '
 *
 * _.padEnd('abc', 6, '_-');
 * // => 'abc_-_'
 *
 * _.padEnd('abc', 3);
 * // => 'abc'
 */
export default function padEnd(str: string, length: number, chars: string) {
	str = toString(str);
	length = toInteger(length);

	var strLength = length ? stringSize(str) : 0;
	return (length && strLength < length)
		? (str + createPadding(length - strLength, chars))
		: str;
}
