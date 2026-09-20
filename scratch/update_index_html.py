import sys, re

sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

print("Original index.html length:", len(html))

# 1. Update Trình Quản Lý Học Tập stats in index.html:
# Replace the hardcoded numbers with IDs
old_stats = """          <div style="background:#F8FAFC; border-radius:12px; padding:18px;">
            <div style="color:#64748B; font-size:0.75rem; font-weight:700; text-transform:uppercase;">TỔNG CÂU</div>
            <div style="font-size:1.8rem; font-weight:900; color:#0F172A; margin-top:4px;">250</div>
          </div>
          <div style="background:#F8FAFC; border-radius:12px; padding:18px;">
            <div style="color:#64748B; font-size:0.75rem; font-weight:700; text-transform:uppercase;">ĐÃ THUỘC</div>
            <div style="font-size:1.8rem; font-weight:900; color:#16A34A; margin-top:4px;">0</div>
          </div>
          <div style="background:#F8FAFC; border-radius:12px; padding:18px;">
            <div style="color:#64748B; font-size:0.75rem; font-weight:700; text-transform:uppercase;">TỈ LỆ ĐẠT</div>
            <div style="font-size:1.8rem; font-weight:900; color:#2563EB; margin-top:4px;">0%</div>
          </div>"""

new_stats = """          <div style="background:#F8FAFC; border-radius:12px; padding:18px;">
            <div style="color:#64748B; font-size:0.75rem; font-weight:700; text-transform:uppercase;">TỔNG CÂU</div>
            <div id="statTotalQuestions" style="font-size:1.8rem; font-weight:900; color:#0F172A; margin-top:4px;">250</div>
          </div>
          <div style="background:#F8FAFC; border-radius:12px; padding:18px;">
            <div style="color:#64748B; font-size:0.75rem; font-weight:700; text-transform:uppercase;">ĐÃ THUỘC</div>
            <div id="statMasteredQuestions" style="font-size:1.8rem; font-weight:900; color:#16A34A; margin-top:4px;">0</div>
          </div>
          <div style="background:#F8FAFC; border-radius:12px; padding:18px;">
            <div style="color:#64748B; font-size:0.75rem; font-weight:700; text-transform:uppercase;">TỈ LỆ ĐẠT</div>
            <div id="statPassRate" style="font-size:1.8rem; font-weight:900; color:#2563EB; margin-top:4px;">0%</div>
          </div>"""

if old_stats in html:
    html = html.replace(old_stats, new_stats)
    print("1. Updated learning manager stats.")
else:
    print("Warning: old_stats not found exactly")

# 2. Update chat room widget buttons to open minigames:
old_wheel_btn = '<button type="button" class="btn btn-sm" style="background:#16A34A; color:#FFF; font-size:0.72rem; padding:4px 10px; border-radius:6px;">🎡 Vào Hội trường 21h →</button>'
new_wheel_btn = '<button type="button" onclick="openWheelFortuneModal()" class="btn btn-sm" style="background:#16A34A; color:#FFF; font-size:0.72rem; padding:6px 12px; border-radius:6px; font-weight:700; cursor:pointer;">🎡 Quay nón 21h ngay →</button>'
if old_wheel_btn in html:
    html = html.replace(old_wheel_btn, new_wheel_btn)
    print("2. Updated wheel button in chat room.")

old_chat_tags = """              <span style="background:#ECFDF5; color:#059669; border:1px solid #A7F3D0; font-size:0.72rem; font-weight:700; padding:3px 8px; border-radius:12px;">🎁 Quay nón 21h</span>
              <span style="background:#EFF6FF; color:#2563EB; border:1px solid #BFDBFE; font-size:0.72rem; font-weight:700; padding:3px 8px; border-radius:12px;">🏆 Giải tuần A1</span>
              <span style="background:#F8FAFC; color:#64748B; border:1px solid #E2E8F0; font-size:0.72rem; font-weight:700; padding:3px 8px; border-radius:12px;">⚡ Kèo: Bật</span>"""

new_chat_tags = """              <span onclick="openWheelFortuneModal()" style="background:#ECFDF5; color:#059669; border:1px solid #A7F3D0; font-size:0.72rem; font-weight:700; padding:3px 8px; border-radius:12px; cursor:pointer;">🎁 Quay nón 21h</span>
              <span onclick="openSpeedSignGameModal()" style="background:#EFF6FF; color:#2563EB; border:1px solid #BFDBFE; font-size:0.72rem; font-weight:700; padding:3px 8px; border-radius:12px; cursor:pointer;">🏆 Biển báo 60s</span>
              <span onclick="openAIPvpModal()" style="background:#FEF2F2; color:#DC2626; border:1px solid #FECACA; font-size:0.72rem; font-weight:700; padding:3px 8px; border-radius:12px; cursor:pointer;">⚡ Đấu trí AI: Bật</span>"""

if old_chat_tags in html:
    html = html.replace(old_chat_tags, new_chat_tags)
    print("3. Updated chat tags.")

# 3. Add 10 Standard Exam Sets & 4 Minigames to pane-thi-a1:
target_mark = "<!-- Khối Row 5: CÁC CHẾ ĐỘ THI ĐẶC BIỆT (10 THẺ CHUẨN MẪU) -->"

new_sections_html = """      <!-- KHỐI MỚI: 10 BỘ ĐỀ THI CHUẨN SÁT HẠCH A1 (CHUẨN BỘ CÔNG AN 25 CÂU) -->
      <div style="margin-bottom:36px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:18px;">
          <div>
            <div style="color:#2563EB; font-weight:800; font-size:0.78rem; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:4px;">BỘ ĐỀ CỐ ĐỊNH CHÍNH THỨC</div>
            <h2 style="font-size:1.5rem; font-weight:800; color:#0F172A; margin:0;">10 Bộ Đề Thi Sát Hạch A1 Chuẩn 2026</h2>
          </div>
          <span style="font-size:0.84rem; color:#64748B;">Bao quát toàn bộ 250 câu • Đạt: ≥ 21/25 &amp; không sai câu liệt</span>
        </div>
        
        <div id="examSetsGridA1Container"></div>
      </div>

      <!-- KHỐI MỚI: TRUNG TÂM MINIGAME & LUYỆN PHẢN XẠ SÁT HẠCH -->
      <div style="margin-bottom:36px; background:linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%); border-radius:18px; padding:32px; color:#FFF; box-shadow:0 8px 24px rgba(15,23,42,0.15);">
        <div style="text-align:center; max-width:680px; margin:0 auto 24px;">
          <span style="background:rgba(255,255,255,0.15); color:#FDE047; font-weight:800; font-size:0.75rem; text-transform:uppercase; letter-spacing:0.08em; padding:4px 14px; border-radius:20px; display:inline-block; margin-bottom:8px;">
            🎮 GAMIFICATION & PHẢN XẠ NHANH
          </span>
          <h2 style="font-size:1.75rem; font-weight:800; color:#FFF; margin-bottom:6px;">Đấu Trí &amp; Minigame Luyện Thi Sát Hạch</h2>
          <p style="color:#94A3B8; font-size:0.92rem; line-height:1.5;">Học mà chơi, chơi mà đỗ! Thử thách bản lĩnh với vòng quay may mắn, biển báo siêu tốc, sa hình và thi đấu trực tiếp với Giám thị AI.</p>
        </div>

        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px;">
          <!-- Minigame 1: Vòng quay nón kỳ diệu -->
          <div style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); backdrop-filter:blur(8px); border-radius:14px; padding:20px; text-align:center; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-size:2.4rem; margin-bottom:8px;">🎡</div>
              <h3 style="font-size:1.05rem; font-weight:800; color:#FFF; margin-bottom:4px;">Vòng Quay May Mắn</h3>
              <p style="font-size:0.78rem; color:#CBD5E1; line-height:1.4; margin-bottom:14px;">Quay nón 21h tích lũy điểm XP, nhận vé thi VIP và huy hiệu vàng.</p>
            </div>
            <button type="button" onclick="openWheelFortuneModal()" style="background:#10B981; color:#FFF; border:none; padding:9px 14px; border-radius:8px; font-weight:700; font-size:0.84rem; cursor:pointer;">
              Vào Quay Ngay →
            </button>
          </div>

          <!-- Minigame 2: Thử thách biển báo siêu tốc -->
          <div style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); backdrop-filter:blur(8px); border-radius:14px; padding:20px; text-align:center; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-size:2.4rem; margin-bottom:8px;">⚡</div>
              <h3 style="font-size:1.05rem; font-weight:800; color:#FFF; margin-bottom:4px;">Biển Báo Siêu Tốc</h3>
              <p style="font-size:0.78rem; color:#CBD5E1; line-height:1.4; margin-bottom:14px;">Thử thách phản xạ trong 60 giây. Nhìn biển đoán tên, nhân chuỗi combo điểm.</p>
            </div>
            <button type="button" onclick="openSpeedSignGameModal()" style="background:#2563EB; color:#FFF; border:none; padding:9px 14px; border-radius:8px; font-weight:700; font-size:0.84rem; cursor:pointer;">
              Chơi 60 Giây →
            </button>
          </div>

          <!-- Minigame 3: Đấu trí cùng AI -->
          <div style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); backdrop-filter:blur(8px); border-radius:14px; padding:20px; text-align:center; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-size:2.4rem; margin-bottom:8px;">🤖</div>
              <h3 style="font-size:1.05rem; font-weight:800; color:#FFF; margin-bottom:4px;">Đấu Trí Cùng AI</h3>
              <p style="font-size:0.78rem; color:#CBD5E1; line-height:1.4; margin-bottom:14px;">Tranh tài 10 câu hỏi trực tiếp với Giám Thị AI. Kéo thanh điểm giằng co thời gian thực!</p>
            </div>
            <button type="button" onclick="openAIPvpModal()" style="background:#DC2626; color:#FFF; border:none; padding:9px 14px; border-radius:8px; font-weight:700; font-size:0.84rem; cursor:pointer;">
              Thách Đấu AI →
            </button>
          </div>

          <!-- Minigame 4: Sa Hình Master -->
          <div style="background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); backdrop-filter:blur(8px); border-radius:14px; padding:20px; text-align:center; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="font-size:2.4rem; margin-bottom:8px;">🚗</div>
              <h3 style="font-size:1.05rem; font-weight:800; color:#FFF; margin-bottom:4px;">Sa Hình Master</h3>
              <p style="font-size:0.78rem; color:#CBD5E1; line-height:1.4; margin-bottom:14px;">Giải nhanh các tình huống ngã tư, xe ưu tiên và đường vòng theo thần chú 4 bước.</p>
            </div>
            <button type="button" onclick="openSaHinhMasterModal()" style="background:#D97706; color:#FFF; border:none; padding:9px 14px; border-radius:8px; font-weight:700; font-size:0.84rem; cursor:pointer;">
              Giải Sa Hình →
            </button>
          </div>
        </div>
      </div>

"""

if target_mark in html:
    html = html.replace(target_mark, new_sections_html + target_mark)
    print("4. Inserted 10 exam sets and Minigame Hub in pane-thi-a1.")

# 4. Enhance pane-thi-a, pane-thi-b, pane-thi-c:
pane_a_old = """  <div id="pane-thi-a" class="driving-tab-pane" style="display:none; padding:40px 0;">
    <div class="wrap" style="text-align:center; padding:40px; background:#FFF; border-radius:14px; border:1px solid #E2E8F0;">
      <h2 style="font-size:1.5rem; color:#0F172A; margin-bottom:10px;">Đề thi sát hạch Hạng A (Mô tô trên 125cc)</h2>
      <p style="color:#64748B; margin-bottom:20px;">Bộ 25 câu hỏi sát hạch, thời gian 19 phút, yêu cầu đạt 23/25 câu và không sai câu điểm liệt.</p>
      <button type="button" onclick="startExamSimulation('A')" class="btn btn-primary" style="padding:10px 24px;">Bắt đầu thi đề Hạng A →</button>
    </div>
  </div>"""

pane_a_new = """  <div id="pane-thi-a" class="driving-tab-pane" style="display:none; padding:40px 0;">
    <div class="wrap" style="max-width:980px;">
      <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:16px; padding:32px; box-shadow:0 2px 10px rgba(0,0,0,0.03); margin-bottom:28px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:20px;">
          <div>
            <span style="background:#FEF3C7; color:#B45309; border:1px solid #FDE68A; padding:4px 12px; border-radius:20px; font-size:0.75rem; font-weight:800;">
              🏍️ MÔ TÔ PHÂN KHỐI LỚN &gt; 125cc
            </span>
            <h1 style="font-size:2rem; font-weight:800; color:#0F172A; margin:10px 0 8px;">Sát Hạch Giấy Phép Lái Xe Hạng A</h1>
            <p style="color:#475569; font-size:0.95rem; line-height:1.6; max-width:600px;">
              Dành cho xe mô tô hai bánh có dung tích xi-lanh trên 125cm³ hoặc công suất điện trên 11kW. Được phép điều khiển toàn bộ xe thuộc hạng A1.
            </p>
          </div>
          <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:18px; min-width:240px;">
            <div style="font-size:0.78rem; font-weight:800; color:#0F172A; margin-bottom:6px;">QUY CHẾ THI HẠNG A:</div>
            <div style="font-size:0.86rem; color:#334155; line-height:1.5;">
              • Thời gian: <b>19 phút</b><br>
              • Số câu: <b>25 câu hỏi</b><br>
              • Điểm đạt: <b>≥ 23/25 câu</b><br>
              • <span style="color:#DC2626; font-weight:700;">Không sai câu điểm liệt</span>
            </div>
          </div>
        </div>
        <div style="margin-top:24px;">
          <button type="button" onclick="startExamSimulation('A', 'random', 'Đề Thi Sát Hạch Hạng A (Mô Tô &gt; 125cc)')" style="background:#2563EB; color:#FFF; border:none; padding:12px 28px; border-radius:8px; font-weight:800; font-size:0.95rem; cursor:pointer; display:inline-flex; align-items:center; gap:8px;">
            🚀 Bấm Thi Ngẫu Nhiên Hạng A Ngay →
          </button>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px;">
        <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:12px; padding:18px; text-align:center;">
          <h3 style="font-size:1.1rem; font-weight:800; color:#0F172A; margin-bottom:4px;">Đề Sát Hạch A-01</h3>
          <p style="font-size:0.78rem; color:#64748B; margin-bottom:12px;">Đề chuẩn 25 câu có câu điểm liệt</p>
          <button type="button" onclick="startExamSimulation('A', 'set_1', 'Đề Sát Hạch Hạng A - Đề Số 01')" class="btn btn-outline btn-sm btn-full">Thi Đề 01</button>
        </div>
        <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:12px; padding:18px; text-align:center;">
          <h3 style="font-size:1.1rem; font-weight:800; color:#0F172A; margin-bottom:4px;">Đề Sát Hạch A-02</h3>
          <p style="font-size:0.78rem; color:#64748B; margin-bottom:12px;">Đề chuẩn 25 câu có câu điểm liệt</p>
          <button type="button" onclick="startExamSimulation('A', 'set_2', 'Đề Sát Hạch Hạng A - Đề Số 02')" class="btn btn-outline btn-sm btn-full">Thi Đề 02</button>
        </div>
        <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:12px; padding:18px; text-align:center;">
          <h3 style="font-size:1.1rem; font-weight:800; color:#0F172A; margin-bottom:4px;">Đề Sát Hạch A-03</h3>
          <p style="font-size:0.78rem; color:#64748B; margin-bottom:12px;">Đề chuẩn 25 câu có câu điểm liệt</p>
          <button type="button" onclick="startExamSimulation('A', 'set_3', 'Đề Sát Hạch Hạng A - Đề Số 03')" class="btn btn-outline btn-sm btn-full">Thi Đề 03</button>
        </div>
        <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:12px; padding:18px; text-align:center;">
          <h3 style="font-size:1.1rem; font-weight:800; color:#0F172A; margin-bottom:4px;">Đề Sát Hạch A-04</h3>
          <p style="font-size:0.78rem; color:#64748B; margin-bottom:12px;">Đề chuẩn 25 câu có câu điểm liệt</p>
          <button type="button" onclick="startExamSimulation('A', 'set_4', 'Đề Sát Hạch Hạng A - Đề Số 04')" class="btn btn-outline btn-sm btn-full">Thi Đề 04</button>
        </div>
      </div>
    </div>
  </div>"""

if pane_a_old in html:
    html = html.replace(pane_a_old, pane_a_new)
    print("5. Enhanced pane-thi-a.")

# 5. Enhance pane-thi-b:
pane_b_old = """  <div id="pane-thi-b" class="driving-tab-pane" style="display:none; padding:40px 0;">
    <div class="wrap" style="text-align:center; padding:40px; background:#FFF; border-radius:14px; border:1px solid #E2E8F0;">
      <h2 style="font-size:1.5rem; color:#0F172A; margin-bottom:10px;">Đề thi sát hạch Hạng B (Ô tô con đến 8 chỗ)</h2>
      <p style="color:#64748B; margin-bottom:20px;">Bộ 35 câu hỏi sát hạch, thời gian 22 phút, yêu cầu đạt 32/35 câu và không sai câu điểm liệt.</p>
      <button type="button" onclick="startExamSimulation('B')" class="btn btn-primary" style="padding:10px 24px;">Bắt đầu thi đề Hạng B →</button>
    </div>
  </div>"""

pane_b_new = """  <div id="pane-thi-b" class="driving-tab-pane" style="display:none; padding:40px 0;">
    <div class="wrap" style="max-width:980px;">
      <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:16px; padding:32px; box-shadow:0 2px 10px rgba(0,0,0,0.03); margin-bottom:28px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:20px;">
          <div>
            <span style="background:#EFF6FF; color:#2563EB; border:1px solid #BFDBFE; padding:4px 12px; border-radius:20px; font-size:0.75rem; font-weight:800;">
              🚗 Ô TÔ CON ĐẾN 8 CHỖ &amp; TẢI NHỎ &lt; 3.5 TẤN
            </span>
            <h1 style="font-size:2rem; font-weight:800; color:#0F172A; margin:10px 0 8px;">Sát Hạch Giấy Phép Lái Xe Hạng B</h1>
            <p style="color:#475569; font-size:0.95rem; line-height:1.6; max-width:600px;">
              Quy định mới: Hạng B cấp cho người điều khiển ô tô chở người đến 8 chỗ và ô tô tải có khối lượng toàn bộ thiết kế đến 3.500 kg.
            </p>
          </div>
          <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:18px; min-width:240px;">
            <div style="font-size:0.78rem; font-weight:800; color:#0F172A; margin-bottom:6px;">QUY CHẾ THI HẠNG B:</div>
            <div style="font-size:0.86rem; color:#334155; line-height:1.5;">
              • Thời gian: <b>22 phút</b><br>
              • Số câu: <b>35 câu hỏi</b><br>
              • Điểm đạt: <b>≥ 32/35 câu</b><br>
              • <span style="color:#DC2626; font-weight:700;">Không sai câu điểm liệt</span>
            </div>
          </div>
        </div>
        <div style="margin-top:24px;">
          <button type="button" onclick="startExamSimulation('B', 'random', 'Đề Thi Sát Hạch Hạng B (Ô Tô Con 35 Câu)')" style="background:#2563EB; color:#FFF; border:none; padding:12px 28px; border-radius:8px; font-weight:800; font-size:0.95rem; cursor:pointer; display:inline-flex; align-items:center; gap:8px;">
            🚀 Bấm Thi Ngẫu Nhiên Hạng B (35 Câu) →
          </button>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px;">
        <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:12px; padding:18px; text-align:center;">
          <h3 style="font-size:1.1rem; font-weight:800; color:#0F172A; margin-bottom:4px;">Đề Sát Hạch B-01</h3>
          <p style="font-size:0.78rem; color:#64748B; margin-bottom:12px;">35 câu chuẩn sát hạch ô tô</p>
          <button type="button" onclick="startExamSimulation('B', 'set_1', 'Đề Sát Hạch Hạng B - Đề Số 01')" class="btn btn-outline btn-sm btn-full">Thi Đề 01</button>
        </div>
        <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:12px; padding:18px; text-align:center;">
          <h3 style="font-size:1.1rem; font-weight:800; color:#0F172A; margin-bottom:4px;">Đề Sát Hạch B-02</h3>
          <p style="font-size:0.78rem; color:#64748B; margin-bottom:12px;">35 câu chuẩn sát hạch ô tô</p>
          <button type="button" onclick="startExamSimulation('B', 'set_2', 'Đề Sát Hạch Hạng B - Đề Số 02')" class="btn btn-outline btn-sm btn-full">Thi Đề 02</button>
        </div>
        <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:12px; padding:18px; text-align:center;">
          <h3 style="font-size:1.1rem; font-weight:800; color:#0F172A; margin-bottom:4px;">Đề Sát Hạch B-03</h3>
          <p style="font-size:0.78rem; color:#64748B; margin-bottom:12px;">35 câu chuẩn sát hạch ô tô</p>
          <button type="button" onclick="startExamSimulation('B', 'set_3', 'Đề Sát Hạch Hạng B - Đề Số 03')" class="btn btn-outline btn-sm btn-full">Thi Đề 03</button>
        </div>
        <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:12px; padding:18px; text-align:center;">
          <h3 style="font-size:1.1rem; font-weight:800; color:#0F172A; margin-bottom:4px;">Đề Sát Hạch B-04</h3>
          <p style="font-size:0.78rem; color:#64748B; margin-bottom:12px;">35 câu chuẩn sát hạch ô tô</p>
          <button type="button" onclick="startExamSimulation('B', 'set_4', 'Đề Sát Hạch Hạng B - Đề Số 04')" class="btn btn-outline btn-sm btn-full">Thi Đề 04</button>
        </div>
      </div>
    </div>
  </div>"""

if pane_b_old in html:
    html = html.replace(pane_b_old, pane_b_new)
    print("6. Enhanced pane-thi-b.")

# 6. Enhance pane-thi-c:
pane_c_old = """  <div id="pane-thi-c" class="driving-tab-pane" style="display:none; padding:40px 0;">
    <div class="wrap" style="text-align:center; padding:40px; background:#FFF; border-radius:14px; border:1px solid #E2E8F0;">
      <h2 style="font-size:1.5rem; color:#0F172A; margin-bottom:10px;">Đề thi sát hạch Hạng C (Xe tải trên 7.5 tấn)</h2>
      <p style="color:#64748B; margin-bottom:20px;">Bộ 40 câu hỏi sát hạch, thời gian 24 phút, yêu cầu đạt 36/40 câu và không sai câu điểm liệt.</p>
      <button type="button" onclick="startExamSimulation('C')" class="btn btn-primary" style="padding:10px 24px;">Bắt đầu thi đề Hạng C →</button>
    </div>
  </div>"""

pane_c_new = """  <div id="pane-thi-c" class="driving-tab-pane" style="display:none; padding:40px 0;">
    <div class="wrap" style="max-width:980px;">
      <div style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:16px; padding:32px; box-shadow:0 2px 10px rgba(0,0,0,0.03); margin-bottom:28px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:20px;">
          <div>
            <span style="background:#FEF2F2; color:#DC2626; border:1px solid #FECACA; padding:4px 12px; border-radius:20px; font-size:0.75rem; font-weight:800;">
              🚛 Ô TÔ TẢI TRÊN 7.5 TẤN &amp; ĐẦU KÉO
            </span>
            <h1 style="font-size:2rem; font-weight:800; color:#0F172A; margin:10px 0 8px;">Sát Hạch Giấy Phép Lái Xe Hạng C</h1>
            <p style="color:#475569; font-size:0.95rem; line-height:1.6; max-width:600px;">
              Cấp cho người lái xe ô tô tải có khối lượng toàn bộ thiết kế trên 7.500 kg, máy kéo kéo rơ moóc và các loại xe hạng B, C1.
            </p>
          </div>
          <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:18px; min-width:240px;">
            <div style="font-size:0.78rem; font-weight:800; color:#0F172A; margin-bottom:6px;">QUY CHẾ THI HẠNG C:</div>
            <div style="font-size:0.86rem; color:#334155; line-height:1.5;">
              • Thời gian: <b>24 phút</b><br>
              • Số câu: <b>40 câu hỏi</b><br>
              • Điểm đạt: <b>≥ 36/40 câu</b><br>
              • <span style="color:#DC2626; font-weight:700;">Không sai câu điểm liệt</span>
            </div>
          </div>
        </div>
        <div style="margin-top:24px;">
          <button type="button" onclick="startExamSimulation('C', 'random', 'Đề Thi Sát Hạch Hạng C (Xe Tải 40 Câu)')" style="background:#2563EB; color:#FFF; border:none; padding:12px 28px; border-radius:8px; font-weight:800; font-size:0.95rem; cursor:pointer; display:inline-flex; align-items:center; gap:8px;">
            🚀 Bấm Thi Ngẫu Nhiên Hạng C (40 Câu) →
          </button>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:16px;">
        <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:12px; padding:18px; text-align:center;">
          <h3 style="font-size:1.1rem; font-weight:800; color:#0F172A; margin-bottom:4px;">Đề Sát Hạch C-01</h3>
          <p style="font-size:0.78rem; color:#64748B; margin-bottom:12px;">40 câu chuẩn sát hạch xe tải</p>
          <button type="button" onclick="startExamSimulation('C', 'set_1', 'Đề Sát Hạch Hạng C - Đề Số 01')" class="btn btn-outline btn-sm btn-full">Thi Đề 01</button>
        </div>
        <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:12px; padding:18px; text-align:center;">
          <h3 style="font-size:1.1rem; font-weight:800; color:#0F172A; margin-bottom:4px;">Đề Sát Hạch C-02</h3>
          <p style="font-size:0.78rem; color:#64748B; margin-bottom:12px;">40 câu chuẩn sát hạch xe tải</p>
          <button type="button" onclick="startExamSimulation('C', 'set_2', 'Đề Sát Hạch Hạng C - Đề Số 02')" class="btn btn-outline btn-sm btn-full">Thi Đề 02</button>
        </div>
        <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:12px; padding:18px; text-align:center;">
          <h3 style="font-size:1.1rem; font-weight:800; color:#0F172A; margin-bottom:4px;">Đề Sát Hạch C-03</h3>
          <p style="font-size:0.78rem; color:#64748B; margin-bottom:12px;">40 câu chuẩn sát hạch xe tải</p>
          <button type="button" onclick="startExamSimulation('C', 'set_3', 'Đề Sát Hạch Hạng C - Đề Số 03')" class="btn btn-outline btn-sm btn-full">Thi Đề 03</button>
        </div>
        <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:12px; padding:18px; text-align:center;">
          <h3 style="font-size:1.1rem; font-weight:800; color:#0F172A; margin-bottom:4px;">Đề Sát Hạch C-04</h3>
          <p style="font-size:0.78rem; color:#64748B; margin-bottom:12px;">40 câu chuẩn sát hạch xe tải</p>
          <button type="button" onclick="startExamSimulation('C', 'set_4', 'Đề Sát Hạch Hạng C - Đề Số 04')" class="btn btn-outline btn-sm btn-full">Thi Đề 04</button>
        </div>
      </div>
    </div>
  </div>"""

if pane_c_old in html:
    html = html.replace(pane_c_old, pane_c_new)
    print("7. Enhanced pane-thi-c.")

# 7. Enhance pane-cau-liet-60:
pane_60_old = """  <div id="pane-cau-liet-60" class="driving-tab-pane" style="display:none; padding:40px 0;">
    <div class="wrap" style="max-width:860px;">
      <div style="background:#FEF2F2; border:1.5px solid #FCA5A5; border-radius:14px; padding:24px; margin-bottom:24px;">
        <h2 style="font-size:1.4rem; color:#DC2626; font-weight:800; margin-bottom:6px;">⚠️ 60 Câu Hỏi Điểm Liệt Ô Tô Hạng B, C</h2>
        <p style="color:#991B1B; font-size:0.92rem;">Tổng hợp các tình huống mất an toàn giao thông nghiêm trọng trên cao tốc, đường ray xe lửa, vượt xe khuất tầm nhìn.</p>
      </div>
      <div style="background:#FFF; border:1px solid #E2E8F0; border-radius:12px; padding:24px;">
        <h3 style="color:#0F172A; font-size:1.05rem; margin-bottom:8px;">Câu 1: Người điều khiển xe ô tô trên đường cao tốc không được thực hiện hành vi nào?</h3>
        <div style="color:#16A34A; font-weight:700; font-size:0.95rem; margin-top:8px;">✔ Đáp án đúng: Quay đầu xe, lùi xe trên đường cao tốc.</div>
      </div>
    </div>
  </div>"""

pane_60_new = """  <div id="pane-cau-liet-60" class="driving-tab-pane" style="display:none; padding:40px 0;">
    <div class="wrap" style="max-width:920px;">
      <div style="background:#FEF2F2; border:1.5px solid #FCA5A5; border-radius:14px; padding:24px; margin-bottom:20px;">
        <h2 style="font-size:1.5rem; color:#DC2626; font-weight:800; margin-bottom:6px;">⚠️ Bộ 60 Câu Hỏi Điểm Liệt Ô Tô Hạng B, C</h2>
        <p style="color:#991B1B; font-size:0.92rem; line-height:1.5; margin-bottom:14px;">
          Đây là toàn bộ các tình huống mất an toàn giao thông nghiêm trọng (cao tốc, đường ray, uống rượu bia, ma túy, vượt xe nguy hiểm, mất phanh dốc cao). Trong bài thi sát hạch ô tô, nếu thí sinh làm sai dù chỉ <b>1 câu điểm liệt duy nhất</b>, bài thi sẽ bị <b>TRƯỢT TRỰC TIẾP</b>!
        </p>
        <input type="text" oninput="renderCar60Paralyzed(this.value)" placeholder="🔍 Nhập từ khóa để tra cứu (ví dụ: cao tốc, lùi xe, dốc, cồn, tàu hỏa...)" style="width:100%; padding:12px 16px; border-radius:8px; border:1.5px solid #FCA5A5; font-size:0.92rem; outline:none;">
      </div>
      
      <div id="paralyzedCar60List"></div>
    </div>
  </div>"""

if pane_60_old in html:
    html = html.replace(pane_60_old, pane_60_new)
    print("8. Enhanced pane-cau-liet-60.")

# 8. Add Minigame Modals right after examLiveSimulatorModal
modals_html = """
<!-- ========================================================
     MODAL 1: VÒNG QUAY NÓN KỲ DIỆU (QUAY NÓN 21H)
     ======================================================== -->
<div id="wheelFortuneModal" style="display:none; position:fixed; inset:0; z-index:99999; background:rgba(15,23,42,0.75); backdrop-filter:blur(6px); align-items:center; justify-content:center; padding:16px;">
  <div style="background:#FFFFFF; border-radius:20px; width:100%; max-width:440px; text-align:center; padding:28px; box-shadow:0 25px 50px rgba(0,0,0,0.25); border:1px solid #E2E8F0; position:relative;">
    <button type="button" onclick="closeWheelFortuneModal()" style="position:absolute; top:16px; right:16px; background:none; border:none; font-size:1.6rem; color:#64748B; cursor:pointer; line-height:1;">&times;</button>
    <span style="background:#FEF3C7; color:#D97706; font-size:0.75rem; font-weight:800; padding:4px 12px; border-radius:20px; display:inline-block; margin-bottom:8px;">HỘI TRƯỜNG 21H</span>
    <h3 style="font-size:1.45rem; font-weight:800; color:#0F172A; margin:0 0 6px;">Vòng Quay Nón Kỳ Diệu</h3>
    <p style="color:#64748B; font-size:0.85rem; margin-bottom:18px;">Quay may mắn mỗi ngày để nhận XP và vật phẩm học tập.</p>

    <!-- Canvas Wheel -->
    <div style="position:relative; width:340px; height:340px; margin:0 auto 20px;">
      <!-- Top Needle -->
      <div style="position:absolute; top:-6px; left:50%; transform:translateX(-50%); width:0; height:0; border-left:14px solid transparent; border-right:14px solid transparent; border-top:22px solid #DC2626; z-index:10; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3));"></div>
      <canvas id="wheelFortuneCanvas" width="340" height="340" style="width:340px; height:340px; border-radius:50%; box-shadow:0 8px 24px rgba(0,0,0,0.12);"></canvas>
    </div>

    <div id="wheelResultAlert" style="display:none; margin-bottom:16px;"></div>

    <button type="button" id="btnSpinWheel" onclick="spinWheelFortune()" style="background:linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%); color:#FFF; border:none; padding:12px 36px; border-radius:12px; font-weight:800; font-size:1rem; cursor:pointer; box-shadow:0 4px 16px rgba(37,99,235,0.35); display:inline-flex; align-items:center; gap:8px;">
      🎯 QUAY NGAY (MIỄN PHÍ)
    </button>
  </div>
</div>

<!-- ========================================================
     MODAL 2: THỬ THÁCH BIỂN BÁO SIÊU TỐC (60 GIÂY)
     ======================================================== -->
<div id="speedSignModal" style="display:none; position:fixed; inset:0; z-index:99999; background:rgba(15,23,42,0.75); backdrop-filter:blur(6px); align-items:center; justify-content:center; padding:16px;">
  <div style="background:#F8FAFC; border-radius:20px; width:100%; max-width:620px; box-shadow:0 25px 50px rgba(0,0,0,0.25); border:1px solid #E2E8F0; overflow:hidden;">
    <div style="background:#FFFFFF; padding:16px 24px; border-bottom:1px solid #E2E8F0; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <h3 style="font-size:1.2rem; font-weight:800; color:#0F172A; margin:0;">⚡ Thử Thách Biển Báo Siêu Tốc</h3>
        <span style="font-size:0.75rem; color:#64748B;">Nhìn biển đoán ý nghĩa trong 60 giây</span>
      </div>
      <div style="display:flex; align-items:center; gap:12px;">
        <span id="speedSignTimer" style="background:#FEF3C7; color:#D97706; font-weight:800; padding:4px 14px; border-radius:20px; font-size:0.92rem; border:1px solid #FDE68A;">60s</span>
        <button type="button" onclick="closeSpeedSignGameModal()" style="background:none; border:none; font-size:1.6rem; color:#64748B; cursor:pointer; line-height:1;">&times;</button>
      </div>
    </div>
    <div id="speedSignGameBody" style="padding:24px;"></div>
  </div>
</div>

<!-- ========================================================
     MODAL 3: ĐẤU TRÍ CÙNG AI (PvP SÁT HẠCH vs BOT GIÁM THỊ)
     ======================================================== -->
<div id="aiPvpModal" style="display:none; position:fixed; inset:0; z-index:99999; background:rgba(15,23,42,0.75); backdrop-filter:blur(6px); align-items:center; justify-content:center; padding:16px;">
  <div style="background:#F8FAFC; border-radius:20px; width:100%; max-width:680px; box-shadow:0 25px 50px rgba(0,0,0,0.25); border:1px solid #E2E8F0; overflow:hidden;">
    <div style="background:#FFFFFF; padding:16px 24px; border-bottom:1px solid #E2E8F0; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <h3 style="font-size:1.2rem; font-weight:800; color:#0F172A; margin:0;">🤖 Sát Hạch Đối Kháng: Người vs Giám Thị AI</h3>
        <span style="font-size:0.75rem; color:#64748B;">Thi đấu 10 câu hỏi giằng co thời gian thực</span>
      </div>
      <button type="button" onclick="closeAIPvpModal()" style="background:none; border:none; font-size:1.6rem; color:#64748B; cursor:pointer; line-height:1;">&times;</button>
    </div>
    <div id="aiPvpGameBody" style="padding:24px;"></div>
  </div>
</div>

<!-- ========================================================
     MODAL 4: SA HÌNH MASTER (THỬ THÁCH GIẢI THẾ SA HÌNH)
     ======================================================== -->
<div id="saHinhMasterModal" style="display:none; position:fixed; inset:0; z-index:99999; background:rgba(15,23,42,0.75); backdrop-filter:blur(6px); align-items:center; justify-content:center; padding:16px;">
  <div style="background:#F8FAFC; border-radius:20px; width:100%; max-width:680px; box-shadow:0 25px 50px rgba(0,0,0,0.25); border:1px solid #E2E8F0; overflow:hidden;">
    <div style="background:#FFFFFF; padding:16px 24px; border-bottom:1px solid #E2E8F0; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <h3 style="font-size:1.2rem; font-weight:800; color:#0F172A; margin:0;">🚗 Sa Hình Master - Thử Thách Giao Lộ</h3>
        <span style="font-size:0.75rem; color:#64748B;">Phản xạ thứ tự ưu tiên xe theo luật giao thông</span>
      </div>
      <button type="button" onclick="closeSaHinhMasterModal()" style="background:none; border:none; font-size:1.6rem; color:#64748B; cursor:pointer; line-height:1;">&times;</button>
    </div>
    <div id="saHinhMasterBody" style="padding:24px;"></div>
  </div>
</div>
"""

modal_end = '<!-- ========================================================\n     UNIVERSAL MODAL DIALOG (CHỨC NĂNG CÔNG CỤ & AUTH)'
if modal_end in html:
    html = html.replace(modal_end, modals_html + '\n' + modal_end)
    print("9. Injected 4 Minigame Modals into index.html.")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Saved updated index.html!")
