
// 方案一，返回新的value描述符
export function timing(tag: string, name: string, descriptor: PropertyDescriptor) {
  return {
    ...descriptor,
    value(...args: any[]) {
      let start = new Date().valueOf()
      try {
        return descriptor.value.apply(this, args)
      } finally {
        let end = new Date().valueOf()
        console.log(`start: ${start} end: ${end} consume: ${end - start}`)
      }
    }
  }
}

// 方案二、修改现有描述符
export function timing2(tag: string, name: string, descriptor: PropertyDescriptor) {
  let func = descriptor.value // 先获取之前的函数

  // 修改对应的value
  descriptor.value = function (...args: any[]) {
    let start = new Date().valueOf()
    try {
      return func.apply(this, args)
    } finally {
      let end = new Date().valueOf()
      console.log(`start: ${start} end: ${end} consume: ${end - start}`)
    }
  }
}