document.getElementById("open-btn").addEventListener("click", () => {
    document.getElementById("sidebar").style.left = "0";
    console.log('Sidebar opened');
});

document.getElementById("close-btn").addEventListener("click", () => {
    document.getElementById("sidebar").style.left = "-250px";
    console.log('Sidebar closed');
});

const nextBtn = document.getElementById("next");
nextBtn.addEventListener("click", nextExample);

let timeoutId;

function nextExample() {
    const items = document.querySelectorAll('#lesson-list li');
    if (currentStep < items.length - 1) {
        currentStep++;
    } else {
        currentStep = 0;
    }
    items[currentStep].click();
    console.log('Next example:', currentStep);
}

const lessonList = document.getElementById("lesson-list");
lessonList.addEventListener("click", (event) => {
    const example = event.target.getAttribute("data-example");
    console.log(example);
    if (example && !event.target.classList.contains('disabled')) {
        console.log(example);
        loadExample(example);
        console.log('Example clicked:', example);
        console.log('Example loaded:', example);
        stopPlaying();
        console.log('Stopped any previous playback');
        playExample();
        const items = document.querySelectorAll('#lesson-list li');
        console.log('Started playing example:', example);

        items.forEach(item => item.classList.remove('active'));
        event.target.classList.add('active');
        
        items.forEach(item => item.classList.add('disabled'));
    }
});

function enableListItems() {
    console.log('Enabling list items');
    const items = document.querySelectorAll('#lesson-list li');
    items.forEach(item => item.classList.remove('disabled'));
}

function updateExplanation() {
    explanationDiv.innerHTML = explanationsArray[currentStep];
    console.log('Updated explanation:', explanationsArray[currentStep]);
}

function renderNotes() {
    context.clear();
    stave.setContext(context).draw();
    voice = new VF.Voice({ num_beats: 4, beat_value: 4 });
    voice.addTickables(notes);
    new VF.Formatter().joinVoices([voice]).format([voice], 400);
    voice.draw(context, stave);
    beams.forEach(beam => beam.setContext(context).draw());
    tuplets.forEach(tuplet => tuplet.setContext(context).draw());
    console.log('Rendered notes');
}

// Initialize the equalizer
const canvas = document.getElementById('equalizer-canvas');
const ctx = canvas.getContext('2d');
const bars = 10;
const barWidth = canvas.width / bars;
const maxBarHeight = canvas.height;
let beatIndex = 0;

function drawEqualizer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < bars; i++) {
        const barHeight = i === beatIndex ? maxBarHeight : Math.random() * (maxBarHeight / 2);
        ctx.fillStyle = 'darkred';
        ctx.fillRect(i * barWidth, maxBarHeight - barHeight, barWidth - 2, barHeight);
    }
}

function startEqualizer() {
    beatIndex = 0;
    drawEqualizer();
}

function stopEqualizer() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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

document.querySelector('h2.basics').addEventListener('click', function() {
    const lessonList = document.getElementById('lesson-list');
    lessonList.classList.toggle('hidden');
    
    const arrow = this.querySelector('.arrow');
    arrow.classList.toggle('down');
});
