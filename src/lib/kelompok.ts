import type { Bahasa, KaryaBahasa } from './bahasa';
import { UI } from './teks';

// Urutan kelompok karya di beranda dan sidebar. Labelnya per bahasa ada di
// src/lib/teks.ts (`label` untuk beranda, `pendek` untuk sidebar yang sempit).
export const KELOMPOK = ['ditampilkan', 'dimeja', 'tulisan', 'pengalaman', 'arsip'] as const;

export function kelompokkan(karya: KaryaBahasa[], bahasa: Bahasa) {
  const urut = [...karya].sort((a, b) => a.data.urutan - b.data.urutan);
  return KELOMPOK
    .map((id) => ({ id, ...UI[bahasa].kelompok[id], isi: urut.filter((e) => e.data.kelompok === id) }))
    .filter((k) => k.isi.length > 0);
}
