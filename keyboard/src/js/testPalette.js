/**
 * Clear the test pallette area and clone the current preset icon
 */

const createTestPalette = function(){
    let container = document.querySelector('#colour_palette');
    container.innerHTML = '';
    let clone = document.querySelector(`#preset_${1}`).cloneNode('true');
    container.appendChild(clone);
    clone.id = 'test_palette'
    clone.querySelector('.over').style.display='none';
    clone.setAttribute('width', '400px')
}



const orderByFifths = function(fifths = true){
    let group = document.querySelector('#colour_palette svg .sectors')
    var cycleOfFifths = [0,1,2,3,4,5,6,7,8,9,10,11].map(x=>Math.floor(x*7)%12);
    Array.from(group.children).forEach((wedge,i)=>{
        console.log(wedge)
        wedge.setAttribute('transform',`rotate(${fifths ? cycleOfFifths[i]*30 : i*30})`);
        wedge.addEventListener('click',function(){
            console.log(this.style.fill);
        })
    })

    // let templateWedge = document.querySelector('#test_sector_0');
    // console.log(templateWedge)
    // let container = document.querySelector('#preset_0 .sectors');
    // for(let i=0;i<11;i++){
    //     let newWedge = templateWedge.cloneNode(true);
    //     container.appendChild(newWedge)
    //     newWedge.setAttribute('data-color',noteColours.daze.names[i+1]);
    //     newWedge.style.fill = noteColours.daze.names[i+1];
    //     newWedge.setAttribute('fill',noteColours.daze.names[i+1]);
    //     newWedge.id=newWedge.id.replace('_0',`_${i+1}`)
    //     newWedge.setAttribute('transform-origin',`center center`)
    //     newWedge.setAttribute('transform',`rotate(${(cycleOfFifths[i]+1)*30})`)
    //         console.log(i, newWedge)
    
    // }
}

