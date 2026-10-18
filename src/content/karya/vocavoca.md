---
# ---------------------------------------------------------------------------
# Isi halaman ini diambil dari repo MufuyuMoku/vocavoca (privat) per 10 Oktober
# 2026: LICENSE.txt, CLAUDE.md, dan docs/rancangan/ (01-visi, 04-urutan-
# pengerjaan, 05-keputusan, 06-pertanyaan-terbuka). Repo privat, jadi tidak
# ada tautan repositori. Atribusi OpenUtau wajib tetap ada.
# ---------------------------------------------------------------------------
judul: VocaVoca
kode: "03"
kelompok: dimeja
jenis: Aplikasi desktop — audio
urutan: 3
ringkas: Pembuat voicebank UTAU, turunan OpenUtau. Tujuannya cukup membaca script yang disiapkan aplikasi, lalu voicebank-nya jadi sendiri. Tahap pertama sudah terbukti dengan voicebank dari suaraku sendiri.
status: Menunggu — Tahap 1 selesai, menunggu rekaman vokal
keadaan: menunggu
periode: Oktober 2026 — berjalan
peran: Spesifikasi, keputusan lingkup, verifikasi, dan rekaman suara; implementasi dengan Claude Code
platform: Desktop — Windows x64 (paket uji)
tumpukan:
  - C#
  - .NET
  - Avalonia
  - OpenUtau (MIT)
catatan: Repo-nya privat. Kode dasarnya OpenUtau © 2014 StAkira, berlisensi MIT; berkas lisensi dan pemberitahuan hak ciptanya disertakan utuh.

spek:
  - label: Baris reclist uji
    nilai: "19"
    catatan: Reclist CV Jepang dasar untuk voicebank uji "Myu".
  - label: Sampel jadi
    nilai: "101"
    catatan: Dipotong dan ditandai otomatis; 10 ditandai untuk diperiksa (batas dengung n/m ke vokal).
  - label: Latency terkalibrasi
    nilai: "176 ms"
    catatan: 12 dari 12 ketukan kalibrasi terpakai.

tautan:
  - label: OpenUtau
    href: https://github.com/stakira/OpenUtau
---

## Apa ini

VocaVoca membuat voicebank UTAU dari suara sendiri: aplikasi menampilkan
script yang sudah disiapkan, pemakainya cukup membaca atau merekam sesuai yang
diminta, lalu voicebank-nya terbentuk otomatis — dipotong, ditandai, dan siap
dipakai.

Membuat voicebank UTAU dengan cara biasa melelahkan: mencari reclist sendiri,
merekam dan menamai satu per satu, lalu oto-ing manual yang panjang. Aku
sendiri pernah batal membuatnya karena itu. VocaVoca dibuat untuk memotong
jalan itu.

Prinsip yang dipegang:

- **Tetap terdengar seperti voicebank.** Identitas voice synthesizer
  dipertahankan. Ini bukan kloning suara berbasis model AI.
- **Otomatis memberi hasil awal, manual menyempurnakan.** Setiap hasil
  otomatis bisa diutak-atik.
- **Ringan.** Fungsi intinya harus jalan di laptop biasa, tanpa wajib kartu
  grafis.
- **Semua yang ada di OpenUtau tetap ada**, termasuk kompatibilitas dengan
  voicebank UTAU.

## Turunan OpenUtau

VocaVoca adalah turunan (fork) dari
[OpenUtau](https://github.com/stakira/OpenUtau), editor vokal sintesis untuk
komunitas UTAU, karya StAkira dan para kontributornya, berlisensi MIT. Karena
itu stack-nya mengikuti OpenUtau: C#/.NET dengan Avalonia. Piano roll, mesin
suara, dan kompatibilitas UTAU tidak ditulis ulang; yang ditambahkan adalah
jalan dari rekaman ke voicebank.

Berkas `LICENSE.txt` dan pemberitahuan hak cipta OpenUtau wajib disertakan utuh
tanpa diubah, di repo maupun di aplikasinya. Pembaruan dari OpenUtau resmi
ditarik lewat remote `upstream`, dan pemeriksa pembaruan bawaan yang menunjuk
ke rilis OpenUtau resmi dimatikan supaya tidak menimpa VocaVoca.

## Tahap 1: terbukti

Tahap pertama — perekam dan auto-oto — dianggap selesai kalau membaca script
menghasilkan voicebank Jepang CV yang bisa dipakai di OpenUtau. Itu tercapai
pada 10 Oktober 2026 dengan voicebank uji **"Myu"**, direkam dari suaraku
sendiri:

- **Perekam terpandu**: metronom dan nada panduan, kalibrasi latency, dan
  rekam ulang per baris tanpa mengganggu baris lain.
- **Auto-oto dan "Buat Voicebank"**: 101 sampel jadi dari 19 baris reclist;
  10 ditandai untuk diperiksa. Semua nilainya tetap bisa dirapikan di editor
  oto.
- **Proyek uji** yang mengikuti nada rekaman, bisa dirender, dan bunyinya
  sesuai rekaman.
- **Kompatibel ke luar**: voicebank Myu terbaca dan bernyanyi di OpenUtau
  resmi (0.1.573-beta), proyek ujinya terbuka di sana, dan bunyinya sama
  dengan di VocaVoca.
- **Paket Windows x64** yang jalan tanpa perlu memasang .NET SDK.

Batasnya, apa adanya: baru voicebank **CV** Jepang dasar. Bising rekaman sesi
Myu masih −42 sampai −49 dB, sedangkan target untuk rilis di bawah −60 dB.
Konsonan letup saat not bersambung masih kurang tajam. Rilis stabil OpenUtau
0.1.565 belum bisa membuka berkas proyeknya, walau voicebank-nya tetap bisa
dipakai di sana.

## Berikutnya

CVVC dan Tahap 2 (auto tuning), dikerjakan bersamaan:

- **Sampel peralihan CVVC.** Voicebank CV hanya punya sampel "konsonan dari
  diam". Peralihan vokal ke konsonan yang alami saat not bersambung hanya bisa
  didapat dari sampel yang memang merekam peralihan itu — dan ini wajib untuk
  paket bahasa Inggris.
- **Tahap 2: auto tuning.** Voicebank dari Tahap 1 bernyanyi dari not yang
  digambar di piano roll, dan auto tuning memberi garis nada awal yang tetap
  bisa diatur tangan.

Urutan sesudahnya sudah ditulis, tanpa estimasi waktu: variasi profil suara,
pintu teks (mengetik kalimat lalu voicebank berbicara), pintu cover, dan
filter suara real-time. Voicebank hasil VocaVoca juga direncanakan jadi suara
[Project Nor-4](/portofolio/karya/nor-4/).
