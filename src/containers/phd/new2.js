const fs = require('fs')
const { convertCSVToArray } = require('convert-csv-to-array')
const { convertArrayToCSV } = require('convert-array-to-csv')
var excelColumnName = require('excel-column-name')

var text = fs.readFileSync('emotions.csv', 'utf8')

const data = convertCSVToArray(text, {
  type: 'array',
  separator: ';', // use the separator you use in your csv (e.g. '\t', ',', ';' ...)
})

const arrLength = data[0].length

const headers = [...data[0].slice(0, arrLength - 1), data[0][arrLength - 1].replace('\r', '')]

let newArr = Array.from(Array(headers.length + 1), () => new Array(headers.length))

newArr[0] = [' ', headers.map(v => v)]
headers.forEach((v1, rowIndex) => {
  headers.forEach((v, i) => {
    const x1Letter = excelColumnName.intToExcelCol(i + 2)
    const x2Letter = excelColumnName.intToExcelCol(rowIndex + 2)

    newArr[rowIndex + 1][i + 1] =
      i < rowIndex ? 0 : `=SQRT((${x1Letter}83-${x2Letter}83)^2+(${x1Letter}84-${x2Letter}84)^2)`
  })
  newArr[rowIndex + 1][0] = headers[rowIndex]
})

// console.log(newArr[1])
const csvNewArr = convertArrayToCSV(newArr, {
  separator: ';',
})

fs.writeFile('ress.csv', csvNewArr, function(err) {
  if (err) {
    return console.log(err)
  }
})
