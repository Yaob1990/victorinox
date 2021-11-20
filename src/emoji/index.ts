/**
 * @see emoji to Surrogate pairs unicode
 * @see UTF-16 编码转为代理对编码
 * @see 转换为js编码方式  😀=>"\ud83d\ude00"
 * @author 原始地址：https://github.com/channg/umoji/blob/master/src/emojiToUnicode.js
 * @param emoji
 *
 */
export function emojiToUnicode(emoji: string) {
  let backStr = ''
  if (emoji.length > 0) {
    for (const char of emoji) {
      const index = char.codePointAt(0)
      if (index != null && index > 65535) {
        const h =
          '\\u' + (Math.floor((index - 0x10000) / 0x400) + 0xd800).toString(16)
        const c = '\\u' + (((index - 0x10000) % 0x400) + 0xdc00).toString(16)
        backStr = backStr + h + c
      } else {
        backStr = backStr + char
      }
    }
  }
  return backStr
}

/**
 * @see unicode编码之后\变成\\，解码函数（注意，调用需要 try catch 有些场景会异常）
 * @see "\\u00253A" => "\u00253A"
 * @author 原始地址：https://stackoverflow.com/questions/33685680/emoji-surrogate-string-with-javascript-how-to-parse
 * @param str
 *
 */
export function parseUnicode(str: string) {
  const r = /\\u([\d\w]{4})/gi
  str = str.replace(r, function (match, grp) {
    return String.fromCharCode(parseInt(grp, 16))
  })
  return str
}
