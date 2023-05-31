function processQueue(){
    let {queue, arduino} = window.colours;
    if(queue.length){
        // arduino.writer.write(queue.shift());
        arduino.writeQueue(queue);
        queue = [];
    }
}
export default processQueue;