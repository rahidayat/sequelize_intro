const crypto = require('crypto');
// const hmac = crypto.createHmac('sha256', 'a secret');

function hashPass (input, salt) {
  // let result;

  // hmac.on('readable', () => {
  // const data = hmac.read();
  // if (data) {
  //   result = data.toString('hex')
  //   // console.log(data.toString('hex'));
  //   // Prints:
  //   //   7fd04df92f636fd450bc841c9418e5825c17f33ad9c87c518115a45971f7f77e
  //   }
  // });
  //
  // hmac.write('some data to hash');
  // hmac.end();


  return crypto.createHmac('sha256', salt).update(input).digest('hex');
}



module.exports = hashPass
