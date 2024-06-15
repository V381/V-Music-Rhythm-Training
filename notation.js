const VF = Vex.Flow;
const div = document.getElementById("notation");
const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
renderer.resize(500, 200);
const context = renderer.getContext();
context.setFont("Arial", 10, "").setBackgroundFillStyle("#ffffff");

const stave = new VF.Stave(10, 40, 400);
stave.addClef("treble").addTimeSignature("4/4");
stave.setContext(context).draw();

let timeSignature = "4/4"; // Global

let notesArray = [
    { keys: ["c/4"], duration: "qd" },
    { keys: ["d/4"], duration: "8" },
    { keys: ["e/4"], duration: "qd" },
    { keys: ["f/4"], duration: "8" }
];

let notes = notesArray.map(note => new VF.StaveNote({
    keys: note.keys,
    duration: note.duration
}));

notes[0].addDotToAll();
notes[2].addDotToAll();

let beams = [];
let tuplets = [];
let voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
voice.addTickables(notes);
new VF.Formatter().joinVoices([voice]).format([voice], 400);
voice.draw(context, stave);
beams.forEach(beam => beam.setContext(context).draw());
tuplets.forEach(tuplet => tuplet.setContext(context).draw());

const explanationDiv = document.getElementById("explanation");
let explanationsArray = [
"Welcome! Here you will learn how music rhythms and the music staff work. Please click on the hamburger icon on the left to start learning!"
];
let currentStep = 0;
updateExplanation();

const detailedExplanationDiv = document.getElementById("detailed-explanation");
detailedExplanationDiv.innerHTML = `
    <p><strong>4/4 Time Signature:</strong> This means there are 4 beats in each measure and a quarter note gets one beat.</p>
    <p><strong>2/4 Time Signature:</strong> This means there are 2 beats in each measure and a quarter note gets one beat.</p>
    <p><strong>3/4 Time Signature:</strong> This means there are 3 beats in each measure and a quarter note gets one beat.</p>
    <p><strong>7/8 Time Signature:</strong> This means there are 7 beats in each measure and an eighth note gets one beat.</p>
    <p><strong>Treble Clef:</strong> This symbol indicates the pitch of written notes. It is used for higher-pitched instruments and voices. The curl of the clef circles around the G line on the staff.</p>
    <p><strong>Bass Clef:</strong> This symbol indicates the pitch of written notes. It is used for lower-pitched instruments and voices. The two dots of the clef surround the F line on the staff.</p>
    <p><strong>Whole Note:</strong> A whole note lasts for 4 beats in a 4/4 measure. It is represented by an open note head without a stem.</p>
    <p><strong>Half Note:</strong> A half note lasts for 2 beats in a 4/4 measure. It is represented by an open note head with a stem.</p>
    <p><strong>Quarter Note:</strong> A quarter note lasts for 1 beat in a 4/4 measure. It is represented by a filled-in note head with a stem.</p>
    <p><strong>Eighth Note:</strong> An eighth note lasts for half a beat in a 4/4 measure. It is represented by a filled-in note head with a stem and one flag.</p>
    <p><strong>Sixteenth Note:</strong> A sixteenth note lasts for a quarter of a beat in a 4/4 measure. It is represented by a filled-in note head with a stem and two flags.</p>
    <p><strong>Dotted Note:</strong> A dotted note increases the duration of the note by half of its original value. For example, a dotted quarter note lasts for 1.5 beats.</p>
    <p><strong>Rests:</strong> Rests indicate silences in music. Each rest symbol corresponds to a specific note duration, such as whole rest, half rest, quarter rest, etc.</p>
    <p><strong>Key Signatures:</strong> Key signatures indicate the key of the piece of music by specifying which notes are sharp or flat throughout the piece.</p>
    <p><strong>Bar Lines:</strong> The bar lines divide the staff into measures, making it easier to read and follow the music.</p>
`;


function loadExample(example) {
    const data = exampleData[example];
    if (!data) {
        console.error(`Example ${example} not found in exampleData.`);
        return;
    }
    
    timeSignature = data.timeSignature;
    notesArray = data.notesArray;
    explanationsArray = data.explanationsArray;
    notes = notesArray.map(note => new VF.StaveNote({
        keys: note.keys,
        duration: note.duration
    }));
    
    if (data.addDots) {
        data.addDots.forEach(index => notes[index].addDotToAll());
    }

    beams = (data.beams || []).map(group => new VF.Beam(notes.slice(group[0], group[1])));
    tuplets = (data.tuplets || []).map(group => new VF.Tuplet(notes.slice(group[0], group[1])));

    renderNotes();
    updateExplanation();
}

function renderNotes() {
    context.clear();
    stave.setTimeSignature(timeSignature).setContext(context).draw();
    
    const [numBeats, beatValue] = timeSignature.split('/').map(Number);
    const voice = new VF.Voice({ num_beats: numBeats, beat_value: beatValue });
    voice.addTickables(notes);
    
    new VF.Formatter().joinVoices([voice]).format([voice], 400);
    
    notes.forEach(note => note.setContext(context).setStave(stave));
    
    voice.draw(context, stave);
    
    beams.forEach(beam => beam.setContext(context).draw());
    tuplets.forEach(tuplet => tuplet.setContext(context).draw());
}
function playExample() {
    console.log('Playing example');
    const now = Tone.now();
    let totalDuration = 0;
    notesArray.forEach(note => {
        const duration = note.duration === 'w' ? '1n' :
                         note.duration === 'h' ? '2n' :
                         note.duration === 'q' ? '4n' :
                         note.duration === '8' ? '8n' :
                         note.duration === '16' ? '16n' :
                         note.duration === 'qd' ? '4n.' :
                         '4n'; 
        totalDuration += Tone.Time(duration).toSeconds();
    });

    console.log('Total duration:', totalDuration);

    let currentTime = now;
    notesArray.forEach((note, i) => {
        const duration = note.duration === 'w' ? '1n' :
                         note.duration === 'h' ? '2n' :
                         note.duration === 'q' ? '4n' :
                         note.duration === '8' ? '8n' :
                         note.duration === '16' ? '16n' :
                         note.duration === 'qd' ? '4n.' :
                         '4n'; 

        const isRest = note.duration.includes('r');
        if (isRest) {
            console.log('Playing rest at time:', currentTime);
            restClick.triggerAttackRelease('8n', currentTime);
        } else {
            console.log('Playing note:', note.keys, 'at time:', currentTime);
            drumSynth.triggerAttackRelease("A4", duration, currentTime);
        }

        setTimeout(() => {
            beatIndex = i % bars;
            drawEqualizer();
        }, (currentTime - now) * 1000);

        currentTime += Tone.Time(duration).toSeconds();
    });

    startEqualizer();

    console.log('Setting timeout for:', totalDuration * 1000, 'milliseconds');
    timeoutId = setTimeout(() => {
        enableListItems();
        stopEqualizer();
    }, totalDuration * 1000);
}

function stopPlaying() {
    console.log('Stopping playback');
    Tone.Transport.stop();
    Tone.Transport.cancel(0);
    enableListItems();  

    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
        console.log('Cleared timeout');
    }

    stopEqualizer();
}

function setExampleData(data) {
    timeSignature = data.timeSignature;
    notesArray = data.notesArray;
    explanationsArray = data.explanationsArray;
    notes = notesArray.map(note => new VF.StaveNote({
        keys: note.keys,
        duration: note.duration
    }));
    
    if (data.addDots) {
        data.addDots.forEach(index => notes[index].addDotToAll());
    }

    beams = (data.beams || []).map(group => new VF.Beam(notes.slice(group[0], group[1])));
    tuplets = (data.tuplets || []).map(group => new VF.Tuplet(notes.slice(group[0], group[1])));
}

function updateExplanation() {
    const explanationDiv = document.getElementById("explanation");
    if (!explanationDiv) {
        console.error("Explanation div not found.");
        return;
    }

    explanationDiv.innerHTML = explanationsArray.map(explanation => `<p>${explanation}</p>`).join('');
}
