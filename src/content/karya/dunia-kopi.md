---
# ---------------------------------------------------------------------------
# Isi halaman ini diambil dari repo MufuyuMoku/duniakopi (privat) per 25 Oktober
# 2026: README.md, SPEC.md, PROGRESS.md, DECISIONS.md (termasuk pertanyaan
# terbuka), docs/visual/LIGHTHOUSE.md, dan daftar PR #1–#16.
# PRIVASI: jangan menyebut siapa pengelola tokonya, hubungan keluarga, lokasi
# toko fisik, atau domain lama. Situs belum tayang: jangan menautkan domain.
# Angka tes dari PROGRESS.md per upgrade SvelteKit 3 (sebelum revisi visual).
# ---------------------------------------------------------------------------
judul: Dunia Kopi
kode: "05"
kelompok: dimeja
jenis: Situs web — toko online
urutan: 5
ringkas: Toko online satu penjual untuk toko kopi Dunia Kopi — katalog, keranjang, checkout tanpa akun, pembayaran QRIS, dan pelacakan pesanan, ditambah panel untuk admin dan staf. Sudah dibangun, belum tayang.
status: Menunggu — dibangun, belum tayang; menunggu hosting dan data toko · Okt 2026
keadaan: menunggu
periode: Oktober 2026
peran: Spesifikasi, keputusan lingkup, dan persetujuan tiap milestone; implementasi dengan Claude Code
platform: Web — HP dan desktop
tumpukan:
  - SvelteKit
  - Svelte 5
  - TypeScript
  - PostgreSQL
  - Drizzle ORM
  - Vitest
  - Playwright
  - Docker
catatan: Repo-nya privat dan situsnya belum tayang. Kaki halamannya memuat kredit "dibuat oleh Pyonkuro".

spek:
  - label: Tes unit
    nilai: "141"
    catatan: Per upgrade SvelteKit 3, lulus di PGlite dan PostgreSQL 16. Revisi visual sesudahnya menambah tes baru.
  - label: Tes end-to-end
    nilai: "68"
    catatan: Playwright, profil HP dan desktop, di PGlite dan PostgreSQL 16.
  - label: Aksesibilitas Lighthouse
    nilai: "100"
    catatan: Profil mobile, lima halaman toko; performa 96–98. Diukur dengan data contoh fiktif tanpa foto produk.
---

## Apa ini

Toko online untuk satu penjual kopi — Arabica, Robusta, dan Blend — dengan
alur belanja yang sudah dikenal orang dari marketplace: katalog, keranjang,
checkout, bayar, lalu lacak status pesanan. Bedanya, hanya ada satu toko, dan
pembeli tidak perlu mendaftar.

Pembeli mengetik sendiri berapa gram yang dibeli, memilih biji atau bubuk,
dan untuk bubuk memilih tingkat gilingannya — tubruk, V60, espresso, atau
french press. Harga dan ongkos kirim dihitung di server per 100 gram dan per
kilogram per zona; harga dari browser tidak pernah dipercaya.

## Prinsip

- **Data pembeli seminimal mungkin:** nama, nomor HP, dan alamat kirim. Data
  pesanan lama dianonimkan otomatis.
- **Checkout tanpa akun.** Pesanan dilacak lewat kode pesanan dan nomor HP.
- **Pembayaran tetap jalan tanpa gateway.** QRIS statis dengan konfirmasi
  manual selalu tersedia sebagai cadangan Midtrans.
- **Tanpa analitik pihak ketiga dan tanpa pelacak.**
- **Nyaman di HP**, karena sebagian besar pembeli diasumsikan memakai HP.

## Yang dibangun

Semua milestone M0 sampai M7 selesai, masing-masing lewat pull request:

| Milestone | Isi |
| --- | --- |
| M1 | Katalog publik dan perhitungan harga |
| M2 | Panel admin: login dengan batas percobaan, peran admin dan staf, produk, foto, stok |
| M3 | Keranjang dan checkout; stok ditahan tanpa bisa minus walau dipesan bersamaan, dan dikembalikan tepat sekali bila pesanan kedaluwarsa |
| M4 | Pembayaran: QRIS manual dan Midtrans, dengan webhook yang diverifikasi dan idempoten |
| M5 | Manajemen pesanan, riwayat status, resi, daftar siap-siapkan yang bisa dicetak |
| M6 | Pengerasan: tes alur belanja penuh, matriks otorisasi per peran, CSRF, CSP ketat |
| M7 | Revisi sesuai jawaban klien: berat bebas, gilingan per item, khusus pesanan dikirim |

Sesudahnya proyek ini dinaikkan ke SvelteKit 3, lalu tampilannya dirombak
dalam enam tahap: audit, sistem desain, beranda dan katalog dengan saringan,
halaman detail produk, keranjang dan checkout tiga langkah, lalu foto WebP
responsif dan SEO.

## Status, apa adanya

Kodenya selesai, tapi situsnya belum tayang. Yang masih ditunggu ada di luar
kode: pilihan hosting, akun pembayaran, teks kebijakan privasi dan syarat yang
masih draf, data toko, dan tarif kirim. Pembayaran Midtrans baru diuji
terhadap server tiruan; tes dengan sandbox sungguhan menunggu kuncinya. Skor
Lighthouse juga perlu diukur ulang setelah foto produk asli masuk.
