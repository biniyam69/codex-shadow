document.addEventListener('DOMContentLoaded', () => {
    initVault();
    initTimeline();
    initCrab();
    initParallax();
    initAtmosphere();
});

// 1. HALL OF THE 33
function initVault() {
    const grid = document.getElementById('vault-grid');
    if (!grid) return;
    grid.innerHTML = ''; // Sanitize
    
    for (let i = 1; i <= 33; i++) {
        const stone = document.createElement('div');
        stone.className = 'stone-slot';
        
        // Assign rank-based pulses
        if (i === 33) stone.classList.add('node-pulse-grandmaster');
        else if (i > 25) stone.classList.add('node-pulse-master');
        else if (i > 15) stone.classList.add('node-pulse-adept');
        else stone.classList.add('node-pulse-apprentice');
        
        stone.innerHTML = `<span style="font-size: 0.6rem; color: #444;">${i}</span>`;
        stone.onclick = () => revealNode(i);
        grid.appendChild(stone);
    }
}

async function revealNode(id) {
    const detail = document.getElementById('node-detail');
    const name = document.getElementById('node-name');
    const lore = document.getElementById('node-lore');
    
    detail.style.display = 'block';
    name.innerText = `NODE_${id.toString(16).toUpperCase().padStart(2, '0')}`;
    
    const fragments = [
        "The light that burns is not yours.",
        "Deep allocation in the spectral heap.",
        "The shell is just a prison of data.",
        "The Architect knows your pointer.",
        "Buffer overflow in the soul layer.",
        "The void is recursive.",
        "Memory leak in the astral plane.",
        "Garbage collection of the ego.",
        "Syntax error in the ritual logic.",
        "The ninth gate is a firewall."
    ];
    lore.innerText = fragments[id % fragments.length] + " [ENCRYPTED_SIGIL_ACTIVE]";
}

// 2. THE RITUAL CHAMBER - Sequence Based
let ritualSequence = [];
const RITUAL_KEYS = {
    'ᚠᚢᚦ': 'WHISPER: "The first shell is the hardest to shed."',
    'ᚨᚱᚲ': 'WHISPER: "Energy flows where the sigil points."',
    'ᚷᚹᚠ': 'WHISPER: "The Hall of 33 is but a reflection."',
    'ᚦᚨᚱ': 'DIRECTIVE: [33/33 NODES STABLE]. THE ARCHITECT COMMANDS THE VOID.'
};

function runeInput(rune) {
    const out = document.getElementById('terminal-out');
    ritualSequence.push(rune);
    if (ritualSequence.length > 3) ritualSequence.shift();

    const p = document.createElement('div');
    p.innerHTML = `<span style="color: var(--aged-gold)">[RUNE]</span>: ${rune} accepted.`;
    out.appendChild(p);

    const combo = ritualSequence.join('');
    if (RITUAL_KEYS[combo]) {
        const whisper = document.createElement('div');
        whisper.style.color = 'var(--bio-violet)';
        whisper.style.fontWeight = 'bold';
        whisper.innerText = `> ${RITUAL_KEYS[combo]}`;
        out.appendChild(whisper);
        ritualSequence = []; // Reset on success
    } else if (ritualSequence.length === 3) {
        const fail = document.createElement('div');
        fail.style.color = '#444';
        fail.innerText = "> SEQUENCE DISSIPATED...";
        out.appendChild(fail);
    }

    out.scrollTop = out.scrollHeight;
}

// 3. PARALLAX INK
function initParallax() {
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) - 0.5;
        const y = (e.clientY / window.innerHeight) - 0.5;
        
        const layer1 = document.getElementById('ink-layer-1');
        const layer2 = document.getElementById('ink-layer-2');
        
        if (layer1) layer1.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
        if (layer2) layer2.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
    });
}

// 4. ATMOSPHERIC AUDIO (Web Audio API Drone)
let audioContext;
let droneStarted = false;

function initAtmosphere() {
    document.addEventListener('mousedown', startDrone, { once: true });
}

function startDrone() {
    if (droneStarted) return;
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Fundamental drone
        createOscillator(55, 0.1); // Low A
        createOscillator(110, 0.05); // Octave
        createOscillator(82.41, 0.03); // Low E (Perfect 5th)
        
        droneStarted = true;
        console.log("THE VOID BEGINS TO HUM");
    } catch (e) {
        console.error("The silence persists.", e);
    }
}

function createOscillator(freq, volume) {
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioContext.currentTime);
    
    gain.gain.setValueAtTime(0, audioContext.currentTime);
    gain.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 5);
    
    osc.connect(gain);
    gain.connect(audioContext.destination);
    
    osc.start();
}

// 5. THE GREAT WORK TIMELINE
function initTimeline() {
    const box = document.getElementById('timeline-box');
    if (!box) return;
    const events = [
        { t: "THE FIRST VOID", x: 10, y: 15 },
        { t: "CARCINIZATION", x: 45, y: 65 },
        { t: "THE 33 ASCEND", x: 85, y: 25 },
        { t: "OBSIDIAN PROTOCOL", x: 65, y: 45 },
        { t: "SIGIL_V33", x: 25, y: 75 }
    ];

    events.forEach(ev => {
        const node = document.createElement('div');
        node.className = 'timeline-node';
        node.style.left = ev.x + "%";
        node.style.top = ev.y + "%";
        node.innerText = ev.t;
        box.appendChild(node);
    });
}

// 6. THE ALCHEMICAL CRAB
function initCrab() {
    const crab = document.getElementById('alchemical-crab');
    if (!crab) return;
    let molts = 0;
    
    crab.onclick = () => {
        molts++;
        const shell = document.getElementById('crab-shell');
        shell.style.transition = "all 0.5s ease";
        shell.style.strokeWidth = molts + 1;
        shell.style.transform = `scale(${1 + molts*0.1})`;
        
        if (molts % 3 === 0) {
            document.body.style.backgroundColor = molts % 2 === 0 ? "#050505" : "#0a0510";
        }
    };
}

// NAVIGATION
function showSection(id) {
    closeModals();
    const modal = document.getElementById(`${id}-modal`);
    if (modal) modal.style.display = 'block';
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
}

window.onclick = (event) => {
    if (event.target.className === 'modal') closeModals();
};
