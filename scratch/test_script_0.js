

(function() {

  let appDialogResolve = null;



  function getOrCreateAppDialog() {

    let overlay = document.getElementById('appDialogOverlay');

    if (!overlay) {

      overlay = document.createElement('div');

      overlay.id = 'appDialogOverlay';

      overlay.style.cssText = 'display:none; position:fixed; inset:0; z-index:9999999; background:rgba(16,35,31,0.68); backdrop-filter:blur(6px); -webkit-backdrop-filter:blur(6px); align-items:center; justify-content:center; padding:16px; font-family:inherit;';

      overlay.innerHTML = `

        <div id="appDialogCard" style="background:#FFFFFF; border-radius:18px; max-width:440px; width:100%; box-shadow:0 25px 50px -12px rgba(0,0,0,0.35); border:1px solid #DCE5E1; overflow:hidden; transform:scale(0.92); opacity:0; transition:all .22s cubic-bezier(0.16, 1, 0.3, 1);">

          <div id="appDialogAccent" style="height:4px; background:linear-gradient(90deg, #0E7C74, #0B5C57);"></div>

          <div style="padding:22px 24px 20px;">

            <div style="display:flex; align-items:flex-start; gap:12px; margin-bottom:14px;">

              <div id="appDialogIconBox" style="width:42px; height:42px; border-radius:12px; background:#E6F3F0; color:#0E7C74; display:flex; align-items:center; justify-content:center; font-size:1.35rem; flex-shrink:0;">

                🔔

              </div>

              <div style="flex:1;">

                <h3 id="appDialogTitle" style="font-size:1.1rem; font-weight:800; color:#10231F; margin:0 0 3px 0; line-height:1.3;">

                  Thông Báo

                </h3>

                <div id="appDialogSub" style="font-size:0.75rem; color:#5B6E68;">Ninh Bình Digital System</div>

              </div>

              <button type="button" onclick="window.closeAppDialog(false)" style="background:none; border:none; color:#8A9C95; font-size:1.5rem; line-height:1; cursor:pointer; padding:0;" title="Đóng">&times;</button>

            </div>

            <div id="appDialogMessage" style="font-size:0.92rem; color:#2B3F39; line-height:1.6; margin-bottom:20px; max-height:55vh; overflow-y:auto; word-break:break-word;">

            </div>

            <div id="appDialogActions" style="display:flex; justify-content:flex-end; gap:10px;">

              <button id="appDialogBtnCancel" type="button" class="btn btn-outline" onclick="window.closeAppDialog(false)" style="padding:9px 18px; border-radius:9px; font-weight:600; font-size:0.88rem; border-color:#BCCBC5; color:#3F534D; background:#fff; cursor:pointer;">

                Hủy bỏ

              </button>

              <button id="appDialogBtnConfirm" type="button" class="btn btn-primary" onclick="window.closeAppDialog(true)" style="padding:9px 22px; border-radius:9px; font-weight:700; font-size:0.88rem; background:#0B5C57; color:#fff; border:none; box-shadow:0 4px 12px rgba(11,92,87,0.25); cursor:pointer;">

                Đồng ý

              </button>

            </div>

          </div>

        </div>

      `;

      (document.body || document.documentElement).appendChild(overlay);

      overlay.addEventListener('click', function(e) {

        if (e.target === overlay) window.closeAppDialog(false);

      });

      document.addEventListener('keydown', function(e) {

        if (overlay && overlay.style.display === 'flex') {

          if (e.key === 'Escape') {

            e.preventDefault();

            window.closeAppDialog(false);

          } else if (e.key === 'Enter') {

            e.preventDefault();

            window.closeAppDialog(true);

          }

        }

      });

    }

    return overlay;

  }



  window.closeAppDialog = function(result) {

    const overlay = document.getElementById('appDialogOverlay');

    const card = document.getElementById('appDialogCard');

    if (card) {

      card.style.transform = 'scale(0.92)';

      card.style.opacity = '0';

    }

    setTimeout(() => {

      if (overlay) overlay.style.display = 'none';

      if (typeof appDialogResolve === 'function') {

        const fn = appDialogResolve;

        appDialogResolve = null;

        fn(result);

      }

    }, 180);

  };



  window.showAppAlert = function(opts) {

    return new Promise((resolve) => {

      appDialogResolve = resolve;

      const msg = typeof opts === 'string' ? opts : (opts.message || '');

      const title = (typeof opts === 'object' && opts.title) ? opts.title : 'Thông Báo';

      const icon = (typeof opts === 'object' && opts.icon) ? opts.icon : '🔔';

      const btnText = (typeof opts === 'object' && opts.btnText) ? opts.btnText : 'Đã hiểu';



      const overlay = getOrCreateAppDialog();

      const card = document.getElementById('appDialogCard');

      const titleEl = document.getElementById('appDialogTitle');

      const msgEl = document.getElementById('appDialogMessage');

      const iconBox = document.getElementById('appDialogIconBox');

      const accent = document.getElementById('appDialogAccent');

      const btnCancel = document.getElementById('appDialogBtnCancel');

      const btnConfirm = document.getElementById('appDialogBtnConfirm');



      titleEl.innerText = title;

      msgEl.innerHTML = (typeof msg === 'string') ? msg.replace(/\n/g, '<br>') : msg;

      iconBox.innerText = icon;

      iconBox.style.background = '#E6F3F0';

      iconBox.style.color = '#0E7C74';

      accent.style.background = 'linear-gradient(90deg, #0E7C74, #0B5C57)';

      btnConfirm.style.background = '#0B5C57';

      btnConfirm.innerText = btnText;

      btnCancel.style.display = 'none';



      overlay.style.display = 'flex';

      requestAnimationFrame(() => {

        card.style.transform = 'scale(1)';

        card.style.opacity = '1';

      });

    });

  };



  window.showAppConfirm = function(opts) {

    return new Promise((resolve) => {

      appDialogResolve = (result) => {

        if (result) {

          if (typeof opts.onConfirm === 'function') opts.onConfirm();

        } else {

          if (typeof opts.onCancel === 'function') opts.onCancel();

        }

        resolve(result);

      };



      const msg = typeof opts === 'string' ? opts : (opts.message || '');

      const title = (typeof opts === 'object' && opts.title) ? opts.title : 'Xác Nhận';

      const icon = (typeof opts === 'object' && opts.icon) ? opts.icon : '⚠️';

      const confirmText = (typeof opts === 'object' && opts.confirmText) ? opts.confirmText : 'Đồng ý';

      const cancelText = (typeof opts === 'object' && opts.cancelText) ? opts.cancelText : 'Hủy bỏ';

      const isDanger = (typeof opts === 'object' && opts.isDanger);



      const overlay = getOrCreateAppDialog();

      const card = document.getElementById('appDialogCard');

      const titleEl = document.getElementById('appDialogTitle');

      const msgEl = document.getElementById('appDialogMessage');

      const iconBox = document.getElementById('appDialogIconBox');

      const accent = document.getElementById('appDialogAccent');

      const btnCancel = document.getElementById('appDialogBtnCancel');

      const btnConfirm = document.getElementById('appDialogBtnConfirm');



      titleEl.innerText = title;

      msgEl.innerHTML = (typeof msg === 'string') ? msg.replace(/\n/g, '<br>') : msg;

      iconBox.innerText = icon;



      if (isDanger) {

        iconBox.style.background = '#FEE2E2';

        iconBox.style.color = '#DC2626';

        accent.style.background = 'linear-gradient(90deg, #DC2626, #B91C1C)';

        btnConfirm.style.background = '#DC2626';

      } else {

        iconBox.style.background = '#FBEFD2';

        iconBox.style.color = '#A65F00';

        accent.style.background = 'linear-gradient(90deg, #E0A11B, #A65F00)';

        btnConfirm.style.background = '#0B5C57';

      }



      btnConfirm.innerText = confirmText;

      btnCancel.innerText = cancelText;

      btnCancel.style.display = 'inline-flex';



      overlay.style.display = 'flex';

      requestAnimationFrame(() => {

        card.style.transform = 'scale(1)';

        card.style.opacity = '1';

      });

    });

  };



  // Tự động chuyển toàn bộ lệnh alert() mặc định sang pop-up hiện đại

  window.alert = function(message) {

    window.showAppAlert(message);

  };

})();

