// ============================================
//  MAHADI SHAKTI GROUP — Reports Page
// ============================================

Pages.reports = function() {
  const el = document.createElement('div');
  el.className = 'page-content';

  const stats = App.getStats();
  const rev   = App.data.monthlyRevenue;
  const maxRev = Math.max(...rev.map(r => r.amount));

  // Collection rate
  const collectionRate = Math.round((stats.paid / stats.total) * 100);

  // Top clients by revenue
  const topClients = [...App.data.clients]
    .sort((a,b) => b.totalBusiness - a.totalBusiness)
    .slice(0, 5);

  el.innerHTML = `

    <!-- Period Selector -->
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
      <div>
        <div style="font-size:13px;color:var(--text-muted);">Financial year 2025-26 का complete overview</div>
      </div>
      <div style="display:flex;gap:10px;align-items:center;">
        <div class="filter-tabs">
          <span class="filter-tab active">April 2025</span>
          <span class="filter-tab">Quarter 1</span>
          <span class="filter-tab">FY 2025-26</span>
        </div>
        <button class="btn btn-ghost btn-sm">📥 Export Report</button>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="stat-grid" style="margin-bottom:20px;">

      <div class="stat-card">
        <span class="stat-card-icon">📈</span>
        <div class="stat-card-label">Total Revenue</div>
        <div class="stat-card-value">${App.formatINR(stats.total)}</div>
        <div class="stat-card-change change-up">↑ 32% MoM growth</div>
      </div>

      <div class="stat-card">
        <span class="stat-card-icon">🎯</span>
        <div class="stat-card-label">Collection Rate</div>
        <div class="stat-card-value">${collectionRate}%</div>
        <div class="stat-card-change ${collectionRate > 70 ? 'change-up' : 'change-down'}">
          ${collectionRate > 70 ? '↑ Good performance' : '↓ Improvement needed'}
        </div>
      </div>

      <div class="stat-card">
        <span class="stat-card-icon">👥</span>
        <div class="stat-card-label">Active Clients</div>
        <div class="stat-card-value">${App.data.clients.filter(c=>c.status==='active').length}</div>
        <div class="stat-card-change change-up">↑ 1 new this month</div>
      </div>

      <div class="stat-card">
        <span class="stat-card-icon">⚡</span>
        <div class="stat-card-label">Avg Invoice Value</div>
        <div class="stat-card-value">${App.formatINR(Math.round(stats.total / App.data.invoices.length))}</div>
        <div class="stat-card-change change-up">↑ Per invoice avg.</div>
      </div>

    </div>

    <!-- Charts Row -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">

      <!-- Revenue Bar Chart -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">📊 Monthly Revenue Trend</div>
        </div>
        <div class="card-body">
          <div style="display:flex;align-items:flex-end;gap:8px;height:140px;">
            ${rev.map(r => {
              const h = Math.round((r.amount / maxRev) * 120);
              const formatted = (r.amount/100000).toFixed(1)+'L';
              return `
                <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:5px;">
                  <div style="font-size:9.5px;color:var(--text-muted);">${formatted}</div>
                  <div style="width:100%;height:${h}px;background:linear-gradient(to top,var(--gold-700),var(--gold-300));border-radius:4px 4px 0 0;"></div>
                  <div style="font-size:10.5px;color:var(--text-secondary);font-weight:600;">${r.month}</div>
                </div>
              `;
            }).join('')}
          </div>
          <div style="margin-top:16px;display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);">
            <span>Total 6M: <strong style="color:var(--text-primary);">${App.formatINR(rev.reduce((s,r)=>s+r.amount,0))}</strong></span>
            <span>Best month: <strong style="color:var(--gold-300);">April</strong></span>
          </div>
        </div>
      </div>

      <!-- Payment Status Pie-like -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">🥧 Payment Distribution</div>
        </div>
        <div class="card-body">
          ${[
            { label: 'Paid',    amount: stats.paid,    pct: Math.round(stats.paid/stats.total*100),    color: 'var(--status-paid)' },
            { label: 'Pending', amount: stats.pending, pct: Math.round(stats.pending/stats.total*100), color: 'var(--status-pending)' },
            { label: 'Overdue', amount: stats.overdue, pct: Math.round(stats.overdue/stats.total*100), color: 'var(--status-overdue)' },
          ].map(s => `
            <div style="margin-bottom:14px;">
              <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
                <span style="font-size:12.5px;display:flex;align-items:center;gap:6px;">
                  <span style="width:8px;height:8px;border-radius:2px;background:${s.color};display:inline-block;"></span>
                  ${s.label}
                </span>
                <span style="font-size:12.5px;">
                  <span class="mono">${App.formatINR(s.amount)}</span>
                  <span style="color:var(--text-muted);margin-left:6px;">(${s.pct}%)</span>
                </span>
              </div>
              <div class="progress-bar">
                <div style="height:100%;width:${s.pct}%;background:${s.color};border-radius:2px;transition:width 0.5s;"></div>
              </div>
            </div>
          `).join('')}

          <div style="margin-top:20px;padding:14px;background:var(--surface-1);border-radius:var(--radius-md);text-align:center;">
            <div style="font-size:11px;color:var(--text-muted);margin-bottom:4px;">Outstanding Amount</div>
            <div class="mono" style="font-size:20px;font-weight:700;color:var(--status-overdue);">${App.formatINR(stats.pending + stats.overdue)}</div>
            <div style="font-size:11.5px;color:var(--text-muted);margin-top:4px;">अभी collect होना बाकी है</div>
          </div>

        </div>
      </div>

    </div>

    <!-- Bottom Row -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">

      <!-- Top Clients -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">🏆 Top Clients by Revenue</div>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Client</th>
                <th>Invoices</th>
                <th style="text-align:right;">Revenue</th>
              </tr>
            </thead>
            <tbody>
              ${topClients.map((c, i) => `
                <tr>
                  <td>
                    <span style="width:24px;height:24px;border-radius:50%;background:${
                      i===0?'var(--gold-500)':i===1?'var(--text-muted)':i===2?'#CD7F32':'var(--surface-2)'
                    };color:${i<3?'var(--dark-300)':'var(--text-muted)'};font-size:11px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;">
                      ${i+1}
                    </span>
                  </td>
                  <td>
                    <div style="font-weight:600;">${c.name}</div>
                    <div style="font-size:11px;color:var(--text-muted);">${c.type}</div>
                  </td>
                  <td style="text-align:center;">${c.invoices}</td>
                  <td style="text-align:right;"><span class="mono text-gold">${App.formatINR(c.totalBusiness)}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Invoice Aging -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">⏱ Invoice Aging Report</div>
        </div>
        <div class="card-body">
          ${[
            { label: '0–15 दिन', invoices: App.data.invoices.filter(i=>i.status==='paid').length, amount: stats.paid, color: 'var(--status-paid)' },
            { label: '16–30 दिन', invoices: App.data.invoices.filter(i=>i.status==='pending').length, amount: stats.pending, color: 'var(--status-pending)' },
            { label: '30+ दिन (Overdue)', invoices: App.data.invoices.filter(i=>i.status==='overdue').length, amount: stats.overdue, color: 'var(--status-overdue)' },
          ].map(a => `
            <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;margin-bottom:10px;background:var(--surface-1);border-radius:var(--radius-md);border-left:3px solid ${a.color};">
              <div>
                <div style="font-size:13px;font-weight:600;">${a.label}</div>
                <div style="font-size:11.5px;color:var(--text-muted);">${a.invoices} invoices</div>
              </div>
              <div class="mono" style="font-size:14px;font-weight:600;color:${a.color};">${App.formatINR(a.amount)}</div>
            </div>
          `).join('')}

          <div style="margin-top:8px;padding:12px;background:rgba(231,76,60,0.06);border-radius:var(--radius-md);border:1px solid rgba(231,76,60,0.15);">
            <div style="font-size:12px;color:var(--status-overdue);font-weight:600;">⚠️ Action Required</div>
            <div style="font-size:11.5px;color:var(--text-muted);margin-top:4px;">Royal Constructions का invoice 35 दिन से overdue — immediate follow-up करें।</div>
          </div>

        </div>
      </div>

    </div>
  `;

  return el;
};
