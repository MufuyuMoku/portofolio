---
# ---------------------------------------------------------------------------
# Isi halaman ini diambil dari repo github.com/MufuyuMoku/home per 29 September
# 2026: README.md, CLAUDE.md, docs/log.md, docs/hardware.md, dan
# docs/rancangan-backup.md. Keterangan Stardance (Hack Club) dari brief Fata;
# tidak tertulis di repo.
# PRIVASI: jangan menulis alamat IP, port, domain, kode undangan, nama akun,
# atau susunan jaringan apa pun di sini.
# 18 Oktober 2026: rencana Landship/VTLS dilebur ke HOME dan Nor-4 (keputusan Fata).
# ---------------------------------------------------------------------------
judul: Project HOME
kode: "07"
kelompok: dimeja
jenis: Server rumahan — homelab
urutan: 7
ringkas: High Operative Management Environment — server mini pribadi di STB bekas berprosesor ARM. Empat layanan berjalan di Docker, backup harian terenkripsi sudah lulus uji pemulihan, dan semuanya bisa dibangun ulang dari isi repo.
status: Istirahat — Fase 0 dan 1 selesai
keadaan: istirahat
periode: September 2026 — berjalan
peran: Spesifikasi, keputusan lingkup, dan verifikasi tiap langkah; implementasi dengan Claude Code
platform: STB Fiberhome HG680P — Armbian (arm64)
tumpukan:
  - Armbian (Ubuntu 24.04)
  - Docker Compose
  - systemd
  - restic
  - Bash
catatan: Proyek Stardance (Hack Club).

spek:
  - label: Layanan berjalan
    nilai: "4"
    catatan: Sekitar 650 MB RAM untuk keempat container setelah boot, dari sekitar 1,9 GB.
  - label: Boot sampai SSH
    nilai: "40 s"
    catatan: Diukur dari laptop saat uji reboot terkendali.
  - label: Berkas /boot berubah
    nilai: "0"
    catatan: md5 168 berkas identik sebelum dan sesudah upgrade 227 paket.

tautan:
  - label: Kode di GitHub
    href: https://github.com/MufuyuMoku/home
---

## Apa ini

Project HOME — *High Operative Management Environment* — adalah homelab
pribadi di sebuah STB bekas: Fiberhome HG680P dengan Amlogic S905X, empat inti
Cortex-A53, dan RAM sekitar 1,9 GB, menjalankan Armbian. Sistemnya di eMMC
7,3 GB; datanya di microSD 128 GB.

Repo-nya adalah **sumber kebenaran**: semua yang terpasang di STB harus bisa
dibangun ulang dari isi repo — skrip fondasi, konfigurasi, berkas compose
tiap layanan, dan panduan pemulihan. Semua layanan hanya untuk jaringan
lokal; tidak ada yang dibuka ke internet.

Terdaftar sebagai proyek Stardance (Hack Club).

## Batasan yang membentuk semuanya

STB ini tidak punya HDMI. Kalau boot atau SSH rusak, satu-satunya jalan
kembali adalah flashing ulang dari nol. Dari situ aturannya:

- **Kernel, DTB, bootloader, dan `/boot` tidak pernah disentuh.** Paket yang
  menulis ke `/boot` ditahan, initramfs dibekukan, dan update otomatis
  dimatikan. Upgrade 227 paket dibuktikan aman dengan membandingkan md5 168
  berkas `/boot` sebelum dan sesudahnya — identik.
- **Setiap perubahan SSH atau jaringan wajib memakai timer rollback
  otomatis**, supaya kesalahan konfigurasi membatalkan dirinya sendiri.
- **Reboot hanya dengan izin**, dan hanya setelah tabel mount terverifikasi.

## Yang sudah berjalan

Fase 0 (fondasi) dan Fase 1 (empat layanan) selesai dan lulus uji reboot
pada 28 September 2026:

| Layanan | Fungsi |
| --- | --- |
| Homepage | Dasbor: tautan ke semua layanan, plus CPU, RAM, dan suhu STB |
| Uptime Kuma | Memantau hidup-matinya layanan dan backup |
| Gitea | Server Git pribadi, mencerminkan repo GitHub |
| FileBrowser Quantum | Pengelola berkas web untuk folder data |

Tiap image di-pin ke versi yang mendukung arm64 dan diberi batas memori.
Semua layanan menyala sendiri setelah reboot, dan Docker baru mulai setelah
kartu data terpasang. FileBrowser versi asli sengaja tidak dipakai karena
proyeknya diarsipkan tanpa patch keamanan.

Keamanannya: SSH hanya dengan kunci, tidak ada container yang mendapat akses
ke soket Docker, layanan bawaan yang tidak dipakai dimatikan, dan tidak ada
satu pun password di repo.

## Backup yang sudah dibuktikan

Backup harian terenkripsi (restic) ke laptop berjalan sejak 29 September,
dengan pemeriksaan integritas mingguan dan monitor yang memerah kalau tidak
ada backup sukses dalam 26 jam. Backup baru dianggap ada setelah **uji
pemulihannya lulus** — dan langkah pemulihannya ditulis jadi panduan di repo.

Jalannya tidak mulus, dan itu tercatat: skrip penyiapan laptop gagal dua kali
sebelum benar, dan kombinasi alat backup pertama ternyata tidak cocok dengan
server SFTP di Windows, jadi jalurnya diganti.

## Satu kegagalan yang tercatat

Saat microSD hendak diformat lewat slot SD bawaan STB, perintah penghapusan
gagal dengan I/O error. Pekerjaan dihentikan dan dilaporkan, dan kartunya
tidak disentuh lagi sampai diuji terpisah di laptop: 118.875 MB ditulis dan
diverifikasi tanpa error. Kartunya sehat — yang bermasalah slot SD STB. Kartu
yang sama lalu dipasang lewat card reader USB, dan slot SD bawaan dicoret dari
pemakaian lewat aturan tertulis.

Setiap perubahan dicatat di log dengan tanggal, apa yang dilakukan, dan
alasannya, termasuk yang gagal.

## Dari Landship

Landship dulu kurencanakan sebagai proyek sendiri: "markas" untuk semua
karyaku, dengan sistem bernama VTLS — Vault Tracking & Log System — yang
mencatat pekerjaan dan menyusun devlog secara otomatis. Rencana itu tidak
lagi berdiri sendiri; idenya dilebur ke Project HOME dan Project Nor-4.

## Belum dikerjakan

- Jurnal sistem yang bertahan setelah reboot.
- Firewall dan akses jarak jauh — dirancang terpisah.
- Salinan backup ketiga di luar laptop.
