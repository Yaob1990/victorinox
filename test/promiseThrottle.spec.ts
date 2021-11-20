import { PromiseThrottleFn } from '../src'

describe('PromiseThrottle 测试', () => {
  jest.useFakeTimers()

  const mockCallback = jest.fn(async function () {
    return await new Promise(resolve => {
      setTimeout(() => {
        resolve(true)
      }, 100)
    })
  })

  beforeEach(() => {
    mockCallback.mock.calls.length = 0
  })

  test('两次执行，只执行一次', async () => {
    const debounce = PromiseThrottleFn(mockCallback)
    debounce()
    debounce()
    expect(mockCallback.mock.calls.length).toBe(1)
  })
  test('两次执行，间隔100ms，执行两次', async () => {
    mockCallback.mock.calls.length = 0
    const debounce = PromiseThrottleFn(mockCallback)
    debounce()
    jest.advanceTimersByTime(200)
    debounce()

    expect(mockCallback.mock.calls.length).toBe(2)
  })
})
