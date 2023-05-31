import MidiMapper from 'midi-mapper';
import SocketMapper from '@matthewscharles/socket-mapper';
import SerialMapper from 'serial-mapper';
import { dmxWrite } from './dmx.js';
import start from './start.js';
import { noteColours, COLOURS } from '../src/synth_colours.js';
import VoiceManager from './voice.js';
import initDMX from './initDmx.js';

window.MidiMapper = MidiMapper;
window.colours = {
    midi: new MidiMapper(),
    socket: new SocketMapper(),
    arduino: new SerialMapper(),
    voices: new VoiceManager(4),
    initFlag: false,
    polyphony: 4,
    lights:{
        0:[0,0,0],
        1:[0,0,0],
        2:[0,0,0],
        3:[0,0,0]
    }, 
    queue: [],
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



function assignButtons(){
    document.querySelectorAll('#socketInit').forEach(x=>x.addEventListener('click', initSocket));
    document.querySelectorAll('#dmxInit').forEach(x=>x.addEventListener('click', initDMX));
    
}



/**
 * 
 * @param {*} array 
 * @param {*} index 
 * @returns {Array} [r,g,b]
 */

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
    return array.map((x,i)=>`${i+offset} ${x}`).join('\n') + `\n`;
}

function writeNoteColour(note = 0, offset = 0){
    let {arduino, initFlag} = colours;
    if(!initFlag){
        for (let i=0; i<colours.polyphony; i++){

            console.log('init ', 1 + i * 7)
            arduino.writer.write(`${1 + i * 7} 255\n`);
        }
        colours.initFlag = true;
    }
    let colour;
    if(note == -1){
        colour = [0,0,0];
    } else {
        colour = getColour(noteColours.daze.led, note);
    
    }
    console.log('colour',offset, colour);

    
    if(colours.lights[offset].join('') == colour.join('')){
        return;
    } else {
        colours.queue.push(formatColour(colour, offset * 6));

    }

    colours.lights[offset] = colour;
    // console.log(formatColour(colour, offset * 7).split('\n'));
    // todo: try writeQueue in the SerialMapper instance
    // console.log(formatColour(colour, offset * 6));
    // arduino.writer.write(formatColour(colour, offset * 6));
}

function processQueue(){
    let {queue, arduino} = colours;
    if(queue.length){
        // arduino.writer.write(queue.shift());
        arduino.writeQueue(queue);
        queue = [];
    }
}

// go

assignButtons();

Object.assign(window,{
    getColour, formatColour, writeNoteColour, start, noteColours, processQueue
})
