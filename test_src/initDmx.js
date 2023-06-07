function updateScreenColours(){
    let {voices} = window.colours;
    let voiceArray = voices.voices;
    document.querySelectorAll('.testBar').forEach((x,i)=>{
        x.style.backgroundColor = voiceArray[i].active ? noteColours.daze.hex[voiceArray[i].pitch%12] : 'black';
    })   
}

function initDMX(){
    let {arduino, socket, voices} = window.colours;
    arduino.connect();
    socket.in.cc = (e) => {
        let [channel, cc, value] = e;
        if(cc == 64){
            if(value == 127){
                colours.hold = true;
            } else if(colours.hold && value == 0) {
                voices.flush();
                colours.hold = false;
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
            
        }
        let voiceNumber = voices.update(pitch, velocity, false);
        colours.intensities[voiceNumber] = velocity;
        colours.voices.voices.forEach((v,i)=>{
          writeNoteColour(v.pitch, i);
        });

        updateScreenColours();
    }
    socket.listen();
}

export default initDMX;