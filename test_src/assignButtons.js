// import {initSocket, initDMX, hold, initGui} from './test.js';

function assignButtons(){
    document.querySelectorAll('#socketInit').forEach(x=>x.addEventListener('click', initSocket));
    document.querySelectorAll('#dmxInit').forEach(x=>x.addEventListener('click', initDMX));
    document.querySelectorAll('#flush').forEach(x=>x.addEventListener('click', ()=>{colours.voices.flush()}));
    document.querySelectorAll('#gui_init').forEach(x=>x.addEventListener('click', initGui));

    document.querySelectorAll('#hold').forEach(x=>{
        x.addEventListener('input', function(){
            hold(this.checked);
        })
    })
}

export default assignButtons;