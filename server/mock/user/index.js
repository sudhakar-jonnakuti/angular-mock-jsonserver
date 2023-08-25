const { faker } = require('@faker-js/faker');
const userDB = require('./db.json');

const getUsers = (req, res) => {
  res.status(200).send({
    statusCode: 200,
    payload: userDB,
  });
};

const getUserById = (req, res) => {
  const { id } = req.params;

  const user = userDB.filter(user => {
    return user.id === id;
  })[0];

  if (!user) {
    return res.status(404).send({
      statusCode: 404,
      payload: {
        errorCode: 404,
        errorName: 'Not Found',
        errorMessage: 'The requested resource could not be found.',
      },
    });
  }

  return res.status(200).send({
    statusCode: 200,
    payload: user,
  });
};

const createUser = (req, res) => {
  const { name, email, address, phone } = req.body;


  const id = faker.string.nanoid(10);
  userDB.push({ id, name, email, address, phone });

  return res.status(200).send({
    statusCode: 200,
    payload: { id, name, email, address, phone },
  });
};

const updateUser = (req, res) => {
  const { name, email, address, phone } = req.body;
  const { id } = req.params;

  const user = userDB.filter((user) => {
    return user.id === id;
  })[0];

  if (!user) {
    return res.status(404).send({
      statusCode: 404,
      payload: {
        errorCode: 404,
        errorName: 'Not Found',
        errorMessage: 'The requested resource could not be found.',
      },
    });
  }

  userDB.splice(userDB.findIndex((user) => {
    return user.id === id;
  }), 1);
  userDB.push({ id, name, email, address, phone });

  return res.status(200).send({
    statusCode: 200,
    payload: { id, name, email, address, phone },
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;

  const userIndex = userDB.findIndex((user) => {
    return user.id === id;
  });

  if (userIndex === -1) {
    return res.status(404).send({
      statusCode: 404,
      payload: {
        errorCode: 404,
        errorName: 'Not Found',
        errorMessage: 'The requested resource could not be found.',
      },
    });
  }

  userDB.splice(userIndex, 1);

  return res.status(200).send({
    statusCode: 200,
    payload: { id },
  });
};

function userModule(server) {
  server.get('/api/user', getUsers);
  server.get('/api/user/:id', getUserById);
  server.post('/api/user', createUser);
  server.put('/api/user/:id', updateUser);
  server.delete('/api/user/:id', deleteUser);
}

module.exports = userModule;
