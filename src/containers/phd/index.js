import React from 'react'
import { allArrays, x1s, x2s, x3s } from './constants'
import _ from 'lodash'

const { convertArrayToCSV } = require('convert-array-to-csv');

const plain = []

function allPossibleCases(arr) {
  if (arr.length == 1) {
    return arr[0]
  } else {
    var result = []
    var allCasesOfRest = allPossibleCases(arr.slice(1)) // recur with the rest of array
    for (var i = 0; i < allCasesOfRest.length; i++) {
      for (var j = 0; j < arr[0].length; j++) {
        result.push(arr[0][j] + ' ' + allCasesOfRest[i])
        plain.push(arr[0][j])
      }
    }
    return result
  }
}

const res = allPossibleCases(allArrays)
const allHeaders = []

res.forEach((r) => {
  r.split(' ').forEach((rE) => {
    allHeaders.push(rE)
  })
})

let headersWithValues = [[allHeaders], [], [], []]
allHeaders.forEach((v, index) => {
  headersWithValues[1][index] = x1s[v]
  headersWithValues[2][index] = x2s[v]
  headersWithValues[3][index] = x3s[v]
})



const header = allHeaders;
const dataArrays = [
  headersWithValues[1],
  headersWithValues[2],
  headersWithValues[3],
];


const csvFromArrayOfArrays = convertArrayToCSV(dataArrays, {
  header,
  separator: ';'
});
console.log(csvFromArrayOfArrays)
let csvContent = 'data:text/csv;charset=utf-8,' + csvFromArrayOfArrays

var encodedUri = encodeURI(csvContent)


const Page = () => {
  return (
    <div>
      <button onClick={() => window.open(encodedUri)}>GENERATE CSV</button>
    </div>
  )
}

export default Page
