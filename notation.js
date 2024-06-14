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
    "We start with a simple 4/4 time signature and a single note 'C' on the first beat."
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
    beams = []; 
    tuplets = []; 

    switch (example) {
        case "whole-note":
            notesArray = [
                { keys: ["a/4"], duration: "w" }
            ];
            explanationsArray = [
                "A whole note (A4) lasts for 4 beats in a 4/4 measure."
            ];
            timeSignature = "4/4";
            break;
        case "half-note":
            notesArray = [
                { keys: ["a/4"], duration: "h" },
                { keys: ["d/4"], duration: "h" }
            ];
            explanationsArray = [
                "A half note lasts for 2 beats in a 4/4 measure."
            ];
            timeSignature = "4/4"; 
            break;
        case "quarter-note":
            notesArray = [
                { keys: ["a/4"], duration: "q" },
                { keys: ["d/4"], duration: "q" },
                { keys: ["e/4"], duration: "q" },
                { keys: ["f/4"], duration: "q" }
            ];
            explanationsArray = [
                "A quarter note lasts for 1 beat in a 4/4 measure."
            ];
            timeSignature = "4/4"; 
            break;
        case "eighth-note":
            notesArray = [
                { keys: ["c/4"], duration: "8" },
                { keys: ["d/4"], duration: "8" },
                { keys: ["e/4"], duration: "8" },
                { keys: ["f/4"], duration: "8" },
                { keys: ["g/4"], duration: "8" },
                { keys: ["a/4"], duration: "8" },
                { keys: ["b/4"], duration: "8" },
                { keys: ["c/5"], duration: "8" }
            ];
            explanationsArray = [
                "Each beat is split into single eighth notes."
            ];
            timeSignature = "4/4"; 
            break;
        case "basic":
            notesArray = [
                { keys: ["c/4"], duration: "q" },
                { keys: ["d/4"], duration: "q" },
                { keys: ["e/4"], duration: "q" },
                { keys: ["f/4"], duration: "q" }
            ];
            explanationsArray = [
                "4/4 Basic explanation: A simple 4/4 time signature with quarter notes C, D, E, and F."
            ];
            timeSignature = "4/4";
            break;
        case "pauses":
            notesArray = [
                { keys: ["c/4"], duration: "q" },
                { keys: ["b/4"], duration: "qr" },
                { keys: ["e/4"], duration: "q" },
                { keys: ["b/4"], duration: "qr" }
            ];
            explanationsArray = [
                "4/4 with pauses: Adding quarter note rests in between notes C and E."
            ];
            timeSignature = "4/4";
            break;
        case "eighth-notes":
            notesArray = [
                { keys: ["c/4"], duration: "8" },
                { keys: ["d/4"], duration: "8" },
                { keys: ["e/4"], duration: "8" },
                { keys: ["f/4"], duration: "8" },
                { keys: ["g/4"], duration: "8" },
                { keys: ["a/4"], duration: "8" },
                { keys: ["b/4"], duration: "8" },
                { keys: ["c/5"], duration: "8" }
            ];
            explanationsArray = [
                "4/4 with eighth notes: Each beat is split into two eighth notes."
            ];
            notes = notesArray.map(note => new VF.StaveNote({
                keys: note.keys,
                duration: note.duration
            }));
            beams = [
                new VF.Beam(notes.slice(0, 2)),
                new VF.Beam(notes.slice(2, 4)),
                new VF.Beam(notes.slice(4, 6)),
                new VF.Beam(notes.slice(6, 8))
            ];
            timeSignature = "4/4"; 
            break;
        case "sixteenth-notes":
            notesArray = [
                { keys: ["c/4"], duration: "16" },
                { keys: ["d/4"], duration: "16" },
                { keys: ["e/4"], duration: "16" },
                { keys: ["f/4"], duration: "16" },
                { keys: ["g/4"], duration: "16" },
                { keys: ["a/4"], duration: "16" },
                { keys: ["b/4"], duration: "16" },
                { keys: ["c/5"], duration: "16" },
                { keys: ["d/5"], duration: "16" },
                { keys: ["e/5"], duration: "16" },
                { keys: ["f/5"], duration: "16" },
                { keys: ["g/5"], duration: "16" },
                { keys: ["a/5"], duration: "16" },
                { keys: ["b/5"], duration: "16" },
                { keys: ["c/6"], duration: "16" },
                { keys: ["d/6"], duration: "16" }
            ];
            explanationsArray = [
                "4/4 with sixteenth notes: Each beat is split into four sixteenth notes."
            ];
            notes = notesArray.map(note => new VF.StaveNote({
                keys: note.keys,
                duration: note.duration
            }));
            beams = [
                new VF.Beam(notes.slice(0, 4)),
                new VF.Beam(notes.slice(4, 8)),
                new VF.Beam(notes.slice(8, 12)),
                new VF.Beam(notes.slice(12, 16))
            ];
            timeSignature = "4/4"; 
            break;
        case "triplets":
            notesArray = [
                { keys: ["c/4"], duration: "8" },
                { keys: ["d/4"], duration: "8" },
                { keys: ["e/4"], duration: "8" },
                { keys: ["f/4"], duration: "8" },
                { keys: ["g/4"], duration: "8" },
                { keys: ["a/4"], duration: "8" },
                { keys: ["b/4"], duration: "8" },
                { keys: ["c/5"], duration: "8" },
                { keys: ["a/4"], duration: "8" },
                { keys: ["b/4"], duration: "8" },
                { keys: ["c/5"], duration: "8" },
                { keys: ["d/5"], duration: "8" }
            ];
            explanationsArray = [
                "4/4 with triplets: Each beat is split into three eighth note triplets."
            ];
            notes = notesArray.map(note => new VF.StaveNote({
                keys: note.keys,
                duration: note.duration
            }));
            const tripletGroup1 = notes.slice(0, 3);
            const tripletGroup2 = notes.slice(3, 6);
            const tripletGroup3 = notes.slice(6, 9);
            const tripletGroup4 = notes.slice(9, 12);
            beams = [new VF.Beam(tripletGroup1), new VF.Beam(tripletGroup2), new VF.Beam(tripletGroup3), new VF.Beam(tripletGroup4)];
            tuplets = [new VF.Tuplet(tripletGroup1), new VF.Tuplet(tripletGroup2), new VF.Tuplet(tripletGroup3), new VF.Tuplet(tripletGroup4)];
            timeSignature = "4/4"; 
            break;
        case "dotted-notes":
            notesArray = [
                { keys: ["c/4"], duration: "qd" },
                { keys: ["d/4"], duration: "8" },
                { keys: ["e/4"], duration: "qd" },
                { keys: ["f/4"], duration: "8" }
            ];
            explanationsArray = [
                "4/4 with dotted notes: A dotted quarter note lasts for 1.5 beats, followed by an eighth note."
            ];
            notes = notesArray.map(note => new VF.StaveNote({
                keys: note.keys,
                duration: note.duration
            }));
            notes[0].addDotToAll();
            notes[2].addDotToAll();
            timeSignature = "4/4"; 
            break;
        case "three-four":
            timeSignature = "3/4"; 
            notesArray = [
                { keys: ["c/4"], duration: "q" },
                { keys: ["d/4"], duration: "q" },
                { keys: ["e/4"], duration: "q" }
            ];
            explanationsArray = [
                "3/4 Time Signature: There are 3 beats in each measure and a quarter note gets one beat."
            ];
            break;
        case "two-four":
            timeSignature = "2/4"; 
            notesArray = [
                { keys: ["c/4"], duration: "q" },
                { keys: ["d/4"], duration: "q" }
            ];
            explanationsArray = [
                "2/4 Time Signature: There are 2 beats in each measure and a quarter note gets one beat."
            ];
            break;
        case "seven-eight":
            timeSignature = "7/8"; 
            notesArray = [
                { keys: ["c/4"], duration: "8" },
                { keys: ["d/4"], duration: "8" },
                { keys: ["e/4"], duration: "8" },
                { keys: ["f/4"], duration: "8" },
                { keys: ["g/4"], duration: "8" },
                { keys: ["a/4"], duration: "8" },
                { keys: ["b/4"], duration: "8" }
            ];
            explanationsArray = [
                "7/8 Time Signature: There are 7 beats in each measure and an eighth note gets one beat."
            ];
            notes = notesArray.map(note => new VF.StaveNote({
                keys: note.keys,
                duration: note.duration
            }));
            break;
        case "sixteenth-note-groups":
            timeSignature = "4/4"; 
            notesArray = [
                { keys: ["c/4"], duration: "16" },
                { keys: ["d/4"], duration: "16" },
                { keys: ["e/4"], duration: "16" },
                { keys: ["f/4"], duration: "16" }
            ];
            explanationsArray = [
                "4/4 with sixteenth notes in a group."
            ];
            notes = notesArray.map(note => new VF.StaveNote({
                keys: note.keys,
                duration: note.duration
            }));
            beams = [
                new VF.Beam(notes.slice(0, 4))
            ];
            break;
        case "sixteenth-note-pairs":
                timeSignature = "4/4"; 
                notesArray = [
                    { keys: ["c/4"], duration: "16" },
                    { keys: ["d/4"], duration: "16" },
                    { keys: ["e/4"], duration: "8" },
                    { keys: ["f/4"], duration: "16" },
                    { keys: ["g/4"], duration: "16" },
                    { keys: ["a/4"], duration: "8" },
                    { keys: ["b/4"], duration: "16" },
                    { keys: ["c/5"], duration: "16" },
                    { keys: ["d/5"], duration: "8" },
                    { keys: ["e/5"], duration: "16" },
                    { keys: ["f/5"], duration: "16" },
                    { keys: ["g/5"], duration: "8" }
                ];
                explanationsArray = [
                    "4/4 with sixteenth notes grouped with an eighth note."
                ];
                notes = notesArray.map(note => new VF.StaveNote({
                    keys: note.keys,
                    duration: note.duration
                }));
                beams = [
                    new VF.Beam(notes.slice(0, 3)),
                    new VF.Beam(notes.slice(3, 6)),
                    new VF.Beam(notes.slice(6, 9)),
                    new VF.Beam(notes.slice(9, 12))
                ];
                break;
            case "eighth-sixteenth-pairs":
                    timeSignature = "4/4"; 
                    notesArray = [
                        { keys: ["c/4"], duration: "8" },
                        { keys: ["d/4"], duration: "16" },
                        { keys: ["e/4"], duration: "16" },
                        { keys: ["f/4"], duration: "8" },
                        { keys: ["g/4"], duration: "16" },
                        { keys: ["a/4"], duration: "16" },
                        { keys: ["b/4"], duration: "8" },
                        { keys: ["c/5"], duration: "16" },
                        { keys: ["d/5"], duration: "16" },
                        { keys: ["b/4"], duration: "8" },
                        { keys: ["c/5"], duration: "16" },
                        { keys: ["d/5"], duration: "16" }
                    ];
                    explanationsArray = [
                        "4/4 with eighth and sixteenth note pairs: Each group consists of one eighth note followed by two sixteenth notes."
                    ];
                    notes = notesArray.map(note => new VF.StaveNote({
                        keys: note.keys,
                        duration: note.duration
                    }));
                    beams = [
                        new VF.Beam(notes.slice(0, 3)),
                        new VF.Beam(notes.slice(3, 6)),
                        new VF.Beam(notes.slice(6, 9)),
                        new VF.Beam(notes.slice(9, 12))
                    ];
                    break;
            case "dotted-sixteenth":
                timeSignature = "4/4"; 
                notesArray = [
                    { keys: ["c/4"], duration: "8d" },
                    { keys: ["d/4"], duration: "16" },
                    { keys: ["e/4"], duration: "8d" },
                    { keys: ["f/4"], duration: "16" },
                    { keys: ["g/4"], duration: "8d" },
                    { keys: ["a/4"], duration: "16" },
                    { keys: ["b/4"], duration: "8d" },
                    { keys: ["c/5"], duration: "16" }
                ];
                explanationsArray = [
                    "4/4 with dotted eighth note followed by a sixteenth note."
                ];
                notes = notesArray.map(note => new VF.StaveNote({
                    keys: note.keys,
                    duration: note.duration
                }));
                notes.forEach(note => {
                    if (note.getDuration() === "8d") {
                        note.addDotToAll();
                    }
                });
                beams = [
                    new VF.Beam(notes.slice(0, 2)),
                    new VF.Beam(notes.slice(2, 4)),
                    new VF.Beam(notes.slice(4, 6)),
                    new VF.Beam(notes.slice(6, 8))
                ];
                break;
            case "sixteenth-dotted-pairs":
            timeSignature = "4/4"; 
            notesArray = [
                { keys: ["c/4"], duration: "16" },
                { keys: ["d/4"], duration: "8d" },
                { keys: ["e/4"], duration: "16" },
                { keys: ["f/4"], duration: "8d" },
                { keys: ["g/4"], duration: "16" },
                { keys: ["a/4"], duration: "8d" },
                { keys: ["b/4"], duration: "16" },
                { keys: ["c/5"], duration: "8d" }
            ]
            explanationsArray = [
                "4/4 with sixteenth notes followed by dotted eighth notes."
            ];
            notes = notesArray.map(note => new VF.StaveNote({
                keys: note.keys,
                duration: note.duration
            }));
            notes[1].addDotToAll();
            notes[3].addDotToAll();
            notes[5].addDotToAll();
            notes[7].addDotToAll();
            beams = [
                new VF.Beam(notes.slice(0, 2)),
                new VF.Beam(notes.slice(2, 4)),
                new VF.Beam(notes.slice(4, 6)),
                new VF.Beam(notes.slice(6, 8))
            ];
            break;
            case "sixteenth-eighth-sixteenth-triplet":
                timeSignature = "4/4";
                notesArray = [
                    { keys: ["c/4"], duration: "16" },
                    { keys: ["d/4"], duration: "8" },
                    { keys: ["e/4"], duration: "16" },
                    { keys: ["f/4"], duration: "16" },
                    { keys: ["g/4"], duration: "8" },
                    { keys: ["a/4"], duration: "16" },
                    { keys: ["b/4"], duration: "16" },
                    { keys: ["c/5"], duration: "8" },
                    { keys: ["d/5"], duration: "16" },
                    { keys: ["e/5"], duration: "16" },
                    { keys: ["f/5"], duration: "8" },
                    { keys: ["g/5"], duration: "16" },
                ];
                explanationsArray = [
                    "4/4 with triplets: Each triplet contains one sixteenth note, one eighth note, and another sixteenth note."
                ];
                notes = notesArray.map(note => new VF.StaveNote({
                    keys: note.keys,
                    duration: note.duration
                }));
                const triplet1 = notes.slice(0, 3);
                const triplet2 = notes.slice(3, 6);
                const triplet3 = notes.slice(6, 9);
                const triplet4 = notes.slice(9, 12);
                beams = [new VF.Beam(triplet1), new VF.Beam(triplet2), new VF.Beam(triplet3), new VF.Beam(triplet4)];
                break;
                case "three-two":
                    timeSignature = "3/2"; 
                    notesArray = [
                        { keys: ["c/4"], duration: "h" },
                        { keys: ["d/4"], duration: "h" },
                        { keys: ["e/4"], duration: "h" }
                    ];
                    explanationsArray = [
                        "3/2 Time Signature: There are 3 beats in each measure and a half note gets one beat."
                    ];
                    break;
                case "three-eight":
                    timeSignature = "3/8"; 
                    notesArray = [
                        { keys: ["c/4"], duration: "8" },
                        { keys: ["d/4"], duration: "8" },
                        { keys: ["e/4"], duration: "8" }
                    ];
                    explanationsArray = [
                        "3/8 Time Signature: There are 3 beats in each measure and an eighth note gets one beat."
                    ];
                    break;
                case "three-sixteenth":
                    timeSignature = "3/16"; 
                    notesArray = [
                        { keys: ["c/4"], duration: "16" },
                        { keys: ["d/4"], duration: "16" },
                        { keys: ["e/4"], duration: "16" }
                    ];
                    explanationsArray = [
                        "3/16 Time Signature: There are 3 beats in each measure and a sixteenth note gets one beat."
                    ];
                    break;
                    case "three-two":
            timeSignature = "3/2"; 
            notesArray = [
                { keys: ["c/4"], duration: "h" },
                { keys: ["d/4"], duration: "h" },
                { keys: ["e/4"], duration: "h" }
            ];
            explanationsArray = [
                "3/2 Time Signature: There are 3 beats in each measure and a half note gets one beat."
            ];
            break;
        case "three-eight":
            timeSignature = "3/8"; 
            notesArray = [
                { keys: ["c/4"], duration: "8" },
                { keys: ["d/4"], duration: "8" },
                { keys: ["e/4"], duration: "8" }
            ];
            explanationsArray = [
                "3/8 Time Signature: There are 3 beats in each measure and an eighth note gets one beat."
            ];
            break;
        case "three-sixteenth":
            timeSignature = "3/16";
            notesArray = [
                { keys: ["c/4"], duration: "16" },
                { keys: ["d/4"], duration: "16" },
                { keys: ["e/4"], duration: "16" }
            ];
            explanationsArray = [
                "3/16 Time Signature: There are 3 beats in each measure and a sixteenth note gets one beat."
            ];
            break;
        case "seven-sixteenth":
            timeSignature = "7/16"; 
            notesArray = [
                { keys: ["c/4"], duration: "16" },
                { keys: ["d/4"], duration: "16" },
                { keys: ["e/4"], duration: "16" },
                { keys: ["f/4"], duration: "16" },
                { keys: ["g/4"], duration: "16" },
                { keys: ["a/4"], duration: "16" },
                { keys: ["b/4"], duration: "16" }
            ];
            explanationsArray = [
                "7/16 Time Signature: There are 7 beats in each measure and a sixteenth note gets one beat."
            ];
            break;
        case "eleven-sixteenth":
            timeSignature = "11/16";
            notesArray = [
                { keys: ["c/4"], duration: "16" },
                { keys: ["d/4"], duration: "16" },
                { keys: ["e/4"], duration: "16" },
                { keys: ["f/4"], duration: "16" },
                { keys: ["g/4"], duration: "16" },
                { keys: ["a/4"], duration: "16" },
                { keys: ["b/4"], duration: "16" },
                { keys: ["c/5"], duration: "16" },
                { keys: ["d/5"], duration: "16" },
                { keys: ["e/5"], duration: "16" },
                { keys: ["f/5"], duration: "16" }
            ];
            explanationsArray = [
                "11/16 Time Signature: There are 11 beats in each measure and a sixteenth note gets one beat."
            ];
            break;
        case "eleven-eight":
            timeSignature = "11/8"; 
            notesArray = [
                { keys: ["c/4"], duration: "8" },
                { keys: ["d/4"], duration: "8" },
                { keys: ["e/4"], duration: "8" },
                { keys: ["f/4"], duration: "8" },
                { keys: ["g/4"], duration: "8" },
                { keys: ["a/4"], duration: "8" },
                { keys: ["b/4"], duration: "8" },
                { keys: ["c/5"], duration: "8" },
                { keys: ["d/5"], duration: "8" },
                { keys: ["e/5"], duration: "8" },
                { keys: ["f/5"], duration: "8" }
            ];
            explanationsArray = [
                "11/8 Time Signature: There are 11 beats in each measure and an eighth note gets one beat."
            ];
            break;
        case "blues-shuffle":
            notesArray = [
                { keys: ["c/4"], duration: "8d" },
                { keys: ["e/4"], duration: "16" },
                { keys: ["g/4"], duration: "8d" },
                { keys: ["b/4"], duration: "16" },
                { keys: ["c/5"], duration: "8d" },
                { keys: ["d/5"], duration: "16" },
                { keys: ["e/5"], duration: "8d" },
                { keys: ["f/5"], duration: "16" }
            ];
            explanationsArray = [
                "Blues Shuffle: A shuffle rhythm commonly found in blues music, combining a swung eighth note pattern."
            ];
            timeSignature = "4/4"; 
            notes = notesArray.map(note => new VF.StaveNote({
                keys: note.keys,
                duration: note.duration
            }));
            beams = [
                new VF.Beam(notes.slice(0, 2)),
                new VF.Beam(notes.slice(2, 4)),
                new VF.Beam(notes.slice(4, 6)),
                new VF.Beam(notes.slice(6, 8))
            ];
            break;
        case "waltz":
            timeSignature = "3/4"; 
            notesArray = [
                { keys: ["c/4"], duration: "q" },
                { keys: ["d/4"], duration: "q" },
                { keys: ["e/4"], duration: "q" }
            ];
            explanationsArray = [
                "Waltz Rhythm: A 3/4 time signature with quarter notes C, D, and E."
            ];
            notes = notesArray.map(note => new VF.StaveNote({
                keys: note.keys,
                duration: note.duration
            }));
            break;
        case "straight-shuffle":
                timeSignature = "4/4";
                notesArray = [
                    { keys: ["c/4"], duration: "8" },
                    { keys: ["d/4"], duration: "16" },
                    { keys: ["d/4"], duration: "16" },
                    { keys: ["e/4"], duration: "8" },
                    { keys: ["f/4"], duration: "16" },
                    { keys: ["f/4"], duration: "16" },
                    { keys: ["g/4"], duration: "8" },
                    { keys: ["a/4"], duration: "16" },
                    { keys: ["a/4"], duration: "16" },
                    { keys: ["b/4"], duration: "8" },
                    { keys: ["c/5"], duration: "16" },
                    { keys: ["c/5"], duration: "16" }
                ];
                explanationsArray = [
                    "Straight Shuffle: Each beat is split into an eighth note followed by two sixteenth notes."
                ];
                notes = notesArray.map(note => new VF.StaveNote({
                    keys: note.keys,
                    duration: note.duration
                }));
                beams = [
                    new VF.Beam(notes.slice(0, 3)),
                    new VF.Beam(notes.slice(3, 6)),
                    new VF.Beam(notes.slice(6, 9)),
                    new VF.Beam(notes.slice(9, 12))
                ];
        default:
            break;
    }

    stave.setTimeSignature(timeSignature);

    notes = notesArray.map(note => new VF.StaveNote({
        keys: note.keys,
        duration: note.duration
    }));

    switch (example) {
        case "eighth-notes":
            beams = [
                new VF.Beam(notes.slice(0, 2)),
                new VF.Beam(notes.slice(2, 4)),
                new VF.Beam(notes.slice(4, 6)),
                new VF.Beam(notes.slice(6, 8))
            ];
            break;
        case "sixteenth-notes":
            beams = [
                new VF.Beam(notes.slice(0, 4)),
                new VF.Beam(notes.slice(4, 8)),
                new VF.Beam(notes.slice(8, 12)),
                new VF.Beam(notes.slice(12, 16))
            ];
            break;
        case "triplets":
            const tripletGroup1 = notes.slice(0, 3);
            const tripletGroup2 = notes.slice(3, 6);
            const tripletGroup3 = notes.slice(6, 9);
            const tripletGroup4 = notes.slice(9, 12);
            beams = [new VF.Beam(tripletGroup1), new VF.Beam(tripletGroup2), new VF.Beam(tripletGroup3), new VF.Beam(tripletGroup4)];
            tuplets = [new VF.Tuplet(tripletGroup1), new VF.Tuplet(tripletGroup2), new VF.Tuplet(tripletGroup3), new VF.Tuplet(tripletGroup4)];
            break;
        case "dotted-notes":
            notes[0].addDotToAll();
            notes[2].addDotToAll();
            break;
        case "sixteenth-note-pairs":
            beams = [
                new VF.Beam(notes.slice(0, 3)),
                new VF.Beam(notes.slice(3, 6)),
                new VF.Beam(notes.slice(6, 9)),
                new VF.Beam(notes.slice(9, 12))
            ];
            break;
        case "eighth-sixteenth-pairs":
            beams = [
                new VF.Beam(notes.slice(0, 3)),
                new VF.Beam(notes.slice(3, 6)),
                new VF.Beam(notes.slice(6, 9)),
                new VF.Beam(notes.slice(9, 12))
            ];
            break;
        case "dotted-sixteenth":
            beams = [
                new VF.Beam(notes.slice(0, 2)),
                new VF.Beam(notes.slice(2, 4)),
                new VF.Beam(notes.slice(4, 6)),
                new VF.Beam(notes.slice(6, 8))
            ];
            break;
        case "sixteenth-dotted-pairs":
            notes[1].addDotToAll();
            notes[3].addDotToAll();
            notes[5].addDotToAll();
            notes[7].addDotToAll();
            beams = [
                new VF.Beam(notes.slice(0, 2)),
                new VF.Beam(notes.slice(2, 4)),
                new VF.Beam(notes.slice(4, 6)),
                new VF.Beam(notes.slice(6, 8))
            ];
            break;
        case "sixteenth-eighth-sixteenth-triplet":
            const tripletGroupA = notes.slice(0, 3);
            const tripletGroupB = notes.slice(3, 6);
            const tripletGroupC = notes.slice(6, 9);
            const tripletGroupD = notes.slice(9, 12);
            beams = [new VF.Beam(tripletGroupA), new VF.Beam(tripletGroupB), new VF.Beam(tripletGroupC), new VF.Beam(tripletGroupD)];
            tuplets = [new VF.Tuplet(tripletGroupA), new VF.Tuplet(tripletGroupB), new VF.Tuplet(tripletGroupC), new VF.Tuplet(tripletGroupD)];
            break;
        case "blues-shuffle":
            beams = [
                new VF.Beam(notes.slice(0, 2)),
                new VF.Beam(notes.slice(2, 4)),
                new VF.Beam(notes.slice(4, 6)),
                new VF.Beam(notes.slice(6, 8))
            ];
            break;
        case "straight-shuffle":
            beams = [
                new VF.Beam(notes.slice(0, 3)),
                new VF.Beam(notes.slice(3, 6)),
                new VF.Beam(notes.slice(6, 9)),
                new VF.Beam(notes.slice(9, 12))
            ];
            break;
        default:
            break;
    }

    currentStep = 0;
    updateExplanation();
    renderNotes();
}

function renderNotes() {
    context.clear();
    stave.setContext(context).draw();
    
    const voice = new VF.Voice({ num_beats: parseInt(timeSignature.split('/')[0]), beat_value: parseInt(timeSignature.split('/')[1]) });
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
