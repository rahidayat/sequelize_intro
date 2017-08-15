function makeSalt() {
  var result = "";
  var char = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 8; i++)
    result += char.charAt(Math.floor(Math.random() * char.length));

  return result;
}

// console.log(makeSalt());
module.exports = makeSalt;
