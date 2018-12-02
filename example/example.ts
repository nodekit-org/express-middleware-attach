import express from 'express';

import attach, { MiddlewareDefinition } from '../lib';

const port = 5234;
const app = express();

const middleware1 = (req: Request, res, next) => {
  console.log('middleware1');
  next();
};

const middleware2 = (req: Request, res, next) => {
  console.log('middleware2');
  next();
};

const middlewareDefs: MiddlewareDefinition[] = [
  {
    middlewares: [ middleware1 ],
    path: '/power',
  },
  {
    middlewares: [ middleware2, () => {} ],
  },
];

attach(app, middlewareDefs);

app.listen(port, () => {
  console.log('Listenig %s', port);
});
