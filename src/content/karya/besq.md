---
# ---------------------------------------------------------------------------
# Halaman pengalaman kerja. Tanpa repositori publik dan tanpa tangkapan layar.
# Tidak ada apa pun di berkas ini tentang infrastruktur internal perusahaan.
# ---------------------------------------------------------------------------
judul: Besq Sarana Abadi
kode: "03"
kategori: pengalaman
urutan: 3
ringkas: Sistem informasi manajemen produksi pabrik, dikerjakan saat praktik kerja lapangan. Backend Go dengan Gin dan GORM, antarmuka SvelteKit, dan operator masuk dengan memindai QR di mesin.
status: Praktik kerja lapangan
keadaan: selesai
periode: 5 Januari – 22 Juni 2026
peran: Peserta PKL — pengembang full-stack
perusahaan: PT Besq Sarana Abadi
lokasi: Bekasi, Jawa Barat
tumpukan:
  - Go
  - Gin
  - GORM
  - SQLite
  - JWT
  - SvelteKit (Svelte 5 Runes)
  - Chart.js
  - jsQR
catatan: Tanpa repositori publik dan tanpa tangkapan layar — kode dan tampilannya milik perusahaan.
---

## Konteks penempatan

PT Besq Sarana Abadi adalah manufaktur karet dan pelapisan permukaan logam,
bersertifikat ISO 9001:2015. Pabriknya berjalan 24 jam dalam tiga shift.

Pencatatan produksi masih manual. Dua hal yang paling rawan salah: perhitungan
Laporan Waktu Produksi (LWP) harian, dan perekaman durasi berhentinya lini
mesin — *line stop*.

## Yang dikerjakan

Sistem informasi manajemen produksi pabrik berbasis web, dikerjakan full-stack
dari skema basis data sampai antarmuka operator di lantai produksi.

Di luar perangkat lunak, lingkup pekerjaannya juga mencakup pemeliharaan
konfigurasi jaringan internal perusahaan. Rinciannya tidak ditulis di sini.

## Bentuk sistemnya

Backend Go dengan Gin dan GORM di atas basis data SQLite. Autentikasi memakai
JWT, dengan hak akses berjenjang: Admin, Manajer, Team Leader, dan Operator.
Frontend SvelteKit memakai Svelte 5 Runes.

Operator masuk ke sistem dengan memindai QR yang tertempel di mesin fisik —
dibaca lewat jsQR di peramban — lalu mencatat cycle time, mengirim entri produk
cacat (NG), dan mengirim LWP. Level manajerial mendapat dashboard grafik.

## Keputusan dan batasan

Dua masalah muncul setelah sistem benar-benar dipakai, bukan saat dikembangkan.

**Token yang kedaluwarsa membuat sistem berhenti mengenali operator di tengah
shift.** Ini bukan kegagalan yang terlihat sebagai kegagalan: token JWT yang
habis masa berlakunya membuat permintaan berikutnya ditolak, sementara
antarmuka tetap terbuka seperti biasa — operator sedang di tengah shift, di
depan mesin, dan tidak punya cara tahu bahwa yang dia kirim tidak diterima.

Diselesaikan dengan *global fetch interceptor*: satu tempat yang memeriksa
setiap respons dari backend, menangkap 401, membersihkan memori lokal, dan
mengembalikan pengguna ke halaman login. Penanganannya diletakkan di satu
tempat, bukan di tiap pemanggilan, supaya tidak ada permintaan yang bisa
terlewat menanganinya.

**Penyimpanan laporan harian bercampur dengan log parameter master.** Keduanya
tersimpan lewat jalur kueri yang tidak terpisah tegas, dan percampuran itu
menghasilkan data yang salah — bukan galat yang muncul di layar, melainkan
angka yang terbaca wajar padahal bukan angka yang dimaksud. Kuerinya dirapikan
sampai kedua hal itu terpisah tegas.

## Hasil dan serah terima

Performa akhir sistem diuji oleh pembimbing industri.

Di akhir masa kegiatan, basis kode dan hak akses administrator diserahkan ke
tim teknologi informasi perusahaan.
