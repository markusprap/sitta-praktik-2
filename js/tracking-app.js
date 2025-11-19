
var app = new Vue({
  el: '#app',
  data: {
    sidebarOpen: false,
    
    pengirimanList: dataBahanAjar.pengirimanList,
    paket: dataBahanAjar.paket,
    upbjjList: dataBahanAjar.upbjjList,
    
    tracking: dataBahanAjar.tracking,
    
    formDO: {
      nim: '',
      nama: '',
      ekspedisi: '',
      paketKode: '',
      tanggalKirim: ''
    },
    errors: {},
    
    trackingNumber: '',
    trackingResult: null,
    trackingNotFound: false,
    
    doCounter: 2
  },
  
  computed: {
    selectedPaket() {
      if (!this.formDO.paketKode) return null;
      return this.paket.find(p => p.kode === this.formDO.paketKode);
    },
    
    todayDate() {
      const today = new Date();
      return today.toISOString().split('T')[0];
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
    
    'formDO.paketKode': function(newPaket, oldPaket) {
      if (newPaket) {
        const paketData = this.paket.find(p => p.kode === newPaket);
      } else {
      }
    },
    
    'formDO.nim': function(newNim) {
      if (newNim && newNim.length === 9) {
        delete this.errors.nim;
      } else if (newNim && newNim.length < 9) {
        this.errors.nim = 'NIM harus 9 digit';
      }
    }
  },
  
  methods: {
    formatHarga(harga) {
      return harga.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    
    formatDate(dateString) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agt', 'Sep', 'Okt', 'Nov', 'Des'];
      const date = new Date(dateString);
      return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
    },
    
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    
    handleBackdropClick(e) {
      if (this.sidebarOpen && !e.target.closest('.sidebar') && !e.target.closest('.hamburger')) {
        this.sidebarOpen = false;
      }
    },
    
    generateDONumber() {
      const year = new Date().getFullYear();
      const sequence = String(this.doCounter).padStart(3, '0');
      this.doCounter++;
      return `DO${year}-${sequence}`;
    },
    
    onPaketChange() {
      if (this.selectedPaket) {
      }
    },
    
    createDeliveryOrder() {
      this.errors = {};
      
      if (!this.validateDOForm()) {
        DialogUtils.showError('Mohon lengkapi semua field dengan benar!');
        return;
      }
      
      const nomorDO = this.generateDONumber();
      
      const paketData = this.selectedPaket;
      
      const ekspedisiData = this.pengirimanList.find(e => e.kode === this.formDO.ekspedisi);
      
      const newDO = {
        nim: this.formDO.nim,
        nama: this.formDO.nama,
        status: "Pesanan Dibuat",
        ekspedisi: ekspedisiData ? ekspedisiData.nama : this.formDO.ekspedisi,
        tanggalKirim: this.formDO.tanggalKirim,
        paket: paketData.nama,
        total: paketData.harga,
        perjalanan: [
          { 
            waktu: this.getCurrentDateTime(), 
            keterangan: "Pesanan delivery order dibuat" 
          }
        ]
      };
      
      this.$set(this.tracking, nomorDO, newDO);
      
      DialogUtils.showSuccess(`Delivery Order berhasil dibuat!<br><strong>Nomor DO: ${nomorDO}</strong>`);
      
      this.trackingNumber = nomorDO;
      this.searchTracking();
      
      this.resetForm();
    },
    
    validateDOForm() {
      let valid = true;
      
      if (!this.formDO.nim || this.formDO.nim.length !== 9) {
        this.errors.nim = 'NIM harus 9 digit';
        valid = false;
      }
      
      if (!this.formDO.nama || this.formDO.nama.length < 3) {
        this.errors.nama = 'Nama harus minimal 3 karakter';
        valid = false;
      }
      
      if (!this.formDO.ekspedisi) {
        valid = false;
      }
      
      if (!this.formDO.paketKode) {
        valid = false;
      }
      
      if (!this.formDO.tanggalKirim) {
        valid = false;
      }
      
      return valid;
    },
    
    searchTracking() {
      this.trackingNotFound = false;
      this.trackingResult = null;
      
      if (!this.trackingNumber) {
        DialogUtils.showWarning('Masukkan nomor DO terlebih dahulu!');
        return;
      }
      
      const doData = this.tracking[this.trackingNumber];
      
      if (doData) {
        this.trackingResult = {
          nomorDO: this.trackingNumber,
          ...doData
        };
      } else {
        this.trackingNotFound = true;
      }
    },
    
    viewTracking(nomorDO) {
      this.trackingNumber = nomorDO;
      this.searchTracking();
      
      setTimeout(() => {
        const trackingSection = document.querySelector('.tracking-result');
        if (trackingSection) {
          trackingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    },
    
    getTrackingStatusClass(status) {
      if (status === 'Terkirim' || status === 'Selesai') {
        return 'status-delivered';
      } else if (status === 'Dalam Perjalanan') {
        return 'status-in-transit';
      } else if (status === 'Pesanan Dibuat' || status === 'Diproses') {
        return 'status-processing';
      } else {
        return 'status-default';
      }
    },
    
    getCurrentDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    
    resetForm() {
      this.formDO = {
        nim: '',
        nama: '',
        ekspedisi: '',
        paketKode: '',
        tanggalKirim: ''
      };
      this.errors = {};
    }
  },
  
  mounted() {
    
    this.formDO.tanggalKirim = this.todayDate;
  }
});
