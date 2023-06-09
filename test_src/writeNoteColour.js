import {colours, processAll} from './test.js';

function writeNoteColour(note = 0, offset = 0){
    let {arduino, initFlag, lights} = colours;
    let colour, vel;
    if(note == -1){
        console.log('use_decay', colours.use_decay)
        if(colours.use_decay){
            return;
        } else {
            colour = [0,0,0];
        }
        
    } else {
        colour = getColour(noteColours.daze.led, note % 12);
        
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