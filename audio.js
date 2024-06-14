const drumSynth = new Tone.MembraneSynth().toDestination();
const restClick = new Tone.NoiseSynth({ volume: -20 }).toDestination();
let isPlaying = false;
let loop;

const playButton = document.getElementById("play");
const stopButton = document.getElementById("stop");

playButton.addEventListener("click", () => {
    if (!isPlaying) {
        Tone.start();
        playNotes();
        Tone.Transport.start();
        isPlaying = true;
    }
});

stopButton.addEventListener("click", () => {
    if (isPlaying) {
        stopPlaying();
        isPlaying = false;
    }
});

function playNotes() {
    let index = 0;
    loop = new Tone.Loop(time => {
        const note = notes[index];
        const duration = note.getDuration() === 'w' ? '1n' :
                         note.getDuration() === 'h' ? '2n' :
                         note.getDuration() === 'q' ? '4n' :
                         note.getDuration() === '8' ? '8n' :
                         note.getDuration() === '16' ? '16n' :
                         note.getDuration() === 'qd' ? '4n.' :
                         '4n';

        const isRest = note.getDuration().includes('r');
        if (isRest) {
            restClick.triggerAttackRelease('8n', time);
        } else {
            drumSynth.triggerAttackRelease("A4", duration, time);
        }

        index = (index + 1) % notes.length;
    }, "4n");

    loop.start(0);
    Tone.Transport.start();
}


function playTripletFeel() {
    let index = 0;
    loop = new Tone.Loop(time => {
        const note = notes[index];
        const duration = '8t';

        const isRest = note.getDuration().includes('r');
        if (isRest) {
            restClick.triggerAttackRelease('8t', time);
        } else {
            drumSynth.triggerAttackRelease("A4", duration, time);
        }

        index = (index + 1) % notes.length;
    }, "8t");

    loop.start(0);
    Tone.Transport.start();
}

const tripletButton = document.getElementById("triplet");
tripletButton.addEventListener("click", () => {
    if (!isPlaying) {
        Tone.start();
        playTripletFeel();
        isPlaying = true;
    } else {
        stopPlaying();
        isPlaying = false;
    }
});

Tone.Transport.bpm.value = 100;

function stopPlaying() {
    Tone.Transport.stop();
    Tone.Transport.cancel(0);
}
