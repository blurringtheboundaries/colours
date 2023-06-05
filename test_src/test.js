import MidiMapper from 'midi-mapper';
import SocketMapper from '@matthewscharles/socket-mapper';
import SerialMapper from 'serial-mapper';
import MultitouchMapper from '@matthewscharles/multitouch-mapper';
import { dmxWrite } from './dmx.js';
import start from './start.js';
import { noteColours, COLOURS } from '../src/synth_colours.js';
import VoiceManager from './voice.js';
import initDMX from './initDmx.js';
import processQueue from './processQueue.js';

window.MidiMapper = MidiMapper;
window.colours = {
    midi: new MidiMapper(),
    socket: new SocketMapper(),
    arduino: new SerialMapper(),
    voices: new VoiceManager(4),
    touch: new MultitouchMapper(),
    initFlag: false,
    polyphony: 4,
    lights:{
        1:[0,0,0],
        11:[0,0,0],
        22:[0,0,0],
        33:[0,0,0]
    }, 
    lights_last:{
        1:[0,0,0],
        11:[0,0,0],
        22:[0,0,0],
        33:[0,0,0]
    },
    intensties:{
        1:0,
        11:0,
        22:0,
        33:0
    },
    intensties_last:{
        1:0,
        11:0,
        22:0,
        33:0
    },
    queue: [],
    audio:{
        // mic: new Tone.UserMedia(),
        // meter: new Tone.Meter()
    },
    multiplier: 1
}


    
function initAudio(){
    colours.audio.mic = new Tone.UserMedia();
    colours.audio.meter = new Tone.Meter();
    colours.audio.mic.connect(colours.audio.meter);
    colours.audio.mic.open().then(()=>{
    });
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
    offset = parseInt(offset)+1;
    return array.map((x,i)=>`${i+offset}:${x}`).join('\n') + `\n${offset - 1}:255\n`;
}

function writeIntensities(){
    let {arduino, initFlag, intensties} = colours;
    let intensity;
    Object.entries(intensties).forEach(([index, intensity])=>{
        if(intensity == colours.intensties_last[index]){
        } else {
            colours.queue.push(`${index}:${intensity}\n`);
            colours.intensties_last[index] = intensity;
        }
    });
    // queue = [];
    // console.log(queue);
}

function writeNoteColour(note = 0, offset = 0){
    let {arduino, initFlag, lights} = colours;
    let colour;
    if(note == -1){
        colour = [0,0,0];
    } else {
        colour = getColour(noteColours.daze.led, note);
    
    }
    console.log('colour',offset, colour);

    colours.lights[Object.keys(lights)[offset]] = colour;
    processAll();
 }

function processAll(){
    let {queue, arduino, lights, audio} = colours;
    
    let duck;
    if(audio.meter){
        duck = Tone.dbToGain(audio.meter.getLevel())*1;
        if(duck > 1){ duck=1};
    }
        
    colours.queue = [];
    Object.entries(lights).forEach(([index, colour])=>{
        if(colour.join('') == colours.lights_last[index].join('')){
        } else {
            colours.queue.push(formatColour(colour, index));
            colours.lights_last[index] = colour;
        }
        
    })
    writeIntensities();
    console.log(queue);
    arduino.writeQueue(colours.queue);
    queue = [];

}


// go

assignButtons();

Object.assign(window,{
    getColour, formatColour, writeNoteColour, start, noteColours, processQueue, processAll
})
