const DialogUtils = {
  overlay: null,
  
  init() {
    if (!this.overlay) {
      this.overlay = document.getElementById('dialogOverlay');
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) {
          this.close();
        }
      });
    }
  },

  show(options) {
    this.init();
    
    const {
      type = 'info',
      title = 'Notifikasi',
      message = '',
      confirmText = 'OK',
      cancelText = 'Batal',
      onConfirm = null,
      onCancel = null,
      showCancel = false
    } = options;

    const icons = {
      success: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
      error: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>',
      warning: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
      info: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'
    };

    const dialogHTML = `
      <div class="dialog-container">
        <div class="dialog-header">
          <div class="dialog-icon ${type}">
            ${icons[type]}
          </div>
          <div class="dialog-title">
            <h3>${title}</h3>
          </div>
        </div>
        <div class="dialog-body">
          ${message}
        </div>
        <div class="dialog-footer">
          ${showCancel ? `<button class="btn btn-secondary" id="dialogCancel">${cancelText}</button>` : ''}
          <button class="btn btn-primary" id="dialogConfirm">${confirmText}</button>
        </div>
      </div>
    `;

    this.overlay.innerHTML = dialogHTML;
    this.overlay.classList.add('active');

    document.getElementById('dialogConfirm').addEventListener('click', () => {
      this.close();
      if (onConfirm) onConfirm();
    });

    if (showCancel) {
      document.getElementById('dialogCancel').addEventListener('click', () => {
        this.close();
        if (onCancel) onCancel();
      });
    }

    document.addEventListener('keydown', this.handleEscape);
  },

  handleEscape(e) {
    if (e.key === 'Escape') {
      DialogUtils.close();
    }
  },

  close() {
    if (this.overlay) {
      this.overlay.classList.remove('active');
      document.removeEventListener('keydown', this.handleEscape);
    }
  },

  showSuccess(message, title = 'Berhasil') {
    this.show({
      type: 'success',
      title: title,
      message: message,
      confirmText: 'OK'
    });
  },

  showError(message, title = 'Error') {
    this.show({
      type: 'error',
      title: title,
      message: message,
      confirmText: 'OK'
    });
  },

  showWarning(message, title = 'Peringatan') {
    this.show({
      type: 'warning',
      title: title,
      message: message,
      confirmText: 'OK'
    });
  },

  showInfo(message, title = 'Informasi') {
    this.show({
      type: 'info',
      title: title,
      message: message,
      confirmText: 'OK'
    });
  },

  showConfirm(message, onConfirm, title = 'Konfirmasi') {
    this.show({
      type: 'warning',
      title: title,
      message: message,
      confirmText: 'Ya',
      cancelText: 'Tidak',
      showCancel: true,
      onConfirm: onConfirm
    });
  }
};
