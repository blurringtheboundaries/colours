/**
 * Voice class
 */

class Voice{
    constructor(){
        Object.assign(this,{
            pitch:-1,
            velocity:0,
            active:false
        })
    }

    on(pitch, velocity){
        this.active = true;
        Object.assign(this,{
            pitch,
            velocity
        })
    }
    
    off(){
        this.active = false;
        Object.assign(this,{
            pitch:-1,
            velocity:0
        })
    }
}


/**
 * Manage voices of synth for colour / sound
 * @param {number} numberOfVoices
 * @param {boolean} stealing voice stealing flag
 */

export default class VoiceManager{
    constructor(numberOfVoices = 4, stealing = true){
        this.stealing = stealing;
        this.voices = [];
        for(let i = 0; i < numberOfVoices; i++){
            this.voices.push(new Voice());
        }
    }

    update(pitch, velocity){
        let activeVoices = this.voices.filter(v=>v.active);
        let voice = this.voices.find(v=>v.pitch == pitch);
        if(velocity){
            if(voice){
                voice.on(velocity);
            }else{
                if(activeVoices.length == this.voices.length){
                    if(this.stealing){
                        this.steal(pitch, velocity);
                    }
                }
                else{
                    this.voices[this.voices.length-1].on(velocity);
                }
            }
        } else {
            if(voice){
                voice.off();
            }
        }
        return {
            number: this.voices.indexOf(voice),
            data: voice
        }
    }

    steal(pitch, velocity){
        let voice = this.voices.find(v=>!v.active);
        voice.on(pitch, velocity);
    }

}