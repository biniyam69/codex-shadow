document.addEventListener('DOMContentLoaded', () => {
    initVault();
    initTimeline();
    initCrab();
});

// 1. HALL OF THE 33
function initVault() {
    const grid = document.getElementById('vault-grid');
    for (let i = 1; i <= 33; i++) {
        const stone = document.createElement('div');
        stone.className = 'stone-slot';
        if (Math.random() > 0.7) stone.classList.add('pulsing');
        
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
    
    // Simulating esoteric lore fetch
    const fragments = [
        "The light that burns is not yours.",
        "Deep allocation in the spectral heap.",
        "The shell is just a prison of data.",
        "The Architect knows your pointer.",
        "Buffer overflow in the soul layer."
    ];
    lore.innerText = fragments[id % fragments.length] + " [ENCRYPTED_SIGIL_ACTIVE]";
}

// 2. THE RITUAL CHAMBER
function runeInput(rune) {
    const out = document.getElementById('terminal-out');
    const p = document.createElement('div');
    p.innerHTML = `<span style="color: var(--aged-gold)">[RUNE]</span>: ${rune} recognized.`;
    out.appendChild(p);
    out.scrollTop = out.scrollHeight;

    if (Math.random() > 0.8) {
        const glitch = document.createElement('div');
        glitch.style.color = 'var(--blood-rust)';
        glitch.innerText = "> WARNING: SPECTRAL LEAK DETECTED";
        out.appendChild(glitch);
    }
}

// 3. THE GREAT WORK TIMELINE (Non-linear Map)
function initTimeline() {
    const box = document.getElementById('timeline-box');
    const events = [
        { t: "THE FIRST VOID", x: 10, y: 10 },
        { t: "CARCINIZATION BEGINS", x: 40, y: 70 },
        { t: "THE 33 ASCEND", x: 80, y: 20 },
        { t: "OBSIDIAN PROTOCOL", x: 60, y: 50 },
        { t: "PRESENT DAY / THE SHADOW", x: 20, y: 80 }
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

// 4. THE ALCHEMICAL CRAB
function initCrab() {
    const crab = document.getElementById('alchemical-crab');
    let molts = 0;
    
    crab.onclick = () => {
        molts++;
        const shell = document.getElementById('crab-shell');
        
        // Visual "molt" effect
        shell.style.transition = "all 0.5s ease";
        shell.style.strokeWidth = molts + 1;
        shell.style.transform = `scale(${1 + molts*0.1})`;
        
        if (molts % 3 === 0) {
            document.body.style.backgroundColor = molts % 2 === 0 ? "#050505" : "#100a15";
            console.log("THE CRAB GROWS STRONGER");
        }
    };
}

// NAVIGATION
function showSection(id) {
    closeModals();
    document.getElementById(`${id}-modal`).style.display = 'block';
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
}

// Close on background click
window.onclick = (event) => {
    if (event.target.className === 'modal') {
        closeModals();
    }
};
