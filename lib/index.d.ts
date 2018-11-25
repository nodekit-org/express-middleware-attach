import { Application, RequestHandler, ErrorRequestHandler } from 'express';
declare const middlewareAttach: MiddlewareAttach;
export default middlewareAttach;
interface MiddlewareAttach {
    (app: Application, middlewareDefs: MiddlewareDefinition[]): void;
}
export interface MiddlewareDefinition {
    middlewares: (RequestHandler | ErrorRequestHandler)[];
    path?: string;
}
//# sourceMappingURL=index.d.ts.map