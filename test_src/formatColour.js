function formatColour(array, offset = 0){
    let {always_on} = colours;
    offset = parseInt(offset)+1;
    let output = array.map((x,i)=>`${i+offset}:${x}`).join('\n');
    if(always_on){
        output += `\n${offset - 1}:255\n`
    }
    return output;
}

export default formatColour;