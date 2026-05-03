// ============================================
//  MAHADI SHAKTI GROUP — Settings Page
// ============================================

Pages.settings = function() {
  const el = document.createElement('div');
  el.className = 'page-content';
  const c = App.data.company;

  el.innerHTML = `

    <div style="display:grid;grid-template-columns:220px 1fr;gap:20px;align-items:start;">

      <!-- Settings Nav -->
      <div class="card" style="padding:10px;">
        ${[
          { icon: '🏢', label: 'Company Profile',  id: 'company' },
          { icon: '📄', label: 'Invoice Settings', id: 'invoice' },
          { icon: '🏦', label: 'Bank Details',     id: 'bank' },
          { icon: '📊', label: 'Tax Settings',     id: 'tax' },
          { icon: '🔔', label: 'Notifications',    id: 'notify' },
          { icon: '🔐', label: 'Security',         id: 'security' },
        ].map((item, i) => `
          <div class="nav-item ${i===0?'active':''}" onclick="switchSettingsTab(this, '${item.id}')">
            <span class="nav-icon">${item.icon}</span>
            <span>${item.label}</span>
          </div>
        `).join('')}
      </div>

      <!-- Settings Panels -->
      <div>

        <!-- Company Profile -->
        <div class="card settings-panel" id="panel-company">
          <div class="card-header">
            <div class="card-title">🏢 Company Profile</div>
            <button class="btn btn-gold btn-sm">💾 Save Changes</button>
          </div>
          <div class="card-body">
            <div style="display:flex;align-items:center;gap:16px;margin-bottom:22px;padding:16px;background:var(--surface-1);border-radius:var(--radius-md);">
              <div style="width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,var(--gold-500),var(--gold-700));display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:700;color:var(--dark-300);">M</div>
              <div>
                <div style="font-weight:700;font-size:15px;">${c.name}</div>
                <div style="font-size:12px;color:var(--text-muted);margin-top:2px;">${c.email}</div>
              </div>
              <button class="btn btn-ghost btn-sm" style="margin-left:auto;">Logo Change करें</button>
            </div>

            <div class="form-row cols-2">
              <div class="form-group">
                <label class="form-label">Company Name *</label>
                <input class="form-input" value="${c.name}" />
              </div>
              <div class="form-group">
                <label class="form-label">Tagline</label>
                <input class="form-input" value="${c.tagline}" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Address *</label>
              <textarea class="form-textarea" style="min-height:60px;">${c.address}</textarea>
            </div>

            <div class="form-row cols-2">
              <div class="form-group">
                <label class="form-label">Phone</label>
                <input class="form-input" value="${c.phone}" />
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input class="form-input" value="${c.email}" />
              </div>
            </div>

            <div class="form-row cols-2">
              <div class="form-group">
                <label class="form-label">GST Number</label>
                <input class="form-input mono" value="${c.gst}" />
              </div>
              <div class="form-group">
                <label class="form-label">PAN Number</label>
                <input class="form-input mono" value="${c.pan}" />
              </div>
            </div>
          </div>
        </div>

        <!-- Invoice Settings -->
        <div class="card settings-panel" id="panel-invoice" style="display:none;">
          <div class="card-header">
            <div class="card-title">📄 Invoice Settings</div>
            <button class="btn btn-gold btn-sm">💾 Save</button>
          </div>
          <div class="card-body">
            <div class="form-row cols-2">
              <div class="form-group">
                <label class="form-label">Invoice Prefix</label>
                <input class="form-input mono" value="MSG" />
              </div>
              <div class="form-group">
                <label class="form-label">Starting Number</label>
                <input class="form-input mono" type="number" value="001" />
              </div>
            </div>
            <div class="form-row cols-2">
              <div class="form-group">
                <label class="form-label">Default Payment Terms</label>
                <select class="form-select">
                  <option>Net 15</option>
                  <option selected>Net 30</option>
                  <option>Net 45</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Default Currency</label>
                <select class="form-select">
                  <option selected>INR (₹)</option>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Default Invoice Note</label>
              <textarea class="form-textarea">Payment NEFT/RTGS/UPI से करें। किसी भी query के लिए हमें contact करें।</textarea>
            </div>
            <div style="display:flex;gap:16px;padding:14px;background:var(--surface-1);border-radius:var(--radius-md);">
              ${[
                ['Auto-send on create', true],
                ['Late payment reminders', true],
                ['WhatsApp notification', false],
              ].map(([label, checked]) => `
                <label style="display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:var(--text-secondary);">
                  <input type="checkbox" ${checked?'checked':''} style="accent-color:var(--gold-500);" />
                  ${label}
                </label>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Bank Details -->
        <div class="card settings-panel" id="panel-bank" style="display:none;">
          <div class="card-header">
            <div class="card-title">🏦 Bank Details</div>
            <button class="btn btn-gold btn-sm">💾 Save</button>
          </div>
          <div class="card-body">
            <div style="padding:12px 14px;background:rgba(201,168,76,0.08);border:1px solid var(--border-medium);border-radius:var(--radius-md);font-size:12.5px;color:var(--gold-300);margin-bottom:18px;">
              ℹ️ यह details invoice पर print होंगी। सही information डालें।
            </div>
            <div class="form-row cols-2">
              <div class="form-group">
                <label class="form-label">Bank Name</label>
                <input class="form-input" value="${c.bank}" />
              </div>
              <div class="form-group">
                <label class="form-label">Account Type</label>
                <select class="form-select">
                  <option selected>Current Account</option>
                  <option>Savings Account</option>
                </select>
              </div>
            </div>
            <div class="form-row cols-2">
              <div class="form-group">
                <label class="form-label">Account Number</label>
                <input class="form-input mono" value="${c.account}" />
              </div>
              <div class="form-group">
                <label class="form-label">IFSC Code</label>
                <input class="form-input mono" value="${c.ifsc}" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">UPI ID (Optional)</label>
              <input class="form-input" placeholder="yourname@bankupi" />
            </div>
          </div>
        </div>

        <!-- Tax Settings -->
        <div class="card settings-panel" id="panel-tax" style="display:none;">
          <div class="card-header">
            <div class="card-title">📊 Tax Settings</div>
            <button class="btn btn-gold btn-sm">💾 Save</button>
          </div>
          <div class="card-body">
            <div class="form-row cols-2">
              <div class="form-group">
                <label class="form-label">Default GST Rate</label>
                <select class="form-select">
                  <option>0%</option>
                  <option>5%</option>
                  <option>12%</option>
                  <option selected>18%</option>
                  <option>28%</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Tax Type</label>
                <select class="form-select">
                  <option selected>CGST + SGST (Intra-state)</option>
                  <option>IGST (Inter-state)</option>
                </select>
              </div>
            </div>
            <div style="padding:14px;background:var(--surface-1);border-radius:var(--radius-md);">
              <div style="font-size:12.5px;font-weight:600;margin-bottom:10px;">GST Breakdown Preview (₹1,00,000 पर)</div>
              ${[['CGST (9%)', 9000], ['SGST (9%)', 9000], ['Total GST (18%)', 18000], ['Total Amount', 118000]].map(([l,v],i) => `
                <div style="display:flex;justify-content:space-between;font-size:12.5px;padding:5px 0;${i===3?'border-top:1px solid var(--border-subtle);font-weight:700;':'color:var(--text-secondary);'}">
                  <span>${l}</span>
                  <span class="mono">${App.formatINR(v)}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Notifications -->
        <div class="card settings-panel" id="panel-notify" style="display:none;">
          <div class="card-header"><div class="card-title">🔔 Notifications</div><button class="btn btn-gold btn-sm">💾 Save</button></div>
          <div class="card-body">
            ${[
              ['Invoice भेजने पर Email notification', true],
              ['Payment receive होने पर notification', true],
              ['Overdue invoice reminder (हर 7 दिन)', true],
              ['WhatsApp reminder send करें', false],
              ['Monthly revenue report email', true],
              ['New client added notification', false],
            ].map(([label, checked]) => `
              <div style="display:flex;justify-content:space-between;align-items:center;padding:13px 0;border-bottom:1px solid var(--border-subtle);">
                <span style="font-size:13.5px;">${label}</span>
                <label style="position:relative;display:inline-block;width:40px;height:22px;cursor:pointer;">
                  <input type="checkbox" ${checked?'checked':''} style="opacity:0;width:0;height:0;" />
                  <span style="position:absolute;inset:0;background:${checked?'var(--gold-500)':'var(--surface-3)'};border-radius:22px;transition:background 0.2s;"></span>
                  <span style="position:absolute;top:3px;left:${checked?'21':'3'}px;width:16px;height:16px;background:#fff;border-radius:50%;transition:left 0.2s;"></span>
                </label>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Security -->
        <div class="card settings-panel" id="panel-security" style="display:none;">
          <div class="card-header"><div class="card-title">🔐 Security</div></div>
          <div class="card-body">
            <div class="form-group">
              <label class="form-label">Current Password</label>
              <input class="form-input" type="password" placeholder="••••••••" />
            </div>
            <div class="form-row cols-2">
              <div class="form-group">
                <label class="form-label">New Password</label>
                <input class="form-input" type="password" placeholder="••••••••" />
              </div>
              <div class="form-group">
                <label class="form-label">Confirm Password</label>
                <input class="form-input" type="password" placeholder="••••••••" />
              </div>
            </div>
            <button class="btn btn-gold" style="margin-top:4px;">🔐 Password Update करें</button>
          </div>
        </div>

      </div>
    </div>
  `;

  window.switchSettingsTab = (navItem, id) => {
    el.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    navItem.classList.add('active');
    el.querySelectorAll('.settings-panel').forEach(p => p.style.display = 'none');
    const panel = el.querySelector(`#panel-${id}`);
    if (panel) panel.style.display = '';
  };

  return el;
};
