const uniqid = require('uniqid');

class socketRouter {
    constructor() {
    }
    routes = []
    addRoute(action, cb) {
        this.routes.push({ action, cb, id: uniqid() })
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
