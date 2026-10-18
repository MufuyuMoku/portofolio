# Portofolio — Mufuyu

Situs statis dengan Astro. Tanpa framework UI, tanpa Tailwind, CSS biasa
dengan variabel. Font dibundel di `public/fonts` — tidak ada permintaan ke CDN.

## Menjalankan

```bash
npm install
npm run dev
```

Perintah lain: `npm run build` (hasil ke `dist/`), `npm run preview`,
`npm run sync-fonts` (menyalin ulang berkas font dari `node_modules`).

## Tiga bahasa

Situs tampil dalam bahasa Indonesia (`/`), Inggris (`/en/`), dan Jepang
(`/ja/`). Pemilih bahasa ada di sidebar dan selalu menunjuk ke halaman yang
sama di bahasa lain.

- **Bahasa Indonesia adalah sumber utama.** Isinya tetap di
  `src/content/karya/` dan `src/content/halaman/`.
- **Terjemahan** ada di `src/content/terjemahan/<en|ja>/karya/<nama>.md` dan
  `.../halaman/<beranda|tentang>.md`, dengan nama berkas yang sama seperti
  aslinya. Isinya hanya kolom yang diterjemahkan (`judul`, `jenis`,
  `ringkas`, `status`, `periode`, `peran`, `platform`, `lokasi`, `catatan`,
  `spek`) ditambah badan markdown. Kolom lain (`kode`, `kelompok`, `urutan`,
  `keadaan`, `tumpukan`, alamat tautan, berkas gambar) selalu diambil dari
  berkas bahasa Indonesia.
- Label tautan dan teks tangkapan layar diterjemahkan berurutan lewat
  `tautanLabel` dan `tangkapanTeks`.
- Kalau terjemahan sebuah karya belum ada, halamannya tampil dalam bahasa
  Indonesia dengan keterangan kecil di bawah judul.
- Teks antarmuka (sidebar, label bagian, label data) ada di `src/lib/teks.ts`.
- Tautan antarhalaman di badan markdown terjemahan memakai awalan bahasanya,
  mis. `/portofolio/en/karya/vocavoca/`.

Huruf Jepang tidak dibundel; browser memakai huruf Jepang bawaan sistem.

## Menyunting isi

Semua teks ada di `src/content/` — tidak perlu menyentuh kode.

| Berkas | Isi |
| --- | --- |
| `src/content/karya/*.md` | Satu berkas = satu halaman karya |
| `src/content/halaman/beranda.md` | Judul besar dan paragraf pembuka beranda |
| `src/content/halaman/tentang.md` | Halaman tentang |
| `src/data/situs.json` | Nama, surel, akun GitHub |

Menambah karya baru = menambah satu berkas `.md` di `src/content/karya/`.
Nama berkas jadi alamat halaman (`onsa.md` → `/karya/onsa`), dan karya itu
otomatis muncul di sidebar dan di beranda. Urutannya diatur kolom `urutan`.

Kolom `kelompok` menentukan di bagian mana karya itu tampil, di beranda
maupun di sidebar. Isinya mengikuti sistem status proyek:

- `ditampilkan`: sudah jadi, atau masih berjalan tapi sudah bisa dicoba orang.
- `dimeja`: masih akan disentuh, yaitu sedang dikerjakan, menunggu sesuatu,
  atau istirahat dulu.
- `tulisan`: karya tulis dan desain.
- `pengalaman`: kerja atau PKL.
- `arsip`: tidak dilanjutkan.

Keadaan rinci (dikerjakan, menunggu, istirahat) ditulis di awal kolom
`status`, misalnya `Istirahat — M6a selesai`. Urutan kelompok ada di `src/lib/kelompok.ts`.
Kolom `jenis` mengisi label kecil di atas judul (mis. "Aplikasi desktop").

Kolom `keadaan` mengatur bentuk kotak status:

| Nilai | Bentuk |
| --- | --- |
| `aktif` | penuh (dirilis atau berjalan) |
| `dikerjakan` | separuh |
| `menunggu` | separuh redup |
| `istirahat`, `rancangan` | berbingkai |
| `selesai` | abu-abu |
| `dihentikan`, `arsip` | kosong redup |

Panel data hanya tampil kalau karya punya salah satu kolom `peran`,
`platform`, `perusahaan`, `tumpukan`, atau `tautan`. Untuk karya berkelompok
`tulisan`, kolom `platform` tampil dengan label "Bentuk".

Halaman berkelompok `pengalaman` tampil berbeda: labelnya "Penempatan kerja",
panel datanya memakai kolom `perusahaan`, `lokasi`, dan `peran` sebagai
posisi, dan `platform` boleh dikosongkan. Kolom `catatan` mengisi satu baris
redup di bawah judul — dipakai menerangkan kenapa tidak ada repo publik.

Di badan markdown, tiap `##` jadi satu bagian bernomor dengan label mono.
Satu kata bisa ditekankan dengan `*tanda bintang*` — kata itu yang muncul
berwarna aksen. Pakai seperlunya saja.

### Gambar

Taruh berkas di `public/img/<nama-karya>/`, lalu daftarkan di kolom
`tangkapan` pada berkas karya. Selama berkasnya belum ada, yang tampil
bingkai kosong berisi alamat yang ditunggu — tata letaknya tetap benar.

## Gaya visual

Semua warna dan ukuran ada di `:root` dalam `src/styles/global.css`:
latar `#0d0d0f`, teks `#d5d3ce`, satu aksen `#ffb300` yang hanya dipakai
untuk garis tipis, indikator status, dan satu kata yang ditekankan.

Cap studio Pyonkuro (`public/pyonkuro-chip.svg`, juga dipakai sebagai
favicon) memakai warnanya sendiri, hitam `#141414` dan emas `#C9A24D`. Emas
itu hanya ada di chip; aksen situs tetap `#ffb300`.

## Deploy ke GitHub Pages

1. Dorong repo ini ke GitHub.
2. Setelan repo → Pages → Source: **GitHub Actions**.
3. Alur `.github/workflows/deploy.yml` membangun dan memasang tiap kali
   ada push ke `main`.

Repo ini akan bernama `portofolio`, jadi `BASE` di
`astro.config.mjs` disetel ke `'/portofolio/'`. Kalau nama repo berubah,
ubah nilai itu — semua tautan dan alamat font mengikutinya.
