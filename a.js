const dig = /^\d/
const charA = /a/
const re = RegExp(dig.source + charA.source)
console.log(re.exec('1a'))
console.log(re.exec('a1a'))
