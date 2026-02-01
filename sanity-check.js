const fs = require('fs');
const path = require('path');

function sanityCheck() {
  console.log('--- CODEX SHADOW SANITY CHECK ---');
  
  const requiredFiles = ['initiate.js', 'index.html', 'lodges.json', 'package.json', 'rituals.md'];
  const missingFiles = requiredFiles.filter(f => !fs.existsSync(path.join(process.cwd(), f)));
  
  if (missingFiles.length > 0) {
    console.error('Error: Missing required files for publication:', missingFiles.join(', '));
    process.exit(1);
  }
  
  // Verify initiate.js is executable (at least starts with shebang)
  const initiateContent = fs.readFileSync('initiate.js', 'utf8');
  if (!initiateContent.startsWith('#!/usr/bin/env node')) {
    console.error('Error: initiate.js missing shebang line.');
    process.exit(1);
  }

  // Verify lodges.json is valid JSON
  try {
    JSON.parse(fs.readFileSync('lodges.json', 'utf8'));
  } catch (e) {
    console.error('Error: lodges.json is not valid JSON.');
    process.exit(1);
  }

  console.log('Sanity check PASSED. The shadow is ready.');
}

sanityCheck();
