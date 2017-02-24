import DDB1 from './DDB1'

let app1 = new DDB1({
  name: 'youngwind',
  age: 25
})

let app2 = new DDB1({
  university: 'bupt',
  major: 'computer'
})

app1.data.name // 你访问了 name
app1.data.age = 100;  // 你设置了 age，新的值为100
app2.data.university // 你访问了 university
app2.data.major = 'science'  // 你设置了 major，新的值为 science