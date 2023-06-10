// import {colours, initGui} from './test.js';
import {map, constrain} from '@matthewscharles/cm-toolbox';
function getDmxIndex(number){
    let indices = Object.keys(colours.lights);
    return indices[number];
}

function updateScreenColours(){
    let {voices} = window.colours;
    let voiceArray = voices.voices;
    document.querySelectorAll('.testBar').forEach((x,i)=>{
        x.style.backgroundColor = voiceArray[i].active ? noteColours.daze.hex[voiceArray[i].pitch%12] : 'black';
    })   
}

function initDMX(){
    let {arduino, socket, voices, dmx} = window.colours;
    arduino.connect();
    console.log('dmx', dmx, dmx.addresses)
    voices.assignAddresses(dmx.addresses)
    socket.in.cc = (e) => {
        let [channel, cc, value] = e;
        if(cc == 64){
            colours.pedal = value;
            colours.decay_increment = Math.floor((value/-127)*6  + 8);
            if(value == 127){
                colours.decay_increment = 0.1;
            } else if(colours.hold && value == 0) {
                voices.flush();
                // colours.hold = false;
                updateScreenColours();
                let voiceArray = voices.voices.map(v=>v.pitch);
                voiceArray.forEach((v,i)=>{ 
                  colours.lights[Object.keys(colours.lights)[i]].write = [0,0,0];
                });
                processAll();
            }
        }
    }
    socket.in.note = (e)=>{
        let [channel, pitch, velocity] = e;
        if(!velocity){
            if(colours.hold){
                return;
            }
        } else {
            // if(velocity < )
            velocity = map(velocity, colours.velocity_min, 127, 1, 127, true, true);
        }
        let voiceNumber = voices.update(pitch, velocity, false);
        // console.log('dmx voice number', voiceNumber, getDmxIndex(voiceNumber))
        colours.intensities[getDmxIndex(voiceNumber)] = velocity;
        colours.voices.voices.forEach((v,i)=>{
          writeNoteColour(v.pitch, i);
        });

        updateScreenColours();
    }
    socket.listen();
    initGui();
}

export default initDMX;