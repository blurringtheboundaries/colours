let previewSynth = new Tone.PolySynth(Tone.synth,{oscillator : {
                type : "sine2",
                partials:[1,0.5],
                volume:'-10'
            }}).toDestination();

Array.from(document.querySelectorAll('.wedge')).forEach((wedge,i)=>{
    wedge.setAttribute('role','button')
    wedge.onclick = function(){
        Tone.start();
        previewSynth.triggerAttackRelease(this.dataset.note,0.5)
        console.log(this.dataset.note);
        this.style.opacity=1;
        setInterval(function(){this.style.opacity=0.9}.bind(this),500)
    }
})