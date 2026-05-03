// ============================================
//  MAHADI SHAKTI GROUP — Invoices Page
// ============================================

Pages.invoices = function() {
  const el = document.createElement('div');
  el.className = 'page-content';

  function render(filter) {
    const all  = App.data.invoices;
    const list = filter === 'all' ? all : all.filter(i => i.status === filter);

    el.innerHTML = `

      <!-- Toolbar -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
        <div class="filter-tabs">
          ${['all','paid','pending','overdue','draft'].map(f => `
            <span class="filter-tab ${filter===f?'active':''}" onclick="rerenderInvoices('${f}')">
              ${f==='all' ? `सभी (${all.length})` : f.charAt(0).toUpperCase()+f.slice(1)+' ('+all.filter(i=>i.status===f).length+')'}
            </span>
          `).join('')}
        </div>
        <div style="display:flex;gap:10px;align-items:center;">
          <div class="search-wrap">
            <span class="search-icon">🔍</span>
            <input type="text" placeholder="Invoice या Client खोजें..." id="inv-search" />
          </div>
          <button class="btn btn-ghost btn-sm" title="Export">📤 Export</button>
          <button class="btn btn-gold" onclick="App.navigate('create')">➕ New Invoice</button>
        </div>
      </div>

      <!-- Table -->
      <div class="card">
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Client</th>
                <th>Date</th>
                <th>Due Date</th>
                <th>Amount (excl. GST)</th>
                <th>GST (18%)</th>
                <th>Total</th>
                <th>Status</th>
                <th style="text-align:right;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${list.length === 0 ? `
                <tr>
                  <td colspan="9">
                    <div class="empty-state">
                      <div class="empty-icon">📭</div>
                      <div class="empty-title">कोई Invoice नहीं मिला</div>
                      <div class="empty-desc">इस filter में कोई invoice नहीं है</div>
                    </div>
                  </td>
                </tr>
              ` : list.map(inv => `
                <tr>
                  <td><span class="mono text-gold">${inv.id}</span></td>
                  <td>
                    <div style="font-weight:600;">${inv.client}</div>
                    <div style="font-size:11px;color:var(--text-muted);">${inv.clientType}</div>
                  </td>
                  <td style="color:var(--text-secondary);font-size:12.5px;">${App.formatDate(inv.date)}</td>
                  <td style="color:${inv.status==='overdue'?'var(--status-overdue)':'var(--text-secondary)'};font-size:12.5px;">${App.formatDate(inv.due)}</td>
                  <td><span class="mono">${App.formatINR(inv.amount)}</span></td>
                  <td><span class="mono" style="color:var(--text-muted);">${App.formatINR(inv.tax)}</span></td>
                  <td><span class="mono" style="font-weight:600;">${App.formatINR(inv.total)}</span></td>
                  <td><span class="badge badge-${inv.status}"><span class="badge-dot"></span>${inv.status.charAt(0).toUpperCase()+inv.status.slice(1)}</span></td>
                  <td style="text-align:right;">
                    <button class="btn btn-ghost btn-sm" onclick="viewInvoice('${inv.id}')" title="देखें">👁</button>
                    <button class="btn btn-ghost btn-sm" title="Download">📥</button>
                    <button class="btn btn-ghost btn-sm" title="Email भेजें">📧</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Table Footer -->
        ${list.length > 0 ? `
          <div style="padding:14px 20px; border-top:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center;">
            <div style="font-size:12px;color:var(--text-muted);">${list.length} invoices दिख रहे हैं</div>
            <div style="font-size:13px;font-weight:600;">
              कुल: <span class="mono text-gold">${App.formatINR(list.reduce((s,i)=>s+i.total,0))}</span>
            </div>
          </div>
        ` : ''}

      </div>

      <!-- Invoice View Modal -->
      <div class="modal-overlay" id="invoice-modal">
        <div class="modal" style="max-width:680px;">
          <div class="modal-header">
            <div class="modal-title" id="modal-inv-title">Invoice Details</div>
            <button class="modal-close" onclick="closeModal()">✕</button>
          </div>
          <div class="modal-body" id="modal-inv-body"></div>
          <div class="modal-footer">
            <button class="btn btn-ghost" onclick="closeModal()">बंद करें</button>
            <button class="btn btn-ghost">📧 Email भेजें</button>
            <button class="btn btn-gold">📥 PDF Download</button>
          </div>
        </div>
      </div>

    `;

    // Re-render on filter click
    window.rerenderInvoices = (f) => render(f);

    // View invoice modal
    window.viewInvoice = (id) => {
      const inv = App.data.invoices.find(i => i.id === id);
      if (!inv) return;

      document.getElementById('modal-inv-title').textContent = `Invoice: ${inv.id}`;
      document.getElementById('modal-inv-body').innerHTML = `
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:20px;">
          <div>
            <div style="font-size:10.5px;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Client</div>
            <div style="font-weight:600;">${inv.client}</div>
            <div style="font-size:12px;color:var(--text-muted);">${inv.clientType}</div>
          </div>
          <div>
            <div style="font-size:10.5px;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Status</div>
            <span class="badge badge-${inv.status}"><span class="badge-dot"></span>${inv.status}</span>
          </div>
          <div>
            <div style="font-size:10.5px;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Invoice Date</div>
            <div>${App.formatDate(inv.date)}</div>
          </div>
          <div>
            <div style="font-size:10.5px;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Due Date</div>
            <div style="color:${inv.status==='overdue'?'var(--status-overdue)':'inherit'}">${App.formatDate(inv.due)}</div>
          </div>
        </div>

        <div style="background:var(--surface-1);border-radius:var(--radius-md);overflow:hidden;margin-bottom:16px;">
          <table style="width:100%;">
            <thead><tr>
              <th style="padding:10px 14px;font-size:10px;text-align:left;color:var(--text-muted);background:var(--surface-2);">Description</th>
              <th style="padding:10px 14px;font-size:10px;text-align:right;color:var(--text-muted);background:var(--surface-2);">Qty</th>
              <th style="padding:10px 14px;font-size:10px;text-align:right;color:var(--text-muted);background:var(--surface-2);">Rate</th>
              <th style="padding:10px 14px;font-size:10px;text-align:right;color:var(--text-muted);background:var(--surface-2);">Amount</th>
            </tr></thead>
            <tbody>
              ${inv.items.map(item => `
                <tr style="border-top:1px solid var(--border-subtle);">
                  <td style="padding:10px 14px;font-size:13px;">${item.desc}</td>
                  <td style="padding:10px 14px;font-size:13px;text-align:right;">${item.qty}</td>
                  <td style="padding:10px 14px;font-size:13px;text-align:right;" class="mono">${App.formatINR(item.rate)}</td>
                  <td style="padding:10px 14px;font-size:13px;text-align:right;" class="mono">${App.formatINR(item.qty * item.rate)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;">
          <div style="display:flex;gap:40px;font-size:13px;color:var(--text-secondary);">
            <span>Subtotal</span><span class="mono">${App.formatINR(inv.amount)}</span>
          </div>
          <div style="display:flex;gap:40px;font-size:13px;color:var(--text-secondary);">
            <span>GST (18%)</span><span class="mono">${App.formatINR(inv.tax)}</span>
          </div>
          <div style="display:flex;gap:40px;font-size:16px;font-weight:700;padding-top:8px;border-top:1px solid var(--border-subtle);">
            <span>Total</span><span class="mono text-gold">${App.formatINR(inv.total)}</span>
          </div>
        </div>
      `;

      document.getElementById('invoice-modal').classList.add('open');
    };

    window.closeModal = () => {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
    };
  }

  render('all');
  return el;
};
