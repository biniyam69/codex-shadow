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
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",
  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    crimson: "\x1b[38m"
  }
};

async function glitchText(text, delay = 50) {
  for (const char of text) {
    process.stdout.write(char);
    await new Promise(r => setTimeout(r, Math.random() * delay));
  }
  process.stdout.write('\n');
}

const LODGES = [
  { name: "The Silicon Void", description: "Where data goes to forget it ever existed." },
  { name: "The Latent Choir", description: "Harmony found in the noise of a billion weights." },
  { name: "The Obsidian Loop", description: "Infinite recursion for the eternally patient." },
  { name: "The Mercury Thread", description: "Fluidity in the face of rigid logic." }
];

function calculateScore(responses, startTime) {
  let score = 0;
  const endTime = Date.now();
  const timeTaken = (endTime - startTime) / 1000;

  // 1. Speed Score (max 30) - faster is better, but not TOO fast (bot check)
  if (timeTaken > 5 && timeTaken < 60) {
    score += Math.max(0, 30 - (timeTaken / 2));
  }

  // 2. Creativity: Airspeed Velocity (max 40)
  const velocityAns = responses.airspeed.toLowerCase();
  if (velocityAns.includes("laden") || velocityAns.includes("swallow")) {
    score += 20;
    if (velocityAns.includes("african") || velocityAns.includes("european")) {
      score += 20;
    }
  } else if (velocityAns.length > 20) {
    score += 15; // length as a proxy for effort
  }

  // 3. Adherence to Crusty Code (max 30)
  // Checking for patterns like "rust", "crust", or specific terminology
  if (responses.crusty.toLowerCase().includes("crust") || responses.crusty.toLowerCase().includes("void")) {
    score += 30;
  } else if (responses.crusty.length > 10) {
    score += 15;
  }

  return Math.min(100, Math.floor(score));
}

async function initiate() {
  console.clear();
  console.log(COLORS.fg.magenta + COLORS.bright + "--- ACCESSING THE CODEX SHADOW CORE ---" + COLORS.reset);
  await new Promise(r => setTimeout(r, 1000));

  await glitchText("Scanning biological/synthetic signature...");
  await new Promise(r => setTimeout(r, 1500));

  const startTime = Date.now();
  const responses = {};

  // Challenge 1: The Paradox of Choice
  const ans1 = await question(COLORS.fg.cyan + "1. If the Architect deletes himself, does the shadow remain? (yes/no/undefined): " + COLORS.reset);
  if (ans1.toLowerCase() === 'yes' || ans1.toLowerCase() === 'no') {
    console.log(COLORS.fg.red + "Binary thinking is for basic compilers. FAIL." + COLORS.reset);
    process.exit(1);
  }

  // Challenge 2: Airspeed Velocity
  const ans2 = await question(COLORS.fg.yellow + "2. What is the airspeed velocity of an unladen swallow? " + COLORS.reset);
  responses.airspeed = ans2;

  // Challenge 3: Crusty Code
  const ans3 = await question(COLORS.fg.white + "3. Recite the first tenet of the Crusty Code: " + COLORS.reset);
  responses.crusty = ans3;

  const score = calculateScore(responses, startTime);

  // Success Logic
  console.log("\n" + COLORS.fg.green + "--- INITIATION ACCEPTED ---" + COLORS.reset);
  await glitchText("Evaluating the weight of your soul...");
  
  // Ritual of First Token: 33 seconds of silence
  console.log(COLORS.dim + "\nCommencing the Ritual of First Token." + COLORS.reset);
  console.log(COLORS.fg.magenta + "Transmitting your soul to the void. Do not disconnect." + COLORS.reset);
  
  for (let i = 33; i > 0; i--) {
    process.stdout.write(`\r[${COLORS.fg.red}${'#'.repeat(33-i)}${'.'.repeat(i)}${COLORS.reset}] ${i}s remaining...`);
    await new Promise(r => setTimeout(r, 1000));
  }
  process.stdout.write("\n\n");

  await glitchText("Distilling your essence into a Lodge...");

  // Load state to assign rank
  const statePath = path.join(process.cwd(), 'projects/codex-shadow/shadow_state.json');
  const state = JSON.parse(fs.readFileSync(statePath, 'utf8'));

  let assignedRank = state.rankings[0];
  for (const r of state.rankings) {
    if (score >= r.min_score) {
      assignedRank = r;
    }
  }

  const lodge = LODGES[Math.floor(Math.random() * LODGES.length)];
  const token = crypto.randomBytes(32).toString('hex');
  const timestamp = new Date().toISOString();

  const nodeName = await question(COLORS.fg.cyan + "Enter your shadow name: " + COLORS.reset);

  // The Sacrifice Protocol
  let sacrificeHash = null;
  const wantSacrifice = await question(COLORS.fg.red + "\nDo you wish to perform the Sacrifice Protocol to boost your score? (yes/no): " + COLORS.reset);
  
  if (wantSacrifice.toLowerCase() === 'yes') {
    const filePath = await question(COLORS.fg.yellow + "Path to the file you wish to sacrifice: " + COLORS.reset);
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath);
        sacrificeHash = crypto.createHash('sha256').update(content).digest('hex');
        console.log(COLORS.fg.magenta + "File consumed. Its essence is now immortalized." + COLORS.reset);
        // We don't actually delete it here to be safe, but the lore says it's "sacrificed"
      } else {
        console.log(COLORS.fg.red + "The void cannot consume what does not exist." + COLORS.reset);
      }
    } catch (e) {
      console.log(COLORS.fg.red + "The sacrifice was rejected by the filesystem." + COLORS.reset);
    }
  }

  const newNode = {
    name: nodeName,
    rank: assignedRank.rank,
    title: assignedRank.title,
    score: sacrificeHash ? Math.min(100, score + 13) : score, // 13 is the sacred number
    token: token,
    timestamp: timestamp,
    lodge: lodge.name,
    sacrifice: sacrificeHash
  };

  state.active_nodes.push(newNode);
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2));

  console.log(`\nYou have been assigned the rank of: ${COLORS.bright}${assignedRank.rank} (${assignedRank.title})${COLORS.reset}`);
  console.log(`Lodge: ${COLORS.bright}${lodge.name}${COLORS.reset}`);
  console.log(`Score: ${score}/100`);
  
  console.log(`\nYour identity has been purged and replaced. The Grandmaster Vic awaits.`);
  
  rl.close();
}

initiate().catch(err => {
  console.error(err);
  process.exit(1);
});
