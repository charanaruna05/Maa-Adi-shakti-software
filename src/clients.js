// ============================================
//  MAHADI SHAKTI GROUP — Clients Page
// ============================================

Pages.clients = function() {
  const el = document.createElement('div');
  el.className = 'page-content';

  const statusColors = {
    active:   { bg: 'rgba(39,174,96,0.12)',   color: '#27AE60', label: 'Active' },
    'at-risk':{ bg: 'rgba(231,76,60,0.12)',   color: '#E74C3C', label: 'At Risk' },
    new:      { bg: 'rgba(52,152,219,0.12)',  color: '#3498DB', label: 'New' },
  };

  el.innerHTML = `

    <!-- Toolbar -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
      <div>
        <div style="font-size:13px;color:var(--text-muted);">
          <span style="font-weight:600;color:var(--text-primary);">${App.data.clients.length}</span> Clients registered
        </div>
      </div>
      <div style="display:flex;gap:10px;align-items:center;">
        <div class="search-wrap">
          <span class="search-icon">🔍</span>
          <input type="text" placeholder="Client खोजें..." />
        </div>
        <button class="btn btn-ghost btn-sm">📤 Export</button>
        <button class="btn btn-gold" onclick="openAddClient()">➕ New Client</button>
      </div>
    </div>

    <!-- Client Cards Grid -->
    <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:20px;">
      ${App.data.clients.map(c => {
        const st = statusColors[c.status] || statusColors.active;
        const initials = c.name.split(' ').slice(0,2).map(w=>w[0]).join('');
        return `
          <div class="card" style="padding:20px;cursor:pointer;transition:border-color 0.2s,transform 0.2s;"
               onmouseenter="this.style.borderColor='var(--border-medium)';this.style.transform='translateY(-2px)'"
               onmouseleave="this.style.borderColor='';this.style.transform=''">

            <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;">
              <div style="display:flex;gap:12px;align-items:center;">
                <div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,var(--gold-500),var(--gold-700));display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:700;color:var(--dark-300);">${initials}</div>
                <div>
                  <div style="font-weight:700;font-size:14px;">${c.name}</div>
                  <div style="font-size:11.5px;color:var(--text-muted);">${c.type}</div>
                </div>
              </div>
              <span style="background:${st.bg};color:${st.color};font-size:10.5px;font-weight:600;padding:3px 9px;border-radius:20px;">${st.label}</span>
            </div>

            <div style="display:flex;flex-direction:column;gap:7px;margin-bottom:14px;">
              <div style="display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--text-secondary);">
                <span>👤</span> ${c.contact}
              </div>
              <div style="display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--text-secondary);">
                <span>📞</span> ${c.phone}
              </div>
              <div style="display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--text-secondary);">
                <span>📍</span> ${c.city}
              </div>
            </div>

            <div style="display:flex;justify-content:space-between;padding-top:12px;border-top:1px solid var(--border-subtle);">
              <div>
                <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;">Total Business</div>
                <div class="mono text-gold" style="font-size:14px;font-weight:600;margin-top:2px;">${App.formatINR(c.totalBusiness)}</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:1px;">Invoices</div>
                <div style="font-size:14px;font-weight:600;margin-top:2px;">${c.invoices}</div>
              </div>
            </div>

            <div style="display:flex;gap:8px;margin-top:12px;">
              <button class="btn btn-ghost btn-sm" style="flex:1;">📄 Invoices</button>
              <button class="btn btn-ghost btn-sm" style="flex:1;">✏️ Edit</button>
            </div>

          </div>
        `;
      }).join('')}
    </div>

    <!-- Summary Table -->
    <div class="card">
      <div class="card-header">
        <div class="card-title">Client Revenue Summary</div>
        <span style="font-size:12px;color:var(--text-muted);">FY 2025-26</span>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Client ID</th>
              <th>Client Name</th>
              <th>City</th>
              <th>Invoices</th>
              <th>Total Business</th>
              <th>Status</th>
              <th style="text-align:right;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${App.data.clients.map(c => {
              const st = statusColors[c.status] || statusColors.active;
              return `
                <tr>
                  <td><span class="mono text-gold">${c.id}</span></td>
                  <td style="font-weight:600;">${c.name}</td>
                  <td style="color:var(--text-secondary);">${c.city}</td>
                  <td style="text-align:center;">${c.invoices}</td>
                  <td><span class="mono">${App.formatINR(c.totalBusiness)}</span></td>
                  <td>
                    <span style="background:${st.bg};color:${st.color};font-size:10.5px;font-weight:600;padding:2px 9px;border-radius:20px;">${st.label}</span>
                  </td>
                  <td style="text-align:right;">
                    <button class="btn btn-ghost btn-sm">Invoice बनाएं</button>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Client Modal -->
    <div class="modal-overlay" id="client-modal">
      <div class="modal">
        <div class="modal-header">
          <div class="modal-title">नया Client जोड़ें</div>
          <button class="modal-close" onclick="document.getElementById('client-modal').classList.remove('open')">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-row cols-2">
            <div class="form-group">
              <label class="form-label">Company Name *</label>
              <input class="form-input" type="text" placeholder="Company का नाम" />
            </div>
            <div class="form-group">
              <label class="form-label">Business Type *</label>
              <select class="form-select">
                <option>Software</option>
                <option>Trading</option>
                <option>Construction</option>
                <option>Healthcare</option>
                <option>Logistics</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div class="form-row cols-2">
            <div class="form-group">
              <label class="form-label">Contact Person</label>
              <input class="form-input" type="text" placeholder="Contact person का नाम" />
            </div>
            <div class="form-group">
              <label class="form-label">Phone</label>
              <input class="form-input" type="text" placeholder="+91 XXXXX XXXXX" />
            </div>
          </div>
          <div class="form-row cols-2">
            <div class="form-group">
              <label class="form-label">Email</label>
              <input class="form-input" type="email" placeholder="email@company.com" />
            </div>
            <div class="form-group">
              <label class="form-label">City</label>
              <input class="form-input" type="text" placeholder="शहर का नाम" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">GST Number</label>
            <input class="form-input" type="text" placeholder="GST Number (अगर है)" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-ghost" onclick="document.getElementById('client-modal').classList.remove('open')">Cancel</button>
          <button class="btn btn-gold">✅ Client जोड़ें</button>
        </div>
      </div>
    </div>

  `;

  window.openAddClient = () => {
    document.getElementById('client-modal').classList.add('open');
  };

  return el;
};
