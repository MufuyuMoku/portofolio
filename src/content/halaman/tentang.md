---
judul: Tentang
kicau: Cara kerja — Alat — Kontak
---

## Posisi

Siswa SMK jurusan Rekayasa Perangkat Lunak. Yang aku bangun adalah aplikasi
desktop: program yang dipasang di mesin orang, memegang berkas orang, dan
harus tetap benar saat ditutup mendadak.

Aku memakai web sebagai lapisan gambar — SvelteKit di dalam webview Tauri
atau Wails — tetapi keadaan dan aturan aplikasi ada di Rust atau Go. Itu
sebabnya aku tidak menyebut diri *web & mobile developer*: pekerjaannya ada
di sisi program, bukan di sisi halaman.

## Cara kerja

1. **Spesifikasi tertulis dulu.** Daftar perilaku yang harus benar, ditulis
   sebelum antarmuka dibuat. Dokumen ini yang menentukan apa artinya selesai.
2. **Milestone yang bisa dicek.** Tiap tahap punya batas isi yang jelas dan
   hanya ditutup kalau ujinya lulus.
3. **Invarian, bukan sekadar fitur.** Aturan yang tidak boleh dilanggar
   ditulis terpisah dan dijaga uji otomatis.
4. **Uji yang menjalankan siklus penuh.** Bukan hanya fungsi kecil: pindai,
   simpan, tutup, buka lagi, periksa.

Implementasinya aku kerjakan dengan Claude Code. Yang aku pegang adalah
bagian yang menentukan bentuknya: spesifikasi ditulis lebih dulu, milestone
dikerjakan berurutan, dan tiap milestone hanya aku terima kalau klaimnya bisa
ditunjuk buktinya — tes yang jalan, atau pemeriksaan yang bisa diulang orang
lain. Keputusan yang diambil di sepanjang jalan dicatat beserta alasannya, dan
catatan itu bagian dari pekerjaannya:
[`docs/DECISIONS.md`](https://github.com/MufuyuMoku/onsa/blob/main/docs/DECISIONS.md)
di Onsa, dan [`docs/devlog/`](https://github.com/MufuyuMoku/cit/tree/main/docs/devlog)
di CIT — satu catatan per milestone, berisi apa yang dibangun, bug yang
ketahuan, dan apa yang membuatnya ketahuan.

## Alat

Rust dan Go untuk sisi program. SvelteKit dan TypeScript untuk antarmuka.
Tauri 2 dan Wails untuk membungkusnya jadi aplikasi desktop. SQLite untuk
penyimpanan lokal. Git untuk semuanya.
