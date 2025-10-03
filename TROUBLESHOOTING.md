# 🔧 Troubleshooting Guide

Panduan lengkap untuk mengatasi masalah umum di Figma Presence.

## 🚨 Masalah Umum

### 1. Status Tidak Muncul di Discord

#### ✅ Solusi:

**A. Check Discord Privacy Settings**
```
Discord → Settings → Activity Privacy
→ ✓ Display current activity as a status message
```

**B. Restart Discord**
- Tutup Discord sepenuhnya (termasuk di system tray)
- Buka Discord lagi
- Tunggu 30 detik

**C. Verifikasi Connection**
```bash
figma-presence test
```

**D. Check Application ID**
```bash
figma-presence config
```
Pastikan Application ID benar (18-19 digit angka)

---

### 2. Figma Tidak Terdeteksi

#### ✅ Diagnosis:

```bash
figma-presence test
```

**Output Expected:**
```
✅ Figma is running!
📐 Current file: Your Design File Name
```

#### ✅ Solusi:

**A. Pastikan Figma Berjalan**
- Buka Figma Desktop ATAU
- Buka Figma di browser (tab aktif)

**B. Buka File Design**
- Jangan hanya di halaman home Figma
- Harus ada file yang benar-benar terbuka

**C. Platform-Specific Issues:**

**Windows:**
```powershell
# Check if Figma is running
tasklist | findstr "Figma"
```

**macOS:**
```bash
# Check if Figma is running
ps aux | grep -i figma
```

**Linux:**
```bash
# Install wmctrl if needed
sudo apt-get install wmctrl

# Check Figma
wmctrl -l | grep -i figma
```

---

### 3. Image/Logo Tidak Muncul

#### ✅ Solusi:

**A. Verifikasi Nama Image**
- Nama HARUS: `figma` (huruf kecil semua)
- Bukan: `Figma`, `FIGMA`, `figma-logo`, dll.

**B. Check di Discord Developer Portal**
1. https://discord.com/developers/applications
2. Pilih aplikasi Anda
3. Rich Presence → Art Assets
4. Pastikan ada image dengan nama: `figma`

**C. Tunggu Propagasi**
- Discord butuh 5-15 menit untuk propagasi image
- Restart program setelah 10 menit

**D. Re-upload Image**
- Hapus image lama
- Upload ulang dengan nama: `figma`
- Save Changes
- Tunggu 10 menit

---

### 4. Nama File Tidak Muncul

#### ✅ Check:

```bash
figma-presence test
```

**Jika output: "No file detected"**

**Solusi:**
1. Pastikan file Figma benar-benar terbuka (bukan halaman home)
2. Refresh tab browser (jika pakai web)
3. Restart Figma Desktop (jika pakai desktop)

**Jika output: "Figma not detected"**
- Lihat solusi #2 di atas

---

### 5. Update Terlalu Lambat/Cepat

#### ✅ Ubah Interval Update:

Edit `src/index.js`:

```javascript
// Line ~7
this.UPDATE_INTERVAL = 15000; // 15 detik (default)

// Ubah menjadi:
this.UPDATE_INTERVAL = 10000;  // 10 detik
this.UPDATE_INTERVAL = 30000;  // 30 detik
this.UPDATE_INTERVAL = 60000;  // 1 menit
```

Restart program untuk apply perubahan.

---

### 6. Error: "Failed to connect to Discord"

#### ✅ Solusi:

**A. Pastikan Discord Running**
```bash
# Windows
tasklist | findstr "Discord"

# macOS/Linux
ps aux | grep -i discord
```

**B. Restart Discord**
- Tutup sepenuhnya
- Buka lagi
- Tunggu sampai fully loaded

**C. Check Discord RPC**
- Discord Desktop lebih reliable daripada browser
- Gunakan Discord Desktop jika masalah persist

**D. Firewall/Antivirus**
- Whitelist aplikasi ini
- Izinkan koneksi loopback (127.0.0.1)

---

### 7. Error: "Not configured. Please run setup first"

#### ✅ Solusi:

```bash
figma-presence setup
```

Atau manual:
1. Copy `config.example.json` → `config.json`
2. Edit `config.json`
3. Isi `clientId` dengan Application ID

---

### 8. Status Stuck/Tidak Update

#### ✅ Solusi:

**A. Restart Program**
```bash
# Stop (Ctrl+C)
# Start lagi
figma-presence start
```

**B. Clear Discord Cache**
```
Discord → Settings → Advanced
→ Clear Cache
→ Restart Discord
```

**C. Check Logs**
Perhatikan pesan di terminal:
- `📐 File terdeteksi: ...` = Deteksi berhasil
- `❌ Figma not detected` = Figma tidak berjalan
- `✅ Connected to Discord RPC` = Koneksi OK

---

## 🐛 Debug Mode

Untuk debugging lebih detail:

```bash
# Enable verbose logging
DEBUG=* figma-presence start
```

Atau tambahkan logging di `src/index.js`:

```javascript
async checkAndUpdate() {
  console.log('[DEBUG] Checking Figma status...');
  const figmaStatus = await windowDetector.isFigmaRunning();
  console.log('[DEBUG] Figma status:', figmaStatus);
  // ... rest of code
}
```

---

## 📊 Platform-Specific Issues

### Windows

**Issue: PowerShell execution policy**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Issue: Figma window title tidak terdeteksi**
- Pastikan Figma Desktop versi terbaru
- Coba restart Figma

### macOS

**Issue: Permission denied**
```bash
# Give permissions
sudo chmod +x bin/cli.js
```

**Issue: osascript not working**
- Enable automation permissions:
  System Preferences → Security & Privacy → Automation
  → Allow Terminal/Node to control Figma

### Linux

**Issue: wmctrl not found**
```bash
# Ubuntu/Debian
sudo apt-get install wmctrl

# Fedora
sudo dnf install wmctrl

# Arch
sudo pacman -S wmctrl
```

---

## 🆘 Masih Bermasalah?

### Langkah Diagnostik Lengkap:

```bash
# 1. Test deteksi
figma-presence test

# 2. Check config
figma-presence config

# 3. Verify Discord running
ps aux | grep -i discord  # macOS/Linux
tasklist | findstr "Discord"  # Windows

# 4. Verify Figma running
ps aux | grep -i figma  # macOS/Linux
tasklist | findstr "Figma"  # Windows

# 5. Check Node version
node --version  # Should be v14+

# 6. Reinstall dependencies
rm -rf node_modules
npm install
```

### Laporkan Bug:

Jika masih bermasalah, buka issue dengan info:
1. **OS & Version**: Windows 11, macOS Sonoma, Ubuntu 22.04, dll.
2. **Node version**: `node --version`
3. **Output dari**: `figma-presence test`
4. **Error message**: Copy paste exact error
5. **Screenshot**: Discord Developer Portal (blur sensitive info)

---

## 💡 Tips Umum

1. **Selalu gunakan Discord Desktop** untuk hasil terbaik
2. **Biarkan Figma tetap terbuka** selama program berjalan
3. **Restart program** setelah switch file banyak
4. **Check logs** di terminal untuk info real-time
5. **Tunggu 15 detik** setelah ganti file untuk update

---

**Good luck! 🚀**