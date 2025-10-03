# 🚀 Quick Start Guide

**Figma Auto Presence** - by [@uwayxt](https://github.com/uwayxt)

Get started in 5 minutes!

---

## 📋 Prerequisites

- ✅ Node.js v14+ ([Download](https://nodejs.org/))
- ✅ Discord (Desktop/Browser, logged in)
- ✅ Figma (Desktop or Browser)

---

## ⚡ Installation

```bash
npm install -g figma-auto-presence
```

---

## 🔧 Setup (3 Steps)

### Step 1: Create Discord Application

1. Go to https://discord.com/developers/applications
2. Click **"New Application"**
3. Name it (e.g., "My Figma Status")
4. Copy the **Application ID**

### Step 2: Upload Logo

1. In same application → **"Rich Presence"** → **"Art Assets"**
2. Click **"Add Image"**
3. Upload Figma logo (or any image)
4. Name it: **`figma`** (lowercase!)
5. Click **"Save Changes"**

### Step 3: Configure

```bash
figmaway setup
```

Enter:
- Application ID (paste from Step 1)
- Status text (or press Enter for default)

---

## ▶️ Start

```bash
figmaway start
```

Done! Open Figma, open a file, and check your Discord profile! 🎉

---

## 📱 What You'll See

Discord Status:
```
🎨 Figma Logo
📐 Your File Name
⏰ 00:05:30 elapsed
```

---

## 🧪 Test First?

Check if Figma detection works:

```bash
figmaway test
```

---

## ❓ Problems?

### Status not showing?

**Enable Activity Privacy:**
```
Discord → Settings → Activity Privacy
→ Enable "Display current activity as a status message"
```

Restart Discord and wait 30 seconds.

### Figma not detected?

1. Make sure Figma is open
2. Open a design file (not homepage)
3. Run: `figmaway test`

### Image not showing?

1. Image name must be: **`figma`** (lowercase!)
2. Wait 10 minutes (Discord needs time)
3. Restart: `figmaway start`

### Lost internet connection?

No worries! The app will **auto-reconnect** when internet returns.

Check terminal for:
```
🔄 Attempting to reconnect to Discord...
✅ Successfully reconnected to Discord!
```

---

## 💡 Pro Tips

- ✅ Leave terminal open (program runs there)
- ✅ Auto-reconnect checks every 30 seconds
- ✅ Status updates every 15 seconds
- ✅ Works with multiple Figma files - switch anytime!
- ✅ Works on Desktop & Browser Figma

---

## 📝 Common Commands

```bash
figmaway start     # Start the app
figmaway test      # Test detection
figmaway setup     # Reconfigure
figmaway config    # View settings
figmaway help      # Show help
```

---

## 🎯 Full Documentation

For detailed guides, visit:
- 📖 [README.md](README.md) - Full documentation
- 🛠️ [SETUP_GUIDE.md](SETUP_GUIDE.md) - Step-by-step setup
- 🔧 [TROUBLESHOOTING.md](TROUBLESHOOTING.md) - Problem solving

---

## 🔗 Links

- **GitHub**: https://github.com/uwayxt/figma-auto-presence
- **NPM**: https://www.npmjs.com/package/figma-auto-presence

---

**Made with ❤️ by [@uwayxt](https://github.com/uwayxt)**

Happy designing! 🎨