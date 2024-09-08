// convert pd list with rgb float vals 0-1 to array of ints 0 - 255

const rgbVals = '0.5 0 1, 0 0.5 1, 0 0 1, 0 1 1, 0 1 0, 0.5 1 0, 1 1 0, 1 0.75 0, 1 0.5 0, 1 0.25 0, 1 0 0, 1 0 0.5';
const jd = '1 0.6 0.2, 1 0.76 0.6, 0.9 0.35 0.97, 0.8 0.98 0.78, 0.05 1 1, 1 1 0, 0.85 0.7 0.63, 1 0 0, 0.75 0.45 0.58, 0.76 0.4 1, 0.2 0.8 0.2, 0.04 0.51 0.86';

colourList = jd.split(' ');
output = [];

for(let i=0;i<(12);i++){
    output.push(colourList.slice((i*3), (i*3)+3))
}

output.forEach((x,i,arr)=>{
    output[i] = x.map(num=>Math.floor(parseFloat(num)*255))
});

console.log(output);