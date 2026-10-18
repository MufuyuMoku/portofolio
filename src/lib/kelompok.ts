import type { CollectionEntry } from 'astro:content';

// Urutan kelompok karya di beranda dan sidebar. `label` dipakai di beranda,
// `pendek` di sidebar yang sempit.
export const KELOMPOK = [
  { id: 'ditampilkan', label: 'Ditampilkan — bisa dicoba sekarang',           pendek: 'Ditampilkan' },
  { id: 'dimeja',      label: 'Di meja — dikerjakan, menunggu, atau istirahat', pendek: 'Di meja' },
  { id: 'tulisan',     label: 'Karya tulis & desain',                          pendek: 'Tulis & desain' },
  { id: 'pengalaman',  label: 'Pengalaman kerja — praktik industri',           pendek: 'Kerja' },
  { id: 'arsip',       label: 'Arsip — tidak dilanjutkan',                     pendek: 'Arsip' },
] as const;

type Karya = CollectionEntry<'karya'>;

export function kelompokkan(karya: Karya[]) {
  const urut = [...karya].sort((a, b) => a.data.urutan - b.data.urutan);
  return KELOMPOK
    .map((k) => ({ ...k, isi: urut.filter((e) => e.data.kelompok === k.id) }))
    .filter((k) => k.isi.length > 0);
}
