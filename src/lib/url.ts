// Menyusun tautan yang tetap benar kalau situs dipasang di sub-folder
// (GitHub Pages project page, mis. https://user.github.io/porto/).
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function u(path: string): string {
  return `${BASE}/${path.replace(/^\//, '')}`;
}

// Membandingkan alamat halaman sekarang dengan sebuah tautan.
export function aktif(sekarang: string, tautan: string): boolean {
  const bersih = (s: string) => s.replace(/\/+$/, '') || '/';
  return bersih(sekarang) === bersih(tautan);
}
