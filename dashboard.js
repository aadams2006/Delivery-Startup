const SESSION_KEY = 'hovrSession';

const state = {
  activeTab: 'overview',
  shipments: [
    { id: 'HX-4821', type: 'Retail Pulse', status: 'in-transit', destination: '245 Market St, SF', eta: '7 min', cost: '$18.20' },
    { id: 'HX-4756', type: 'Healthcare Express', status: 'delivered', destination: 'UCSF Mission Bay', eta: 'Delivered', cost: '$0 (critical)' },
    { id: 'HX-4739', type: 'Enterprise Grid', status: 'scheduled', destination: 'Oakland Logistics Hub', eta: 'Launch 16:40', cost: '$112.00' }
  ],
  schedule: [
    { id: 'HX-4835', time: 'Today • 19:15', description: 'P2P Mesh — SoMa → Sunset', duration: '12 min' },
    { id: 'HX-4840', time: 'Tomorrow • 08:05', description: 'Retail Pulse — Financial District → Marina', duration: '9 min' },
    { id: 'HX-4848', time: 'Tomorrow • 10:30', description: 'Healthcare Express — Mission Bay → Stanford', duration: '21 min' }
  ]
};

const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
if (!session) {
  window.location.href = 'auth.html';
}

const userName = document.getElementById('user-name');
const userCompany = document.getElementById('user-company');
const dashboardContent = document.getElementById('dashboard-content');
const navButtons = document.querySelectorAll('.dashboard-nav button');
const logoutButton = document.getElementById('logout');

if (session) {
  userName.textContent = session.name || 'Operator';
  userCompany.textContent = session.company || session.email;
}

const templates = {
  overview: () => `
    <div class="card-grid">
      <div class="card">
        <span class="card-eyebrow">Flights today</span>
        <h3 class="card-title" style="font-size:2.4rem;">32</h3>
        <p class="card-copy">Active sorties underway across the Hovr mesh.</p>
      </div>
      <div class="card">
        <span class="card-eyebrow">On-time rate</span>
        <h3 class="card-title" style="font-size:2.4rem;">99.1%</h3>
        <p class="card-copy">Network latency running 0.9% faster than SLA.</p>
      </div>
      <div class="card">
        <span class="card-eyebrow">Energy reserve</span>
        <h3 class="card-title" style="font-size:2.4rem;">82%</h3>
        <p class="card-copy">Fleet batteries ready for the next wave of demand.</p>
      </div>
    </div>
    <div class="glass-panel">
      <div class="glass-panel-content">
        <span class="card-eyebrow">Live Missions</span>
        <h3 class="card-title">Monitor progress in real time</h3>
        <table class="table">
          <thead>
            <tr>
              <th>Flight</th>
              <th>Type</th>
              <th>Status</th>
              <th>Destination</th>
              <th>ETA</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            ${state.shipments.map((shipment) => `
              <tr>
                <td>${shipment.id}</td>
                <td>${shipment.type}</td>
                <td><span class="status ${shipment.status}">${formatStatus(shipment.status)}</span></td>
                <td>${shipment.destination}</td>
                <td>${shipment.eta}</td>
                <td>${shipment.cost}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `,
  missions: () => `
    <div class="glass-panel">
      <div class="glass-panel-content">
        <span class="card-eyebrow">Mission Log</span>
        <h3 class="card-title">Detailed flight history</h3>
        <p class="card-copy">Export this data for compliance or operations analysis. Mission data is stored for 18 months by default.</p>
        <table class="table">
          <thead>
            <tr>
              <th>Flight</th>
              <th>Type</th>
              <th>Status</th>
              <th>Destination</th>
              <th>ETA</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            ${state.shipments.concat([{
              id: 'HX-4701', type: 'Retail Pulse', status: 'delivered', destination: 'Union Square', eta: 'Delivered', cost: '$14.40'
            }]).map((shipment) => `
              <tr>
                <td>${shipment.id}</td>
                <td>${shipment.type}</td>
                <td><span class="status ${shipment.status}">${formatStatus(shipment.status)}</span></td>
                <td>${shipment.destination}</td>
                <td>${shipment.eta}</td>
                <td>${shipment.cost}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <button class="button button-primary" style="margin-top: 16px; align-self:flex-start;">Download CSV</button>
      </div>
    </div>
  `,
  schedule: () => `
    <div class="glass-panel">
      <div class="glass-panel-content">
        <span class="card-eyebrow">Launch plan</span>
        <h3 class="card-title">Upcoming sorties</h3>
        <div class="timeline">
          ${state.schedule.map((item) => `
            <div class="timeline-item">
              <span class="timeline-marker">${item.id.split('-')[1]}</span>
              <div>
                <h4 class="card-title">${item.description}</h4>
                <p class="card-copy">${item.time} • Duration ${item.duration}</p>
              </div>
            </div>
          `).join('')}
        </div>
        <form class="form-grid" style="margin-top:24px;">
          <div class="form-grid two">
            <div class="form-group">
              <label for="new-flight-id">Flight ID</label>
              <input id="new-flight-id" type="text" placeholder="HX-4850" required>
            </div>
            <div class="form-group">
              <label for="new-flight-time">Launch time</label>
              <input id="new-flight-time" type="datetime-local" required>
            </div>
          </div>
          <div class="form-group">
            <label for="new-flight-desc">Description</label>
            <input id="new-flight-desc" type="text" placeholder="Route description" required>
          </div>
          <button class="button button-primary" type="submit">Add to schedule</button>
        </form>
      </div>
    </div>
  `,
  settings: () => `
    <div class="glass-panel">
      <div class="glass-panel-content">
        <span class="card-eyebrow">Profile</span>
        <h3 class="card-title">Account preferences</h3>
        <form class="form-grid">
          <div class="form-grid two">
            <div class="form-group">
              <label for="settings-name">Operator name</label>
              <input id="settings-name" type="text" value="${session?.name || ''}" required>
            </div>
            <div class="form-group">
              <label for="settings-company">Organization</label>
              <input id="settings-company" type="text" value="${session?.company || ''}">
            </div>
          </div>
          <div class="form-group">
            <label for="settings-email">Email</label>
            <input id="settings-email" type="email" value="${session?.email || ''}" disabled>
          </div>
          <button class="button button-primary" type="submit">Save preferences</button>
        </form>
        <p class="notice">Need to upgrade to production? Contact your Hovr success manager for enterprise provisioning.</p>
      </div>
    </div>
  `
};

function formatStatus(status) {
  switch (status) {
    case 'in-transit':
      return 'In Transit';
    case 'delivered':
      return 'Delivered';
    case 'scheduled':
      return 'Scheduled';
    default:
      return status;
  }
}

function render() {
  dashboardContent.innerHTML = templates[state.activeTab]();

  if (state.activeTab === 'schedule') {
    const form = dashboardContent.querySelector('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const idInput = form.querySelector('#new-flight-id');
      const timeInput = form.querySelector('#new-flight-time');
      const descInput = form.querySelector('#new-flight-desc');

      state.schedule.unshift({
        id: idInput.value || `HX-${Math.floor(Math.random() * 5000) + 4000}`,
        time: new Date(timeInput.value).toLocaleString(),
        description: descInput.value,
        duration: 'Pending'
      });

      idInput.value = '';
      timeInput.value = '';
      descInput.value = '';
      render();
    });
  }

  if (state.activeTab === 'settings') {
    const form = dashboardContent.querySelector('form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const nameValue = form.querySelector('#settings-name').value.trim();
      const companyValue = form.querySelector('#settings-company').value.trim();
      const updatedSession = { ...session, name: nameValue, company: companyValue };
      localStorage.setItem(SESSION_KEY, JSON.stringify(updatedSession));
      userName.textContent = nameValue || 'Operator';
      userCompany.textContent = companyValue || session.email;

      const notice = document.createElement('p');
      notice.className = 'notice';
      notice.textContent = 'Preferences saved locally for this demo experience.';
      form.after(notice);
    });
  }
}

navButtons.forEach((button) => {
  button.addEventListener('click', () => {
    navButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    state.activeTab = button.dataset.tab;
    render();
  });
});

logoutButton.addEventListener('click', () => {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = 'auth.html';
});

render();
