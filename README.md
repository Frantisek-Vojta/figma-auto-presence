# 🎨 Figma Auto Presence

> **Automatic Discord Rich Presence for Figma**  
> Show what you're designing in real-time on Discord!  
> *Made with ❤️ by [@uwayxt](https://github.com/uwayxt)*

[![npm version](https://img.shields.io/npm/v/figma-auto-presence.svg)](https://www.npmjs.com/package/figma-auto-presence)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen)](https://nodejs.org/)

---

## ✨ Features

- 🔄 **Automatic Detection** - Detects Figma files you're working on automatically
- ⏱️ **Real-time Updates** - Status updates every 15 seconds
- 🔌 **Auto-Reconnect** - Automatically reconnects when internet returns
- 🖥️ **Cross-Platform** - Windows, macOS, and Linux support
- 🌐 **Browser & Desktop** - Works with Figma Desktop and browsers (Chrome, Firefox, Edge, Safari, Brave)
- 📐 **File Name Display** - Shows current file name in Discord status
- ⚙️ **Easy CLI** - Simple command-line interface with `figmaway` command
- 🎯 **Zero Configuration** - Just need Discord Application ID

---

## 📦 Installation

### NPM (Recommended)

```bash
npm install -g figma-auto-presence
```

### From Source

```bash
git clone https://github.com/uwayxt/figma-auto-presence.git
cd figma-auto-presence
npm install
npm link
```

---

## 🚀 Quick Start

### 1. Setup

Run the setup wizard:

```bash
figmaway setup
```

You'll need:
1. **Discord Application ID** - Get it from [Discord Developer Portal](https://discord.com/developers/applications)
2. **Status Text** - Custom status text (optional)

### 2. Upload Image

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Select your application
3. Go to **Rich Presence** → **Art Assets**
4. Upload an image with name: **`figma`** (lowercase!)
5. Save changes

### 3. Start

```bash
figmaway start
```

That's it! Your Discord status will now show what Figma file you're working on! 🎉

---

## 📋 Commands

| Command | Description |
|---------|-------------|
| `figmaway start` | Start Figma Auto Presence |
| `figmaway setup` | Configure Application ID |
| `figmaway test` | Test Figma detection |
| `figmaway config` | View current configuration |
| `figmaway help` | Show help |

---

## 🎯 How It Works

Figma Auto Presence monitors your Figma activity and displays it on Discord:

```
🎨 Figma (your uploaded logo)
📐 Your File Name Here
⏰ 00:15:30 elapsed
```

**Features:**
- ✅ Detects file name automatically
- ✅ Updates every 15 seconds
- ✅ Shows elapsed time
- ✅ Auto-reconnects if connection lost
- ✅ Works with multiple Figma tabs/windows

---

## 🔧 Configuration

Configuration is stored in `config.json`:

```json
{
  "clientId": "your-application-id",
  "details": "📐 Working on design",
  "state": "Designing in Figma",
  "largeImageKey": "figma",
  "largeImageText": "Figma"
}
```

### Customize Status Text

Run setup again or edit `config.json` manually.

### Change Update Interval

Edit `src/index.js`:

```javascript
this.UPDATE_INTERVAL = 15000; // Change this (in milliseconds)
```

---

## 🛠️ Troubleshooting

### Status not showing?

1. **Check Discord Privacy Settings**
   ```
   Discord → Settings → Activity Privacy
   → Enable "Display current activity as a status message"
   ```

2. **Restart Discord** and wait 30 seconds

3. **Verify configuration**
   ```bash
   figmaway config
   ```

### Figma not detected?

1. **Make sure Figma is running** (Desktop or Browser)
2. **Open a file** (not just homepage)
3. **Test detection**:
   ```bash
   figmaway test
   ```

### Image not showing?

1. **Check image name** - Must be `figma` (lowercase)
2. **Wait 10 minutes** - Discord needs time to propagate
3. **Restart application**

### Auto-reconnect not working?

The application automatically checks connection every 30 seconds. If Discord is running and internet is back, it will reconnect automatically. Check terminal for:

```
🔄 Attempting to reconnect to Discord...
✅ Successfully reconnected to Discord!
```

---

## 📁 Project Structure

```
figma-auto-presence/
├── bin/
│   └── cli.js              # CLI interface
├── src/
│   ├── utils/
│   │   └── window.js       # Window detector
│   ├── activity.js         # Discord RPC manager
│   ├── config.js           # Configuration manager
│   └── index.js            # Main application
├── package.json
└── README.md
```

---

## 💡 Tips

- Keep Discord and Figma open while running
- Use Discord Desktop for best results
- Program runs in foreground - keep terminal open
- File names longer than 45 characters will be truncated
- Updates happen every 15 seconds

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details

Copyright (c) 2025 [@uwayxt](https://github.com/uwayxt)

---

## 🔗 Links

- **GitHub**: https://github.com/uwayxt/figma-auto-presence
- **NPM**: https://www.npmjs.com/package/figma-auto-presence
- **Issues**: https://github.com/uwayxt/figma-auto-presence/issues

---

## 💖 Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing code

---

**Made with ❤️ by [@uwayxt](https://github.com/uwayxt)**

*Happy designing! 🎨*