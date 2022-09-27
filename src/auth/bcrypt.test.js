const bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = 's0//P4$$w0rD';

async function test() {
  const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
  console.log('hash', hash);

  console.log('result:', await bcrypt.compare(myPlaintextPassword, hash));
}

test();
