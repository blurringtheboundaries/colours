import MidiMapper from 'midi-mapper';
import SocketMapper from '@matthewscharles/socket-mapper';
import { map, constrain } from '@matthewscharles/cm-toolbox';
import SerialMapper from 'serial-mapper';
import MultitouchMapper from '@matthewscharles/multitouch-mapper';
import { dmxWrite } from './dmx.js';
import start from './start.js';
import { noteColours, COLOURS } from '../src/synth_colours.js';
import VoiceManager from './voice.js';
import initDMX from './initDmx.js';
import processQueue from './processQueue.js';
import formatColour from './formatColour.js';
// import assignButtons from './assignButtons.js';
import * as dat from 'dat.gui'; 
import writeNoteColour from './writeNoteColour.js';

let colours = {
    dmx:{
        addresses:[1,11,22,33]
    },
    rate:30,
    pedal:0,
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
    velocity_min:30,
    auto_write:false,
    use_decay:false,
    decay_increment:10,
    queue: [],
    audio:{
        
    },
    affect: false,
    multiplier: 1,
    hold: false,
    counter: 0,
    controls:{}
}

function initGui(){
    if(!window.gui) {
        window.gui = new dat.GUI();
        // window.gui.listen();
        let {gui} = window;
        let {controls} = window.colours;
        controls.multiplier = gui.add(window.colours, 'multiplier', 0, 1);
        controls.use_decay = gui.add(window.colours, 'use_decay');
        controls.hold = gui.add(window.colours, 'hold');
        controls.always_write = gui.add(window.colours, 'always_write');
        controls.autoWrite = gui.add(window.colours, 'auto_write');
        controls.velocity_min = gui.add(window.colours, 'velocity_min', 0, 127);
        controls.affect = gui.add(window.colours, 'affect')
        // controls.addresses = gui.add(window.colours.dmx.addresses);
        controls.autoWrite.onChange((value)=>{
            if(value){
                colours.interval = setInterval(writeQueue,colours.rate);
            } else {
                clearInterval(colours.interval);
            }
        })
        document.querySelectorAll('#gui_init').forEach(x=>x.style.display = 'none');
    } else {
        document.querySelectorAll('#gui_init').forEach(x=>x.style.display = 'none');
    }
}

function initAudio(){
    colours.audio.mic = new Tone.UserMedia();
    colours.audio.meter = new Tone.Meter();
    colours.audio.mic.connect(colours.audio.meter);
    colours.audio.mic.open().then(()=>{});
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
    let { voices } = colours;
    let voiceArray = voices.voices;
    voiceArray.forEach(v=>{
        if(v.active){
            v.decay = Math.max(v.decay -1, 0);
        }
    });
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

function writeIntensities(){
    let { intensities } = colours;
    
    Object.entries(intensities).forEach(([index, intensity])=>{
        if(intensity == colours.intensities_last[index]){
        } else {
            colours.queue.push(`${index}:${intensity}\n`);
            colours.intensities_last[index] = intensity;
        }
    });
}


function processAll(){
    let { lights, audio, always_write } = colours;
    
    let duck;
    if(audio.meter){
        duck = Tone.dbToGain(audio.meter.getLevel())*1;
        if(duck > 1){ duck=1};
        if(affect){console.log('affect',duck)}
    }
 
    Object.entries(lights).forEach(([index, colour])=>{
        if(colour.join('') == colours.lights_last[index].join('')){
        } else {
            colours.queue.push(formatColour(colour, index));
            colours.lights_last[index] = colour;
        }
    })
    
    if(always_write){
        writeQueue();
    }
}

function autoWrite(value = true, interval = 30){
    colours.always_write = !value;
    if(value){
        colours.interval = setInterval(writeQueue, interval);
    } else {
        clearInterval(colours.interval);
    }
    
}

function selectiveDecrement(){
  let {voices, intensities, decays, counter} = colours;
  let voiceArray = voices.voices.filter(v=>!v.active && v.intensity > 0);
  
  if(voiceArray.length == 0){
    return;
  }
    
  for(let index = 0; index < voiceArray.length; index++){
    console.log(index, voiceArray[index])
    voiceArray[index].intensity -= colours.decay_increment;
    if(voiceArray[index].intensity < 0){
        voiceArray[index].intensity = 0;
        }
    if(voiceArray[index].pitch_decay >= 0){
        // writeNoteColour(voiceArray[index].pitch_decay, index);
        writeNoteColour(-1, index);
    
    }
  }
  
  processAll();
  
}

function hold(value){
    colours.hold = value;
}

function getDmxIndex(number){
    let indices = Object.keys(colours.lights);
    return indices[number];
}

function update(){
    if(!colours.hold)selectiveDecrement();
    colours.counter++;
}

function writeQueue(){
    if(colours.use_decay){
        update();
    }
    let {queue, arduino} = colours;
    if(queue.length){
        arduino.writeQueue(queue);
        colours.queue = [];
    }
}

// go

function assignButtons(){
    let assignments = {
        'socketInit': initSocket,
        'dmxInit': initDMX,
        'flush': ()=>{colours.voices.flush()},
        'gui_init': initGui,
    }

    Object.entries(assignments).forEach(([id, func])=>{
        document.querySelectorAll(`#${id}`).forEach(x=>x.addEventListener('click', func));
    })
    
    document.querySelectorAll('#hold').forEach(x=>{
        x.addEventListener('input', function(){
            hold(this.checked);
        })
    })
}

assignButtons();

Object.assign(window,{
    colours, 
    getColour, 
    formatColour, 
    writeNoteColour, 
    start, 
    noteColours, 
    processQueue, 
    processAll, 
    autoWrite, 
    writeQueue, 
    initAudio, 
    update, 
    initGui, 
    selectiveDecrement,
    map,
    constrain
})

// export {initSocket, initDMX, colours, hold, initGui, processAll}