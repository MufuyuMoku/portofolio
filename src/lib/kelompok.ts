import type { CollectionEntry } from 'astro:content';

// Urutan kelompok karya di beranda dan sidebar. `label` dipakai di beranda,
// `pendek` di sidebar yang sempit.
export const KELOMPOK = [
  { id: 'dirilis',    label: 'Dirilis / berjalan',                  pendek: 'Dirilis' },
  { id: 'dikerjakan', label: 'Sedang dikerjakan',                   pendek: 'Dikerjakan' },
  { id: 'rancangan',  label: 'Dalam rancangan',                     pendek: 'Rancangan' },
  { id: 'dihentikan', label: 'Dihentikan',                          pendek: 'Dihentikan' },
  { id: 'pengalaman', label: 'Pengalaman kerja — praktik industri', pendek: 'Kerja' },
] as const;

type Karya = CollectionEntry<'karya'>;

export function kelompokkan(karya: Karya[]) {
  const urut = [...karya].sort((a, b) => a.data.urutan - b.data.urutan);
  return KELOMPOK
    .map((k) => ({ ...k, isi: urut.filter((e) => e.data.kelompok === k.id) }))
    .filter((k) => k.isi.length > 0);
}
