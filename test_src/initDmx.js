function initDMX(){
    let {arduino, socket, voices} = window.colours;
    arduino.connect();
    socket.in.cc = (e) => {
        let [channel, cc, value] = e;
        if(cc == 64){
            if(value == 127){
                colours.hold = true;
            } else if(colours.hold) {
                voices.flush();
                colours.hold = false;
            }
        }
    }
    socket.in.note = (e)=>{
        let [channel, pitch, velocity] = e;
        if(!velocity){
            if(colours.hold){
                return;
            }
        }
        let voiceArray = voices.update(pitch, velocity, true);
        // console.log(voiceArray.map(v=>v.pitch));
        voiceArray.forEach((v,i)=>{
            
          writeNoteColour(v.pitch % 12, i);
        });
        document.querySelectorAll('.testBar').forEach((x,i)=>{
            x.style.backgroundColor = voiceArray[i].active ? noteColours.daze.hex[voiceArray[i].pitch%12] : 'black';
        })   
    }
    socket.listen();
}

export default initDMX;