const exampleData = {
    "whole-note": {
        timeSignature: "4/4",
        notesArray: [{ keys: ["a/4"], duration: "w" }],
        explanationsArray: ["A whole note (A4) lasts for 4 beats in a 4/4 measure."]
    },
    "half-note": {
        timeSignature: "4/4",
        notesArray: [
            { keys: ["a/4"], duration: "h" },
            { keys: ["d/4"], duration: "h" }
        ],
        explanationsArray: ["A half note lasts for 2 beats in a 4/4 measure."]
    },
    "quarter-note": {
        timeSignature: "4/4",
        notesArray: [
            { keys: ["a/4"], duration: "q" },
            { keys: ["d/4"], duration: "q" },
            { keys: ["e/4"], duration: "q" },
            { keys: ["f/4"], duration: "q" }
        ],
        explanationsArray: ["A quarter note lasts for 1 beat in a 4/4 measure."]
    },
    "eighth-note": {
        timeSignature: "4/4",
        notesArray: [
            { keys: ["c/4"], duration: "8" },
            { keys: ["d/4"], duration: "8" },
            { keys: ["e/4"], duration: "8" },
            { keys: ["f/4"], duration: "8" },
            { keys: ["g/4"], duration: "8" },
            { keys: ["a/4"], duration: "8" },
            { keys: ["b/4"], duration: "8" },
            { keys: ["c/5"], duration: "8" }
        ],
        explanationsArray: ["Each beat is split into single eighth notes."],
        beams: [
            [0, 2],
            [2, 4],
            [4, 6],
            [6, 8]
        ]
    },
    "basic": {
        timeSignature: "4/4",
        notesArray: [
            { keys: ["c/4"], duration: "q" },
            { keys: ["d/4"], duration: "q" },
            { keys: ["e/4"], duration: "q" },
            { keys: ["f/4"], duration: "q" }
        ],
        explanationsArray: [
            "4/4 Basic explanation: A simple 4/4 time signature with quarter notes C, D, E, and F."
        ]
    },
    "pauses": {
        timeSignature: "4/4",
        notesArray: [
            { keys: ["c/4"], duration: "q" },
            { keys: ["b/4"], duration: "qr" },
            { keys: ["e/4"], duration: "q" },
            { keys: ["b/4"], duration: "qr" }
        ],
        explanationsArray: [
            "4/4 with pauses: Adding quarter note rests in between notes C and E."
        ]
    },
    "eighth-notes": {
        timeSignature: "4/4",
        notesArray: [
            { keys: ["c/4"], duration: "8" },
            { keys: ["d/4"], duration: "8" },
            { keys: ["e/4"], duration: "8" },
            { keys: ["f/4"], duration: "8" },
            { keys: ["g/4"], duration: "8" },
            { keys: ["a/4"], duration: "8" },
            { keys: ["b/4"], duration: "8" },
            { keys: ["c/5"], duration: "8" }
        ],
        explanationsArray: [
            "4/4 with eighth notes: Each beat is split into two eighth notes."
        ],
        beams: [
            [0, 2],
            [2, 4],
            [4, 6],
            [6, 8]
        ]
    },
    "sixteenth-notes": {
        timeSignature: "4/4",
        notesArray: [
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
        ],
        explanationsArray: ["4/4 with sixteenth notes: Each beat is split into four sixteenth notes."],
        beams: [
            [0, 4],
            [4, 8],
            [8, 12],
            [12, 16]
        ]
    },
    "triplets": {
        timeSignature: "4/4",
        notesArray: [
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
        ],
        explanationsArray: ["4/4 with triplets: Each beat is split into three eighth note triplets."],
        beams: [
            [0, 3],
            [3, 6],
            [6, 9],
            [9, 12]
        ],
        tuplets: [
            [0, 3],
            [3, 6],
            [6, 9],
            [9, 12]
        ]
    },
    "dotted-notes": {
        timeSignature: "4/4",
        notesArray: [
            { keys: ["c/4"], duration: "qd" },
            { keys: ["d/4"], duration: "8" },
            { keys: ["e/4"], duration: "qd" },
            { keys: ["f/4"], duration: "8" }
        ],
        explanationsArray: ["4/4 with dotted notes: A dotted quarter note lasts for 1.5 beats, followed by an eighth note."],
        addDots: [0, 2]
    },
    "sixteenth-note-pairs": {
        timeSignature: "4/4",
        notesArray: [
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
        ],
        explanationsArray: ["4/4 with sixteenth notes grouped with an eighth note."],
        beams: [
            [0, 3],
            [3, 6],
            [6, 9],
            [9, 12]
        ]
    },
    "eighth-sixteenth-pairs": {
        timeSignature: "4/4",
        notesArray: [
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
        ],
        explanationsArray: ["4/4 with eighth and sixteenth note pairs: Each group consists of one eighth note followed by two sixteenth notes."],
        beams: [
            [0, 3],
            [3, 6],
            [6, 9],
            [9, 12]
        ]
    },
    "dotted-sixteenth": {
        timeSignature: "4/4",
        notesArray: [
            { keys: ["c/4"], duration: "8d" },
            { keys: ["d/4"], duration: "16" },
            { keys: ["e/4"], duration: "8d" },
            { keys: ["f/4"], duration: "16" },
            { keys: ["g/4"], duration: "8d" },
            { keys: ["a/4"], duration: "16" },
            { keys: ["b/4"], duration: "8d" },
            { keys: ["c/5"], duration: "16" }
        ],
        explanationsArray: ["4/4 with dotted eighth note followed by a sixteenth note."],
        addDots: [0, 2, 4, 6],
        beams: [
            [0, 2],
            [2, 4],
            [4, 6],
            [6, 8]
        ]
    },
    "sixteenth-dotted-pairs": {
        timeSignature: "4/4",
        notesArray: [
            { keys: ["c/4"], duration: "16" },
            { keys: ["d/4"], duration: "8d" },
            { keys: ["e/4"], duration: "16" },
            { keys: ["f/4"], duration: "8d" },
            { keys: ["g/4"], duration: "16" },
            { keys: ["a/4"], duration: "8d" },
            { keys: ["b/4"], duration: "16" },
            { keys: ["c/5"], duration: "8d" }
        ],
        explanationsArray: ["4/4 with sixteenth notes followed by dotted eighth notes."],
        addDots: [1, 3, 5, 7],
        beams: [
            [0, 2],
            [2, 4],
            [4, 6],
            [6, 8]
        ]
    },
"sixteenth-eighth-sixteenth-triplet": {
        timeSignature: "4/4",
        notesArray: [
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
            { keys: ["g/5"], duration: "16" }
        ],
        explanationsArray: [
            "4/4 with triplets: Each triplet contains one sixteenth note, one eighth note, and another sixteenth note."
        ],
        beams: [
            [0, 3],
            [3, 6],
            [6, 9],
            [9, 12]
        ],
        tuplets: [
            [0, 3],
            [3, 6],
            [6, 9],
            [9, 12]
        ]
    },

    "blues-shuffle": {
        timeSignature: "4/4",
        notesArray: [
            { keys: ["c/4"], duration: "8d" },
            { keys: ["e/4"], duration: "16" },
            { keys: ["g/4"], duration: "8d" },
            { keys: ["b/4"], duration: "16" },
            { keys: ["c/5"], duration: "8d" },
            { keys: ["d/5"], duration: "16" },
            { keys: ["e/5"], duration: "8d" },
            { keys: ["f/5"], duration: "16" }
        ],
        explanationsArray: ["Blues Shuffle: A shuffle rhythm commonly found in blues music, combining a swung eighth note pattern."],
        beams: [
            [0, 2],
            [2, 4],
            [4, 6],
            [6, 8]
        ]
    },
    "three-four": {
        timeSignature: "3/4",
        notesArray: [
            { keys: ["c/4"], duration: "q" },
            { keys: ["d/4"], duration: "q" },
            { keys: ["e/4"], duration: "q" }
        ],
        explanationsArray: [
            "3/4 Time Signature: There are 3 beats in each measure and a quarter note gets one beat."
        ]
    },
    "straight-shuffle": {
        timeSignature: "4/4",
        notesArray: [
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
        ],
        explanationsArray: ["Straight Shuffle: Each beat is split into an eighth note followed by two sixteenth notes."],
        beams: [
            [0, 3],
            [3, 6],
            [6, 9],
            [9, 12]
        ]
    },
    "two-four": {
        timeSignature: "2/4",
        notesArray: [
            { keys: ["c/4"], duration: "q" },
            { keys: ["d/4"], duration: "q" }
        ],
        explanationsArray: [
            "2/4 Time Signature: There are 2 beats in each measure and a quarter note gets one beat."
        ]
    },
    "seven-eight": {
        timeSignature: "7/8",
        notesArray: [
            { keys: ["c/4"], duration: "8" },
            { keys: ["d/4"], duration: "8" },
            { keys: ["e/4"], duration: "8" },
            { keys: ["f/4"], duration: "8" },
            { keys: ["g/4"], duration: "8" },
            { keys: ["a/4"], duration: "8" },
            { keys: ["b/4"], duration: "8" }
        ],
        explanationsArray: [
            "7/8 Time Signature: There are 7 beats in each measure and an eighth note gets one beat."
        ]
    },
    "sixteenth-note-groups": {
        timeSignature: "4/4",
        notesArray: [
            { keys: ["c/4"], duration: "16" },
            { keys: ["d/4"], duration: "16" },
            { keys: ["e/4"], duration: "16" },
            { keys: ["f/4"], duration: "16" }
        ],
        explanationsArray: [
            "4/4 with sixteenth notes in a group."
        ],
        beams: [
            [0, 4]
        ]
    },
    "three-two": {
        timeSignature: "3/2",
        notesArray: [
            { keys: ["c/4"], duration: "h" },
            { keys: ["d/4"], duration: "h" },
            { keys: ["e/4"], duration: "h" }
        ],
        explanationsArray: [
            "3/2 Time Signature: There are 3 beats in each measure and a half note gets one beat."
        ]
    },
    "three-eight": {
        timeSignature: "3/8",
        notesArray: [
            { keys: ["c/4"], duration: "8" },
            { keys: ["d/4"], duration: "8" },
            { keys: ["e/4"], duration: "8" }
        ],
        explanationsArray: [
            "3/8 Time Signature: There are 3 beats in each measure and an eighth note gets one beat."
        ]
    },
    "three-sixteenth": {
        timeSignature: "3/16",
        notesArray: [
            { keys: ["c/4"], duration: "16" },
            { keys: ["d/4"], duration: "16" },
            { keys: ["e/4"], duration: "16" }
        ],
        explanationsArray: [
            "3/16 Time Signature: There are 3 beats in each measure and a sixteenth note gets one beat."
        ]
    },
    "seven-sixteenth": {
        timeSignature: "7/16",
        notesArray: [
            { keys: ["c/4"], duration: "16" },
            { keys: ["d/4"], duration: "16" },
            { keys: ["e/4"], duration: "16" },
            { keys: ["f/4"], duration: "16" },
            { keys: ["g/4"], duration: "16" },
            { keys: ["a/4"], duration: "16" },
            { keys: ["b/4"], duration: "16" }
        ],
        explanationsArray: [
            "7/16 Time Signature: There are 7 beats in each measure and a sixteenth note gets one beat."
        ]
    },
    "eleven-sixteenth": {
        timeSignature: "11/16",
        notesArray: [
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
        ],
        explanationsArray: [
            "11/16 Time Signature: There are 11 beats in each measure and a sixteenth note gets one beat."
        ]
    },
    "eleven-eight": {
        timeSignature: "11/8",
        notesArray: [
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
        ],
        explanationsArray: [
            "11/8 Time Signature: There are 11 beats in each measure and an eighth note gets one beat."
        ]
    },
    "waltz": {
        timeSignature: "3/4",
        notesArray: [
            { keys: ["c/4"], duration: "q" },
            { keys: ["d/4"], duration: "q" },
            { keys: ["e/4"], duration: "q" }
        ],
        explanationsArray: [
            "Waltz Rhythm: A 3/4 time signature with quarter notes C, D, and E."
        ]
    }
};
