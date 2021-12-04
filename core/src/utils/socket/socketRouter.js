class socketRouter {
    constructor() {
    }
    routes = []
    addRoute() {
       const cb = async (data) => {
           let req = { data };
           if (req.data.headers.authToken) {
               req.cookies = { AUTHORIZATION: data.headers.authToken }
           }

           const cbArg = arguments;
           let i = 1;
           const formattedReq = {
               ...req,
               headers: req.data.headers,
               data: req.data.data
           }
           const performMiddleware = async (req) => {
               const nextReq = await cbArg[i](req);
               i++
               if (cbArg[i]) {
                  await performMiddleware(nextReq)
               }
           }
           await performMiddleware(formattedReq);
       }

       this.routes.push({
           action: arguments[0],
           cb,
       });
    }
    use(path, routes = []) {
        if (routes.routes) {
            this.routes = this.routes.concat(routes.routes.map((r)=> {
                return ({
                    ...r,
                    path: path + '/' + r.action
                });
            }));
        }
    }
}

module.exports = socketRouter;
module.exports.router = new socketRouter();
