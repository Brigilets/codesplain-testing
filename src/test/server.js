import { SetupServerApi, setupServer } from "msw/node";
import { rest } from "msw";

export function createServer(handlerConfig) {
  const handlers = handlerConfig.map((config) => {
    return rest[config.method || "get"](config.path, (req, res, ctx) => {
      return res(ctx.json(config.res(req, res, ctx)));
    });
  });

  const server = setupServer(...handlers);

  // built in Jest test runner
  beforeAll(() => {
    //start the server
    server.listen();
  });
  afterEach(() => {
    // reset handlers to initial default state,required but useful only when handler is changing over time
    server.resetHandlers();
  });
  afterAll(() => {
    //stop the server
    server.close();
  });
}
