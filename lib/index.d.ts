import { Application, RequestHandler, ErrorRequestHandler } from 'express';
declare const middlewareAttach: MiddlewareAttach;
export default middlewareAttach;
export interface MiddlewareDefinition {
    middlewares: Middleware[];
    path?: string;
}
declare type Middleware = RequestHandler | ErrorRequestHandler;
interface MiddlewareAttach {
    (app: Application, middlewareDefs: MiddlewareDefinition[]): void;
}
//# sourceMappingURL=index.d.ts.map