// import React from 'react';

const _ = require('lodash');

const { convertArrayToCSV } = require('convert-array-to-csv');
const clipboardy = require('clipboardy');

const allArrays = [
  ['j1', 'j2', 'j3', 'j4'],
  ['g1', 'g2', 'g3', 'g4'],
  ['f1', 'f2', 'f3', 'f4'],
  ['a1', 'a2', 'a3', 'a4'],
  ['s1', 's2', 's3', 's4'],
];

const x1s = {
  j1: 0.35,
  j2: 0.45,
  j3: 0.55,
  j4: 0.65,
  g1: 0.35,
  g2: 0.45,
  g3: 0.55,
  g4: 0.65,
  f1: 0.7,
  f2: 0.8,
  f3: 0.9,
  f4: 1,
  a1: 0,
  a2: 0.1,
  a3: 0.2,
  a4: 0.3,
  s1: 0.35,
  s2: 0.45,
  s3: 0.55,
  s4: 0.65,
};

const x2s = {
  j1: 0.7,
  j2: 0.8,
  j3: 0.9,
  j4: 1,
  g1: 0,
  g2: 0.1,
  g3: 0.2,
  g4: 0.3,
  f1: 0.35,
  f2: 0.45,
  f3: 0.55,
  f4: 0.65,
  a1: 0.35,
  a2: 0.45,
  a3: 0.55,
  a4: 0.65,
  s1: 0.7,
  s2: 0.8,
  s3: 0.9,
  s4: 1,
};

const x3s = {
  j1: 0.7,
  j2: 0.8,
  j3: 0.9,
  j4: 1,
  g1: 0,
  g2: 0.1,
  g3: 0.2,
  g4: 0.3,
  f1: 0.7,
  f2: 0.8,
  f3: 0.9,
  f4: 1,
  a1: 0,
  a2: 0.1,
  a3: 0.2,
  a4: 0.3,
  s1: 0,
  s2: 0.1,
  s3: 0.2,
  s4: 0.3,
};

const plain = [];

function allPossibleCases(arr) {
  if (arr.length == 1) {
    return arr[0];
  } else {
    var result = [];
    var allCasesOfRest = allPossibleCases(arr.slice(1)); // recur with the rest of array
    for (var i = 0; i < allCasesOfRest.length; i++) {
      for (var j = 0; j < arr[0].length; j = j + 1) {
        result.push(arr[0][j] + ' ' + allCasesOfRest[i]);
        plain.push(arr[0][j]);
      }
    }
    return result;
  }
}

const res = allPossibleCases(allArrays);
const allHeaders = [];
// console.log(res)
const distanceBetween = (x1, y1, z1, x2, y2, z2) => {
  const r = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
  return Math.round(r * 100) / 100;
};
res.forEach(r => {
  r.split(' ').forEach(rE => {
    allHeaders.push(rE);
  });
});

// let headersWithValues = [[allHeaders], [], [], []];
let newArr = Array.from(Array(allHeaders.length + 1), () => new Array(allHeaders.length + 1));

newArr[0] = [0, ...allHeaders];
allHeaders.forEach((v, i2) => {
  if (i2 > 0) {
    newArr[i2][0] = allHeaders[i2 - 1];
  }
});

allHeaders.forEach((v, index) => {
  if (index > 0) {
    const prevV = allHeaders[index - 1];
    newArr[index] = [
      prevV,
      allHeaders.map((v1, i) => {
        if ((index > 0) & (index > i)) {
          return 0;
        }

        return distanceBetween(x1s[prevV], x2s[prevV], x3s[prevV], x1s[v1], x2s[v1], x3s[v1]);
      }),
    ];
  }
});

// console.log(newArr);
// navigator.clipboard.writeText(newArr.toString())

// const header = allHeaders;
// const dataArrays = [headersWithValues[1], headersWithValues[2], headersWithValues[3]];

// const csvFromArrayOfArrays = convertArrayToCSV(dataArrays, {
//   header,
//   separator: ';',
// });

// console.log(newArr)
const csvNewArr = convertArrayToCSV(newArr, {
  separator: ';',
});
// console.log(111,newArr);

// Copy

const fs = require('fs');

fs.writeFile('data.csv', csvNewArr, function(err) {
  if (err) {
    return console.log(err);
  }

  console.log('The file was saved!');
});
// clipboardy.writeSync(csvNewArr);
// console.log('done')
// let csvContent = 'data:text/csv;charset=utf-8,' + csvNewArr;
// console.log(csvContent)
// var encodedUri = encodeURI('csvContent');
//
// const Page = () => {
//   return (
//     <div>
//       <a onClick={() => window.open(encodedUri)}>GENERATE CSV</a>
//     </div>
//   );
// };
//
// export default Page;
