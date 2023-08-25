const fs = require('fs');
const { faker } = require('@faker-js/faker');

function createRandomUser(number) {
  const userData = [];
  while (number >= 0) {
    userData.push({
      id: faker.string.nanoid(10),
      name: faker.internet.userName(),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number('#####-#####'),
    });
    number--;
  }
  return userData;
}

let dataObj = createRandomUser(5);

fs.writeFileSync(
  'server/mock/user/db.json',
  JSON.stringify(dataObj, null, '\t'),
  function (err) {
    if (err) {
      return console.log(err);
    } else {
      console.log('Mock data generated.');
    }
  }
);
