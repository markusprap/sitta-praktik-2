var app = new Vue({
  el: '#app',
  data: {
    sidebarOpen: false,
    upbjjList: dataBahanAjar.upbjjList,
    kategoriList: dataBahanAjar.kategoriList,
    stok: dataBahanAjar.stok,
    
    filterUpbjj: '',
    filterKategori: '',
    sortBy: '',
    searchQuery: '',
    
    showForm: false,
    isEditing: false,
    formData: {
      kode: '',
      judul: '',
      kategori: '',
      upbjj: '',
      lokasiRak: '',
      harga: 0,
      qty: 0,
      safety: 0,
      catatanHTML: ''
    },
    errors: {}
  },
  
  computed: {
    filteredStok() {
      let result = this.stok;
      
      if (this.filterUpbjj) {
        result = result.filter(item => item.upbjj === this.filterUpbjj);
      }
      
      if (this.filterKategori) {
        result = result.filter(item => item.kategori === this.filterKategori);
      }
      
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(item => 
          item.kode.toLowerCase().includes(query) || 
          item.judul.toLowerCase().includes(query)
        );
      }
      
      if (this.sortBy === 'judul') {
        result = result.sort((a, b) => a.judul.localeCompare(b.judul));
      } else if (this.sortBy === 'qty-asc') {
        result = result.sort((a, b) => a.qty - b.qty);
      } else if (this.sortBy === 'qty-desc') {
        result = result.sort((a, b) => b.qty - a.qty);
      } else if (this.sortBy === 'harga') {
        result = result.sort((a, b) => a.harga - b.harga);
      }
      
      return result;
    }
  },
  
  watch: {
    sidebarOpen: function(newVal) {
      if (newVal) {
        document.body.classList.add('sidebar-open');
        setTimeout(() => {
          document.body.addEventListener('click', this.handleBackdropClick);
        }, 100);
      } else {
        document.body.classList.remove('sidebar-open');
        document.body.removeEventListener('click', this.handleBackdropClick);
      }
    },
    
    'formData.qty': function(newQty, oldQty) {
      if (newQty < this.formData.safety && newQty > 0) {
        this.errors.qty = 'Qty dibawah safety stock';
      } else if (newQty === 0) {
        this.errors.qty = 'Stok kosong';
      } else {
        this.errors.qty = '';
      }
    },
    
    filterUpbjj: function(newVal) {
      this.searchQuery = '';
    },
    
    searchQuery: function(newVal) {
      if (!newVal) {
        this.filterUpbjj = '';
        this.filterKategori = '';
      }
    }
  },
  
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    
    handleBackdropClick(e) {
      if (this.sidebarOpen && !e.target.closest('.sidebar') && !e.target.closest('.hamburger')) {
        this.sidebarOpen = false;
      }
    },
    
    formatHarga(harga) {
      return harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    
    getStatusClass(item) {
      if (item.qty === 0) {
        return 'status-kosong';
      } else if (item.qty < item.safety) {
        return 'status-menipis';
      } else {
        return 'status-aman';
      }
    },
    
    getStatusText(item) {
      if (item.qty === 0) {
        return 'Kosong';
      } else if (item.qty < item.safety) {
        return 'Menipis';
      } else {
        return 'Aman';
      }
    },
    
    showAddForm() {
      this.isEditing = false;
      this.resetFormData();
      this.showForm = true;
    },
    
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    
    editBahanAjar(item) {
      this.isEditing = true;
      this.formData = { ...item };
      this.showForm = true;
    },
    
    saveBahanAjar() {
      this.errors = {};
      
      if (!this.validateForm()) {
        DialogUtils.showError('Mohon periksa kembali input Anda!');
        return;
      }
      
      if (this.isEditing) {
        const index = this.stok.findIndex(item => item.kode === this.formData.kode);
        if (index !== -1) {
          this.$set(this.stok, index, { ...this.formData });
          DialogUtils.showSuccess('Bahan ajar berhasil diupdate!');
        }
      } else {
        const exists = this.stok.find(item => item.kode === this.formData.kode);
        if (exists) {
          this.errors.kode = 'Kode mata kuliah sudah ada!';
          return;
        }
        
        this.stok.push({ ...this.formData });
        DialogUtils.showSuccess('Bahan ajar baru berhasil ditambahkan!');
      }
      
      this.cancelForm();
    },
    
    validateForm() {
      let valid = true;
      
      if (!this.formData.kode || this.formData.kode.length < 4) {
        this.errors.kode = 'Kode harus minimal 4 karakter';
        valid = false;
      }
      
      if (!this.formData.judul || this.formData.judul.length < 3) {
        this.errors.judul = 'Judul harus minimal 3 karakter';
        valid = false;
      }
      
      if (this.formData.harga <= 0) {
        this.errors.harga = 'Harga harus lebih dari 0';
        valid = false;
      }
      
      if (this.formData.qty < 0) {
        this.errors.qty = 'Qty tidak boleh negatif';
        valid = false;
      }
      
      if (this.formData.safety < 0) {
        this.errors.safety = 'Safety stock tidak boleh negatif';
        valid = false;
      }
      
      return valid;
    },
    
    deleteBahanAjar(kode) {
      DialogUtils.showConfirm(
        `Apakah Anda yakin ingin menghapus bahan ajar ${kode}?`,
        () => {
          const index = this.stok.findIndex(item => item.kode === kode);
          if (index !== -1) {
            this.stok.splice(index, 1);
            DialogUtils.showSuccess('Bahan ajar berhasil dihapus!');
          }
        }
      );
    },
    
    cancelForm() {
      this.showForm = false;
      this.resetFormData();
      this.errors = {};
    },
    
    resetFormData() {
      this.formData = {
        kode: '',
        judul: '',
        kategori: '',
        upbjj: '',
        lokasiRak: '',
        harga: 0,
        qty: 0,
        safety: 0,
        catatanHTML: ''
      };
    },
    
    resetFilters() {
      this.filterUpbjj = '';
      this.filterKategori = '';
      this.sortBy = '';
      this.searchQuery = '';
    },
    
    onSearchInput(event) {
    }
  },
  
  mounted() {
  }
});
