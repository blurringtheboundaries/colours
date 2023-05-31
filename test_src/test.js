import MidiMapper from 'midi-mapper';
import SocketMapper from '@matthewscharles/socket-mapper';
import SerialMapper from 'serial-mapper';
import { dmxWrite } from './dmx.js';
import { noteColours, COLOURS } from '../src/synth_colours.js';
import VoiceManager from './voice.js';

window.MidiMapper = MidiMapper;
window.colours = {
    midi: new MidiMapper(),
    socket: new SocketMapper(),
    arduino: new SerialMapper(),
    voices: new VoiceManager(4),
    initFlag: false
}

window.noteColours = noteColours;

console.log('test.js loaded');


window.start = function start(){
    let {midi, socket, voices} = colours;
    let id = Math.random().toString(36).slice(2);
    midi.map[0].noteRange['0,127'] = function(pitch, velocity){
        let voiceArray = voices.update(pitch, velocity, true);
        // console.log(voiceArray.map(v=>v.pitch));
        document.querySelectorAll('.testBar').forEach((x,i)=>{
            x.style.backgroundColor = voiceArray[i].active ? noteColours.daze.hex[voiceArray[i].pitch%12] : 'black';
        })
        // console.log('test', id, pitch, velocity);
        socket.emitNote(0, pitch, velocity);
    };
    midi.listen();
    
}


/**
 * light cycle test
 */

function testCycle(){
    let {arduino} = colours;
    let count = 0, direction = 1;
    arduino.writer.write('1 255\n');
    window.setInterval(()=>{
       arduino.writer.write(`2 ${Math.floor(Math.abs(Math.sin(count/100)*255))}\n`);
        // console.log(Math.floor(Math.abs(Math.sin(count/100)*255)))
       arduino.writer.write(`3 ${count%255}\n`);
       count += direction;
       if(count == 255){direction = -1}
       if(count == 0){direction = 1}
    }, 30);
}

function initSocket(){
    let {socket} = colours;
    let synth = new Tone.PolySynth().toMaster();
    Tone.start();
    console.log('init')
    socket.listen();
    socket.in.note = (e)=>{
        let [channel, pitch, velocity] = e;
        synth[e[2] ? 'triggerAttack' : 'triggerRelease'](Tone.Frequency(pitch, 'midi').toNote(), undefined, velocity/127);
    } 
}

function initDMX(){
    let {arduino, socket, voices} = colours;
    arduino.connect();
    socket.in.note = (e)=>{
        let [channel, pitch, velocity] = e;
        let voiceArray = voices.update(pitch, velocity, true);
        console.log(voiceArray.map(v=>v.pitch));
        if(e[2])writeNoteColour(e[1]%12);
        
    }
    socket.listen();
}

document.querySelectorAll('#socketInit').forEach(x=>x.addEventListener('click', initSocket));
document.querySelectorAll('#dmxInit').forEach(x=>x.addEventListener('click', initDMX));

function getColour(array, index){
    let output = array[index];
    if(output[0] == '#'){
        output = output.slice(1);
    }
    if(output.length == 3){
        output = output.split('').map(x=>x+x).join('');
    }
    output = output.match(/.{2}/g).map(x=>parseInt(x, 16));
    return output;
}

function formatColour(array, offset = 0){
    offset += 2;
    return array.map((x,i)=>`${i+offset} ${x}`).join(' ') + `\n`;
}

function writeNoteColour(note = 0, offset = 0){
    let {arduino, initFlag} = colours;
    if(!initFlag){
        arduino.writer.write(`${1 + offset} 255\n`);
        initFlag = true;
    }

    let colour = getColour(noteColours.daze.led, note);
    arduino.writer.write(formatColour(colour, offset));
}

Object.assign(window,{
    getColour, formatColour, writeNoteColour
})



console.log(noteColours.daze.led);