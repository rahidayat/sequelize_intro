
module.exports = nilai => {
  if (nilai == undefined) {
    return 'empty'
  }
  else if (nilai > 85 && nilai <= 100) {
    return 'A'
  }
  else if (nilai > 70 && nilai <= 85) {
    return 'B'
  }
  else if (nilai > 55 && nilai <= 70) {
    return 'C'
  }
  else {
    return 'E'
  }
}
