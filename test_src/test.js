import MidiMapper from 'midi-mapper';
window.MidiMapper = MidiMapper;
window.app = {
    midi: new MidiMapper()
}

app.midi.map[0].noteRange['0,127'] = function(pitch, velocity){
    console.log(pitch, velocity);
};
app.midi.listen();