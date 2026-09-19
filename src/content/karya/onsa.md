---
# ---------------------------------------------------------------------------
# Isi halaman ini diambil dari repo github.com/MufuyuMoku/onsa:
# README.md, docs/SPEC.md, docs/PROGRESS.md, docs/DECISIONS.md, dan CLAUDE.md.
# Angka tes dihitung dari pohon sumber repo itu, per 2026-09-19.
# ---------------------------------------------------------------------------
judul: Onsa
kode: "01"
kategori: proyek
urutan: 1
ringkas: Pemutar musik desktop untuk orang yang menyimpan berkas musiknya sendiri. Strip di bawah jendela menunjukkan rantai yang benar-benar dilewati sinyal — format sumber, resample, ReplayGain, EQ, limiter, sampai backend output.
status: v1.0.0 — dirilis
keadaan: aktif
periode: September 2026 — berjalan
peran: Spesifikasi, keputusan lingkup, dan verifikasi tiap milestone; implementasi dengan Claude Code
platform: Desktop — Windows 10/11 dan Linux (x86_64)
tumpukan:
  - Tauri 2
  - Rust
  - SvelteKit
  - TypeScript
  - SQLite

spek:
  - label: Fungsi tes Rust
    nilai: "342"
    catatan: Dihitung dari penanda #[test] dan #[tokio::test] di seluruh pohon sumber, bukan dari laporan jalannya tes.
  - label: Tes frontend
    nilai: "34"
    catatan: node --test, lima berkas di ui/src/lib.
  - label: Milestone selesai
    nilai: "10"
    catatan: M0–M6, M7a, M10a, M8. M9 dilewati; M7b, M10b, M11, M12 masuk v1.1.
  - label: Crate Rust
    nilai: "6"
    catatan: Ditambah lapisan aplikasi src-tauri dan antarmuka SvelteKit.

tautan:
  - label: Repositori
    href: https://github.com/MufuyuMoku/onsa

tangkapan:
  - src: /img/onsa/onsa.png
    alt: Jendela Onsa — layar Sedang Diputar dengan sampul, lirik yang bergerak mengikuti lagu, meter, dan strip jalur sinyal
    keterangan: Sedang Diputar — sampul, lirik yang bergerak mengikuti lagu, meter, dan strip jalur sinyal.
  - src: /img/onsa/slot-2.png
    alt: Slot kedua, belum diisi
    keterangan: Slot kedua — belum diisi.
---

## Apa ini

Onsa (音叉, garpu tala) adalah pemutar musik desktop untuk Windows dan Linux.
Sasarannya orang yang menyimpan berkas musiknya sendiri dan ingin tahu apa
yang sebenarnya terjadi pada suaranya. Identitas visualnya *panel instrumen*:
aplikasi tampil seperti alat ukur yang jujur, dan strip jalur sinyal di bawah
jendela menunjukkan tiap tahap yang benar-benar dilewati — format sumber,
resample, ReplayGain, EQ, limiter, sampai backend output. Tiap tahap bisa
dimatikan dari strip itu.

Tidak ada yang menghubungi internet kecuali dinyalakan sendiri. Semua fitur
jaringan mati secara bawaan.

Yang ada di v1: pemutaran gapless dan crossfade, antrean yang bisa diurut
ulang, playlist manual dan playlist pintar, rantai DSP yang terlihat, library
dengan pencarian teks penuh, editor tag satuan dan massal, lirik dari tiga
sumber, unduhan satu per satu lewat yt-dlp, enam tema bawaan, dan dua bahasa
antarmuka.

## Mesin audio terpisah total dari tampilan

Prinsip utama arsitekturnya: mesin audio berjalan di thread sendiri dan tidak
tahu apa-apa soal antarmuka. Antarmuka hanyalah remote control yang bicara
lewat command dan event Tauri. Seberat apa pun antarmuka, pemutaran tidak
boleh tersendat.

Pekerjaannya dibagi ke enam crate Rust yang batasnya dijaga:

| Crate | Isi |
| --- | --- |
| `onsa-audio` | Sumber, resample, crossfade, DSP, output, tap analisis |
| `onsa-library` | SQLite, scanner, pemantau folder, tag, cover, playlist, pencarian |
| `onsa-downloader` | Pengelola binary dan runner unduhan |
| `onsa-lyrics` | Parser LRC, sumber lirik, cache |
| `onsa-scrobble` | Last.fm dan antrean offline — menunggu M9 |
| `onsa-cli` | Menjalankan mesin audio tanpa antarmuka |

Aturannya: `onsa-audio` tidak bergantung pada crate Onsa lain, dan modul
fitur tidak saling bergantung. Semuanya disatukan hanya di `src-tauri`.
Downloader, misalnya, tidak tahu apa-apa soal library — ia mengembalikan
path berkas hasil, lalu `src-tauri` yang menyerahkannya.

Arah komunikasinya juga dipatok: command dari antarmuka ke backend
(`play`, `seek`, `set_eq`, `library_query`), event dari backend ke antarmuka
(posisi putar ≤ 10 Hz, frame analisis ≤ 60 Hz, progres, error). Cover art
dilayani lewat custom protocol, bukan base64 di dalam event.

## Keputusan yang dikunci sebelum kode ditulis

Spesifikasinya ditulis lebih dulu, sebelum baris kode pertama. Sebagian
keputusan ditandai terkunci — tidak diubah tanpa persetujuan pemilik proyek:

| Area | Keputusan |
| --- | --- |
| Platform | Windows 10/11 dan Linux x86_64. macOS tidak ditargetkan, tapi tidak sengaja memakai hal yang mustahil di-port. |
| Shell | Tauri 2 |
| Backend | Rust stable, workspace Cargo dengan crate terpisah per modul |
| Frontend | SvelteKit (Svelte 5, TypeScript strict), adapter-static, SPA |
| Styling | CSS biasa + CSS variables dari sistem tema. Tanpa Tailwind, tanpa library komponen. |
| Database | SQLite via rusqlite, migrasi berversi |
| Audio | symphonia, rubato, cpal, rtrb, realfft |
| HTTP | Satu klien reqwest untuk seluruh proyek, dengan timeout, batas ukuran, dan kegagalan yang dikembalikan sebagai nilai |

## Keputusan desain, beserta alasannya

Tiap keputusan yang tidak jelas dari kode dicatat dengan tanggal, konteks,
keputusan, dan alasan. Beberapa yang menentukan bentuk aplikasinya:

- **Thread kontrol dan thread decode digabung.** Spesifikasi menggambarnya
  terpisah; yang dibangun satu thread mesin yang memproses perintah di sela
  pengisian buffer. Alasannya paling sederhana dan tanpa lock antar-thread —
  saat pause, thread tidur di channel perintah sehingga CPU idle nol.
- **Gapless dengan resampling memakai satu lane.** Lagu berurutan dengan
  sample rate sama disambung di dalam satu lane yang memakai satu resampler,
  sehingga resampler melihat sinyal kontinu. Seek, skip, atau pergantian
  sample rate memulai lane baru.
- **Pause dan seek memakai micro-fade 60 ms di callback output**, sedangkan
  skip saat bermain memakai crossfade di dalam stream. Hasilnya pause terasa
  langsung, dan skip tetap mendapat crossfade yang diminta spesifikasi.
- **Editan tag masuk ke `overrides` dulu; "tulis ke berkas" aksi terpisah.**
  Tiga lapis — simpan di Onsa, tulis ke berkas, pindahkan berkas — dan
  pembatalan menuruni tangga yang sama. Lapisan yang paling sering dipakai
  jadi yang paling murah dibatalkan.
- **Penulisan tag dibaca ulang sebelum menggantikan berkas aslinya.** Salinan
  sementara ditulis lalu dibaca kembali; kalau isinya tidak sesuai, salinan
  itu dibuang dan berkas aslinya tidak pernah tersentuh. Ini bukan
  kehati-hatian teoretis: lofty kehilangan tag ID3v2 di dalam WAV pada
  penulisan kedua berturut-turut.
- **Yang dekat dibaca ulang, yang jauh diingat.** Lirik `.lrc` di sebelah lagu
  dan lirik di dalam tag dibaca tiap kali lagu berganti; hanya jawaban dari
  internet yang masuk cache. Membaca berkas teks kecil lebih murah daripada
  memutuskan apakah yang diingat masih benar.
- **"Tidak ada liriknya" diingat, tetapi layanan yang tidak bisa dihubungi
  bukan jawaban.** Menelan status HTTP membuat layanan yang tumbang tak bisa
  dibedakan dari layanan yang berkata tidak tahu — dan sebuah lagu bisa
  tercatat tak berlirik gara-gara jaringan buruk satu menit.
- **Sumber rilis binary ditulis di kode, bukan diambil dari yang diunduh.**
  URL, nama berkas di daftar checksum, dan perkiraan ukurannya tetap. Checksum
  diambil lebih dulu, baru berkasnya; yang tidak cocok tidak ditulis ke mana
  pun, bahkan tidak untuk dilihat.

## Aturan yang tidak boleh dilanggar

Di callback output cpal dan jalur panas DSP: tidak ada alokasi memori, lock,
I/O, logging, atau panic. Parameter masuk lewat atomics atau ring buffer
lock-free, lalu diterapkan dengan smoothing. Semua buffer dialokasikan di
muka. Bila ragu apakah sesuatu aman untuk real-time, anggap tidak aman dan
pindahkan ke thread lain.

Pengaman yang berlaku sebelum apa pun menyentuh berkas orang:

- Batalkan bekerja per batch, bukan per langkah; tiap langkah dicatat dengan
  nilai sebelum dan sesudah, dan pembatalan berjalan mundur dari langkah
  terakhir.
- Cakupan folder diuji terhadap path yang sudah dirapikan, sehingga
  `salinan/../asli/lagu.mp3` tidak bisa menyelinap dan folder bertetangga
  bernama mirip bukan bagian dari cakupan.
- Batas 50 berkas per sekali jalan, dengan langit-langit keras 500 — yang
  menentukan bukan kemampuan mesin melainkan kemampuan orang membaca ulang
  dan membatalkannya kalau ada yang salah.
- Usulan berkeyakinan di bawah 0,85 tetap ditampilkan untuk dibaca, tapi tidak
  satu pun field-nya tercentang.
- Rename selalu punya dry-run yang menyebutkan asal, tujuan, dan alasan sebuah
  berkas tidak bisa dipindah.

## Pengujian

Tidak ada berkas musik berhak cipta di repo. Fixture audio dibuat saat tes
berjalan — sinus, sweep, noise, dan hening — beserta tag hasil tulisan tes
sendiri. Mesin audio diuji lewat sink offline: dua berkas hasil potongan satu
sinus kontinu diputar berurutan lalu dibandingkan dengan sinus utuh, dan
tidak boleh ada diskontinuitas. Respons biquad diperiksa di beberapa frekuensi
uji dengan toleransi ±0,1 dB.

Jumlah fungsi tes di pohon sumber, dihitung dari penanda `#[test]` dan
`#[tokio::test]`:

| Bagian | Fungsi tes |
| --- | --- |
| `src-tauri` | 103 |
| `onsa-library` | 97 |
| `onsa-audio` | 81 |
| `onsa-lyrics` | 36 |
| `onsa-downloader` | 23 |
| `onsa-cli` | 2 |
| `onsa-scrobble` | 0 — menunggu M9 |
| **Rust, total** | **342** |
| Frontend (`node --test`) | 34 |

Angka di atas adalah jumlah fungsi tes yang ada di sumber, bukan hasil satu
kali jalan. CI menjalankan `cargo fmt --check`, `cargo clippy -- -D warnings`,
`cargo test`, `svelte-check`, dan build aplikasi di matriks Windows dan Ubuntu.

Di luar tes otomatis, tiap milestone punya catatan verifikasi manualnya
sendiri di `docs/PROGRESS.md` — untuk M8, misalnya, 43 pemeriksaan dari
perintah, 22 dari jendela, 6 di jendela terkecil, dan 8 khusus kriteria
selesai.

## Milestone dan statusnya

| Milestone | Status |
| --- | --- |
| M0 Kerangka proyek | Selesai 11 Sep |
| M1 Mesin audio inti | Selesai 11 Sep |
| M2 Rantai DSP | Selesai 11 Sep |
| M3 Library | Selesai 11 Sep |
| M4 UI dasar dan integrasi OS | Selesai 12 Sep |
| M5 Visualizer, meter, warna nada | Selesai 13 Sep |
| M6 Playlist | Selesai 13 Sep |
| M7a Metadata | Selesai 18 Sep |
| M10a Pengambil binary dan yt-dlp | Selesai 18 Sep |
| M8 Lirik dan editor tag satuan | Selesai 19 Sep |
| **v1.0.0** | **Ditandai 19 Sep 2026 — `533a2b0`** |
| M7b, M10b, M11, M12 | v1.1 |
| M9 Scrobble | Dilewati, belum bertanggal |

Urutannya pernah diubah sekali: sesudah M7a yang dikerjakan adalah sebagian
M10, lalu M8, dan M9 dilewati. Alasannya beserta utang yang timbul dicatat.
Sesudah M8 tidak ada fitur baru yang masuk v1 — yang tersisa penyiapan rilis,
dan v1.0.0 ditandai setelah biner rilis kedua sistem dijalankan dari keadaan
benar-benar baru. Yang berjalan sekarang v1.1.

## Batas yang diketahui

Ditulis apa adanya di README, bukan disembunyikan:

- **ffmpeg opsional.** Tanpa ffmpeg unduhan tetap berjalan, tapi audionya
  diambil apa adanya — tanpa tag dan sampul tertanam, dan konversi ke MP3
  atau FLAC tidak tersedia. Halaman Unduhan mengatakan itu di tempat
  pilihannya dibuat.
- **Sumber yang hanya menyediakan Opus ditolak** dengan pesan, karena belum
  ada decoder Opus. Lebih baik ditolak di muka daripada berkasnya mendarat
  lalu tidak pernah muncul di library.
- **Folder library belum bisa dihapus** dari Pengaturan; yang ada baru
  menambah dan memindai ulang.
- **Belum ada scrobble Last.fm.**
- Timing per kata sudah dibaca dan disimpan, tapi belum digambar per kata —
  barisnya yang menyala, bukan katanya.
- Lisensi proyek dan ikon final belum diputuskan; keduanya dibutuhkan paling
  lambat di M12.
