// Tiga bahasa situs. Bahasa Indonesia adalah sumber utama: isinya di
// src/content/karya dan src/content/halaman. Terjemahan Inggris dan Jepang ada
// di src/content/terjemahan/<bahasa>/..., dan hanya berisi kolom yang
// diterjemahkan; kolom lain (kode, kelompok, urutan, tumpukan, alamat tautan)
// selalu diambil dari berkas bahasa Indonesia.
import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { u } from './url';

export const BAHASA = ['id', 'en', 'ja'] as const;
export type Bahasa = (typeof BAHASA)[number];
export const BAHASA_TERJEMAHAN = ['en', 'ja'] as const;

export const LABEL_BAHASA: Record<Bahasa, string> = { id: 'ID', en: 'EN', ja: '日本語' };

// Alamat dengan awalan bahasa: id tanpa awalan, en → /en/..., ja → /ja/...
export function ul(bahasa: Bahasa, path: string): string {
  const bersih = path.startsWith('/') ? path : `/${path}`;
  return bahasa === 'id' ? u(bersih) : u(`/${bahasa}${bersih}`);
}

// Membuang awalan base dan bahasa dari alamat halaman sekarang, supaya
// pemilih bahasa bisa menunjuk ke halaman yang sama di bahasa lain.
export function jalurTanpaBahasa(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  let p = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  p = p.replace(/^\/(en|ja)(?=\/|$)/, '');
  return p || '/';
}

type Karya = CollectionEntry<'karya'>;
type Data = Karya['data'];

export type KaryaBahasa = {
  id: string;
  data: Data;
  sumber: Karya | CollectionEntry<'terjemahan'>; // entri yang badan markdown-nya dirender
  terjemahan: boolean; // false kalau belum ada terjemahan dan jatuh ke bahasa Indonesia
};

export async function semuaKarya(bahasa: Bahasa): Promise<KaryaBahasa[]> {
  const asli = await getCollection('karya');
  if (bahasa === 'id') return asli.map((e) => ({ id: e.id, data: e.data, sumber: e, terjemahan: true }));
  const tr = await getCollection('terjemahan', (e) => e.id.startsWith(`${bahasa}/karya/`));
  const peta = new Map(tr.map((e) => [e.id.split('/').pop()!, e]));
  return asli.map((e) => {
    const t = peta.get(e.id);
    if (!t) return { id: e.id, data: e.data, sumber: e, terjemahan: false };
    const d = t.data;
    const data: Data = {
      ...e.data,
      ...Object.fromEntries(Object.entries(d).filter(([, v]) => v !== undefined)),
      // Tautan: alamat tetap dari berkas asli, label boleh diterjemahkan berurutan.
      tautan: e.data.tautan.map((x, i) => ({ ...x, label: d.tautanLabel?.[i] ?? x.label })),
      // Tangkapan: berkas gambar tetap, teksnya boleh diterjemahkan berurutan.
      tangkapan: e.data.tangkapan.map((x, i) => ({ ...x, ...(d.tangkapanTeks?.[i] ?? {}) })),
    } as Data;
    return { id: e.id, data, sumber: t, terjemahan: true };
  });
}

export async function halaman(bahasa: Bahasa, nama: 'beranda' | 'tentang') {
  if (bahasa !== 'id') {
    const t = await getEntry('terjemahan', `${bahasa}/halaman/${nama}`);
    if (t) return t;
  }
  return (await getEntry('halaman', nama))!;
}
