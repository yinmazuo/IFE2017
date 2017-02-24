function DDB(data) {
  this.data = data
  this.run(data)
}

DDB.prototype.run = function (obj) {
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

DDB.prototype.convert = function (key, value) {
  let self = this

  Object.defineProperty(this.data, key, {
    get: function() {
      console.log(`Getting [ ${key} ] and value is [ ${typeof value === 'object' ? JSON.stringify(value) : value} ]`)
      return value
    },
    set: function(newValue) {     

      if (value !== newValue) {       
        if (typeof newValue === 'object') {
          new DDB(newValue)
        }
        value = newValue       
      }     

      if (self.$$watcher && self.$$watcher[key]) {
        self.$$watcher[key](newValue)
      }
      //console.log(`Setting [ ${key} ] and new value is [ ${newValue} ]`)
    }
  })
}
DDB.prototype.$$watcher = {}
DDB.prototype.$watch = function(target, callback) {
  this.$$watcher[target] = callback
}


module.exports = DDB
