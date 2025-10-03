# Changelog

All notable changes to **Figma Auto Presence** will be documented in this file.

**By [@uwayxt](https://github.com/uwayxt)**

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2025-01-XX

### 🎉 Major Release - Automatic File Detection & Auto-Reconnect

Complete rewrite of Figma Presence with automatic file name detection and internet recovery!

### ✨ Added

- **Automatic file detection** - Detects which Figma file you're working on
- **Real-time updates** - Updates Discord status every 15 seconds
- **Auto-reconnect** - Automatically reconnects when internet returns (checks every 30s)
- **Connection monitoring** - Handles Discord disconnection gracefully
- **Multi-platform support** - Windows, macOS, and Linux
- **Browser support** - Works with Chrome, Firefox, Edge, Safari, Brave
- **Desktop support** - Full support for Figma Desktop app
- **Enhanced CLI** - Beautiful, user-friendly command-line interface with `figmaway` command
- **Setup wizard** - Easy step-by-step configuration
- **Test command** - Test Figma detection before running
- **Config command** - View current configuration
- **Improved logging** - Detailed, color-coded console output
- **File name parsing** - Smart parsing of window titles
- **File name truncation** - Limits file names to 45 characters for Discord
- **Elapsed time tracking** - Shows how long you've been working
- **Graceful shutdown** - Clean disconnect on Ctrl+C
- **Configuration persistence** - Saves settings in config.json
- **Error handling** - Better error messages and recovery
- **Empty field fix** - Fixed Discord RPC error with empty smallImageKey

### 📝 Changed

- **Complete rewrite** of detection system
- **Simplified configuration** - Only needs Application ID
- **Removed manual status setting** - Now fully automatic
- **Updated status format** - Uses 📐 emoji prefix
- **Improved documentation** - Comprehensive guides and troubleshooting
- **Better code structure** - Modular, maintainable codebase
- **CLI command changed** - From `figma-presence` to `figmaway`
- **Package renamed** - From `figma-presence` to `figma-auto-presence`
- **Branding** - All files now include @uwayxt attribution

### 🔧 Technical Details

- **New files:**
  - `src/utils/window.js` - Window detection for all platforms
  - `src/activity.js` - Discord RPC activity manager with auto-reconnect
  - `src/config.js` - Configuration management
  - `bin/cli.js` - Enhanced CLI interface with `figmaway` command
  
- **Update interval:** 15 seconds (configurable)
- **Reconnect interval:** 30 seconds (automatic)
- **File name limit:** 45 characters
- **Platform support:** Windows (PowerShell), macOS (osascript), Linux (wmctrl)
- **NPM Package:** `figma-auto-presence`
- **CLI Command:** `figmaway`
- **Author:** @uwayxt

### 🐛 Fixed

- Fixed detection on different window managers
- Fixed Unicode character handling in file names
- Fixed connection issues with Discord RPC
- Fixed multiple simultaneous Figma instances
- Fixed browser tab detection
- **Fixed Discord RPC empty field error** - smallImageKey no longer sent if empty
- **Fixed connection loss handling** - Auto-reconnect when internet returns

### 📚 Documentation

- Added `README.md` - Complete feature documentation
- Added `QUICKSTART.md` - 5-minute setup guide
- Added `SETUP_GUIDE.md` - Step-by-step setup instructions
- Added `TROUBLESHOOTING.md` - Comprehensive problem-solving guide
- Added `CHANGELOG.md` - Version history
- Added `LICENSE` - MIT License
- Added `config.example.json` - Configuration template

### 🔒 Security

- Configuration stored locally only
- No data sent to external servers
- No tracking or analytics
- Open source and auditable
- MIT License by @uwayxt

---

## [1.0.0] - 2024-XX-XX

### Initial Release

- Basic Discord Rich Presence for Figma
- Manual status configuration
- Simple CLI interface
- Windows support only

---

## Roadmap

### Planned for v2.1.0

- [ ] GUI interface option
- [ ] System tray integration
- [ ] Auto-start on boot option
- [ ] Multiple Discord account support
- [ ] Team/collaboration detection
- [ ] Custom emoji support
- [ ] Figma community plugin integration
- [ ] Improved reconnection speed

### Planned for v2.2.0

- [ ] Statistics tracking (time per file, total design time)
- [ ] Daily/weekly reports
- [ ] File type detection (mobile, web, icon, etc.)
- [ ] Project grouping
- [ ] Export activity history

### Planned for v3.0.0

- [ ] Web dashboard
- [ ] Team analytics
- [ ] Figma API integration
- [ ] Cross-platform GUI
- [ ] Plugin system for extensibility

---

## Contributing

Want to contribute? Check out our [Contributing Guidelines](CONTRIBUTING.md)!

## Support

- 📖 Documentation: See README.md and guides
- 🐛 Bug reports: https://github.com/uwayxt/figma-auto-presence/issues
- 💡 Feature requests: Open an issue with "enhancement" label
- 💬 Questions: Check TROUBLESHOOTING.md first

---

**Made with ❤️ by [@uwayxt](https://github.com/uwayxt)**