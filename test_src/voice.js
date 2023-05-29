/**
 * Voice class
 */

class Voice{
    constructor(){

    }

    on(velocity){
    
    }
    
    off(){

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

    }


}