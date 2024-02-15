/**
 * @name processQueue
 * @description This function processes the queue of colours to be sent to the arduino
 */

function processQueue(){
    let {queue, arduino} = window.colours;
    if(queue.length){
        // arduino.writer.write(queue.shift());
        arduino.writeQueue(queue);
        queue = [];
    }
}
export default processQueue;