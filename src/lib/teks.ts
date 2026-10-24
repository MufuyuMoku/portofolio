// Teks antarmuka (bukan isi karya) untuk ketiga bahasa.
import type { Bahasa } from './bahasa';

type Kelompok = { label: string; pendek: string };

export type TeksUI = {
  sub: string;              // di bawah nama, di sidebar
  bukaKerja: string;
  beranda: string;
  tentang: string;
  pilihBahasa: string;
  navUtama: string;
  kelompok: Record<'ditampilkan' | 'dimeja' | 'tulisan' | 'pengalaman' | 'arsip', Kelompok>;
  deskripsiSitus: string;
  deskripsiTentang: string;
  kontak: string;
  surel: string;
  jasaAjak: string;        // baris kontak: ajakan ke halaman jasa Pyonkuro
  jasaTautan: string;
  catatan: string;
  // halaman karya
  jenisKerja: string;
  jenisKarya: string;
  dataPenempatan: string;
  dataKarya: string;
  perusahaan: string;
  lokasi: string;
  posisi: string;
  peran: string;
  penulis: string;
  periode: string;
  platform: string;
  bentuk: string;
  tumpukan: string;
  angka: string;
  tangkapanLayar: string;
  catatanPenempatan: string;
  catatanKarya: string;
  catatanTeknis: string;
  berikutnya: string;
  karyaBerikutnya: string;
  slotKosong: string;
  belumDiterjemahkan: string;
};

export const UI: Record<Bahasa, TeksUI> = {
  id: {
    sub: 'Siswa RPL',
    bukaKerja: 'Buka untuk kerja',
    beranda: 'Beranda',
    tentang: 'Tentang',
    pilihBahasa: 'Pilih bahasa',
    navUtama: 'Navigasi utama',
    kelompok: {
      ditampilkan: { label: 'Ditampilkan — bisa dicoba sekarang', pendek: 'Ditampilkan' },
      dimeja: { label: 'Di meja — dikerjakan, menunggu, atau istirahat', pendek: 'Di meja' },
      tulisan: { label: 'Karya tulis & desain', pendek: 'Tulis & desain' },
      pengalaman: { label: 'Pengalaman kerja — praktik industri', pendek: 'Kerja' },
      arsip: { label: 'Arsip — tidak dilanjutkan', pendek: 'Arsip' },
    },
    deskripsiSitus: 'Portofolio Mufuyu — siswa SMK RPL, membangun alat sendiri dari spesifikasi tertulis: desktop, web, dan audio.',
    deskripsiTentang: 'Cara kerja, alat, dan kontak.',
    kontak: 'Kontak',
    surel: 'Surel',
    jasaAjak: 'Ingin dibuatkan sesuatu?',
    jasaTautan: 'Lihat halaman jasa Pyonkuro',
    catatan: 'Catatan',
    jenisKerja: 'Penempatan kerja',
    jenisKarya: 'Karya',
    dataPenempatan: 'Data penempatan',
    dataKarya: 'Data karya',
    perusahaan: 'Perusahaan',
    lokasi: 'Lokasi',
    posisi: 'Posisi',
    peran: 'Peran',
    penulis: 'Penulis',
    periode: 'Periode',
    platform: 'Platform',
    bentuk: 'Bentuk',
    tumpukan: 'Tumpukan',
    angka: 'Angka',
    tangkapanLayar: 'Tangkapan layar',
    catatanPenempatan: 'Catatan penempatan',
    catatanKarya: 'Catatan karya',
    catatanTeknis: 'Catatan teknis',
    berikutnya: 'Berikutnya',
    karyaBerikutnya: 'Karya berikutnya',
    slotKosong: 'Slot gambar kosong',
    belumDiterjemahkan: '',
  },
  en: {
    sub: 'Software engineering student',
    bukaKerja: 'Open to work',
    beranda: 'Home',
    tentang: 'About',
    pilihBahasa: 'Choose language',
    navUtama: 'Main navigation',
    kelompok: {
      ditampilkan: { label: 'On display — ready to try', pendek: 'On display' },
      dimeja: { label: 'On the table — in progress, waiting, or resting', pendek: 'On the table' },
      tulisan: { label: 'Writing & design', pendek: 'Writing & design' },
      pengalaman: { label: 'Work experience — industry placement', pendek: 'Work' },
      arsip: { label: 'Archive — not continued', pendek: 'Archive' },
    },
    deskripsiSitus: 'Portfolio of Mufuyu — a vocational high school software engineering student who builds tools from written specifications: desktop, web, and audio.',
    deskripsiTentang: 'How I work, my tools, and contact.',
    kontak: 'Contact',
    surel: 'Email',
    jasaAjak: 'Want something made?',
    jasaTautan: 'See the Pyonkuro services page',
    catatan: 'Notes',
    jenisKerja: 'Work placement',
    jenisKarya: 'Work',
    dataPenempatan: 'Placement details',
    dataKarya: 'Project details',
    perusahaan: 'Company',
    lokasi: 'Location',
    posisi: 'Position',
    peran: 'Role',
    penulis: 'Author',
    periode: 'Period',
    platform: 'Platform',
    bentuk: 'Format',
    tumpukan: 'Stack',
    angka: 'Numbers',
    tangkapanLayar: 'Screenshots',
    catatanPenempatan: 'Placement notes',
    catatanKarya: 'Notes',
    catatanTeknis: 'Technical notes',
    berikutnya: 'Next',
    karyaBerikutnya: 'Next project',
    slotKosong: 'Empty image slot',
    belumDiterjemahkan: 'This page has not been translated yet; it is shown in Indonesian.',
  },
  ja: {
    sub: 'ソフトウェア工学科の学生',
    bukaKerja: 'お仕事受付中',
    beranda: 'ホーム',
    tentang: 'について',
    pilihBahasa: '言語を選択',
    navUtama: 'メインナビゲーション',
    kelompok: {
      ditampilkan: { label: '公開中 — 今すぐ試せるもの', pendek: '公開中' },
      dimeja: { label: '机の上 — 制作中・待機中・休止中', pendek: '机の上' },
      tulisan: { label: '文章・デザイン', pendek: '文章・デザイン' },
      pengalaman: { label: '職務経験 — 企業実習', pendek: '職務経験' },
      arsip: { label: 'アーカイブ — 続けないもの', pendek: 'アーカイブ' },
    },
    deskripsiSitus: 'Mufuyu のポートフォリオ。職業高校のソフトウェア工学科で学びながら、書いた仕様から自分のツールを作っています。デスクトップ、ウェブ、音声。',
    deskripsiTentang: '進め方、道具、連絡先。',
    kontak: '連絡先',
    surel: 'メール',
    jasaAjak: '何か作ってほしいときは',
    jasaTautan: 'Pyonkuro のサービスページへ',
    catatan: 'メモ',
    jenisKerja: '実習先',
    jenisKarya: '作品',
    dataPenempatan: '実習先の情報',
    dataKarya: '作品の情報',
    perusahaan: '会社',
    lokasi: '場所',
    posisi: '役職',
    peran: '担当',
    penulis: '作者',
    periode: '期間',
    platform: 'プラットフォーム',
    bentuk: '形式',
    tumpukan: '技術スタック',
    angka: '数字',
    tangkapanLayar: 'スクリーンショット',
    catatanPenempatan: '実習の記録',
    catatanKarya: '作品について',
    catatanTeknis: '技術メモ',
    berikutnya: '次へ',
    karyaBerikutnya: '次の作品',
    slotKosong: '画像なし',
    belumDiterjemahkan: 'このページはまだ翻訳されていません。インドネシア語で表示しています。',
  },
};
