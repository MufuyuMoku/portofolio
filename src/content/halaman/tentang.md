---
judul: Tentang
kicau: Cara kerja — Alat — Kontak
---

## Posisi

Siswa SMK jurusan Rekayasa Perangkat Lunak. Yang aku bangun adalah alat:
aplikasi desktop yang memegang berkas orang dan harus tetap benar saat ditutup
mendadak, situs yang tetap jalan tanpa internet, alat untuk suara, dan server
kecil di rumah.

Web sering jadi lapisan gambarnya — SvelteKit di dalam webview Tauri, atau
Astro untuk situs statis — tetapi keadaan dan aturannya ada di sisi program:
mesin audio Rust di Onsa, aturan game di KyuSin, mesin pencari yang berjalan
di perangkat pada Saku Pajak. Itu sebabnya aku tidak menyebut diri *web &
mobile developer*: pekerjaannya ada di sisi program, bukan di sisi halaman.

Di luar kode aku juga menulis: naskah desain game, novel, cerpen, dan lirik
lagu. Tulisan-tulisan itu punya bagian sendiri di beranda.

Karya-karya ini dibuat di bawah **Pyonkuro**, studio dan bengkel pribadiku.

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
bagian yang menentukan bentuknya: spesifikasi ditulis lebih dulu, keputusan
lingkup diambil olehku, milestone dikerjakan berurutan, dan tiap milestone
hanya aku terima kalau klaimnya bisa ditunjuk buktinya — tes yang jalan, atau
pemeriksaan yang bisa diulang orang lain. Keputusan yang diambil di sepanjang
jalan dicatat beserta alasannya, dan catatan itu bagian dari pekerjaannya:
[`docs/DECISIONS.md`](https://github.com/MufuyuMoku/onsa/blob/main/docs/DECISIONS.md)
di Onsa,
[`docs/DECISIONS.md`](https://github.com/MufuyuMoku/tax/blob/main/docs/DECISIONS.md)
di Saku Pajak — tiap keputusan bernomor, dan tesnya gagal kalau ada nomor yang
dirujuk tapi tidak tercatat — dan
[`docs/devlog/`](https://github.com/MufuyuMoku/cit/tree/main/docs/devlog)
di CIT, satu catatan per milestone, berisi apa yang dibangun, bug yang
ketahuan, dan apa yang membuatnya ketahuan.

## Alat

Rust dan Tauri 2 untuk aplikasi desktop — Onsa dan KyuSin. Go untuk CIT
(dengan Wails) dan untuk sistem produksi saat PKL. SvelteKit dan TypeScript
untuk antarmuka. Astro untuk situs statis — Saku Pajak dan situs ini — dengan
Python untuk pipa data Saku Pajak. C# dan .NET dengan Avalonia di VocaVoca,
mengikuti OpenUtau. Armbian, Docker, dan systemd untuk server rumahan. SQLite
untuk penyimpanan lokal. Git untuk semuanya.
