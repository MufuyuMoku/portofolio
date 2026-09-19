import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Skema isi. Nama kolom sengaja bahasa Indonesia supaya berkas di
// src/content/ bisa disunting tanpa menyentuh kode.
const karya = defineCollection({
  loader: glob({ base: './src/content/karya', pattern: '**/*.md' }),
  schema: z.object({
    judul: z.string(),
    kode: z.string(),                       // penanda pendek, mis. "01"
    kategori: z.enum(['proyek', 'pengalaman']),
    urutan: z.number(),
    ringkas: z.string(),                    // satu baris untuk daftar di beranda
    status: z.string(),                     // mis. "Dalam pengembangan"
    keadaan: z.enum(['aktif', 'selesai', 'arsip']).default('aktif'),
    periode: z.string(),
    peran: z.string(),
    platform: z.string().optional(),
    tumpukan: z.array(z.string()).default([]),
    // Dipakai halaman berkategori `pengalaman`.
    perusahaan: z.string().optional(),
    lokasi: z.string().optional(),
    // Satu baris di bawah judul, mis. menerangkan kenapa tidak ada repo.
    catatan: z.string().optional(),
    // Angka yang layak dipamerkan: uji, cakupan, ukuran binari, waktu muat.
    spek: z.array(z.object({
      label: z.string(),
      nilai: z.string(),
      catatan: z.string().optional(),
    })).default([]),
    tautan: z.array(z.object({
      label: z.string(),
      href: z.string(),
    })).default([]),
    // Kosongkan daftar ini kalau halaman tidak memakai tangkapan layar.
    tangkapan: z.array(z.object({
      src: z.string(),
      alt: z.string(),
      keterangan: z.string().optional(),
    })).default([]),
  }),
});

const halaman = defineCollection({
  loader: glob({ base: './src/content/halaman', pattern: '**/*.md' }),
  schema: z.object({
    judul: z.string(),
    kicau: z.string().optional(),   // label mono kecil di atas judul
    pembuka: z.string().optional(), // kalimat pembuka besar
  }),
});

export const collections = { karya, halaman };
