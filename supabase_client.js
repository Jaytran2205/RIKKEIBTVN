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
// 5. THÀNH VIÊN & NGƯỜI DÙNG (nb_users)
// ==========================================
async function dbCreateUser(user) {
  const payload = {
    name: user.name || 'Người dùng',
    email: user.email || null,
    phone: user.phone || null,
    role: user.role || 'user'
  };
  const res = await supabaseFetch('nb_users', { method: 'POST', body: payload });
  return res;
}

async function dbGetUsers() {
  const res = await supabaseFetch('nb_users', { query: 'select=*&order=id.desc' });
  return res.data || [];
}

// Export ra window toàn cục
if (typeof window !== 'undefined') {
  window.SUPABASE_URL = SUPABASE_URL;
  window.setSupabaseAnonKey = setSupabaseAnonKey;
  window.supabaseFetch = supabaseFetch;
  window.dbCreateOrder = dbCreateOrder;
  window.dbGetOrders = dbGetOrders;
  window.dbCreateLead = dbCreateLead;
  window.dbGetLeads = dbGetLeads;
  window.dbUpdateLeadStatus = dbUpdateLeadStatus;
  window.dbDeleteLead = dbDeleteLead;
  window.dbCreateFeedback = dbCreateFeedback;
  window.dbGetFeedbacks = dbGetFeedbacks;
  window.dbCreateCashbookEntry = dbCreateCashbookEntry;
  window.dbGetCashbook = dbGetCashbook;
  window.dbDeleteCashbookEntry = dbDeleteCashbookEntry;
  window.dbCreateUser = dbCreateUser;
  window.dbGetUsers = dbGetUsers;
}
