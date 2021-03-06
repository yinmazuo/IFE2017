import DDB from './DDB'

//DDB1
let app1 = new DDB({
  name: 'youngwind',
  age: 25
})

let app2 = new DDB({
  university: 'bupt',
  major: 'computer'
})

console.log('----------DDB1-BEGIN-------')
app1.data.name // 你访问了 name
app1.data.age = 100;  // 你设置了 age，新的值为100
app2.data.university // 你访问了 university
app2.data.major = 'science'  // 你设置了 major，新的值为 science
console.log('----------DDB1--END------')

//DDB2
console.log('----------DDB2-BEGIN-------')
let app21 = new DDB({
  name: 'wwwwww',
  age: 25
})

app21.$watch('age', function(age) {
  console.log(`change age to ${age} `)
})

app21.data.name = {
  lastName: 'liang',
  firstName: 'shaofeng'
}
app21.data.age = 88

app21.data.name.lastName
app21.data.name.firstName = 'lalala'
console.log('----------DDB2--END------')

//DDB3
console.log('----------DDB3-BEGIN-------')
let app31 = new DDB({
  book: {
    name: 'javascript',
    price: 68
  },
  auth: 'YYYYY',
  name: 'XXXX'
})

function test(auth) {
  console.log(`auth has been changed --- ${auth}`)
}
app31.$watch('auth', test)
// app31.$watch('auth', function (auth) {
//   console.log(`ssssssssssssssssssssssssssss`)
// })
//app31.$removeWatch('auth', test)
app31.$watch('book', function (book) {
  console.log(`Name or price of the book has been changed --- ${JSON.stringify(book)}`)
})

app31.data.auth = 'ZZZZZZ'
app31.data.book.name = 'CSS3'

console.log('----------DDB3--END------')