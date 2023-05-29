import MidiMapper from 'midi-mapper';
import SocketMapper from '@matthewscharles/socket-mapper';
import SerialMapper from 'serial-mapper';
import { dmxWrite } from './dmx.js';
import { noteColours, COLOURS } from '../src/synth_colours.js';

window.MidiMapper = MidiMapper;
window.colours = {
    midi: new MidiMapper(),
    socket: new SocketMapper(),
    serial: new SerialMapper()  
}

console.log('test.js loaded');


window.start = function start(){
    let {midi, socket} = colours;

    midi.map[0].noteRange['0,127'] = function(pitch, velocity){
        console.log('test', pitch, velocity);
        socket.emitNote(0, pitch, velocity);
    };
    midi.listen();
}


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

function initSocket(){
    let synth = new Tone.PolySynth().toMaster();
    Tone.start();
    console.log('init')
    colours.socket.listen();
    colours.socket.in.note = (e)=>{
        let [channel, pitch, velocity] = e;
        synth[e[2] ? 'triggerAttack' : 'triggerRelease'](Tone.Frequency(pitch, 'midi').toNote(), undefined, velocity/127);
    }   //- colours.socket.listen();
}
document.querySelectorAll('#socketInit').forEach(x=>x.addEventListener('click', initSocket));