/**
 * Discord RPC Activity Manager
 * Figma Auto Presence - by @uwayxt
 * https://github.com/uwayxt/figma-auto-presence
 */

const RPC = require('discord-rpc');
const config = require('./config');

class ActivityManager {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.startTimestamp = Date.now();
    this.currentFileName = null;
  }

  async connect(clientId) {
    if (this.isConnected) {
      console.log('✅ Already connected to Discord');
      return true;
    }

    this.client = new RPC.Client({ transport: 'ipc' });

    try {
      await this.client.login({ clientId });
      this.isConnected = true;
      console.log('✅ Connected to Discord RPC');
      
      // Handle disconnect events for auto-reconnect
      this.client.on('disconnected', () => {
        console.log('⚠️  Disconnected from Discord - Will attempt reconnect...');
        this.isConnected = false;
      });
      
      return true;
    } catch (error) {
      console.error('❌ Failed to connect to Discord:', error.message);
      return false;
    }
  }

  async setFigmaActivity(fileName, presenceConfig) {
    if (!this.isConnected || !this.client) {
      console.log('⚠️  Not connected to Discord');
      return false;
    }

    try {
      // Track file changes
      if (fileName !== this.currentFileName) {
        if (fileName) {
          console.log(`📐 Updating status: ${fileName}`);
        } else {
          console.log('📐 Updating status: Figma opened (no file)');
        }
        this.currentFileName = fileName;
      }

      const activity = {
        details: fileName ? `📐 ${fileName}` : presenceConfig.details || '📐 Working on design',
        state: presenceConfig.state || 'Designing in Figma',
        startTimestamp: this.startTimestamp,
        largeImageKey: presenceConfig.largeImageKey || 'figma',
        largeImageText: presenceConfig.largeImageText || 'Figma',
        instance: false,
      };

      // Only add small image if provided
      if (presenceConfig.smallImageKey && presenceConfig.smallImageKey.trim() !== '') {
        activity.smallImageKey = presenceConfig.smallImageKey;
        activity.smallImageText = presenceConfig.smallImageText || '';
      }

      // Add buttons if configured
      if (presenceConfig.buttons && presenceConfig.buttons.length > 0) {
        activity.buttons = presenceConfig.buttons;
      }

      await this.client.setActivity(activity);
      return true;
    } catch (error) {
      console.error('❌ Failed to set activity:', error.message);
      return false;
    }
  }

  async clearActivity() {
    if (!this.isConnected || !this.client) {
      return false;
    }

    try {
      await this.client.clearActivity();
      console.log('🧹 Activity cleared');
      this.currentFileName = null;
      return true;
    } catch (error) {
      console.error('❌ Failed to clear activity:', error.message);
      return false;
    }
  }

  disconnect() {
    if (this.client && this.isConnected) {
      this.client.destroy();
      this.isConnected = false;
      this.currentFileName = null;
      console.log('👋 Disconnected from Discord');
    }
  }
}

module.exports = new ActivityManager();