import { sleep } from '../src'

describe('promiseDelay', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.useRealTimers()
  })
  // 实现的有问题，没法对定时器本身的不同状态进行测试
  test('should resolve after timeout has elapsed', async () => {
    const spy = jest.fn()
    const pendingPromise = sleep(100).then(resolve => {
      spy()
      expect(resolve).toBe(undefined)
      expect(spy).toHaveBeenCalled()
    })
    jest.runAllTimers()
    return pendingPromise
  })
})
