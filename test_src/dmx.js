const assignment = {
    lx:{

    },
    ldj:{

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

export {lx, ldj}