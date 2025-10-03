/**
 * Configuration Management
 * Figma Auto Presence - by @uwayxt
 * https://github.com/uwayxt/figma-auto-presence
 */

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '../config.json');

// Default configuration
const DEFAULT_CONFIG = {
  clientId: '',
  // details will be auto-filled with file name: 📐 [filename]
  // This is used as fallback when no file is detected
  details: '📐 Working on design',
  state: 'Designing in Figma',
  largeImageKey: 'figma',
  largeImageText: 'Figma',
  // Leave smallImageKey empty or remove if not needed
  // smallImageKey: '',
  // smallImageText: '',
  buttons: []
};

class Config {
  constructor() {
    this.config = this.load();
  }

  load() {
    try {
      if (fs.existsSync(CONFIG_PATH)) {
        const data = fs.readFileSync(CONFIG_PATH, 'utf8');
        const loaded = JSON.parse(data);
        return { ...DEFAULT_CONFIG, ...loaded };
      }
    } catch (error) {
      console.log('⚠️  Config file not found or invalid, using defaults');
    }
    return { ...DEFAULT_CONFIG };
  }

  save(newConfig) {
    try {
      this.config = { ...this.config, ...newConfig };
      fs.writeFileSync(CONFIG_PATH, JSON.stringify(this.config, null, 2));
      console.log('✅ Configuration saved');
      return true;
    } catch (error) {
      console.error('❌ Failed to save configuration:', error.message);
      return false;
    }
  }

  get() {
    return this.config;
  }

  isConfigured() {
    return this.config.clientId && this.config.clientId.length > 0;
  }
}

module.exports = new Config();