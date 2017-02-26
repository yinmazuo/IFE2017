function DDB(data, parent, key) {
  this.data = data
  this.$$watcher = {}
  this.parent = parent || null
  this.key = key || ''
  this.run(data)
}

DDB.prototype.run = function (obj) {
  let value
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      value = obj[key]     
      if (typeof value === 'object') {
        new DDB(value, this, key)
      }      
      this.convert(key, value)
    }
  }
}

DDB.prototype.convert = function (key, value) {
  let self = this

  Object.defineProperty(this.data, key, {

    get: function() {
      //console.log(`Getting [ ${key} ] and value is [ ${typeof value === 'object' ? JSON.stringify(value) : value} ]`)
      return value
    },

    set: function(newValue) {     

      if (value !== newValue) {       
        if (typeof newValue === 'object') {
          new DDB(newValue, self, key)
        }
        value = newValue
      }   

      if (self.parent !== null) {
        self.parent.$apply(self.key, self.parent.data[self.key])
      } else {
        self.$apply(key, newValue) //回调
      }      
      console.log(`Setting [ ${key} ] and new value is [ ${typeof value === 'object' ? JSON.stringify(newValue) : newValue} ]`)
    }
  })
}

DDB.prototype.$watch = function (target, callback) {
  if (typeof this.$$watcher[target] === "undefined"){
    this.$$watcher[target] = []
  }
  this.$$watcher[target].push(callback)
}
DDB.prototype.$apply = function (target, newValue) {
  if (this.$$watcher[target] instanceof Array){
    let $$watcher = this.$$watcher[target]
    for (let i = 0, len = $$watcher.length; i < len; i++){
      $$watcher[i](newValue)
    }
  }
}
DDB.prototype.$removeWatch = function (target, callback) {
  if (this.$$watcher[target] instanceof Array){ 
    let $$watcher = this.$$watcher[target]
    for (var i = 0, len = $$watcher.length; i < len; i++){ 
      if ($$watcher[i] === callback){
        break
      }
    }
    $$watcher.splice(i, 1)
  }
}


module.exports = DDB
