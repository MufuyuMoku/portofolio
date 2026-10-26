---
# ---------------------------------------------------------------------------
# Isi halaman ini diambil dari repo MufuyuMoku/lighthouse (privat) per 25 Oktober
# 2026: SPEC.md, PROGRESS.md, DECISIONS.md, ASSETS.md, LICENSE. Repo privat,
# jadi tidak ada tautan repositori.
# Inspirasi VTuber hanya disebut umum; jangan memakai nama, art, atau logo
# resminya (aturan proyek). Jangan menyalin identitas git dari DECISIONS.md.
# ---------------------------------------------------------------------------
judul: SS Lighthouse
kode: "06"
kelompok: dimeja
jenis: Aplikasi desktop — ruang istirahat
urutan: 6
ringkas: Ruang istirahat pribadi berbentuk aplikasi desktop — sebuah mercusuar di tepi laut untuk fokus, beristirahat, mendengarkan radio, dan mencatat. Lokal sepenuhnya, tanpa akun.
status: Dikerjakan — M0 selesai · Okt 2026
keadaan: dikerjakan
periode: Oktober 2026 — berjalan
peran: Spesifikasi, keputusan lingkup, dan verifikasi tiap milestone; implementasi dengan Claude Code
platform: Desktop — Windows dan Linux
tumpukan:
  - Tauri 2
  - Rust
  - SvelteKit
  - TypeScript
  - SQLite
catatan: Repo-nya privat. Baru fondasinya yang dibangun.

spek:
  - label: Milestone selesai
    nilai: "1 / 10"
    catatan: M0 fondasi, 25 Oktober 2026. M1–M9 belum dimulai.
---

## Apa ini

SS Lighthouse adalah "ruang istirahat" pribadi berbentuk aplikasi desktop.
Penggunanya adalah penjaga sebuah mercusuar di tepi laut. Saat bekerja, lampu
mercusuar menyala dan berputar menyapu laut. Saat istirahat, ia turun ke
dermaga dan mendayung perahu ke arah senja. Setiap sesi fokus yang selesai
meninggalkan sebuah kerang untuk dikoleksi. Di meja ada radio yang menangkap
siaran sungguhan, dan buku catatan penjaga untuk menulis dan mencoret-coret.

Suasananya terinspirasi *lore* seorang VTuber — penjaga mercusuar, kolektor
kerang, perahu dayung — tapi hanya lewat simbol dan suasana, tanpa nama, art,
atau logo resminya.

## Prinsip

- **Tenang dulu, fitur kemudian.** Tidak ada notifikasi yang mengganggu dan
  tidak ada angka statistik yang bikin stres. Sesi yang dihentikan di tengah
  jalan hanya membuat lampu meredup, tanpa pesan menegur.
- **Lokal sepenuhnya.** Tanpa akun dan tanpa server; internet hanya dipakai
  untuk radio.
- **Ringan**, supaya nyaman dibiarkan menyala berjam-jam di latar.

## Yang direncanakan untuk v1

Pemandangan 3D low-poly yang dirender ke resolusi rendah lalu diperbesar,
dengan palet terbatas dan *dithering*. Langit mengikuti jam laptop dan cuaca
berganti perlahan. Mode fokus "Jaga Lampu" dan mode istirahat "Perahu", rak
kerang yang bentuk dan warnanya ditentukan lama sesi, jam, dan cuaca, buku
catatan harian dengan lapisan teks dan coretan pena, radio internet, mixer
suara ambien, serta jendela mini dan tray.

## Status

Baru M0 yang selesai (25 Oktober 2026): proyek Tauri 2 dan SvelteKit, SQLite
dengan migrasi awal dan tesnya, jendela kosong berlatar warna malam, palet dan
huruf yang dibundel lokal, serta CI build untuk Windows dan Linux. Ikon
mercusuarnya belum dibuat. Sembilan milestone berikutnya — dari pemandangan
dasar sampai pengaturan — belum dimulai.
