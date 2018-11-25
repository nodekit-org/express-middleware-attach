"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const tag = chalk_1.default.cyan('[express-middleware-attach]');
const middlewareAttach = function (app, middlewareDefs) {
    middlewareDefs.map(({ middlewares, path }) => {
        console.info(`${tag} middleware is attached at path: ${chalk_1.default.yellow('%s')}, middlewares: %s`, path || 'VOID', getMiddlewareNames(middlewares));
        if (path) {
            app.use(path, middlewares);
        }
        else {
            app.use(middlewares);
        }
    });
};
exports.default = middlewareAttach;
function getMiddlewareNames(middlewares) {
    if (Array.isArray(middlewares)) {
        return `[ ${middlewares.map((m) => m.name).join(', ')} ]`;
    }
    else {
        return middlewares.name;
    }
}
