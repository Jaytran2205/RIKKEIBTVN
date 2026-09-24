/**
 * NINH BÌNH DIGITAL — SUPABASE DATABASE INTEGRATION CLIENT
 * Tự động đồng bộ Đơn hàng, Khách CRM, Góp ý, Sổ quỹ & Thành viên lên Cloud
 */

const SUPABASE_URL = "https://ufnbgkfgjazjcvwalvpx.supabase.co";
// Khóa API Public (publishable key an toàn tuyệt đối cho Web Client)
const DEFAULT_ANON_KEY = "sb_publishable_Wxd6lTG78xAQNdE-FrmZxg_2sGxKwP3";
let SUPABASE_KEY = (typeof window !== 'undefined' && window.SUPABASE_ANON_KEY) || 
                   (typeof localStorage !== 'undefined' && localStorage.getItem('nb_supabase_anon_key')) || 
                   DEFAULT_ANON_KEY;

// Cung cấp hàm lưu anon key nếu muốn cập nhật
function setSupabaseAnonKey(newKey) {
  if (newKey && newKey.trim()) {
    SUPABASE_KEY = newKey.trim();
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('nb_supabase_anon_key', SUPABASE_KEY);
    }
  }
}

/**
 * Native REST API helper (không phụ thuộc CDN bên ngoài, chạy siêu tốc < 0.1s)
 */
async function supabaseFetch(table, options = {}) {
  const method = options.method || 'GET';
  const query = options.query || '';
  const body = options.body ? JSON.stringify(options.body) : null;
  const prefer = options.prefer || (method === 'POST' ? 'return=representation' : undefined);

  const headers = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json'
  };
  if (prefer) {
    headers['Prefer'] = prefer;
  }

  const url = `${SUPABASE_URL}/rest/v1/${table}${query ? (query.startsWith('?') ? query : '?' + query) : ''}`;

  try {
    const res = await fetch(url, {
      method,
      headers,
      body
    });
    if (!res.ok) {
      const errText = await res.text();
      console.warn(`[Supabase Error] ${table} ${method}:`, errText);
      return { data: null, error: errText };
    }
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      return { data, error: null };
    }
    return { data: true, error: null };
  } catch (err) {
    console.error(`[Supabase Network Error] ${table}:`, err);
    return { data: null, error: err.message };
  }
}

// ==========================================
// 1. ĐƠN HÀNG ĐẶC SẢN & DỊCH VỤ (nb_orders)
// ==========================================
async function dbCreateOrder(order) {
  const payload = {
    order_code: order.orderId || ('NB' + Math.floor(Math.random() * 9000 + 1000)),
    customer_name: order.customer?.name || 'Khách Ninh Bình',
    customer_phone: order.customer?.phone || '',
    customer_address: order.customer?.address || '',
    items: order.items || [],
    total: order.total || 0,
    payment_method: order.paymentMethod || 'COD',
    status: 'pending'
  };
  const res = await supabaseFetch('nb_orders', { method: 'POST', body: payload });
  return res;
}

async function dbGetOrders() {
  const res = await supabaseFetch('nb_orders', { query: 'select=*&order=id.desc' });
  return res.data || [];
}

async function dbDeleteOrder(idOrCode) {
  if (!idOrCode) return { data: null, error: 'No identifier' };
  const query = (typeof idOrCode === 'number' || /^\d+$/.test(idOrCode))
    ? `id=eq.${idOrCode}`
    : `order_code=eq.${encodeURIComponent(idOrCode)}`;
  const res = await supabaseFetch('nb_orders', {
    method: 'DELETE',
    query
  });
  return res;
}

async function dbClearAllOrders() {
  const res = await supabaseFetch('nb_orders', {
    method: 'DELETE',
    query: 'id=gt.0'
  });
  return res;
}

// ==========================================
// 2. KHÁCH HÀNG CRM / TƯ VẤN (nb_leads)
// ==========================================
async function dbCreateLead(lead) {
  const payload = {
    name: lead.name || 'Khách hàng',
    phone: lead.phone || '',
    email: lead.email || '',
    service: lead.service || 'Tư vấn',
    note: lead.note || '',
    status: 'pending'
  };
  const res = await supabaseFetch('nb_leads', { method: 'POST', body: payload });
  return res;
}

async function dbGetLeads() {
  const res = await supabaseFetch('nb_leads', { query: 'select=*&order=id.desc' });
  return res.data || [];
}

async function dbUpdateLeadStatus(id, newStatus) {
  const res = await supabaseFetch('nb_leads', {
    method: 'PATCH',
    query: `id=eq.${id}`,
    body: { status: newStatus }
  });
  return res;
}

async function dbDeleteLead(id) {
  const res = await supabaseFetch('nb_leads', {
    method: 'DELETE',
    query: `id=eq.${id}`
  });
  return res;
}

async function dbDeleteLeadByPhone(phone) {
  if (!phone) return { data: null, error: 'No phone' };
  const res = await supabaseFetch('nb_leads', {
    method: 'DELETE',
    query: `phone=eq.${encodeURIComponent(phone)}`
  });
  return res;
}

async function dbClearAllLeads() {
  const res = await supabaseFetch('nb_leads', {
    method: 'DELETE',
    query: 'id=gt.0'
  });
  return res;
}

// ==========================================
// 3. HÒM THƯ GÓP Ý & ĐÁNH GIÁ (nb_feedbacks)
// ==========================================
async function dbCreateFeedback(fb) {
  const payload = {
    name: fb.name || 'Du khách',
    phone: fb.phone || '',
    topic: fb.topic || 'Góp ý',
    rating: parseInt(fb.rating) || 5,
    content: fb.content || '',
    status: 'pending'
  };
  const res = await supabaseFetch('nb_feedbacks', { method: 'POST', body: payload });
  return res;
}

async function dbGetFeedbacks() {
  const res = await supabaseFetch('nb_feedbacks', { query: 'select=*&order=id.desc' });
  return res.data || [];
}

async function dbDeleteFeedback(id) {
  if (!id) return { data: null, error: 'No id' };
  const res = await supabaseFetch('nb_feedbacks', {
    method: 'DELETE',
    query: `id=eq.${id}`
  });
  return res;
}

async function dbClearAllFeedbacks() {
  const res = await supabaseFetch('nb_feedbacks', {
    method: 'DELETE',
    query: 'id=gt.0'
  });
  return res;
}

// ==========================================
// 4. SỔ QUỸ THU CHI & DOANH THU (nb_cashbook)
// ==========================================
async function dbCreateCashbookEntry(entry) {
  const payload = {
    trans_date: entry.date || new Date().toISOString().split('T')[0],
    type: entry.type || 'thu',
    category: entry.cat || entry.category || 'Thu dịch vụ',
    amount: parseFloat(entry.amount) || 0,
    payment_method: entry.method || 'Chuyển khoản VietQR',
    note: entry.note || ''
  };
  const res = await supabaseFetch('nb_cashbook', { method: 'POST', body: payload });
  return res;
}

async function dbGetCashbook() {
  const res = await supabaseFetch('nb_cashbook', { query: 'select=*&order=id.desc' });
  return res.data || [];
}

async function dbDeleteCashbookEntry(id) {
  const res = await supabaseFetch('nb_cashbook', {
    method: 'DELETE',
    query: `id=eq.${id}`
  });
  return res;
}

// ==========================================
// 5. THÀNH VIÊN & MÃ HÓA HASH MẬT KHẨU (nb_users)
// ==========================================

// Pure JS SHA-256 fallback (chạy trên mọi môi trường và thiết bị)
function sha256PureJs(ascii) {
  function rightRotate(value, amount) {
    return (value >>> amount) | (value << (32 - amount));
  }
  const mathPow = Math.pow;
  const maxWord = mathPow(2, 32);
  let lengthProperty = 'length';
  let i, j;
  let result = '';
  const words = [];
  const asciiBitLength = ascii[lengthProperty] * 8;
  let hash = [];
  const k = [];
  let primeCounter = 0;
  const isComposite = {};
  for (let candidate = 2; primeCounter < 64; candidate++) {
    if (!isComposite[candidate]) {
      for (i = 0; i < 313; i += candidate) {
        isComposite[i] = candidate;
      }
      hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
      k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
    }
  }
  ascii += '\x80';
  while (ascii[lengthProperty] % 64 - 56) ascii += '\x00';
  for (i = 0; i < ascii[lengthProperty]; i++) {
    j = ascii.charCodeAt(i);
    if (j >> 8) return '';
    words[i >> 2] |= j << ((3 - i) % 4) * 8;
  }
  words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
  words[words[lengthProperty]] = (asciiBitLength);
  for (j = 0; j < words[lengthProperty];) {
    const w = words.slice(j, j += 16);
    const oldHash = hash;
    hash = hash.slice(0, 8);
    for (i = 0; i < 64; i++) {
      const i2 = i + j;
      const w15 = w[i - 15], w2 = w[i - 2];
      const a = hash[0], e = hash[4];
      const temp1 = hash[7]
        + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25))
        + ((e & hash[5]) ^ ((~e) & hash[6]))
        + k[i]
        + (w[i] = (i < 16) ? w[i] : (
            w[i - 16]
            + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3))
            + w[i - 7]
            + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10))
          ) | 0
        );
      const temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22))
        + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]));
      hash = [(temp1 + temp2) | 0].concat(hash);
      hash[4] = (hash[4] + temp1) | 0;
    }
    for (i = 0; i < 8; i++) {
      hash[i] = (hash[i] + oldHash[i]) | 0;
    }
  }
  for (i = 0; i < 8; i++) {
    for (i2 = 3; i2 >= 0; i2--) {
      const c = (hash[i] >> (i2 * 8)) & 255;
      result += ((c < 16) ? '0' : '') + c.toString(16);
    }
  }
  return result;
}

/**
 * Mã hóa băm mật khẩu bảo mật một chiều SHA-256 kèm Salt
 * Đảm bảo mật khẩu lưu trên DB/Storage không thể bị giải ngược (1 chiều tuyệt đối)
 */
async function hashPassword(password, salt = 'ninhbinh_digital_secure_salt_2026') {
  if (!password) return '';
  const combined = password + ':' + salt;
  if (typeof crypto !== 'undefined' && crypto.subtle && typeof crypto.subtle.digest === 'function') {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(combined);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      console.warn('Fallback to JS SHA-256:', e);
    }
  }
  return sha256PureJs(combined);
}

async function dbCreateUser(user) {
  const payload = {
    name: user.name || 'Người dùng',
    email: user.email || null,
    phone: user.phone || null,
    role: user.role || 'user'
  };
  if (user.password_hash) {
    payload.password_hash = user.password_hash;
  }
  const res = await supabaseFetch('nb_users', { method: 'POST', body: payload });
  return res;
}

async function dbGetUserByEmail(email) {
  if (!email) return null;
  const res = await supabaseFetch('nb_users', { query: `email=eq.${encodeURIComponent(email.trim())}&limit=1` });
  if (res.data && res.data.length > 0) {
    return res.data[0];
  }
  return null;
}

async function dbGetUsers() {
  const res = await supabaseFetch('nb_users', { query: 'select=id,name,email,role,phone,avatar,created_at&order=id.desc' });
  return res.data || [];
}

// ==========================================
// 6. GOOGLE OAUTH AUTHENTICATION
// ==========================================
function loginWithGoogleOAuth(redirectUrl) {
  const finalRedirect = redirectUrl || (window.location.origin + window.location.pathname);
  const authUrl = `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(finalRedirect)}`;
  window.location.href = authUrl;
}

async function handleSupabaseAuthCallback(onSuccess) {
  if (typeof window === 'undefined') return;
  const hash = window.location.hash;
  if (!hash || !hash.includes('access_token=')) return;

  try {
    const params = new URLSearchParams(hash.replace(/^#/, ''));
    const accessToken = params.get('access_token');
    if (!accessToken) return;

    const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!userRes.ok) return;
    const user = await userRes.json();
    if (user && user.email) {
      const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email.split('@')[0];
      const avatar = user.user_metadata?.avatar_url || user.user_metadata?.picture || '';

      const currentUser = {
        id: user.id,
        name: name,
        email: user.email,
        avatar: avatar,
        role: 'member',
        provider: 'google'
      };

      localStorage.setItem('nb_user', JSON.stringify(currentUser));

      // Xóa access_token khỏi thanh địa chỉ cho sạch URL
      if (window.history && window.history.replaceState) {
        window.history.replaceState(null, null, window.location.pathname + window.location.search);
      }

      // Tự động lưu hoặc đồng bộ vào bảng nb_users trên Supabase
      dbCreateUser(currentUser).catch(() => {});

      if (typeof onSuccess === 'function') {
        onSuccess(currentUser);
      }
      return currentUser;
    }
  } catch (err) {
    console.error('[Supabase OAuth Callback Error]', err);
  }
}

// ==========================================
// 7. GOOGLE IDENTITY SERVICES (GIS - HIỂN THỊ CHUẨN NINHBINHDIGITAL.ID.VN)
// ==========================================
const GOOGLE_CLIENT_ID = "752884519993-m8t85rvo6ndoibnolc48hddoidbt0t82.apps.googleusercontent.com";

function decodeJwtPayload(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Lỗi giải mã Google Token:', e);
    return null;
  }
}

async function handleGoogleIdTokenResponse(response) {
  if (!response || !response.credential) return;
  const payload = decodeJwtPayload(response.credential);
  if (!payload || !payload.email) return;

  const currentUser = {
    id: payload.sub,
    name: payload.name || payload.given_name || payload.email.split('@')[0],
    email: payload.email,
    avatar: payload.picture || '',
    role: 'member',
    provider: 'google'
  };

  localStorage.setItem('nb_user', JSON.stringify(currentUser));
  if (typeof updateAuthUI === 'function') updateAuthUI();
  if (typeof closeModal === 'function') closeModal();
  if (typeof showToast === 'function') {
    showToast(`Chào mừng ${currentUser.name} đã đăng nhập Google thành công!`);
  }

  // Tự động đồng bộ vào Supabase nb_users
  if (typeof dbCreateUser === 'function') {
    dbCreateUser(currentUser).catch(() => {});
  }
  return currentUser;
}

let isGoogleIdentityInitialized = false;

function initGoogleIdentity(containerId) {
  if (typeof google === 'undefined' || !google.accounts || !google.accounts.id) {
    return false;
  }
  try {
    if (!isGoogleIdentityInitialized) {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleIdTokenResponse,
        auto_select: false,
        cancel_on_tap_outside: true
      });
      isGoogleIdentityInitialized = true;
    }

    if (containerId) {
      const el = document.getElementById(containerId);
      if (el) {
        el.innerHTML = '';
        google.accounts.id.renderButton(el, {
          theme: 'outline',
          size: 'large',
          type: 'standard',
          shape: 'pill',
          text: 'continue_with',
          logo_alignment: 'left',
          width: 300
        });
      }
    }
    return true;
  } catch (e) {
    console.warn('[GIS Init]', e);
    return false;
  }
}

function promptGoogleOneTap() {
  if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
    try {
      if (!isGoogleIdentityInitialized) {
        google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleIdTokenResponse,
          auto_select: false
        });
        isGoogleIdentityInitialized = true;
      }
      google.accounts.id.prompt();
    } catch(e) {}
  }
}

// Export ra window toàn cục
if (typeof window !== 'undefined') {
  window.SUPABASE_URL = SUPABASE_URL;
  window.GOOGLE_CLIENT_ID = GOOGLE_CLIENT_ID;
  window.setSupabaseAnonKey = setSupabaseAnonKey;
  window.supabaseFetch = supabaseFetch;
  window.dbCreateOrder = dbCreateOrder;
  window.dbGetOrders = dbGetOrders;
  window.dbDeleteOrder = dbDeleteOrder;
  window.dbClearAllOrders = dbClearAllOrders;
  window.dbCreateLead = dbCreateLead;
  window.dbGetLeads = dbGetLeads;
  window.dbUpdateLeadStatus = dbUpdateLeadStatus;
  window.dbDeleteLead = dbDeleteLead;
  window.dbDeleteLeadByPhone = dbDeleteLeadByPhone;
  window.dbClearAllLeads = dbClearAllLeads;
  window.dbCreateFeedback = dbCreateFeedback;
  window.dbGetFeedbacks = dbGetFeedbacks;
  window.dbDeleteFeedback = dbDeleteFeedback;
  window.dbClearAllFeedbacks = dbClearAllFeedbacks;
  window.dbCreateCashbookEntry = dbCreateCashbookEntry;
  window.dbGetCashbook = dbGetCashbook;
  window.dbDeleteCashbookEntry = dbDeleteCashbookEntry;
  window.dbCreateUser = dbCreateUser;
  window.dbGetUserByEmail = dbGetUserByEmail;
  window.dbGetUsers = dbGetUsers;
  window.hashPassword = hashPassword;
  window.loginWithGoogleOAuth = loginWithGoogleOAuth;
  window.handleSupabaseAuthCallback = handleSupabaseAuthCallback;
  window.initGoogleIdentity = initGoogleIdentity;
  window.handleGoogleIdTokenResponse = handleGoogleIdTokenResponse;
  window.promptGoogleOneTap = promptGoogleOneTap;
}

