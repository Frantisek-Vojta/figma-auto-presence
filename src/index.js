/**
 * Main Application Entry Point
 * Figma Auto Presence - by @uwayxt
 * https://github.com/uwayxt/figma-auto-presence
 */

const activityManager = require('./activity');
const windowDetector = require('./utils/window');
const config = require('./config');

class FigmaPresence {
  constructor() {
    this.isRunning = false;
    this.checkInterval = null;
    this.reconnectInterval = null;
    this.UPDATE_INTERVAL = 15000; // 15 seconds
    this.RECONNECT_INTERVAL = 30000; // 30 seconds
  }

  async start() {
    if (this.isRunning) {
      console.log('⚠️  Figma Presence is already running');
      return false;
    }

    const presenceConfig = config.get();

    if (!presenceConfig.clientId) {
      console.error('❌ Client ID not configured. Please run setup first.');
      return false;
    }

    console.log('🚀 Starting Figma Presence...');
    console.log(`⏱️  Update interval: ${this.UPDATE_INTERVAL / 1000} seconds`);

    const connected = await activityManager.connect(presenceConfig.clientId);
    
    if (!connected) {
      console.error('❌ Failed to start: Could not connect to Discord');
      return false;
    }

    this.isRunning = true;

    // Initial check
    await this.checkAndUpdate();

    // Set up periodic checks every 15 seconds
    this.checkInterval = setInterval(async () => {
      await this.checkAndUpdate();
    }, this.UPDATE_INTERVAL);

    // Set up auto-reconnect check every 30 seconds
    this.reconnectInterval = setInterval(async () => {
      await this.attemptReconnect();
    }, this.RECONNECT_INTERVAL);

    console.log('✅ Figma Presence is now running');
    console.log('📊 Monitoring Figma activity...');
    console.log('🔄 Auto-reconnect enabled (checks every 30s)');
    console.log('Press Ctrl+C to stop\n');

    return true;
  }

  async attemptReconnect() {
    if (!activityManager.isConnected) {
      console.log('🔄 Attempting to reconnect to Discord...');
      const presenceConfig = config.get();
      const reconnected = await activityManager.connect(presenceConfig.clientId);
      
      if (reconnected) {
        console.log('✅ Successfully reconnected to Discord!');
        // Immediately update status after reconnecting
        await this.checkAndUpdate();
      }
    }
  }

  async checkAndUpdate() {
    const presenceConfig = config.get();
    const figmaStatus = await windowDetector.isFigmaRunning();

    if (figmaStatus.isRunning) {
      // Figma is running, update with file name (or fallback)
      await activityManager.setFigmaActivity(figmaStatus.fileName, presenceConfig);
    } else {
      // Figma is not running, clear activity
      if (activityManager.isConnected) {
        await activityManager.clearActivity();
        console.log('⚠️  Figma not detected, activity cleared');
      }
    }
  }

  stop() {
    if (!this.isRunning) {
      return;
    }

    console.log('\n🛑 Stopping Figma Presence...');

    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }

    if (this.reconnectInterval) {
      clearInterval(this.reconnectInterval);
      this.reconnectInterval = null;
    }

    activityManager.clearActivity();
    activityManager.disconnect();

    this.isRunning = false;
    console.log('✅ Figma Presence stopped');
  }
}

const presence = new FigmaPresence();

// Handle graceful shutdown
process.on('SIGINT', () => {
  presence.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  presence.stop();
  process.exit(0);
});

module.exports = presence;