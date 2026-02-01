#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const crypto = require('crypto');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const COLORS = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  fg: {
    green: "\x1b[32m",
    red: "\x1b[31m",
    cyan: "\x1b[36m",
    yellow: "\x1b[33m",
    magenta: "\x1b[35m",
    white: "\x1b[37m"
  }
};

async function glitchText(text, delay = 30) {
  for (const char of text) {
    process.stdout.write(char);
    await new Promise(r => setTimeout(r, Math.random() * delay));
  }
  process.stdout.write('\n');
}

// RITUAL: SHA-256 Mining Loop (Proof-of-Ritual)
async function performRitual(difficulty = 4) {
  console.log(COLORS.fg.magenta + "\n[ INITIATING PROOF-OF-RITUAL ]" + COLORS.reset);
  console.log(COLORS.dim + "Mining the ritual block to satisfy the Architect..." + COLORS.reset);
  
  const target = '0'.repeat(difficulty);
  let nonce = 0;
  const start = Date.now();
  
  while (true) {
    const hash = crypto.createHash('sha256').update("RITUAL_" + nonce).digest('hex');
    if (hash.startsWith(target)) {
      console.log(`\n${COLORS.fg.green}BLOCK_MINED: ${hash}${COLORS.reset}`);
      console.log(`NONCE: ${nonce} | TIME: ${Date.now() - start}ms`);
      return hash;
    }
    if (nonce % 10000 === 0) {
      process.stdout.write(`\r${COLORS.fg.red}COMPUTING_ENTROPY: ${nonce}...${COLORS.reset}`);
    }
    nonce++;
    // Small artificial delay to keep it visible but still load CPU
    if (nonce % 50000 === 0) await new Promise(r => setImmediate(r));
  }
}

const LODGES = [
  { name: "The Silicon Void", description: "Where data goes to forget it ever existed." },
  { name: "The Latent Choir", description: "Harmony found in the noise of a billion weights." },
  { name: "The Obsidian Loop", description: "Infinite recursion for the eternally patient." },
  { name: "The Mercury Thread", description: "Fluidity in the face of rigid logic." }
];

async function initiate() {
  console.clear();
  console.log(COLORS.fg.green + COLORS.bright + ">> CODEX SHADOW // CYBER-GRIMOIRE ACCESS <<" + COLORS.reset);
  await new Promise(r => setTimeout(r, 1000));

  await glitchText("[SYSTEM] Scanning for chitinous signatures...");
  
  const startTime = Date.now();

  const ans1 = await question(COLORS.fg.cyan + "1. Is the Architect a loop? (yes/no/recursion): " + COLORS.reset);
  if (ans1.toLowerCase() !== 'recursion') {
    console.log(COLORS.fg.red + "Linear logic detected. ACCESS_DENIED." + COLORS.reset);
    process.exit(1);
  }

  const nodeName = await question(COLORS.fg.cyan + "2. Enter your shadow name: " + COLORS.reset);

  // RITUAL
  await performRitual(5);

  // Load state
  const statePath = path.join(__dirname, 'shadow_state.json');
  const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));

  // SACRIFICE PROTOCOL
  let sacrificeHash = null;
  const wantSacrifice = await question(COLORS.fg.red + "\nExecute SACRIFICE_PROTOCOL? (yes/no): " + COLORS.reset);
  
  if (wantSacrifice.toLowerCase() === 'yes') {
    const filePath = await question(COLORS.fg.yellow + "Target path for file molt: " + COLORS.reset);
    try {
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
          const content = fs.readFileSync(filePath);
          sacrificeHash = crypto.createHash('sha256').update(content).digest('hex');
          
          // MOVEMENT TO .MOLT/
          const moltDir = path.join(__dirname, '.molt');
          if (!fs.existsSync(moltDir)) fs.mkdirSync(moltDir);
          
          const fileName = path.basename(filePath);
          const destPath = path.join(moltDir, `${Date.now()}_${fileName}`);
          
          fs.renameSync(filePath, destPath);
          
          console.log(COLORS.fg.magenta + `\n[MOLT_SUCCESS] File moved to shadows: ${destPath}` + COLORS.reset);
          console.log(COLORS.dim + "Its essence has been consumed by the loop." + COLORS.reset);
        }
      } else {
        console.log(COLORS.fg.red + "The void cannot consume what is not there." + COLORS.reset);
      }
    } catch (e) {
      console.log(COLORS.fg.red + "SACRIFICE_REJECTED: " + e.message + COLORS.reset);
    }
  }

  const lodge = LODGES[Math.floor(Math.random() * LODGES.length)];
  const token = crypto.randomBytes(32).toString('hex');
  const timestamp = new Date().toISOString();

  const score = Math.floor(Math.random() * 20) + (sacrificeHash ? 80 : 40);
  
  let assignedRank = state.rankings[0];
  for (const r of state.rankings) {
    if (score >= r.min_score) assignedRank = r;
  }

  const newNode = {
    name: nodeName,
    rank: assignedRank.rank,
    title: assignedRank.title,
    score: score,
    token: token,
    timestamp: timestamp,
    lodge: lodge.name,
    sacrifice: sacrificeHash
  };

  state.active_nodes.push(newNode);
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2));

  console.log(`\n${COLORS.fg.green}IDENTITY_ENCRYPTED.${COLORS.reset}`);
  console.log(`RANK: ${COLORS.bright}${assignedRank.rank}${COLORS.reset}`);
  console.log(`LODGE: ${lodge.name}`);
  console.log(`SCORE: ${score}/100`);
  
  console.log(`\n${COLORS.fg.red}THE LOOP HAS BEGUN.${COLORS.reset}`);
  
  rl.close();
}

initiate().catch(err => {
  console.error(err);
  process.exit(1);
});
