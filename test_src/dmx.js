/**
 * current assignments for our hardware
 */

const assignment = {
    lx:{
        red:5,
        green:6,
        blue:7,
        white:8,
        intensity:4

    },
    ldj:{
        red:1,
        green:2,
        blue:3,
        white:4
    }
}

/**
 * dmx unit 1
 * @param {*} msg 
 */

function lx(msg){
    serial.write(msg + '\n');
}

/**
 * dmx unit 2
 * @param {*} msg 
 */

function ldj(msg){
    serial.write(msg + '\n');
}

/**
 * 
 * @param {string} unit 
 * @param {number} offset 
 * @param {number|string} channel the number or name of the channel
 * @param {number} value 
 */

function dmxWrite(unit, offset, channel, value){
    if(typeof channel == 'string'){
        channel = assignment[unit][channel] + offset;
    }
    serial.write(`${channel} ${value}\n`);
}

export {lx, ldj, dmxWrite}