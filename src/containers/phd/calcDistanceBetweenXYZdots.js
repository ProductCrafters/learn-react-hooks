const fs = require('fs')
const { convertCSVToArray } = require('convert-csv-to-array')
const { convertArrayToCSV } = require('convert-array-to-csv')
var excelColumnName = require('excel-column-name')

var text = fs.readFileSync('./data/in/emotions.csv', 'utf8')

const distanceBetween = (x1, y1, z1, x2, y2, z2) => {
  const r = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2))
  return Math.round(r * 100) / 100
}

const data = convertCSVToArray(text, {
  type: 'array',
  separator: ';',
})

const arrLength = data[0].length

const headers = [...data[0].slice(0, arrLength - 1), data[0][arrLength - 1].replace('\r', '')]

// adding extra array item to store label:
// j1 1 2 3 4 5 ...
let newArr = Array.from(Array(headers.length + 1), () => new Array(headers.length + 1))

// adding table header row (Y)
newArr[0] = [' ', ...headers]


// adding table header row (X)
headers.forEach((v, i) => {
  newArr[i + 1][0] = headers[i]
})

headers.forEach((v1, rowIndex) => {
  headers.forEach((v, i) => {
    const x1Index = i
    const x2Index = rowIndex

    newArr[rowIndex + 1][i + 1] =
      rowIndex > i
        ? 0
        : distanceBetween(
            data[1][x1Index],
            data[2][x1Index],
            data[3][x1Index],
            data[1][x2Index],
            data[2][x2Index],
            data[3][x2Index]
          )
  })
})

const csvNewArr = convertArrayToCSV(newArr, {
  separator: ';',
})

fs.writeFile('./data/out/distance.csv', csvNewArr, function(err) {
  if (err) {
    return console.log(err)
  }
})
