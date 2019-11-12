// 首先，我们要创建几个用来存储信息的全局List
export const routerList      = []
export const controllerList  = []
export const parseList       = []
export const paramList       = []

// 虽说我们要有一个能够创建Router实例的装饰器
// 但是并不会直接去创建，而是在装饰器执行的时候进行一次注册
// export function Router(basename = '') {
//   return (constrcutor) => {
//     routerList.push({
//       constrcutor,
//       basename
//     })
//   }
// }

// // 然后我们在创建对应的Get Post请求监听的装饰器
// // 同样的，我们并不打算去修改他的任何属性，只是为了获取函数的引用
// export function Method(type) {
//   return (path) => (target, name, descriptor) => {
//     controllerList.push({
//       target,
//       type,
//       path,
//       method: name,
//       controller: descriptor.value
//     })
//   }
// }

// 接下来我们还需要用来格式化参数的装饰器
// export function Parse(type) {
//   return (target, name, index) => {
//     parseList.push({
//       target,
//       type,
//       method: name,
//       index
//     })
//   }
// }

// // 以及最后我们要处理的各种参数的获取
// export function Param(position) {
//   return (key) => (target, name, index) => {
//     paramList.push({
//       target,
//       key,
//       position,
//       method: name,
//       index
//     })
//   }
// }

// export const Body   = Param('body')
// export const Header = Param('header')
// export const Cookie = Param('cookie')
// export const Query  = Param('query')
// export const Get    = Method('get')
// export const Post   = Method('post')









// const routers = []

// // 遍历所有添加了装饰器的Class，并创建对应的Router对象
// routerList.forEach(item => {
//   let { basename, constrcutor } = item
//   let router = new Router({
//     prefix: basename
//   })

//   controllerList
//     .filter(i => i.target === constrcutor.prototype)
//     .forEach(controller => {
//       router[controller.type](controller.path, async (ctx, next) => {
//         let args = []
//         // 获取当前函数对应的参数获取
//         paramList
//           .filter( param => param.target === constrcutor.prototype && param.method === controller.method )
//           .map(param => {
//             let { index, key } = param
//             switch (param.position) {
//               case 'body':    args[index] = ctx.request.body[key] break
//               case 'header':  args[index] = ctx.headers[key]      break
//               case 'cookie':  args[index] = ctx.cookies.get(key)  break
//               case 'query':   args[index] = ctx.query[key]        break
//             }
//           })

//         // 获取当前函数对应的参数格式化
//         parseList
//           .filter( parse => parse.target === constrcutor.prototype && parse.method === controller.method )
//           .map(parse => {
//             let { index } = parse
//             switch (parse.type) {
//               case 'number':  args[index] = Number(args[index])             break
//               case 'string':  args[index] = String(args[index])             break
//               case 'boolean': args[index] = String(args[index]) === 'true'  break
//             }
//           })

//         // 调用实际的函数，处理业务逻辑
//         let results = controller.controller(...args)

//         ctx.body = results
//       })
//     })

//   routers.push(router.routes())
// })

// const app = new Koa()

// app.use(bodyParse())
// app.use(compose(routers))

// app.listen(12306, () => console.log('server run as http://127.0.0.1:12306'))











// import { Router, Get, Query, Parse } from "../decorators"

// @Router('')
// export default class {
//   @Get('/')
//   index (@Parse('number') @Query('id') id: number) {
//     return {
//       code: 200,
//       id,
//       type: typeof id
//     }
//   }

//   @Post('/detail')
//   detail (
//     @Parse('number') @Query('id') id: number, 
//     @Parse('number') @Body('age') age: number
//   ) {
//     return {
//       code: 200,
//       age: age + 1
//     }
//   }
// }