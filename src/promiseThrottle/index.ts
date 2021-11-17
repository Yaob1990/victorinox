/**
 * promise 节流装饰器
 * @param time 节流事件
 * @param delayTime 延迟释放锁时间，一般是用于页面跳转
 * @constructor
 */
function PromiseThrottle(time = 200, delayTime = 0) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value
    const throttleFn = function () {
      let status = ''
      const execFn = async function (...args: any) {
        if (status === 'lock') {
          return
        }
        status = 'lock'
        try {
          const data = await Promise.all([
            // @ts-ignore
            original.call(this, ...args),
            new Promise(resolve => {
              setTimeout(resolve, time)
            })
          ])
          return data[0]
        } finally {
          setTimeout(() => {
            status = ''
          }, delayTime)
        }
      }
      return execFn
    }
    descriptor.value = throttleFn()
    return descriptor
  }
}

/**
 * promise 节流函数版本，使用参考测试用例
 * @param fn
 * @param time
 * @param delayTime
 * @constructor
 */
function PromiseThrottleFn(fn: Function, time = 0, delayTime = 0) {
  let status = ''
  return function () {
    if (status === 'lock') return
    status = 'lock'
    try {
      const data = Promise.all([
        // @ts-ignore
        fn.call(this, ...arguments),
        new Promise(resolve => {
          setTimeout(resolve, time)
        })
      ])
      // @ts-ignore
      return data[0]
    } finally {
      setTimeout(() => {
        status = ''
      }, delayTime)
    }
  }
}

/**
 * 页面跳转装饰器
 * @param delayTime
 */
function jumpTime(delayTime = 200) {
  return PromiseThrottle(0, delayTime)
}

/**
 * 页面跳转函数
 * @param fn
 * @param delayTime
 */
function jumpTimeFn(fn: Function, delayTime = 200) {
  return PromiseThrottleFn(fn, 0, delayTime)
}

export { PromiseThrottle, PromiseThrottleFn, jumpTime, jumpTimeFn }
