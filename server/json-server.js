const jsonServer = require('json-server');
const userModule = require('./mock/user');

const server = jsonServer.create();
const middleware = jsonServer.defaults({
  logger: true,
  noCors: false
});

server.use(middleware);
server.use(jsonServer.bodyParser);

userModule(server);

server.listen(3000, () => {
  console.log('JSON Server is running');
});
