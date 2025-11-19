# SITTA - Sistem Inventori & Tracking Transaksi Ajar

SITTA (Sistem Inventori & Tracking Transaksi Ajar) adalah aplikasi berbasis web yang dibangun menggunakan Vue.js untuk mengelola inventori bahan ajar dan tracking delivery order di lingkungan Universitas Terbuka.

## Fitur Utama

### 1. Dashboard
- Ringkasan statistik stok bahan ajar
- Informasi delivery order
- Status stok (aman, menipis, kosong)
- Akses cepat ke fitur utama

### 2. Stok Bahan Ajar
- Menampilkan daftar bahan ajar dengan informasi lengkap
- Filter berdasarkan UT-Daerah dan kategori
- Pencarian bahan ajar
- Sorting berdasarkan judul, stok, dan harga
- CRUD (Create, Read, Update, Delete) bahan ajar
- Status stok otomatis (Aman/Menipis/Kosong)
- Validasi input form

### 3. Tracking Delivery Order
- Form pembuatan delivery order baru
- Pencarian tracking berdasarkan nomor DO
- Daftar semua delivery order
- Status pengiriman

## Teknologi yang Digunakan

- Vue.js 2.6.14 (CDN)
- Lucide Icons
- Custom CSS (Responsive Design)
- Custom Dialog/Modal System

## Struktur Proyek

```
sitta-praktik-2/
├── index.html           # Halaman dashboard
├── stok.html            # Halaman stok bahan ajar
├── tracking.html        # Halaman tracking delivery order
├── css/
│   └── style.css        # Stylesheet utama (responsive)
└── js/
    ├── dataBahanAjar.js # Data bahan ajar
    ├── dialogUtils.js   # Custom dialog/modal system
    ├── stok-app.js      # Logic Vue.js untuk stok
    └── tracking-app.js  # Logic Vue.js untuk tracking
```

## Implementasi Vue.js

### Konsep yang Diterapkan

1. **Data Binding**
   - One-way binding: Menampilkan data stok, delivery order
   - Two-way binding (v-model): Form input, filter, search

2. **Directives**
   - v-for: Render list stok dan delivery order
   - v-if / v-else / v-show: Conditional rendering
   - v-model: Two-way data binding
   - v-on (@): Event handling
   - v-bind (:): Dynamic attributes

3. **Computed Properties**
   - filteredStok: Filter dan search bahan ajar
   - Status stok otomatis berdasarkan qty vs safety

4. **Methods**
   - CRUD operations untuk bahan ajar
   - Create delivery order
   - Search tracking
   - Validasi input

5. **Watchers**
   - Monitor perubahan filter dan search
   - Update UI secara real-time

## Penulis

- Markus Prap Kurniawan
- NIM: 048397016
