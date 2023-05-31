
// /**
//  * light cycle test
//  */

// function testCycle(){
//     let {arduino} = colours;
//     let count = 0, direction = 1;
//     arduino.writer.write('1 255\n');
//     window.setInterval(()=>{
//        arduino.writer.write(`2 ${Math.floor(Math.abs(Math.sin(count/100)*255))}\n`);
//         // console.log(Math.floor(Math.abs(Math.sin(count/100)*255)))
//        arduino.writer.write(`3 ${count%255}\n`);
//        count += direction;
//        if(count == 255){direction = -1}
//        if(count == 0){direction = 1}
//     }, 30);
// }