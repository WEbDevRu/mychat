const uniqid = require('uniqid');

class socketRouter {
    constructor() {
    }
    routes = []
    addRoute() {
       const cb = async (data) => {
           let req = { data }
           if (req.data.token) {
               req.cookies = { AUTHORIZATION: data.token }
           }

           const cbArg = arguments;
           let i = 1;

           const performMiddleware = async (req) => {
               const nextReq = await cbArg[i](req);
               i++
               if (cbArg[i]) {
                  await performMiddleware(nextReq)
               }
           }
           await performMiddleware(req);
       }

       this.routes.push({
           action: arguments[0],
           cb,
           id: uniqid()
       });
    }
    use(path, routes) {

        this.routes = this.routes.map((r)=> {
            if (routes.routes.find((useRoute) => useRoute.id === r.id)) {
                return ({
                    ...r,
                    path: path + '/' + r.action
                })
            }
            return r
        });
    }
}

module.exports = new socketRouter();
