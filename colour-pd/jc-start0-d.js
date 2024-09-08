let jc = [
    [179, 12, 0],
    [179, 18, 0],
    [179, 0, 0],
    [179, 0, 36],
    [179, 0, 122],
    [140, 0, 179],
    [21, 0, 179],
    [0, 6, 179],
    [0, 125, 179],
    [0, 179, 77],
    [3, 179, 0],
    [179, 155, 0]
];

let output = '';
jc.forEach((x,i)=>{
    x.forEach((channel,i)=>{
        channel /= 255;
        output+= Math.round(channel*100)/100;
        if(i<2)output+=' '
    })
    if(i<jc.length-1) output += ', '
})

console.log(output)