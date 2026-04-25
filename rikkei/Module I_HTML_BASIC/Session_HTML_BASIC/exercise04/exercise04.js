const original = {
  name: 'Bob',
  age: 30,
  address: {
    city: 'TPHCM',
  },
};

const copy = JSON.parse(JSON.stringify(original));

original.address.city = 'TPHCM mới';

copy.name = 'Kelvin';

console.log(original);
console.log(copy);