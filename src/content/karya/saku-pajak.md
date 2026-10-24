---
# ---------------------------------------------------------------------------
# Isi halaman ini diambil dari repo github.com/MufuyuMoku/tax pada tag v1.5.1
# (23 Oktober 2026): docs/SPEC.md, docs/PROGRESS.md (v1.1.0–v1.5.1),
# docs/DECISIONS.md (K-084–K-101), poc/LAPORAN.md, dan corpus/meta.json.
# Angka uji coba pipa data PPh berasal dari poc/LAPORAN.md bagian 1, 4, dan 5.
# Privasi: jangan menyebut nama orang atau kantor tempat penggunanya bekerja.
# Repo berlisensi "semua hak dilindungi" (K-093): jangan tulis "open source".
# ---------------------------------------------------------------------------
judul: Saku Pajak
kode: "02"
kelompok: ditampilkan
jenis: Situs web — bisa dipasang, jalan tanpa internet
urutan: 2
ringkas: Pencari peraturan pajak Indonesia. Situs statis yang bisa dipasang di HP dan dipakai tanpa internet; pencariannya berjalan di perangkat, tanpa server. Bukan situs resmi pemerintah.
status: v1.5.1 — berjalan, dipakai pengguna nyata · pembaruan sedang dikerjakan · Okt 2026
keadaan: aktif
periode: September 2026 — berjalan
peran: Spesifikasi, keputusan lingkup, dan verifikasi tiap milestone; implementasi dengan Claude Code
platform: Browser — komputer dan HP (bisa dipasang sebagai aplikasi)
tumpukan:
  - Astro (statis)
  - JavaScript
  - Service worker
  - IndexedDB
  - pdf.js
  - Python (pipa data)
  - GitHub Pages

spek:
  - label: Dokumen
    nilai: "3.068"
    catatan: PPh 1.124, KUP 1.113, PPN 992, PBB 227, "Lainnya" 193, BPHTB 78, Bea Meterai 59 (satu dokumen bisa masuk lebih dari satu kategori). Dari corpus/meta.json.
  - label: Unit pasal
    nilai: "17.840"
    catatan: Batang tubuh yang sudah dipecah per pasal atau diktum, dari 1.789 dokumen yang berteks.
  - label: Status tidak pasti
    nilai: "560"
    catatan: Sumber-sumbernya saling bertentangan, jadi ditampilkan "tidak pasti" — bukan ditebak.
  - label: Halaman luring identik
    nilai: "23.707"
    catatan: Halaman yang dibuat di perangkat saat luring dibandingkan byte demi byte dengan halaman terbit.

tautan:
  - label: Situs
    href: https://mufuyumoku.github.io/tax/
  - label: Kode di GitHub
    href: https://github.com/MufuyuMoku/tax
---

## Apa ini

Saku Pajak melakukan satu hal: mencari peraturan pajak. Ketik pertanyaan,
dan yang keluar adalah pasal-pasal yang relevan, lengkap dengan status
keberlakuannya dan dari mana status itu berasal.

Bentuknya situs statis. Pencariannya berjalan di perangkat pemakainya — tidak
ada server, tidak ada akun, tidak ada telemetri, dan tidak ada permintaan
jaringan saat mencari. Karena hanya butuh browser, ia bisa dipakai di komputer
kantor yang tidak mengizinkan pemasangan aplikasi apa pun. Di HP, situs yang
sama bisa dipasang dan dipakai tanpa internet.

Situs ini **bukan situs resmi pemerintah**, dan itu tertulis di setiap
halamannya. Namanya tidak memakai kata "resmi", lambang negara, atau logo
instansi mana pun.

## Data bawaan: hanya aturan publik

Data bawaannya hanya peraturan publik dari katalog peraturan Direktorat
Jenderal Pajak dan JDIH Kementerian Keuangan, dipecah per pasal. Tiap dokumen
selalu membawa URL sumber dan tanggal pengambilannya, di data maupun di
tampilan.

Cakupannya tujuh kategori katalog DJP: **PPh, KUP, PPN, PBB, BPHTB, Bea
Meterai**, dan peraturan "Lainnya" yang memang bertopik pajak — yang terakhir
diputuskan per peraturan. Empat kategori terakhir masuk di v1.1.0.

Aturan yang tidak boleh dilanggar, apa pun alasannya:

- **Status tidak pernah ditebak.** Klaim tiap sumber ditampilkan apa adanya
  beserta tanggal ambilnya. Yang bertentangan ditandai *tidak pasti*. Tidak
  ada satu label status tunggal yang dikarang sendiri oleh aplikasi.
- **Dokumen tanpa teks tetap muncul** di daftar dan hasil pencarian, dengan
  keterangan bahwa teksnya tidak tersedia di sumber dan tautan ke aslinya.
- **Lampiran pindaian ditampilkan sebagai PDF asli**, tidak pernah sebagai
  teks hasil OCR.
- **Relasi antarperaturan adalah petunjuk, bukan kebenaran**, jadi selalu
  disertai kutipan kalimat sumbernya.

## Sesudah v1.0.0

- **v1.1.0** (16 Oktober): PBB, BPHTB, Bea Meterai, dan "Lainnya" masuk korpus.
- **v1.2.0** (16 Oktober): pembaruan otomatis. Setiap hari peraturan yang baru
  dan berubah diambil dari DJP dan JDIH; setiap minggu datanya diperiksa, dan
  baru terbit kalau memang berubah dan semua gerbang uji lulus. Masalah yang
  butuh manusia membuka issue. Di aplikasi ada penanda "terakhir diperiksa"
  dan halaman peraturan baru dan yang berubah, dan data baru terpasang sendiri
  saat aplikasi dibuka lagi.
- **v1.3.0** (17 Oktober): kotak definisi di atas hasil, tombol Simpan dengan
  halaman Tersimpan, dan sepuluh pencarian terakhir.
- **v1.4.0** (18 Oktober): data pencarian dipecah, sehingga satu pembaruan
  kecil turun dari 9,30 MB menjadi 1,56 MB (gzip).
- **v1.5.0 dan v1.5.1** (23 Oktober): rujukan pasal seperti "PPh 23" atau
  "PPh 4(2)" dikenali sebagai satu konsep. Dokumen yang menyebut pasal itu
  secara persis tampil di atas, hasil lain menyusul di bawahnya. Daftar
  rujukannya mencakup 543 tempat sebuah pasal ditulis, di 20 undang-undang.

Pembaruan berikutnya sedang dikerjakan.

## Koleksi pribadi

Banyak rujukan sehari-hari — surat edaran, nota dinas, surat penegasan,
putusan — tidak tersedia di sumber publik yang bisa diambil. Untuk itu ada
koleksi pribadi: pemakai bisa mengimpor PDF, berkas teks, atau teks tempel
miliknya, lalu mencarinya dengan mesin yang sama dengan data bawaan.

Dokumen itu **hanya tersimpan di perangkat pemakainya** (IndexedDB), dan
setiap dokumen koleksi berlabel "Belum terverifikasi". Rujukan di dalamnya ke
peraturan publik ditautkan otomatis. Ini dibuktikan dengan rekaman jaringan
di Chrome sungguhan: nol permintaan saat mencari, membuka, mengekspor,
menghapus, dan memulihkan koleksi, dan tidak ada isi atau id dokumen di URL,
isi permintaan, judul tab, maupun konsol.

Dokumen yang pernah dikirim calon pengguna untuk bahan uji tidak pernah masuk
repo, data bawaan, atau commit mana pun. Semua uji koleksi memakai dokumen
tiruan yang ditulis sendiri.

## Uji coba pipa data: kategori PPh

Sebelum spesifikasinya ditulis, pengambilan datanya diuji dulu untuk satu
kategori, Pajak Penghasilan. Laporannya jadi dasar hampir semua keputusan di
atas.

- **Lebih dari separuh daftar bukan peraturan substantif.** Dari 2.468 baris
  daftar PPh di katalog DJP, 1.430 (58%) adalah penetapan kurs mingguan atau
  tarif bunga bulanan. Itu dikeluarkan dari cakupan. Setelah digabung dengan
  JDIH, tersisa **1.122 dokumen substantif**.
- **Status antar sumber sering tidak sejalan.** Dari 337 dokumen yang statusnya
  bisa dibandingkan di dua sumber, **121 (36%) berbeda**. Ditambah konflik
  dengan bukti pencabutan di teksnya sendiri, 190 dokumen (17%) berstatus
  tidak pasti. Karena itulah status tidak pernah disimpulkan sendiri.
- **Teks sumber pun mengandung galat OCR.** 23 dari 570 berkas teks DJP
  memuat pola khas OCR yang tidak dikoreksi — `clan` untuk *dan*, `rn` untuk
  *m*. Pencarian dibuat tahan terhadap galat itu tanpa mengubah teks aslinya.
  Pada lampiran pindaian, mesin OCR melaporkan keyakinan 0,93–0,99 untuk teks
  yang jelas rusak, sehingga skor keyakinan OCR tidak pernah dipakai sebagai
  penentu kelayakan.
- **Teks peraturan lama banyak yang tidak ada.** Di katalog DJP, peraturan
  2010-an dan 2020-an berteks lengkap, tapi yang tanpa teks mencapai 51% untuk
  dekade 2000-an, 90% untuk 1990-an, dan 96% untuk 1980-an. Halamannya hanya
  berisi metadata. Dokumen seperti itu tetap tampil, dengan tautan ke sumber.

## Tanpa internet, dan bukti bahwa isinya sama

Untuk pemakaian luring, halaman dokumen dan pasal tidak disimpan satu per
satu, melainkan dibangun di perangkat dari data — oleh fungsi yang sama yang
dipakai saat build. Simpanannya di perangkat sekitar 92 MB, dengan unduhan
pertama sekitar 17 MB.

Supaya "sama" bukan sekadar klaim, build membandingkan seluruh 23.707 halaman
hasil jalur luring dengan halaman terbit, byte demi byte. Uji negatifnya:
satu halaman diubah, dan perbedaannya langsung tertangkap. Uji di Chrome
sungguhan mematikan server lalu membuka daftar, pencarian, saringan, dokumen,
pasal, dan koleksi dalam keadaan luring.

## Batas yang diketahui

- Pemasangan sungguhan baru diuji di HP Android oleh pemilik proyek. Safari
  dan iOS belum diuji.
- Kecepatan simpanan pertama di HP yang lambat belum diukur di perangkat
  sungguhan.
- Surat edaran Dirjen Pajak praktis tidak tersedia di sumber resmi yang bisa
  diambil, jadi tidak ada di data bawaan. Itu sebabnya koleksi pribadi ada.
- Rujukan pasal belum memisahkan ayat dari pasalnya, dan teks OCR yang rusak
  tidak dikenali sebagai rujukan.
