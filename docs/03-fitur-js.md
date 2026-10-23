# Rancangan Fitur Interaktif JavaScript

## 1. Tombol "Sapa Saya"
- **Trigger:** Tombol diklik oleh pengunjung.
- **Logika:**
  - Membaca jam / waktu saat ini di browser.
  - Menampilkan pesan salam otomatis (Selamat Pagi / Siang / Malam) beserta ucapan selamat datang kustom.

## 2. Mode Gelap & Terang (Dark Mode Toggle)
- **Trigger:** Tombol ikon bulan / matahari di navbar diklik.
- **Logika:**
  - Mengubah *class* `dark` pada elemen `<html>` atau `<body>`.
  - Mengubah skema warna background dan teks secara instan.

## 3. Validasi Form Kontak
- **Trigger:** Tombol "Kirim Pesan" pada form diklik.
- **Logika:**
  - Memeriksa apakah input Nama, Email, dan Pesan sudah terisi.
  - Menampilkan notifikasi sukses kirim pesan tanpa *reload* halaman (*event.preventDefault()*).
