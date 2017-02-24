function DDB1(data) {
  this.data = data
  this.run(data)
}

DDB1.prototype.run = function (obj) {
  let value
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      value = obj[key]
      if (typeof value === 'object') {
        new DDB(value)
      }
      this.convert(key, value)
    }
  }
}

DDB1.prototype.convert = function (key, value) {
  Object.defineProperty(this.data, key, {
    get: function() {
      console.log(`Getting -${key}-`)
    },
    set: function() {
      console.log(`Setting -${key}- and new value is -${value}-`)
    }
  })
}

module.exports = DDB1
