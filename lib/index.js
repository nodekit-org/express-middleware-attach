"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const server_1 = require("jege/server");
const log = server_1.logger('[express-middleware-attach]');
const UNNAMED_MIDDLEWARE = 'unnamed-middleware';
const middlewareAttach = function (app, middlewareDefs) {
    middlewareDefs.map(({ middlewares, path }) => {
        log(`middleware is attached at path: ${chalk_1.default.green('%s')}, middlewares: %s`, path || '* (empty)', getMiddlewareNames(middlewares));
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
        const names = middlewares.map((middleware) => {
            if (!middleware.name || !middleware.name.length) {
                warnIfNameIsNotDefined();
                return UNNAMED_MIDDLEWARE;
            }
            else {
                return middleware.name;
            }
        });
        return `[ ${names.join(', ')} ]`;
    }
    else {
        if (!middlewares.name || !middlewares.name.length) {
            warnIfNameIsNotDefined();
            return UNNAMED_MIDDLEWARE;
        }
        return middlewares.name;
    }
}
function warnIfNameIsNotDefined() {
    log(`${chalk_1.default.yellow('unnamed')} middleware is defined. Make sure to give name for better debugging`);
}
