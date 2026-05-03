// ============================================
//  MAHADI SHAKTI GROUP — Create Invoice Page
// ============================================

Pages.createInvoice = function() {
  const el = document.createElement('div');
  el.className = 'page-content';

  // Generate next invoice ID
  const nextId = 'MSG-2025-00' + (App.data.invoices.length + 1);
  const today  = new Date().toISOString().split('T')[0];
  const dueDefault = new Date(Date.now() + 15*24*60*60*1000).toISOString().split('T')[0];

  el.innerHTML = `

    <div style="display:grid; grid-template-columns:1fr 320px; gap:20px; align-items:start;">

      <!-- Left: Form -->
      <div style="display:flex;flex-direction:column;gap:16px;">

        <!-- Invoice Meta -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">📋 Invoice Details</div>
            <span class="mono text-gold" style="font-size:14px;font-weight:600;">${nextId}</span>
          </div>
          <div class="card-body">
            <div class="form-row cols-3">
              <div class="form-group">
                <label class="form-label">Invoice Date *</label>
                <input class="form-input" type="date" id="inv-date" value="${today}" />
              </div>
              <div class="form-group">
                <label class="form-label">Due Date *</label>
                <input class="form-input" type="date" id="inv-due" value="${dueDefault}" />
              </div>
              <div class="form-group">
                <label class="form-label">Payment Terms</label>
                <select class="form-select" id="inv-terms">
                  <option>Net 15</option>
                  <option>Net 30</option>
                  <option>Net 45</option>
                  <option>Immediate</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- Client Selection -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">👤 Client Select करें</div>
            <button class="btn btn-ghost btn-sm" onclick="App.navigate('clients')">+ New Client</button>
          </div>
          <div class="card-body">
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Client *</label>
              <select class="form-select" id="inv-client" onchange="updateClientInfo()">
                <option value="">— Client चुनें —</option>
                ${App.data.clients.map(c => `<option value="${c.id}">${c.name} — ${c.city}</option>`).join('')}
              </select>
            </div>
            <div id="client-info-box" style="display:none;margin-top:14px;padding:12px;background:var(--surface-1);border-radius:var(--radius-md);border:1px solid var(--border-subtle);">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12.5px;color:var(--text-secondary);">
                <div>👤 <span id="ci-contact"></span></div>
                <div>📞 <span id="ci-phone"></span></div>
                <div>📧 <span id="ci-email"></span></div>
                <div>📍 <span id="ci-city"></span></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Line Items -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">📦 Items / Services</div>
            <button class="btn btn-ghost btn-sm" onclick="addLineItem()">+ Row जोड़ें</button>
          </div>
          <div class="card-body" style="padding:0;">
            <table>
              <thead>
                <tr>
                  <th style="width:40%">Description</th>
                  <th style="width:12%;text-align:center;">Qty</th>
                  <th style="width:20%;text-align:right;">Rate (₹)</th>
                  <th style="width:20%;text-align:right;">Amount (₹)</th>
                  <th style="width:8%;"></th>
                </tr>
              </thead>
              <tbody id="line-items">
                <tr data-row="0">
                  <td><input class="form-input" type="text" placeholder="Service / Product का नाम" /></td>
                  <td style="text-align:center;"><input class="form-input" type="number" value="1" min="1" style="text-align:center;width:60px;" onchange="calcRow(this)" /></td>
                  <td><input class="form-input" type="number" placeholder="0" style="text-align:right;" onchange="calcRow(this)" /></td>
                  <td style="text-align:right;padding:13px 16px;"><span class="mono row-amount">₹0</span></td>
                  <td style="text-align:center;"><button onclick="removeRow(this)" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:16px;padding:4px;" title="हटाएं">×</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Notes -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">📝 Notes & Terms</div>
          </div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">Client के लिए Note</label>
              <textarea class="form-textarea" placeholder="जैसे: Payment NEFT/RTGS/UPI से करें। GST Invoice मान्य होगी।"></textarea>
            </div>
            <div class="form-group" style="margin-bottom:0;">
              <label class="form-label">Internal Note</label>
              <textarea class="form-textarea" style="min-height:60px;" placeholder="Internal team note (client को नहीं दिखेगा)"></textarea>
            </div>
          </div>
        </div>

      </div>

      <!-- Right: Summary Panel -->
      <div style="position:sticky;top:76px;display:flex;flex-direction:column;gap:16px;">

        <!-- Totals -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">💰 Amount Summary</div>
          </div>
          <div class="card-body">

            <div style="display:flex;flex-direction:column;gap:12px;">

              <div style="display:flex;justify-content:space-between;font-size:13px;">
                <span style="color:var(--text-muted);">Subtotal</span>
                <span class="mono" id="summary-subtotal">₹0</span>
              </div>

              <div style="display:flex;justify-content:space-between;font-size:13px;align-items:center;">
                <span style="color:var(--text-muted);">GST
                  <select id="gst-rate" onchange="recalcTotals()" style="background:var(--surface-2);border:1px solid var(--border-subtle);border-radius:4px;color:var(--text-primary);font-size:11px;padding:1px 4px;margin-left:4px;">
                    <option value="18">18%</option>
                    <option value="12">12%</option>
                    <option value="5">5%</option>
                    <option value="0">0% (Exempt)</option>
                  </select>
                </span>
                <span class="mono" id="summary-gst">₹0</span>
              </div>

              <div style="display:flex;justify-content:space-between;font-size:13px;">
                <span style="color:var(--text-muted);">CGST</span>
                <span class="mono" id="summary-cgst" style="color:var(--text-muted);">₹0</span>
              </div>

              <div style="display:flex;justify-content:space-between;font-size:13px;">
                <span style="color:var(--text-muted);">SGST</span>
                <span class="mono" id="summary-sgst" style="color:var(--text-muted);">₹0</span>
              </div>

              <hr class="divider" />

              <div style="display:flex;justify-content:space-between;font-size:17px;font-weight:700;">
                <span>Grand Total</span>
                <span class="mono text-gold" id="summary-total">₹0</span>
              </div>

            </div>

            <div style="margin-top:18px;padding:12px;background:var(--surface-1);border-radius:var(--radius-md);font-size:12px;color:var(--text-muted);">
              <strong style="color:var(--text-secondary);">Amount in Words:</strong><br>
              <span id="amount-words">Zero Rupees Only</span>
            </div>

          </div>
        </div>

        <!-- Company Info Preview -->
        <div class="card">
          <div class="card-header">
            <div class="card-title">🏢 From</div>
          </div>
          <div class="card-body">
            <div style="font-size:12.5px;color:var(--text-secondary);line-height:1.7;">
              <div style="font-weight:700;color:var(--text-primary);font-size:14px;margin-bottom:4px;">${App.data.company.name}</div>
              <div>${App.data.company.address}</div>
              <div>GST: <span class="mono" style="font-size:11.5px;">${App.data.company.gst}</span></div>
              <div>📞 ${App.data.company.phone}</div>
              <div>📧 ${App.data.company.email}</div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div style="display:flex;flex-direction:column;gap:10px;">
          <button class="btn btn-gold" style="width:100%;justify-content:center;padding:11px;" onclick="saveInvoice('sent')">
            📤 Invoice भेजें
          </button>
          <button class="btn btn-ghost" style="width:100%;justify-content:center;" onclick="saveInvoice('draft')">
            💾 Draft Save करें
          </button>
          <button class="btn btn-ghost" style="width:100%;justify-content:center;">
            👁 Preview देखें
          </button>
        </div>

      </div>

    </div>

  `;

  // ─── Logic ───

  let rowCount = 0;

  window.addLineItem = () => {
    rowCount++;
    const tbody = document.getElementById('line-items');
    const tr = document.createElement('tr');
    tr.dataset.row = rowCount;
    tr.innerHTML = `
      <td><input class="form-input" type="text" placeholder="Service / Product का नाम" /></td>
      <td style="text-align:center;"><input class="form-input" type="number" value="1" min="1" style="text-align:center;width:60px;" onchange="calcRow(this)" /></td>
      <td><input class="form-input" type="number" placeholder="0" style="text-align:right;" onchange="calcRow(this)" /></td>
      <td style="text-align:right;padding:13px 16px;"><span class="mono row-amount">₹0</span></td>
      <td style="text-align:center;"><button onclick="removeRow(this)" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:16px;padding:4px;">×</button></td>
    `;
    tbody.appendChild(tr);
  };

  window.removeRow = (btn) => {
    const row = btn.closest('tr');
    row.remove();
    recalcTotals();
  };

  window.calcRow = (input) => {
    const row = input.closest('tr');
    const inputs = row.querySelectorAll('input[type="number"]');
    const qty  = parseFloat(inputs[0].value) || 0;
    const rate = parseFloat(inputs[1].value) || 0;
    row.querySelector('.row-amount').textContent = App.formatINR(qty * rate);
    recalcTotals();
  };

  window.recalcTotals = () => {
    const rows = document.querySelectorAll('#line-items tr');
    let subtotal = 0;
    rows.forEach(row => {
      const inputs = row.querySelectorAll('input[type="number"]');
      if (inputs.length >= 2) {
        subtotal += (parseFloat(inputs[0].value)||0) * (parseFloat(inputs[1].value)||0);
      }
    });
    const gstRate = parseFloat(document.getElementById('gst-rate')?.value || 18) / 100;
    const gst   = subtotal * gstRate;
    const total  = subtotal + gst;
    document.getElementById('summary-subtotal').textContent = App.formatINR(subtotal);
    document.getElementById('summary-gst').textContent      = App.formatINR(gst);
    document.getElementById('summary-cgst').textContent     = App.formatINR(gst / 2);
    document.getElementById('summary-sgst').textContent     = App.formatINR(gst / 2);
    document.getElementById('summary-total').textContent    = App.formatINR(total);
    document.getElementById('amount-words').textContent     = numberToWords(Math.round(total)) + ' Rupees Only';
  };

  window.updateClientInfo = () => {
    const id  = document.getElementById('inv-client').value;
    const box = document.getElementById('client-info-box');
    if (!id) { box.style.display = 'none'; return; }
    const c = App.data.clients.find(cl => cl.id === id);
    if (!c) return;
    document.getElementById('ci-contact').textContent = c.contact;
    document.getElementById('ci-phone').textContent   = c.phone;
    document.getElementById('ci-email').textContent   = c.email;
    document.getElementById('ci-city').textContent    = c.city;
    box.style.display = 'block';
  };

  window.saveInvoice = (status) => {
    alert(`Invoice ${status === 'draft' ? 'Draft' : ''} successfully ${status === 'draft' ? 'saved' : 'sent'}! ✅`);
    App.navigate('invoices');
  };

  function numberToWords(n) {
    if (n === 0) return 'Zero';
    const ones = ['','One','Two','Three','Four','Five','Six','Seven','Eight','Nine',
                  'Ten','Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen',
                  'Seventeen','Eighteen','Nineteen'];
    const tens = ['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
    if (n < 20) return ones[n];
    if (n < 100) return tens[Math.floor(n/10)] + (n%10 ? ' '+ones[n%10] : '');
    if (n < 1000) return ones[Math.floor(n/100)] + ' Hundred' + (n%100 ? ' '+numberToWords(n%100) : '');
    if (n < 100000) return numberToWords(Math.floor(n/1000)) + ' Thousand' + (n%1000 ? ' '+numberToWords(n%1000) : '');
    if (n < 10000000) return numberToWords(Math.floor(n/100000)) + ' Lakh' + (n%100000 ? ' '+numberToWords(n%100000) : '');
    return numberToWords(Math.floor(n/10000000)) + ' Crore' + (n%10000000 ? ' '+numberToWords(n%10000000) : '');
  }

  return el;
};
