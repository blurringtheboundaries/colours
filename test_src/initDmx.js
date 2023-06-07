function initDMX(){
    let {arduino, socket, voices} = window.colours;
    arduino.connect();
    socket.in.cc = (e) => {console.log(e)}
    socket.in.note = (e)=>{
        let [channel, pitch, velocity] = e;
        // if(!velocity) return;
        let voiceArray = voices.update(pitch, velocity, true);
        // console.log(voiceArray.map(v=>v.pitch));
        voiceArray.forEach((v,i)=>{
            // todo: check if pitch has changed to save on writes
          writeNoteColour(v.pitch % 12, i);
        });
        document.querySelectorAll('.testBar').forEach((x,i)=>{
            x.style.backgroundColor = voiceArray[i].active ? noteColours.daze.hex[voiceArray[i].pitch%12] : 'black';
        })   
    }
    socket.listen();
}

export default initDMX;