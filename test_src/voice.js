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
 * Manage voices of synth for colour / sound. Quick and dirty attempt during gig prep.
 * @param {number} numberOfVoices
 * @param {boolean} stealing voice stealing flag
 * @returns {VoiceManager}
 */

export default class VoiceManager{
    constructor(numberOfVoices = 4, stealing = true){
        this.stealing = stealing;
        this.voices = [];
        for(let i = 0; i < numberOfVoices; i++){
            this.voices.push(new Voice());
        }
    }

    /**
     * 
     * @param {*} pitch 
     * @param {*} velocity 
     * @returns {number|boolean} the voice number or false if no voice available
     */
    update(pitch, velocity, outputAll = false){
        let activeVoices = this.voices.filter(v=>v.active);
        let voice = this.voices.find(v=>v.pitch == pitch);
        
        if(velocity){
            // velocity is greater than 0: note on
            if(voice){
                voice.on(pitch, velocity);
            } else {
                if(activeVoices.length == this.voices.length){
                    if(this.stealing){
                        voice = this.steal(pitch, velocity);
                    }
                }
                else{
                    voice = this.voices.find(v=>!v.active);
                    voice.on(pitch, velocity);
                    
                }
            }
            // let output = {
            //     number: this.voices.indexOf(voice),
            //     data: voice
            // }
        
            return outputAll ? this.voices : this.voices.indexOf(voice);

        } else {
            // velocity is 0: note off
            if(voice){
                voice.off();
            }
        }
       

        return outputAll ? this.voices : false;
    }

    steal(pitch, velocity){
        this.voices[this.voices.length-1].on(pitch, velocity);
        return this.voices[this.voices.length-1];
    }

    getVoice(number){
        return this.voices[number];
    }

    getVoices(){
        return this.voices;
    }

    getActiveVoices(){
        return this.voices.filter(v=>v.active);
    }

    getInactiveVoices(){
        return this.voices.filter(v=>!v.active);
    }

    getActiveVoiceCount(){
        return this.voices.filter(v=>v.active).length;
    }

    flush(){
        this.voices.forEach(v=>v.off());
    }

}