// 支持以下几处使用：
// Class
// 函数
// get set访问器
// 实例属性、静态函数及属性
// 函数参数

// Method Decorator、Accessor Decorator和Property Decorator
// 如果装饰器挂载于静态成员上，则会返回构造函数，如果挂载于实例成员上则会返回类的原型
// 装饰器挂载的成员名称
// 成员的描述符，也就是Object.getOwnPropertyDescriptor的返回值

// 执行的顺序为decorator2 -> decorator1，离class定义最近的先执行。
//
// @decorator1
// @decorator2
// class { }


export function nameit (constructor: any) {
  return class extends constructor {
    name = 'Niko';
  };
}

export function mixin(...args: Constructor<object>[]) {
  // 调用函数返回装饰器实际应用的函数
  return function (constructor: Constructor<object>) {
    for (let arg of args) {
      for (let key of Object.getOwnPropertyNames(arg.prototype)) {
        if (key === 'constructor') continue; // 跳过构造函数
        Object.defineProperty(constructor.prototype, key, Object.getOwnPropertyDescriptor(arg.prototype, key)!)
      }
    }
  };
}

function test(target: Object, 
  propertyKey: string, 
  descriptor: TypedPropertyDescriptor<any>): any {
  return descriptor;
}

class Test {
  @test
  hello() {
  }
}


// class Modal {
//   _name = 'Niko'

//   @prefix
//   get name() { return this._name; }
// }

// function prefix(target, name, descriptor) {
//   return {
//     ...descriptor,
//     get () {
//       return `wrap_${this._name}`
//     }
//   }
// }

// console.log(new Modal().name) // wrap_Niko


// class Modal {
//   @prefix
//   static name1 = 'Niko'
// }

// function prefix(target, name) {
//   let descriptor = Object.getOwnPropertyDescriptor(target, name)

//   Object.defineProperty(target, name, {
//     ...descriptor,
//     value: `wrap_${descriptor.value}`
//   })
// }

// console.log(Modal.name1) // wrap_Niko




////////


// const validateConf = {} // 存储校验信息

// @validator
// class Person {
//   @validate('string')
//   name
//   @validate('number')
//   age

//   constructor(name, age) {
//     this.name = name
//     this.age = age
//   }
// }

// function validator(constructor) {
//   return class extends constructor {
//     constructor(...args) {
//       super(...args)

//       // 遍历所有的校验信息进行验证
//       for (let [key, type] of Object.entries(validateConf)) {
//         if (typeof this[key] !== type) throw new Error(`${key} must be ${type}`)
//       }
//     }
//   }
// }

// function validate(type) {
//   return function (target, name, descriptor) {
//     // 向全局对象中传入要校验的属性名及类型
//     validateConf[name] = type
//   }
// }

// new Person('Niko', '18')  // throw new error: [age must be number]











////////////










// const parseConf = {}
// class Modal {
//   @parseFunc
//   addOne(@parse('number') num) {
//     return num + 1
//   }
// }

// // 在函数调用前执行格式化操作
// function parseFunc (target, name, descriptor) {
//   return {
//     ...descriptor,
//     value (...arg) {
//       // 获取格式化配置
//       for (let [index, type] of parseConf) {
//         switch (type) {
//           case 'number':  arg[index] = Number(arg[index])             break
//           case 'string':  arg[index] = String(arg[index])             break
//           case 'boolean': arg[index] = String(arg[index]) === 'true'  break
//         }
//       }

//       return descriptor.value.apply(this, arg)
//     }
//   }
// }

// // 向全局对象中添加对应的格式化信息
// function parse(type) {
//   return function (target, name, index) {
//     parseConf[index] = type
//   }
// }

// console.log(new Modal().addOne('10')) // 11