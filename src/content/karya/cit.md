---
# ---------------------------------------------------------------------------
# Isi halaman ini diambil dari repo github.com/MufuyuMoku/cit:
# README.md, CLAUDE.md, docs/STATUS.md, dan docs/devlog/m0–m6.
# Jumlah tes dihitung ulang dari pohon sumber repo itu (fungsi func Test…),
# dan cocok dengan tabel di docs/STATUS.md. Tanpa tangkapan layar antarmuka.
# ---------------------------------------------------------------------------
judul: CIT
kode: "02"
kategori: proyek
urutan: 2
ringkas: Pelacak versi berkas desain. Mengawasi folder kerja dan mencatat tiap kali sebuah berkas disimpan, lalu menyusunnya jadi linimasa. Tanpa server, tanpa akun, tanpa internet.
status: Dihentikan setelah M6
keadaan: dihentikan
periode: 3 — 18 September 2026
peran: Spesifikasi, keputusan lingkup, dan verifikasi tiap milestone; implementasi dengan Claude Code
platform: Desktop — Windows dan Linux
tumpukan:
  - Wails v2
  - Go 1.25
  - SvelteKit
  - SQLite (modernc.org/sqlite)

spek:
  - label: Tes Go
    nilai: "249"
    catatan: Dihitung dari fungsi func Test… di seluruh paket; angkanya sama dengan tabel di docs/STATUS.md.
  - label: Milestone ter-tag
    nilai: "9"
    catatan: m0 sampai m6, ditambah m1a dan m4a. Tag terakhir m6.
  - label: Versi skema
    nilai: "9"
    catatan: Sembilan migrasi berversi di internal/store.
  - label: Paket tidak dibangun
    nilai: "2"
    catatan: internal/retention dan internal/sync — hanya berisi doc.go.

tautan:
  - label: Repositori
    href: https://github.com/MufuyuMoku/cit
---

## Masalah yang dipecahkan

Kerja desain menumpuk jadi berkas bernama `final_fix_revisi3_ok.psd`, dan
riwayat sebenarnya hilang di antara nama-nama itu. Permintaan klien tercecer
di chat, dan tidak ada yang tahu versi mana yang sedang ditunggu siapa.

Git dibuat untuk masalah lain: ia dirancang untuk teks yang bisa dibaca baris
per baris, sementara PSD 800 MB hanyalah gumpalan biner yang tidak bisa
di-*diff* maupun digabungkan — dan ia menuntut orang berhenti bekerja untuk
menulis pesan commit. CIT membalik arahnya: pengguna cukup menekan Ctrl+S
seperti biasa, dan sistem yang menyesuaikan diri.

Sasarannya siswa DKV, freelancer desain, dan studio kecil. Semuanya berjalan
di komputer sendiri.

## Kenapa dihentikan

Sebelum melanjutkan ke retensi, aku bertanya ke siswa DKV — target penggunanya —
bagaimana mereka menyimpan dan melacak berkas desain. Mereka tidak merasakan
masalah di atas. Membangun lebih jauh untuk masalah yang tidak dirasakan
penggunanya bukan keputusan yang benar, jadi pengembangannya berhenti setelah M6.

## Aturan emas

> Sistem mengamati dan mengusulkan. Manusia memutuskan.

Satu kalimat itu yang dipakai menjawab keputusan desain yang tidak tertulis
di spesifikasi:

- Yang **bisa dibatalkan** dikerjakan langsung tanpa bertanya, asal terlihat
  dan mudah dibatalkan.
- Yang **tidak bisa dibatalkan** wajib konfirmasi, tanpa opsi mematikan.
- **Tidak pernah ada popup.** Aplikasi tidak menyela. Semua yang perlu
  ditinjau menumpuk di satu Kotak Tinjauan yang dibuka pengguna saat dia mau.

Konsekuensinya konkret. Pengelompokan otomatis diterapkan begitu saja karena
bisa dibatalkan — tapi begitu pengguna memisahkan dua berkas dengan tangan,
keputusan itu permanen dan tidak boleh dibatalkan oleh perhitungan mana pun.
Dugaan yang menegaskan dirinya kembali setiap pemindaian bukan usulan,
melainkan argumen yang tidak bisa dimenangkan pengguna.

Versi baru pada karya yang punya tiket terbuka menandai tiket itu "mungkin
selesai" — dan berhenti di situ.

## Invarian yang dipegang, dan alasannya

- **Pemulihan berkas harus identik bita per bita.** Ini syarat mati: kalau
  `Restore(hash)` tidak menghasilkan berkas yang persis sama dengan yang
  di-`Store()`, semua lapis di atasnya tidak ada artinya. Tiap bongkahan
  diverifikasi terhadap hash-nya sebelum diserahkan, tanpa sakelar untuk
  mematikannya. Kalau verifikasi gagal, tidak ada berkas yang ditulis sama
  sekali — lebih baik gagal terang-terangan daripada menyerahkan berkas
  separuh yang tampak utuh.
- **Metadata versi tidak pernah dihapus.** Penipisan hanya membuang isi
  berkasnya. Linimasa tidak boleh pernah bolong; versi yang isinya sudah
  dibuang tetap tampil dengan penanda.
- **Penghapusan bongkahan hanya lewat refcount nol.** Bongkahan dibagi antar
  versi, jadi menghapus berdasarkan umur satu versi akan merusak versi lain
  yang masih muda.
- **Kebal pemangkasan, tanpa kecuali:** versi terbaru tiap karya, versi
  bertanda manual, dan versi yang punya tiket terbuka.
- **Tiket tidak boleh bisa berdiri sendiri.** Selalu terikat ke sebuah karya.
  Batasan ini yang mendefinisikan produk: tiket yang bisa mengambang akan
  mengubah CIT jadi aplikasi to-do biasa.
- **Tiket menempel pada versi, bukan pada nama berkas atau path.** Jangkarnya
  `version_id`, bukan hash isi — karena dua penyimpanan yang identik bita per
  bita adalah satu isi tapi dua versi yang bisa ada di dua karya berbeda,
  sehingga kunci hash akan muncul di keduanya dan tidak bisa menyebut karyanya.
- **Tidak ada berkas yang ditolak.** Format yang tidak dikenali tetap disimpan
  dan diversikan; hanya pratinjaunya yang jadi ikon generik.

## Ditegakkan basis data, bukan disiplin

Aturan seperti "versi tidak pernah dihapus" dan "tiket tidak bisa berdiri
sendiri" dijaga trigger dan foreign key, bukan kesepakatan yang harus diingat
semua orang yang menyentuh kode nanti. Skema yang menolak tiket mengambang
adalah yang mendefinisikan produk ini.

Batasan keras lain yang dipegang sejak awal: seluruh `/internal` wajib
dibangun dan diuji dengan `CGO_ENABLED=0`, sehingga inti aplikasi bisa diuji
tanpa toolchain C. SQLite selalu lewat `modernc.org/sqlite` — murni Go. Satu-
satunya ketergantungan luar adalah `ffmpeg`, itu pun opsional: tanpanya
pratinjau video diganti ikon generik dan aplikasi tetap jalan.

Tidak ada model AI di mana pun. Semua "kepintaran" pengelompokan berasal dari
hash persepsi, regex, dan perbandingan waktu — tak ada yang bisa basi atau
perlu diunduh.

## Pengujian

Jumlah fungsi tes per paket, dihitung dari pohon sumber:

| Paket | Isi | Tes |
| --- | --- | --- |
| `internal/grouping` | pHash, kemiripan nama, klaster waktu | 70 |
| `internal/store` | SQLite, skema, migrasi | 43 |
| `internal/preview` | gambar kecil bertingkat | 43 |
| `internal/vault` | chunking, blob store, refcount | 38 |
| `internal/ingest` | pemindai dan pengawas folder | 30 |
| `cmd` | lapis aplikasi Wails | 18 |
| `internal/ticket` | tiket dan kotak tinjauan | 7 |
| `internal/retention` | tidak dibangun | 0 |
| `internal/sync` | tidak dibangun | 0 |
| **Total** | | **249** |

Untuk `internal/vault` aturannya tes ditulis sebelum implementasi, karena paket
itu bisa menghancurkan data pengguna. Aturan yang sama ditetapkan untuk
`internal/retention`, yang akhirnya tidak dibangun.

Yang lebih menentukan daripada jumlahnya adalah cara bug-nya ketahuan. Tiap
milestone punya satu devlog dengan bagian tetap: apa yang dibangun, keputusan
beserta alasannya, bug yang ketahuan **dan apa yang membuatnya ketahuan**, dan
apa yang sengaja dilewatkan. Beberapa yang tercatat:

- **Suite M4 lulus pada percobaan pertama, dan itu yang mencurigakan.**
  Alih-alih diterima, jarak Hamming dan keluaran normalisasi diperiksa
  satu-satu. Itu yang membongkar tiga bug berikutnya.
- **Sebuah tes yang tidak menguji apa pun.** Jarak Hamming pasangannya 24, di
  bawah ambang veto 26 — jadi veto yang seharusnya diuji tidak pernah menyala.
  Diperbaiki dengan pasangan berjarak 44 plus assertion prasyarat yang gagal
  kalau jaraknya pernah turun lagi di bawah ambang.
- **`logo_v2.png` menyatukan riwayat dua klien jadi satu karya**, karena
  normalisasi nama memakai `filepath.Base` sehingga nama identik di folder
  yang tidak berhubungan mematikan veto pHash. Dibuktikan dengan tes yang
  gagal lebih dulu, lalu diperbaiki: nama identik hanya mematikan veto kalau
  keduanya di pohon folder yang sama.
- **Tes tiket diperiksa dengan sabotase.** Satu baris `UPDATE versions`
  dihapus sementara; kedua tes langsung merah. Jadi keduanya benar-benar
  menguji mekanisme yang diklaim, bukan lulus kebetulan.
- **Migrasi belum pernah diuji terhadap basis data yang sudah berisi baris.**
  Ketahuan dari `grep`: nol rujukan ke kolom baru di berkas tes migrasi.
  Sesudahnya tes migrasi berjalan dari setiap versi skema, bukan hanya dari
  basis data kosong.

## Status, apa adanya

Dihentikan setelah M6, dan repo-nya diarsip. Tag terakhir `m6` — tiket dan
kotak tinjauan. Skema basis data di versi 9. Seluruh `make test` hijau dengan
`CGO_ENABLED=0`.

Yang sudah jadi dan terbukti jalan: brankas ber-alamat-isi dengan FastCDC dan
refcount; katalog SQLite dengan sembilan migrasi; pemindai dan pengawas folder
dengan debouncing; pratinjau bertingkat; pengelompokan tiga sinyal dengan
keputusan manual yang permanen; tiket dua arah dengan kotak tinjauan; dan
aplikasi Wails yang merakit semuanya.

Tidak dibangun:

- **`internal/retention`** (penipisan riwayat dan pengumpulan sampah) dan
  **`internal/sync`** (menyalin antar folder atau disk lepas). Keduanya hanya
  berisi dokumentasi rancangan, dengan nol tes. Antarmukanya bisa menampilkan
  versi yang isinya dibuang, tapi tidak ada yang pernah membuangnya.
- **Penegakan invarian "kebal pemangkasan"**, karena retensi tidak dibangun.
  Ketiga masukannya — versi terbaru, versi bertanda manual, dan versi yang
  punya tiket terbuka — ada dan teruji.
- **Uji otomatis untuk frontend.** Satu-satunya pemeriksaan otomatisnya
  `npm run check`, di luar `make test`.
- **Pengujian `./cmd` di luar Windows.** Wails memaksa CGO di Linux dan macOS,
  jadi 18 tes itu hanya pernah jalan di Windows.
- **Indeks token untuk memangkas Levenshtein**, jadi pengelompokan tetap
  O(n²). Terukur ~860 ns per pasangan: 0,5 detik pada 1.000 berkas, sekitar
  44 detik pada 10.000. Angka ini diukur, bukan diperkirakan.

## Yang sengaja tidak dibangun

Ditolak lebih dulu supaya tidak ditawarkan berulang: penggabungan berkas biner
ala Git, model AI apa pun, akun dan autentikasi, server, langganan, telemetri,
p2p lewat internet, serta komentar yang ditempel di titik gambar. Hapus tiket,
tenggat, dan pengingat juga tidak ada — pengingat berarti menyela, dan CIT
tidak menyela.
