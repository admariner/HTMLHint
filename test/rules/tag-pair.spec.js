const HTMLHint = require('../../dist/htmlhint.js').HTMLHint

const ruleId = 'tag-pair'
const ruleOptions = {}

ruleOptions[ruleId] = true

describe(`Rules: ${ruleId}`, () => {
  it('No end tag should result in an error', () => {
    let code = '<ul><li></ul><span>'
    let messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(2)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(5)
    expect(messages[1].rule.id).toBe(ruleId)
    expect(messages[1].line).toBe(1)
    expect(messages[1].col).toBe(20)

    code = '<div></div>\r\n<div>aaa'
    messages = HTMLHint.verify(code, ruleOptions)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(2)
    expect(messages[0].col).toBe(9)
  })

  it('No end tag should result in an error with correct line number and column of the start tag', () => {
    const code = '<div>\r\n  <h1>\r\n    <p>aaa</p>\r\n</div>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).not.toBe(4)
    expect(messages[0].col).not.toBe(1)
    expect(messages[0].line).toBe(2)
    expect(messages[0].col).toBe(3)
  })

  it('No start tag should result in an error', () => {
    const code = '</div>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(1)
    expect(messages[0].rule.id).toBe(ruleId)
    expect(messages[0].line).toBe(1)
    expect(messages[0].col).toBe(1)
  })

  it('Tag be paired should not result in an error', () => {
    const code = '<p>aaa</p>'
    const messages = HTMLHint.verify(code, ruleOptions)
    expect(messages.length).toBe(0)
  })
})
