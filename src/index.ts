import {
  Application,
  RequestHandler,
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';
import chalk from 'chalk';

const logTag = chalk.cyan('[express-middleware-attach]');
const UNNAMED_MIDDLEWARE = 'unnamed-middleware';

const middlewareAttach: MiddlewareAttach = function (app, middlewareDefs) {
  middlewareDefs.map(({ middlewares, path }) => {
    console.info(
      `${logTag} middleware is attached at path: ${chalk.green('%s')}, middlewares: %s`, 
      path || '* (empty)',
      getMiddlewareNames(middlewares),
    );
    if (path) {
      app.use(path, middlewares);
    } else {
      app.use(middlewares);
    }
  });
};

export default middlewareAttach;

export interface MiddlewareDefinition {
  middlewares: Middleware[];
  path?: string;
}

type Middleware = RequestHandler | ErrorRequestHandler;

interface MiddlewareAttach {
  (
    app: Application, 
    middlewareDefs: MiddlewareDefinition[],
  ): void;
}

function getMiddlewareNames(middlewares: Middleware | Middleware[]): string {
  if (Array.isArray(middlewares)) {
    const names = middlewares.map((middleware) => {
      if (!middleware.name || !middleware.name.length) {
        warnIfNameIsNotDefined();
        return UNNAMED_MIDDLEWARE;
      } else {
        return middleware.name;
      }
    });

    return `[ ${names.join(', ')} ]`; 
  } else {
    if (!middlewares.name || !middlewares.name.length) {
      warnIfNameIsNotDefined();
      return UNNAMED_MIDDLEWARE;
    }
    return middlewares.name;
  }
}

function warnIfNameIsNotDefined() {
  console.warn(`${logTag} ${chalk.yellow('unnamed')} middleware is defined. Make sure to give name for better debugging`);
}
