import {colours, processAll} from './test.js';

function writeNoteColour(note = 0, offset = 0){
    let {arduino, initFlag, lights} = colours;
    let colour, vel;
    if(note == -1){
        
        if(colours.use_decay && colours.voices.voices[offset].intensity >= 0){
            // let item = colours.voices.voices.find(x=>x.address == colours.dmx.addresses[offset]);
            let item = colours.voices.voices[offset];
            note = item.pitch_decay;
            if(note == -1){
                // this needs work
                return;
            }
            console.log('note', note, 'item', item);
            console.log('use_decay', colours.use_decay)
            colour = getColour(noteColours.daze.hex, note % 12);
            // let noteIndex = colours.voices.voices.findIndex(v=>v.pitch==note);
            // vel = colours.voices.voices[noteIndex].intensity;
            vel = item.intensity;
            colour = colour.map(x=>Math.floor(x*vel/127));
        } else {
            colour = [0,0,0];
        }
        
    } else {
        colour = getColour(noteColours.daze.hex, note % 12);
        
        let noteIndex = colours.voices.voices.findIndex(v=>v.pitch==note);
        vel = colours.voices.voices[noteIndex].velocity;
        console.log('intensity -- updated', vel);
        colour = colour.map(x=>Math.floor(x*vel/127));
    }
    
    // console.log('colour', colour)
    colours.lights[Object.keys(lights)[offset]] = colour;
    processAll();
 }

 export default writeNoteColour;