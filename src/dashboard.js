// ============================================
//  MAHADI SHAKTI GROUP — Dashboard Page
// ============================================

Pages.dashboard = function() {
  const stats = App.getStats();
  const rev   = App.data.monthlyRevenue;
  const maxRev = Math.max(...rev.map(r => r.amount));

  const el = document.createElement('div');
  el.className = 'page-content';

  el.innerHTML = `

    <!-- Stat Cards -->
    <div class="stat-grid">

      <div class="stat-card">
        <span class="stat-card-icon">💰</span>
        <div class="stat-card-label">कुल Revenue</div>
        <div class="stat-card-value">${App.formatINR(stats.total)}</div>
        <div class="stat-card-change change-up">↑ 32% पिछले महीने से</div>
      </div>

      <div class="stat-card">
        <span class="stat-card-icon">✅</span>
        <div class="stat-card-label">Paid Invoices</div>
        <div class="stat-card-value">${App.formatINR(stats.paid)}</div>
        <div class="stat-card-change change-up">↑ ${stats.paidCount} invoices paid</div>
      </div>

      <div class="stat-card">
        <span class="stat-card-icon">⏳</span>
        <div class="stat-card-label">Pending Amount</div>
        <div class="stat-card-value">${App.formatINR(stats.pending)}</div>
        <div class="stat-card-change change-flat">→ ${stats.pendingCount} invoices due</div>
      </div>

      <div class="stat-card">
        <span class="stat-card-icon">🔴</span>
        <div class="stat-card-label">Overdue</div>
        <div class="stat-card-value">${App.formatINR(stats.overdue)}</div>
        <div class="stat-card-change change-down">↓ ${stats.overdueCount} invoices overdue</div>
      </div>

    </div>

    <!-- Main Grid -->
    <div style="display:grid; grid-template-columns:1fr 320px; gap:16px; margin-bottom:16px;">

      <!-- Revenue Chart -->
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Monthly Revenue</div>
            <div style="font-size:11px;color:var(--text-muted);margin-top:2px;">पिछले 6 महीने का revenue</div>
          </div>
          <div class="filter-tabs" style="font-size:11px;">
            <span class="filter-tab active">6M</span>
            <span class="filter-tab">1Y</span>
          </div>
        </div>
        <div class="card-body">
          <div style="display:flex; align-items:flex-end; gap:10px; height:120px; padding-top:8px;">
            ${rev.map(r => {
              const h = Math.round((r.amount / maxRev) * 100);
              return `
                <div style="flex:1; display:flex; flex-direction:column; align-items:center; gap:6px;">
                  <div style="font-size:10px;color:var(--text-muted);">${App.formatINR(r.amount).replace('₹','').replace(',000','K')}</div>
                  <div style="width:100%; height:${h}px; background:linear-gradient(to top, var(--gold-700), var(--gold-500)); border-radius:4px 4px 0 0; transition:height 0.5s ease;"></div>
                  <div style="font-size:10.5px;color:var(--text-secondary);font-weight:600;">${r.month}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Invoice Status Breakdown -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Invoice Status</div>
        </div>
        <div class="card-body">

          ${[
            { label: 'Paid',    count: stats.paidCount,    amount: stats.paid,    cls: 'badge-paid',    pct: Math.round(stats.paid/stats.total*100) },
            { label: 'Pending', count: stats.pendingCount, amount: stats.pending, cls: 'badge-pending', pct: Math.round(stats.pending/stats.total*100) },
            { label: 'Overdue', count: stats.overdueCount, amount: stats.overdue, cls: 'badge-overdue', pct: Math.round(stats.overdue/stats.total*100) },
            { label: 'Draft',   count: stats.draftCount,   amount: 0,             cls: 'badge-draft',   pct: 0 },
          ].map(s => `
            <div style="margin-bottom:16px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span class="badge ${s.cls}"><span class="badge-dot"></span>${s.label} (${s.count})</span>
                <span style="font-size:12px;color:var(--text-secondary);">${s.amount ? App.formatINR(s.amount) : '—'}</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width:${s.pct}%"></div>
              </div>
            </div>
          `).join('')}

          <div style="margin-top:20px; padding-top:16px; border-top:1px solid var(--border-subtle);">
            <button class="btn btn-gold" style="width:100%;" onclick="App.navigate('create')">
              ➕ नया Invoice बनाएं
            </button>
          </div>

        </div>
      </div>

    </div>

    <!-- Bottom Grid: Recent Invoices + Activity -->
    <div style="display:grid; grid-template-columns:1fr 320px; gap:16px;">

      <!-- Recent Invoices -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Recent Invoices</div>
          <button class="btn btn-ghost btn-sm" onclick="App.navigate('invoices')">सभी देखें →</button>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${App.data.invoices.slice(0,5).map(inv => `
                <tr onclick="App.navigate('invoices')">
                  <td><span class="mono text-gold">${inv.id}</span></td>
                  <td>
                    <div style="font-weight:600;">${inv.client}</div>
                    <div style="font-size:11px;color:var(--text-muted);">${inv.clientType}</div>
                  </td>
                  <td><span class="mono">${App.formatINR(inv.total)}</span></td>
                  <td style="color:var(--text-secondary);font-size:12.5px;">${App.formatDate(inv.due)}</td>
                  <td><span class="badge badge-${inv.status}"><span class="badge-dot"></span>${inv.status.charAt(0).toUpperCase()+inv.status.slice(1)}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Activity Feed -->
      <div class="card">
        <div class="card-header">
          <div class="card-title">Recent Activity</div>
        </div>
        <div class="card-body" style="padding-top:8px;">
          ${App.data.activity.map(a => `
            <div style="display:flex;gap:10px;padding:10px 0;border-bottom:1px solid var(--border-subtle);">
              <div style="font-size:18px;margin-top:1px;">${a.icon}</div>
              <div>
                <div style="font-size:12.5px;color:var(--text-primary);line-height:1.4;">${a.text}</div>
                <div style="font-size:11px;color:var(--text-muted);margin-top:3px;">${a.time}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;

  return el;
};
