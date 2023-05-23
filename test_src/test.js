import MidiMapper from 'midi-mapper';
import SocketMapper from '@matthewscharles/socket-mapper';
import {dmxWrite} from './dmx.js';

window.MidiMapper = MidiMapper;
window.app = {
    midi: new MidiMapper(),
    socket: new SocketMapper()
}

app.midi.map[0].noteRange['0,127'] = function(pitch, velocity){
    console.log(pitch, velocity);
};
app.midi.listen();

/**
 * light cycle test
 */

function testCycle(){
    let count = 0, direction = 1;
    serial.writer.write('1 255\n');
    window.setInterval(()=>{
       serial.writer.write(`2 ${Math.floor(Math.abs(Math.sin(count/100)*255))}\n`);
        // console.log(Math.floor(Math.abs(Math.sin(count/100)*255)))
       serial.writer.write(`3 ${count%255}\n`);
       count += direction;
       if(count == 255){direction = -1}
       if(count == 0){direction = 1}
    }, 30);
}

