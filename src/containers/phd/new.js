const _ = require('lodash');
const { convertArrayToCSV } = require('convert-array-to-csv');

const extendedRangeValues = {
  0: [0, 0.1, 0.2],
  0.5: [0.4, 0.5, 0.6],
  1: [0.8, 0.9, 1],
};

const emotionValues = {
  j: [0.5, 1, 1],
  g: [0.5, 0, 0],
  f: [1, 0.5, 1],
  a: [0, 0.5, 0],
  s: [0.5, 1, 0],
};

const distanceBetween = (x1, y1, z1, x2, y2, z2) => {
  const r = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
  return r.toFixed(3);
};

const res = [[], [], [], []];

_.keys(emotionValues).forEach(k => {
  let i = 1;
  const target = emotionValues[k];
  const extendedTarget = target.map(v => extendedRangeValues[v]);

  extendedTarget[0].forEach(x1 => {
    extendedTarget[1].forEach(x2 => {
      extendedTarget[2].forEach(x3 => {
        res[0].push(k + '' + i);
        res[1].push(x1);
        res[2].push(x2);
        res[3].push(x3);

        i++;
      });
    });
  });
});

// console.log(res[1][27])

//    j1, j2, j3
// j1
// j2
// j3

// let headersWithValues = [[allHeaders], [], [], []];
let newArr = Array.from(Array(res[0].length + 1), () => new Array(res[0].length + 1));


const allHeaders = res[0]
newArr[0] = [' ', allHeaders.map(v => v)];

allHeaders.forEach((v1, i2) => {
  if (i2 > 0) {
    newArr[i2][0] = allHeaders[i2 - 1];
  }
})

allHeaders.forEach((v, index) => {
  if (index > 0) {
    const prevV = allHeaders[index - 1];
    newArr[index] = [
      prevV,
      allHeaders.map((v1, i) => {
        if (index > i) {
          return 0;
        }
        // console.log(prevV, v1)


        if (prevV === 'j1' && v1 === 'g1') {
          // console.log(res[1][index-1])
          // console.log(res[2][index-1])
          // console.log(res[3][index-1])
          //
          // console.log(i)
          // // console.log(allHeaders.indexOf('g1'))
          // console.log(res[1][i])
          // console.log(res[2][i])
          // console.log(res[3][i])

        }
        return distanceBetween(
          res[1][index - 1],
          res[2][index - 1],
          res[3][index - 1],
          res[1][i],
          res[2][i],
          res[3][i]
        );
        // return distanceBetween(x1s[prevV], x2s[prevV], x3s[prevV], x1s[v1], x2s[v1], x3s[v1]);
      }),
    ];
  }
});


//   if (index1 === 0) {
//     return;
//   }
//   newArr[index1] = [
//     v1,
//     res[0].map((v2, index2) => {
//       return distanceBetween(
//         res[1][index1 - 1],
//         res[2][index1 - 1],
//         res[3][index1 - 1],
//         res[1][index2 - 1],
//         res[2][index2 - 1],
//         res[3][index2 - 1]
//       );
//     }),
//   ];
// });




const csvNewArr = convertArrayToCSV(newArr, {
  separator: ';',
});

const fs = require('fs');

fs.writeFile('data_new2.csv', csvNewArr, function(err) {
  if (err) {
    return console.log(err);
  }
});
