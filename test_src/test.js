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
    intensities:{
        1:0,
        11:0,
        22:0,
        33:0
    },
    intensities_last:{
        1:0,
        11:0,
        22:0,
        33:0
    },
    decays:{
        1:0,
        11:0,
        22:0,
        33:0
    },
    always_on:true,
    always_write:true,
    use_velocity:true,
    queue: [],
    audio:{
        
    },
    multiplier: 1,
    hold: false
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

function decay(){
    let {voices, decays} = colours;
    let voiceArray = voices.voices;
    voiceArray.forEach(v=>{
        if(v.active){
            v.decay = Math.max(v.decay - 1, 0);
        }
    });
}

function assignButtons(){
    document.querySelectorAll('#socketInit').forEach(x=>x.addEventListener('click', initSocket));
    document.querySelectorAll('#dmxInit').forEach(x=>x.addEventListener('click', initDMX));
    document.querySelectorAll('#flush').forEach(x=>x.addEventListener('click', colours.voices.flush));

    document.querySelectorAll('#hold').forEach(x=>{
        x.addEventListener('input', function(){
        hold(this.checked);
        })
    })
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
    let {always_on} = colours;
    offset = parseInt(offset)+1;
    let output = array.map((x,i)=>`${i+offset}:${x}`).join('\n');
    if(always_on){
        output += `\n${offset - 1}:255\n`
    }
    return output;
}

function writeIntensities(){
    let {arduino, initFlag, intensities} = colours;
    let intensity;
    Object.entries(intensities).forEach(([index, intensity])=>{
        if(intensity == colours.intensities_last[index]){
        } else {
            colours.queue.push(`${index}:${intensity}\n`);
            colours.intensities_last[index] = intensity;
        }
    });
    
}

function writeNoteColour(note = 0, offset = 0){
    let {arduino, initFlag, lights} = colours;
    let colour, vel;
    if(note == -1){
        colour = [0,0,0];
    } else {
        colour = getColour(noteColours.daze.led, note % 12);
        
        let noteIndex = colours.voices.voices.findIndex(v=>v.pitch==note);
        vel = colours.voices.voices[noteIndex].velocity;
        console.log('intensity', vel);
        colour = colour.map(x=>Math.floor(x*vel/127));
    }
    
    
    console.log('colour', colour)
    colours.lights[Object.keys(lights)[offset]] = colour;
    processAll();
 }

function processAll(){
    let {queue, arduino, lights, audio, always_write} = colours;
    
    let duck;
    if(audio.meter){
        duck = Tone.dbToGain(audio.meter.getLevel())*1;
        if(duck > 1){ duck=1};
    }
 
    Object.entries(lights).forEach(([index, colour])=>{
        if(colour.join('') == colours.lights_last[index].join('')){
        } else {
            colours.queue.push(formatColour(colour, index));
            colours.lights_last[index] = colour;
        }
        
    })
    writeIntensities();
    
    if(always_write){
        writeQueue();
    }

}

function autoWrite(value = true, interval = 30){
    colours.alwayws_write = value;
    if(value){
        colours.interval = setInterval(writeQueue, interval);
    } else {
        clearInterval(colours.interval);
    }
    
}

function hold(value){
    colours.hold = value;
}

function getDmxIndex(number){
    let indices = Object.keys(colours.lights);
    return indices[number];
}

function update(){
    let {arduino, initFlag, lights, intensities, voices} = colours;
    voices.forEach((v,i)=>{
        console.log(v.active, intensities[getDmxIndex(i)])
    })
}

function writeQueue(){
    let {queue, arduino} = colours;
    if(queue.length){
        arduino.writeQueue(queue);
        colours.queue = [];
    }
}


// go

assignButtons();

Object.assign(window,{
    getColour, formatColour, writeNoteColour, start, noteColours, processQueue, processAll, autoWrite, writeQueue, initAudio
})
