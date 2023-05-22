console.log('test')

const pentaWedge = function(){
    Array.from(document.querySelector('#preset_1 .sectors').children).forEach((wedge,i)=>{
        wedge.dataset.colour = wedge.style.fill;
        wedge.dataset.note = noteNames[i];
        let pentatonic = ['C','D','E','G','A']
        wedge.style.opacity = pentatonic.includes(wedge.dataset.note) ? 1 : 0
        let mode2 = ['D','D sharp', 'F', 'F sharp', 'G sharp', 'A', 'B', 'C']
        wedge.style.opacity = mode2.includes(wedge.dataset.note) ? 1 : 0
    })
    
}

const mode2Wedge = function(){

    Array.from(document.querySelector('#preset_1 .sectors').children).forEach((wedge,i)=>{
        wedge.dataset.colour = wedge.style.fill;
        wedge.dataset.note = noteNames[i];
        
        let mode2 = ['D','D sharp', 'F', 'F sharp', 'G sharp', 'A', 'B', 'C']
        wedge.style.opacity = mode2.includes(wedge.dataset.note) ? 1 : 0.5
        wedge.style.fill = mode2.includes(wedge.dataset.note) ? wedge.dataset.colour : 'black'
    })

}


function orderFifths(){
    return [0,1,2,3,4,5,6,7,8,9,10,11,12].forEach(x=>console.log(Math.floor(x*7)%12))
}

// modes: rotate
// [0,1,2,3,4,5,6,7,8,9,10,11].map(x=>Math.floor(x*7)%12)

