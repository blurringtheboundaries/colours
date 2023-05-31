function start(){
    let {midi, socket, voices} = window.colours;
    let id = Math.random().toString(36).slice(2);
    midi.map[0].noteRange['0,127'] = function(pitch, velocity){
        let voiceArray = voices.update(pitch, velocity, true);
 
        document.querySelectorAll('.testBar').forEach((x,i)=>{
            x.style.backgroundColor = voiceArray[i].active ? noteColours.daze.hex[voiceArray[i].pitch%12] : 'black';
        })
 
        socket.emitNote(0, pitch, velocity);
    };
    midi.listen();
    
}

export default start;