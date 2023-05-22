const fs = require('fs-extra');

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
]

let rgbVals = [
    [ 127, 0, 255 ], [ 0, 127, 255 ],
    [ 0, 0, 255 ],   [ 0, 255, 255 ],
    [ 0, 255, 0 ],   [ 127, 255, 0 ],
    [ 255, 255, 0 ], [ 255, 191, 0 ],
    [ 255, 127, 0 ], [ 255, 63, 0 ],
    [ 255, 0, 0 ],   [ 255, 0, 127 ]
  ]

let jd = [
    [ 255, 153, 51 ],
    [ 255, 193, 153 ],
    [ 229, 89, 247 ],
    [ 204, 249, 198 ],
    [ 12, 255, 255 ],
    [ 255, 255, 0 ],
    [ 216, 178, 160 ],
    [ 255, 0, 0 ],
    [ 191, 114, 147 ],
    [ 193, 102, 255 ],
    [ 51, 204, 51 ],
    [ 10, 130, 219 ]
  ]

let presets = [jc, rgbVals, jd];
let noteNamesPd = ['C','Csharp','D','Dsharp','E','F','Fsharp','G','Gsharp','A','Asharp','B']

let output = '#N canvas 0 25 267 785 12;\n'

presets.forEach((item,index)=>{
    var offset = index * 250;
    var buttonX = 25, buttonY = 25 + offset;
    output += `#X obj ${buttonX} ${buttonY} bng 200 250 50 0 preset${index+1} preset${index+1}r ${index+1} 75 100 0 100 -262144 -1 -1;`;
    item.forEach((entry,i)=>{
        var x = Math.floor(100 + 100 * Math.cos(2 * Math.PI * i / 12));
        var y = Math.floor(100 + 100 * Math.sin(2 * Math.PI * i / 12));  
        let [r,g,b] = entry;
        let thisColour = (r*(-65536)+g*(-256)+b*(-1))-1;
        let line = `#X obj ${x} ${y + offset} cnv 15 50 50 empty wheel${i} empty 20 12 0 14 ${thisColour} -262144 0;`;
        output += line + '\n'
        output += `#X msg ${300+(index*120)} ${108 + (i*30)} \\\; note${noteNamesPd[i]}-r color ${thisColour} 0 0;`
    })
    
    // console.log(output)
    
    
})



fs.writeFileSync('presets2.pd',output,'utf-8');