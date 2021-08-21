import fastify, { FastifyLoggerOptions } from 'fastify';
import { FastifyCorsOptions } from 'fastify-cors';
import { analyseBucket, getBuckets } from './utils';
const peekaboo = require('fastify-peekaboo');

const logConfig: FastifyLoggerOptions = { level: 'info' };
const corsOptions: FastifyCorsOptions = {};

if (process.env.NODE_ENV !== 'production') {
  corsOptions.origin = '*';
  logConfig.prettyPrint = { colorize: true };
}

const server = fastify({ logger: logConfig });

server.register(require('fastify-cors'), corsOptions);

server.register(peekaboo, {
  rules: [
    {
      request: {
        methods: ['get'],
        route: true,
      },
      response: {
        status: (code: number) => code > 199 && code < 300,
      },
    },
  ],
  mode: 'memoize',
  storage: { mode: 'memory' },
  expire: 60000, // 1 minute
  xheader: true,
  log: false,
});

server.get('/', async () => {
  return { ok: true };
});

server.get('/buckets', async () => getBuckets());

server.get('/analyse/:bucketName', async (request: any, reply: any) =>
  analyseBucket(request.params.bucketName),
);

const start = async () => {
  try {
    await server.listen(process.env.PORT || 3000, '0.0.0.0');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
