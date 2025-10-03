#!/usr/bin/env node

/**
 * Command Line Interface
 * Figma Auto Presence - by @uwayxt
 * https://github.com/uwayxt/figma-auto-presence
 */

const readline = require('readline');
const config = require('../src/config');
const presence = require('../src/index');
const windowDetector = require('../src/utils/window');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function showHelp() {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║        Figma Auto Presence - Discord Rich Presence       ║
║                    by @uwayxt                             ║
╚═══════════════════════════════════════════════════════════╝

🚀 AUTOMATIC FILE DETECTION
   Detects which Figma file you're working on and shows it
   in your Discord status automatically!

📋 COMMANDS:
   start    - Start Figma Auto Presence (updates every 15s)
   setup    - Configure Discord Application ID
   test     - Test Figma detection and show current file
   config   - Show current configuration
   help     - Show this help message

📖 USAGE EXAMPLES:
   figmaway start
   figmaway setup
   figmaway test

🎨 FEATURES:
   ✓ Auto-detects open Figma files
   ✓ Shows file name in Discord status
   ✓ Updates every 15 seconds
   ✓ Auto-reconnect when internet returns
   ✓ Works on Desktop & Browser
   ✓ Cross-platform (Windows, macOS, Linux)

🔧 SETUP:
   1. Create Discord Application at https://discord.com/developers
   2. Run: figmaway setup
   3. Enter your Application ID
   4. Upload 'figma' image to Rich Presence Art Assets
   5. Run: figmaway start

💡 TIP: Keep Discord and Figma open while running!

GitHub: https://github.com/uwayxt/figma-auto-presence
NPM: https://www.npmjs.com/package/figma-auto-presence
  `);
}

async function setup() {
  console.log('\n╔═══════════════════════════════════════════════════════════╗');
  console.log('║           Figma Auto Presence - Setup Wizard             ║');
  console.log('║                    by @uwayxt                             ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');

  console.log('📌 Step 1: Get your Discord Application ID');
  console.log('   Visit: https://discord.com/developers/applications');
  console.log('   1. Create a new application (or use existing)');
  console.log('   2. Copy the Application ID\n');

  const clientId = await question('🔑 Enter your Application ID: ');

  if (!clientId || clientId.trim().length === 0) {
    console.log('❌ Application ID cannot be empty');
    rl.close();
    return;
  }

  console.log('\n📌 Step 2: Optional - Customize status text');
  console.log('   (Press Enter to use defaults)\n');

  const state = await question('💬 Status text (default: "Designing in Figma"): ');

  console.log('\n📌 Step 3: Upload Rich Presence Image');
  console.log('   1. Go to your Discord Application > Rich Presence > Art Assets');
  console.log('   2. Upload an image with name: "figma"');
  console.log('   3. This will show as your activity icon\n');

  const newConfig = {
    clientId: clientId.trim(),
    state: state.trim() || 'Designing in Figma',
    details: '📐 Working on design',
    largeImageKey: 'figma',
    largeImageText: 'Figma'
  };

  config.save(newConfig);

  console.log('\n✅ Configuration saved successfully!');
  console.log('\n🎯 Next steps:');
  console.log('   1. Make sure Discord is running');
  console.log('   2. Open Figma (Desktop or Browser)');
  console.log('   3. Run: figmaway start\n');

  rl.close();
}

async function testDetection() {
  console.log('\n🔍 Testing Figma detection...\n');

  const result = await windowDetector.isFigmaRunning();

  if (result.isRunning) {
    console.log('✅ Figma is running!');
    if (result.fileName) {
      console.log(`📐 Current file: ${result.fileName}`);
    } else {
      console.log('📐 No file detected (Figma may be open but no file is active)');
    }
  } else {
    console.log('❌ Figma is not running');
    console.log('   Please open Figma Desktop or Figma in your browser');
  }

  console.log('\n💡 Tip: Open a Figma file and run this command again');
  console.log('   to see automatic file detection in action!\n');

  rl.close();
}

function showConfig() {
  const currentConfig = config.get();

  console.log('\n╔═══════════════════════════════════════════════════════════╗');
  console.log('║              Current Configuration                        ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');

  console.log(`🔑 Application ID: ${currentConfig.clientId || 'Not configured'}`);
  console.log(`💬 Status text: ${currentConfig.state}`);
  console.log(`📐 Fallback details: ${currentConfig.details}`);
  console.log(`🖼️  Large image key: ${currentConfig.largeImageKey}`);
  console.log(`🏷️  Large image text: ${currentConfig.largeImageText}\n`);

  console.log('💡 File name detection is AUTOMATIC!');
  console.log('   Your current Figma file will show as: 📐 [filename]\n');

  rl.close();
}

async function startPresence() {
  if (!config.isConfigured()) {
    console.log('❌ Not configured. Please run setup first:');
    console.log('   figmaway setup\n');
    process.exit(1);
  }

  console.log('\n╔═══════════════════════════════════════════════════════════╗');
  console.log('║          Starting Figma Auto Presence...                 ║');
  console.log('║                    by @uwayxt                             ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');

  const started = await presence.start();

  if (!started) {
    console.log('\n❌ Failed to start Figma Presence');
    console.log('   Make sure Discord is running and try again\n');
    process.exit(1);
  }
}

// Main CLI logic
const command = process.argv[2] || 'help';

(async () => {
  switch (command) {
    case 'start':
      await startPresence();
      break;

    case 'setup':
      await setup();
      break;

    case 'test':
      await testDetection();
      break;

    case 'config':
      showConfig();
      break;

    case 'help':
    default:
      showHelp();
      rl.close();
      break;
  }
})();