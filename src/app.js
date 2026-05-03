// ============================================
//  MAHADI SHAKTI GROUP — Invoice System
//  App Data Store & Router
// ============================================

const App = {

  // ─── State ───
  currentPage: 'dashboard',
  searchQuery: '',
  filterStatus: 'all',

  // ─── Sample Data ───
  data: {

    company: {
      name: 'Mahadi Shakti Group',
      tagline: 'Software Solutions',
      address: 'Plot No. 42, Sector 18, Gurugram, Haryana 122015',
      phone: '+91 98765 43210',
      email: 'billing@mahadishakti.com',
      gst: 'GST06ABCDE1234F2Z5',
      pan: 'ABCDE1234F',
      bank: 'HDFC Bank',
      account: '50200012345678',
      ifsc: 'HDFC0001234',
    },

    invoices: [
      {
        id: 'MSG-2025-001',
        client: 'TechVision Pvt. Ltd.',
        clientType: 'Software Company',
        amount: 185000,
        tax: 33300,
        total: 218300,
        status: 'paid',
        date: '2025-04-01',
        due: '2025-04-15',
        paidOn: '2025-04-12',
        items: [
          { desc: 'ERP Module Development', qty: 1, rate: 120000 },
          { desc: 'API Integration', qty: 5, rate: 13000 },
        ]
      },
      {
        id: 'MSG-2025-002',
        client: 'Sunrise Exports',
        clientType: 'Trading Company',
        amount: 75000,
        tax: 13500,
        total: 88500,
        status: 'pending',
        date: '2025-04-10',
        due: '2025-04-25',
        paidOn: null,
        items: [
          { desc: 'Inventory Management System', qty: 1, rate: 75000 },
        ]
      },
      {
        id: 'MSG-2025-003',
        client: 'Royal Constructions',
        clientType: 'Construction Firm',
        amount: 240000,
        tax: 43200,
        total: 283200,
        status: 'overdue',
        date: '2025-03-15',
        due: '2025-03-30',
        paidOn: null,
        items: [
          { desc: 'Project Management Software', qty: 1, rate: 150000 },
          { desc: 'Mobile App (Android + iOS)', qty: 1, rate: 90000 },
        ]
      },
      {
        id: 'MSG-2025-004',
        client: 'Medplus Healthcare',
        clientType: 'Healthcare',
        amount: 95000,
        tax: 17100,
        total: 112100,
        status: 'paid',
        date: '2025-04-18',
        due: '2025-05-03',
        paidOn: '2025-04-20',
        items: [
          { desc: 'Patient Management System', qty: 1, rate: 95000 },
        ]
      },
      {
        id: 'MSG-2025-005',
        client: 'AgroLink Solutions',
        clientType: 'Agriculture Tech',
        amount: 55000,
        tax: 9900,
        total: 64900,
        status: 'draft',
        date: '2025-04-28',
        due: '2025-05-13',
        paidOn: null,
        items: [
          { desc: 'IoT Dashboard Development', qty: 1, rate: 55000 },
        ]
      },
      {
        id: 'MSG-2025-006',
        client: 'FastFreight Logistics',
        clientType: 'Logistics',
        amount: 130000,
        tax: 23400,
        total: 153400,
        status: 'pending',
        date: '2025-04-22',
        due: '2025-05-07',
        paidOn: null,
        items: [
          { desc: 'Fleet Tracking System', qty: 1, rate: 80000 },
          { desc: 'Driver App', qty: 1, rate: 50000 },
        ]
      },
    ],

    clients: [
      { id: 'C001', name: 'TechVision Pvt. Ltd.', type: 'Software', contact: 'Arjun Mehta', phone: '+91 98100 11234', email: 'arjun@techvision.in', city: 'Bengaluru', totalBusiness: 218300, invoices: 3, status: 'active' },
      { id: 'C002', name: 'Sunrise Exports', type: 'Trading', contact: 'Priya Sharma', phone: '+91 98200 55678', email: 'priya@sunrise.co.in', city: 'Mumbai', totalBusiness: 88500, invoices: 1, status: 'active' },
      { id: 'C003', name: 'Royal Constructions', type: 'Construction', contact: 'Rajeev Kumar', phone: '+91 97300 22345', email: 'rajeev@royalconstruct.com', city: 'Delhi', totalBusiness: 283200, invoices: 2, status: 'at-risk' },
      { id: 'C004', name: 'Medplus Healthcare', type: 'Healthcare', contact: 'Dr. Anita Joshi', phone: '+91 98400 33456', email: 'anita@medplus.in', city: 'Pune', totalBusiness: 112100, invoices: 1, status: 'active' },
      { id: 'C005', name: 'AgroLink Solutions', type: 'AgriTech', contact: 'Suresh Patel', phone: '+91 98500 44567', email: 'suresh@agrolink.in', city: 'Ahmedabad', totalBusiness: 64900, invoices: 1, status: 'new' },
      { id: 'C006', name: 'FastFreight Logistics', type: 'Logistics', contact: 'Manjeet Singh', phone: '+91 98600 66789', email: 'manjeet@fastfreight.com', city: 'Chandigarh', totalBusiness: 153400, invoices: 1, status: 'active' },
    ],

    monthlyRevenue: [
      { month: 'Nov', amount: 180000 },
      { month: 'Dec', amount: 220000 },
      { month: 'Jan', amount: 195000 },
      { month: 'Feb', amount: 310000 },
      { month: 'Mar', amount: 283200 },
      { month: 'Apr', amount: 419400 },
    ],

    activity: [
      { icon: '✅', text: 'Medplus Healthcare ने ₹1,12,100 का भुगतान किया', time: '2 घंटे पहले', color: '#27AE60' },
      { icon: '📄', text: 'AgroLink Solutions के लिए नया Invoice draft बना', time: '5 घंटे पहले', color: '#C9A84C' },
      { icon: '⚠️', text: 'Royal Constructions का Invoice 35 दिन से overdue है', time: '1 दिन पहले', color: '#E74C3C' },
      { icon: '📧', text: 'FastFreight Logistics को reminder भेजा गया', time: '2 दिन पहले', color: '#3498DB' },
      { icon: '🆕', text: 'AgroLink Solutions नया client जोड़ा गया', time: '3 दिन पहले', color: '#8E44AD' },
    ],
  },

  // ─── Computed Stats ───
  getStats() {
    const inv = this.data.invoices;
    const total  = inv.reduce((s, i) => s + i.total, 0);
    const paid   = inv.filter(i => i.status === 'paid').reduce((s, i) => s + i.total, 0);
    const pending= inv.filter(i => i.status === 'pending').reduce((s, i) => s + i.total, 0);
    const overdue= inv.filter(i => i.status === 'overdue').reduce((s, i) => s + i.total, 0);
    return { total, paid, pending, overdue,
      paidCount:    inv.filter(i => i.status === 'paid').length,
      pendingCount: inv.filter(i => i.status === 'pending').length,
      overdueCount: inv.filter(i => i.status === 'overdue').length,
      draftCount:   inv.filter(i => i.status === 'draft').length,
    };
  },

  // ─── Format helpers ───
  formatINR(n) {
    return '₹' + n.toLocaleString('en-IN');
  },

  formatDate(d) {
    if (!d) return '—';
    const dt = new Date(d);
    return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  },

  // ─── Router ───
  navigate(page) {
    this.currentPage = page;
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.page === page);
    });
    this.renderPage(page);
  },

  renderPage(page) {
    const container = document.getElementById('page-host');
    const topbarTitle = document.getElementById('topbar-title');
    const topbarSub   = document.getElementById('topbar-sub');

    const pageMap = {
      dashboard: { title: 'Dashboard', sub: 'Mahadi Shakti Group — Overview', fn: Pages.dashboard },
      invoices:  { title: 'Invoices',  sub: 'सभी Invoices manage करें', fn: Pages.invoices },
      clients:   { title: 'Clients',   sub: 'Client records & history', fn: Pages.clients },
      create:    { title: 'Create Invoice', sub: 'नया Invoice बनाएं', fn: Pages.createInvoice },
      reports:   { title: 'Reports',   sub: 'Financial analytics & insights', fn: Pages.reports },
      settings:  { title: 'Settings',  sub: 'Company & app settings', fn: Pages.settings },
    };

    const p = pageMap[page];
    if (!p) return;

    topbarTitle.textContent = p.title;
    topbarSub.textContent   = p.sub;

    container.innerHTML = '';
    container.appendChild(p.fn());
  },

  init() {
    this.navigate('dashboard');
  }
};
