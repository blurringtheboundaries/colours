function start(){
    let {midi, socket, voices} = window.colours;
    colours.synth = new Tone.PolySynth(voices.polyphony, Tone.Synth).toMaster();
    let id = Math.random().toString(36).slice(2);
    midi.map[0].noteRange['0,127'] = function(pitch, velocity){
        let voiceArray = voices.update(pitch, velocity, true);
 
        document.querySelectorAll('.testBar').forEach((x,i)=>{
            x.style.backgroundColor = voiceArray[i].active ? noteColours.daze.hex[voiceArray[i].pitch%12] : 'black';
        })
 
        socket.emitNote(0, pitch, velocity);
    };
    midi.map[0].cc[64] = function(value){
        socket.emitCC(0, 64, value);
    }
    
    // midi mapping for our custom boards (sensors)
    for(let i=0; i<6; i++){
        midi.map[15].cc[i] = function(value){
            socket.emitCC(15, i, value);
        }
    }
    
    midi.listen();
    
}

export default start;