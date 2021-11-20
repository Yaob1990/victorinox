import { emojiToUnicode, parseUnicode } from '../src'

describe('emoji unicode 转换', () => {
  test('emoji to unicode', () => {
    expect(emojiToUnicode('😀')).toBe('\\ud83d\\ude00')
    expect(emojiToUnicode('😀你好')).toBe('\\ud83d\\ude00你好')
  })
  test('解码 双反斜线 替换为 单反斜线  ', () => {
    expect(parseUnicode('\\uD83D\\uDE00')).toBe('😀')
    expect(parseUnicode('\\uD83D\\uDE00')).toBe('😀')
  })
})
