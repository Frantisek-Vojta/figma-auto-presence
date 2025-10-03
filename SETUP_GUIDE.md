# 📖 Setup Guide - Langkah demi Langkah

Panduan lengkap setup Figma Presence dari nol sampai jalan!

---

## 📥 Step 1: Download & Install

### Clone Repository

```bash
git clone https://github.com/yourusername/figma-presence.git
cd figma-presence
```

### Install Dependencies

```bash
npm install
```

**Output yang diharapkan:**
```
added 50 packages, and audited 51 packages in 5s
✓ All dependencies installed successfully
```

---

## 🎮 Step 2: Setup Discord Application

### A. Buat Discord Application

1. **Buka Discord Developer Portal**
   - URL: https://discord.com/developers/applications
   - Login dengan akun Discord Anda

2. **Create New Application**
   - Klik tombol **"New Application"** (kanan atas)
   - Beri nama: `My Figma Status` (atau nama lain)
   - Klik **"Create"**

3. **Copy Application ID**
   - Anda akan melihat **"Application ID"** di halaman General Information
   - Contoh: `1234567890123456789` (18-19 digit)
   - **Copy ID ini** - Anda akan memerlukannya nanti!

---

### B. Upload Rich Presence Image

1. **Pergi ke Rich Presence**
   - Di sidebar kiri, klik **"Rich Presence"**
   - Klik sub-menu **"Art Assets"**

2. **Upload Image**
   - Klik **"Add Image(s)"**
   - Pilih gambar logo Figma (atau gambar custom Anda)
   - **PENTING**: Beri nama **`figma`** (huruf kecil semua!)
   
3. **Save Changes**
   - Klik **"Save Changes"** di bawah
   - Tunggu 5-10 menit untuk propagasi

**⚠️ Catatan Penting:**
- Nama HARUS `figma` (bukan `Figma`, `FIGMA`, atau lainnya)
- Format: PNG atau JPG
- Ukuran recommended: 512x512px atau 1024x1024px
- Max size: 5MB

---

## ⚙️ Step 3: Konfigurasi Aplikasi

### A. Jalankan Setup Wizard

```bash
npm run setup
```

Atau:

```bash
figma-presence setup
```

### B. Isi Konfigurasi

**Prompt 1: Application ID**
```
🔑 Enter your Application ID: 1234567890123456789
```
↳ Paste Application ID yang tadi Anda copy

**Prompt 2: Status Text (Opsional)**
```
💬 Status text (default: "Designing in Figma"): 
```
↳ Ketik text custom atau tekan **Enter** untuk default
↳ Contoh: "Creating magic ✨", "Working hard 🔥"

**Output:**
```
✅ Configuration saved successfully!

🎯 Next steps:
   1. Make sure Discord is running
   2. Open Figma (Desktop or Browser)
   3. Run: figma-presence start
```

---

## ✅ Step 4: Verifikasi Setup

### A. Check Configuration

```bash
figma-presence config
```

**Output expected:**
```
╔═══════════════════════════════════════════════════════════╗
║              Current Configuration                        ║
╚═══════════════════════════════════════════════════════════╝

🔑 Application ID: 1234567890123456789
💬 Status text: Designing in Figma
📐 Fallback details: 📐 Working on design
🖼️  Large image key: figma
🏷️  Large image text: Figma

💡 File name detection is AUTOMATIC!
   Your current Figma file will show as: 📐 [filename]
```

### B. Test Deteksi Figma

```bash
npm test
```

Atau:

```bash
figma-presence test
```

**Sebelum buka Figma:**
```
🔍 Testing Figma detection...

❌ Figma is not running
   Please open Figma Desktop or Figma in your browser
```

**Setelah buka Figma (dengan file):**
```
🔍 Testing Figma detection...

✅ Figma is running!
📐 Current file: Landing Page Design
```

---

## 🚀 Step 5: Jalankan Aplikasi

### A. Pastikan Prerequisites

**Checklist:**
- ✅ Discord Desktop sedang berjalan
- ✅ Figma Desktop ATAU Figma di browser terbuka
- ✅ Ada file Figma yang sedang dibuka (bukan halaman home)

### B. Start Figma Presence

```bash
npm start
```

Atau:

```bash
figma-presence start
```

**Output:**
```
╔═══════════════════════════════════════════════════════════╗
║            Starting Figma Presence...                    ║
╚═══════════════════════════════════════════════════════════╝

🚀 Starting Figma Presence...
⏱️  Update interval: 15 seconds
✅ Connected to Discord RPC
📐 File terdeteksi: Landing Page Design
📐 Updating status: Landing Page Design
✅ Figma Presence is now running
📊 Monitoring Figma activity...
Press Ctrl+C to stop
```

### C. Check Discord Profile

1. Buka Discord
2. Klik profile Anda atau lihat profile teman
3. Anda akan melihat Rich Presence:

```
🎨 Figma (logo yang Anda upload)
📐 Landing Page Design
⏰ 00:02:15 elapsed
```

---

## 🎯 Step 6: Test Switching Files

1. **Buka file Figma lain**
2. **Tunggu 15 detik**
3. **Check terminal:**

```
📐 File terdeteksi: Mobile App Design
📐 Updating status: Mobile App Design
```

4. **Check Discord** - Status berubah otomatis!

---

## 🔄 Step 7: Normal Usage

### Cara Penggunaan Sehari-hari:

1. **Buka Terminal**
2. **Navigate ke folder project**
   ```bash
   cd path/to/figma-presence
   ```
3. **Start aplikasi**
   ```bash
   npm start
   ```
4. **Biarkan berjalan di background**
5. **Bekerja seperti biasa di Figma**

**Tips:**
- Buka terminal di tab/window terpisah
- Minimize terminal, biarkan berjalan
- Status update otomatis setiap 15 detik
- Ganti file Figma kapanpun, status langsung ikut

### Stop Aplikasi:

```bash
Ctrl + C
```

**Output:**
```
🛑 Stopping Figma Presence...
🧹 Activity cleared
👋 Disconnected from Discord
✅ Figma Presence stopped
```

---

## 🎨 Step 8: Kustomisasi (Opsional)

### A. Ubah Status Text

```bash
figma-presence setup
```

Masukkan text baru saat ditanya.

### B. Ubah Image

1. Upload image baru di Discord Developer Portal
2. Beri nama: `figma`
3. Tunggu 10 menit
4. Restart aplikasi

### C. Ubah Update Interval

Edit `src/index.js`:

```javascript
// Line ~7
this.UPDATE_INTERVAL = 15000; // Ubah nilai ini

// Contoh:
this.UPDATE_INTERVAL = 10000;  // 10 detik
this.UPDATE_INTERVAL = 30000;  // 30 detik
```

Save dan restart aplikasi.

---

## 🎉 Done!

Sekarang Anda punya Figma Presence yang berjalan otomatis!

### Quick Commands Reference:

```bash
npm start              # Mulai aplikasi
npm test               # Test deteksi
npm run setup          # Setup ulang
figma-presence config  # Lihat konfigurasi
figma-presence help    # Lihat bantuan
```

---

## 🆘 Troubleshooting

Jika ada masalah, lihat file **TROUBLESHOOTING.md** untuk solusi lengkap.

**Masalah umum:**
- Status tidak muncul → Check Discord privacy settings
- Figma tidak terdeteksi → Pastikan file terbuka, bukan halaman home
- Image tidak muncul → Check nama image: harus `figma` (lowercase)

---

**Happy designing! 🎨✨**