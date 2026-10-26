---
# ---------------------------------------------------------------------------
# Isi halaman ini dari catatan proyek GDD GACCI 2026 (Agustus 2026).
# Hasil seleksi finalis tidak ditulis di sini karena belum dikonfirmasi Fata.
# Kolom `peran` diisi nama pena sesuai keputusan Fata (18 Okt 2026).
# ---------------------------------------------------------------------------
judul: MYU
kode: "10"
kelompok: tulisan
jenis: Game design document — lomba GACCI 2026
urutan: 10
ringkas: Naskah game design document untuk lomba GACCI 2026 dari BINUS. Action-RPG psikologis yang menggabungkan kehidupan sekolah 2D dengan dunia surealis 3D bernama Elsewhere, dan materi pelajaran menjadi senjata lewat sistem Concept.
status: Selesai — dikumpulkan 19 Agustus 2026
keadaan: selesai
peran: Mufuyu Moku
periode: Agustus 2026
platform: Dokumen GDD, 22 halaman — bahasa Indonesia

spek:
  - label: Halaman
    nilai: "22"
    catatan: Mengikuti templat resmi lomba, termasuk diagram alur.
  - label: Archetype kemampuan
    nilai: "8"
    catatan: Semua ekskul dan pelajaran dipetakan ke delapan pola tetap, bukan dirancang satu per satu.
  - label: Fase cerita
    nilai: "4"
    catatan: Sekitar satu tahun ajaran, kira-kira 40 minggu dalam game.
---

## Apa ini

MYU adalah naskah *game design document* untuk GACCI 2026 (Game Analysis
Creative Challenge of Ideas) yang diadakan BINUS. Pemainnya seorang siswa
SMA yang bersahabat dengan Myu, gadis misterius yang ternyata bisa
menyeberang ke Elsewhere: dunia surealis yang membentuk dirinya dari
pikiran manusia.

Game ini punya dua sisi:

- **Dunia nyata (2D, top-down).** Satu hari berisi 24 jam. Aksi besar
  memakan waktu, jadi pemain harus memilih antara sekolah, ekskul, kerja
  paruh waktu, dan relasi dengan orang di sekitarnya.
- **Elsewhere (3D, orang ketiga).** Eksplorasi, parkour, dan pertarungan
  cepat. Perspektifnya bisa bergeser sesuai situasi, misalnya ke platformer
  2D atau mode teks.

Rujukan utamanya Persona untuk struktur dua dunia, Hello Charlotte untuk
suasana kotanya, serta Elden Ring dan Zenless Zone Zero untuk pertarungan.

## Sistem Concept

Pelajaran dibawa ke dalam game sebagai mekanik. Pemain mengumpulkan
*Knowledge* dari dunia nyata, misalnya dengan menandai kalimat yang tepat
dalam sebuah teks, lalu merakitnya jadi Concept di Elsewhere:

- Kombinasi yang benar dan lengkap menghasilkan **Perfect Concept**.
- Kombinasi yang sebagian benar menghasilkan **Imperfect Concept**, yang
  kasar tapi tetap bisa dipakai.
- Kombinasi yang tidak nyambung menghasilkan **Fallacy**, yang berbalik
  melukai pemain.

Contohnya, natrium dan klorin yang dipasangkan sesuai valensinya menjadi
Concept "Garam". Reaksi kimia yang salah gagal sesuai bentuk kegagalannya
sendiri, bukan sekadar mengurangi nyawa secara acak.

## Yang dihitung

Bagian *balancing* ditulis sampai angka dan dicek ulang dengan hitungan,
antara lain:

- jam tidur dan kelelahan,
- dua sumber daya di Elsewhere: Consciousness sebagai nyawa dan Sanity
  sebagai kewarasan,
- sistem *parry* dan *block* yang terikat pada Myu sebagai rekan,
- ekonomi uang saku mingguan.

Beberapa celah ditemukan saat pengecekan dan langsung ditambal. Salah
satunya: target belanja tertinggi ternyata bisa dicapai hanya dengan uang
saku, padahal seharusnya terasa di luar jangkauan.
