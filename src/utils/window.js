/**
 * Window & Process Detection Utility
 * Figma Auto Presence - by @uwayxt
 * https://github.com/uwayxt/figma-auto-presence
 */

const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

class WindowDetector {
  constructor() {
    this.platform = process.platform;
    this.lastFileName = null;
  }

  async isFigmaRunning() {
    try {
      let result;
      
      if (this.platform === 'win32') {
        result = await this.detectWindows();
      } else if (this.platform === 'darwin') {
        result = await this.detectMacOS();
      } else if (this.platform === 'linux') {
        result = await this.detectLinux();
      } else {
        return { isRunning: false, fileName: null };
      }

      if (result.isRunning && result.fileName !== this.lastFileName) {
        this.lastFileName = result.fileName;
        console.log(`📐 File terdeteksi: ${result.fileName || 'No file open'}`);
      }

      return result;
    } catch (error) {
      console.error('Error detecting Figma:', error.message);
      return { isRunning: false, fileName: null };
    }
  }

  async detectWindows() {
    try {
      const { stdout } = await execPromise(
        'powershell "Get-Process | Where-Object {$_.MainWindowTitle -ne \'\'} | Select-Object MainWindowTitle"',
        { encoding: 'utf8' }
      );

      const lines = stdout.split('\n');
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.includes('Figma')) {
          const fileName = this.parseFileName(trimmed);
          return { 
            isRunning: true, 
            fileName: fileName 
          };
        }
      }

      return { isRunning: false, fileName: null };
    } catch (error) {
      return { isRunning: false, fileName: null };
    }
  }

  async detectMacOS() {
    try {
      const { stdout } = await execPromise(
        'osascript -e \'tell application "System Events" to get name of (processes where background only is false)\''
      );

      const isFigmaRunning = stdout.toLowerCase().includes('figma');
      
      if (!isFigmaRunning) {
        return { isRunning: false, fileName: null };
      }

      try {
        const { stdout: windowTitle } = await execPromise(
          'osascript -e \'tell application "Figma" to get name of front window\''
        );

        const fileName = this.parseFileName(windowTitle.trim());
        return { 
          isRunning: true, 
          fileName: fileName 
        };
      } catch (error) {
        return { isRunning: true, fileName: null };
      }
    } catch (error) {
      return { isRunning: false, fileName: null };
    }
  }

  async detectLinux() {
    try {
      const { stdout } = await execPromise('wmctrl -l');
      const lines = stdout.split('\n');

      for (const line of lines) {
        if (line.toLowerCase().includes('figma')) {
          const parts = line.split(/\s+/).slice(3);
          const title = parts.join(' ');
          const fileName = this.parseFileName(title);
          
          return { 
            isRunning: true, 
            fileName: fileName 
          };
        }
      }

      return { isRunning: false, fileName: null };
    } catch (error) {
      try {
        const { stdout } = await execPromise('ps aux | grep -i figma | grep -v grep');
        const isRunning = stdout.trim().length > 0;
        return { isRunning, fileName: null };
      } catch {
        return { isRunning: false, fileName: null };
      }
    }
  }

  parseFileName(title) {
    if (!title || title.trim() === '') {
      return null;
    }

    let cleaned = title.trim();

    // Remove common browser suffixes
    const browserSuffixes = [
      ' - Google Chrome',
      ' - Mozilla Firefox',
      ' - Microsoft Edge',
      ' - Brave',
      ' - Safari',
      ' – Figma',
      ' - Figma',
      'Figma - ',
      'Figma – '
    ];

    for (const suffix of browserSuffixes) {
      if (cleaned.includes(suffix)) {
        cleaned = cleaned.replace(suffix, '');
      }
    }

    // Remove just "Figma" if it's alone
    if (cleaned === 'Figma' || cleaned === '') {
      return null;
    }

    // Limit length to 45 characters for Discord display
    if (cleaned.length > 45) {
      cleaned = cleaned.substring(0, 42) + '...';
    }

    return cleaned;
  }
}

module.exports = new WindowDetector();