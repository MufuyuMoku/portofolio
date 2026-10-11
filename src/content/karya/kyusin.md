---
# ---------------------------------------------------------------------------
# Isi halaman ini diambil dari repo github.com/MufuyuMoku/kyusin per 9 Oktober
# 2026: SPEC.md, PROGRESS.md (tabel status milestone dan status game, log sesi
# M6a), dan DECISIONS.md. README repo masih menulis "Status: M1"; yang dipakai
# di sini PROGRESS.md, yang lebih baru.
# SPEC: nama produk ditulis persis "KyuSin", label proyek "Project Sinners".
# Jangan mengarang kepanjangan atau arti keduanya.
# Repo sengaja tanpa lisensi: jangan tulis "open source".
# ---------------------------------------------------------------------------
judul: KyuSin
kode: "04"
kelompok: dikerjakan
jenis: Aplikasi desktop — game · Project Sinners
urutan: 4
ringkas: Kumpulan game ringan — papan, kartu, dan casino — dalam satu wadah bergaya terminal retro dengan efek CRT samar. Dimainkan secara visual, dengan mode perintah teks sebagai opsi. Dua bahasa, tanpa akun dan tanpa internet.
status: Dalam pengerjaan — M6a selesai
keadaan: dikerjakan
periode: September 2026 — berjalan
peran: Spesifikasi, keputusan lingkup, dan verifikasi tiap milestone; implementasi dengan Claude Code
platform: Desktop — Windows dan Linux (belum ada pemasang)
tumpukan:
  - Tauri 2
  - Rust
  - SvelteKit (Svelte 5)
  - SQLite
  - ChaCha20 (rand_chacha)

spek:
  - label: Game selesai
    nilai: "26"
    catatan: Memenuhi kesembilan butir Definition of Done di SPEC §7, per M6a.
  - label: Tes Rust
    nilai: "346"
    catatan: Dari log sesi M6a di PROGRESS.md, ditambah 49 tes UI.
  - label: Taruhan casino ber-RTP
    nilai: "41"
    catatan: Di M6a saja; semuanya di bawah 100%, dihitung tepat lalu dicocokkan dengan simulasi di CI.
  - label: Level catur
    nilai: "6"
    catatan: Dikalibrasi terhadap Stockfish 19; level 5 dan 6 sekitar 1826 dan 2093.

tautan:
  - label: Kode di GitHub
    href: https://github.com/MufuyuMoku/kyusin
---

## Apa ini

KyuSin — label proyeknya *Project Sinners* — adalah aplikasi desktop berisi
banyak game ringan dalam satu wadah bergaya terminal retro: tema fosfor,
efek CRT samar yang intensitasnya bisa diatur, dan urutan boot. Semuanya
berjalan lokal: tanpa akun, tanpa internet, tanpa iklan, dan tanpa pembelian.
Antarmukanya tersedia dalam bahasa Indonesia dan Inggris, dan kelengkapan
terjemahannya diperiksa CI.

Cara utama bermain adalah visual: menyeret bidak, mengklik kartu, memasang
chip di meja. Mode perintah teks (`e2e4`, `hit`, `bet 50`) ada bagi yang suka,
tapi tidak pernah diwajibkan. Di balik layar, tiap aksi visual diterjemahkan
jadi aksi yang sama dengan perintah teks — dan aksi itulah yang nanti dikirim
pemain lain lewat LAN maupun agen AI.

## Rencana besarnya

Tiga poin akhir, berurutan:

1. **Singleplayer.** Semua game bisa dimainkan melawan bot atau bandar,
   dengan tutorial, rating, dan chip.
2. **Multiplayer tanpa internet.** Main bersama lewat jaringan lokal yang
   sama (LAN/Wi-Fi).
3. **Bermain bersama [Project Nor-4](/portofolio/karya/nor-4/).** Agen AI
   lokal masuk sebagai pemain lewat protokol yang sama dengan pemain LAN.

Sekarang pengerjaannya masih di jalan menuju poin pertama.

## Yang sudah jadi

Per M6a (9 Oktober 2026), 26 game memenuhi Definition of Done: aturan dan
tes, bot, tampilan visual, perintah teks, tutorial interaktif yang dijaga tes
otomatis, replay, dan manifest.

| Kelompok | Game |
| --- | --- |
| Papan | Reversi, Catur |
| Kartu melawan bandar | Blackjack, Baccarat, Dragon Tiger, Casino War, Red Dog, Andar Bahar, Three Card Poker, Caribbean Stud, Casino Hold'em, Let It Ride, Pai Gow Poker |
| Kartu antar-pemain (melawan bot) | Texas Hold'em, Omaha, Teen Patti, Capsa Susun, Domino QiuQiu |
| Dadu, roda, ubin | Roulette Eropa, Roulette Amerika, Craps, Sic Bo, Big Six, Fan-Tan, Pai Gow ubin, Chuck-a-luck |

Catur punya enam level yang dikalibrasi terhadap Stockfish 19 — Stockfish
hanya dipakai sebagai alat ukur di mesin pengembang, tidak ikut dibundel.
Rating lokal memakai Glicko-2.

## Casino yang jujur

- **Angka sungguhan.** Aturan dan tabel bayar memakai angka casino sungguhan,
  dan tiap game casino menampilkan RTP atau house edge yang sebenarnya.
  Angkanya dihitung tepat — enumerasi atau rantai Markov — lalu dicocokkan
  dengan simulasi di CI. Untuk Pai Gow ubin, enumerasinya 736.281.000
  pembagian.
- **Chip tidak pernah bisa dibeli, dicairkan, atau dipindahkan** antar
  pemain.
- **Acak yang bisa dibuktikan.** Tiap kocokan dan lemparan berasal dari seed
  gabungan semua peserta. Komitmen (hash) tiap seed diumumkan sebelum ronde
  dan semua seed dibuka sesudahnya, jadi hasilnya bisa diverifikasi dan tidak
  ada pihak — termasuk host — yang bisa memilihnya. Batas yang diakui terbuka:
  di game kartu tertutup, aplikasi host secara teknis tahu urutan dek selama
  ronde berjalan.
- **Replay semua pertandingan**, karena tiap pertandingan hanyalah seed
  ditambah urutan perintah.

## Berikutnya

| Milestone | Isi |
| --- | --- |
| M6b | Keno, Bingo, kartu gosok, Hi-Lo, Video Poker |
| M7 | Arcade casino, dengan kontrak untuk game yang berjalan menurut waktu |
| M8 | Papan dan kartu non-casino sisanya, termasuk Gaple, Cangkulan, dan Remi — **poin akhir 1** |
| M9 | LAN: host dan join, penemuan otomatis, lobi, provably fair lintas jaringan — **poin akhir 2** |
| M10 | Protokol agen dan agen uji — **poin akhir 3**, tanpa menunggu Nor-4 |
| M11 | Pemasang Windows dan paket Linux `.deb` dari CI, halaman lisensi pihak ketiga |
| M12 | Game baru sebagai cartridge WASM, tanpa membangun ulang aplikasi |

Belum ada berkas pemasang; itu baru datang di M11.
