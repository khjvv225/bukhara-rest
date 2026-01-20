// VALYUTA KURSI
const USD_TO_UZS = 12500;

function formatPrice(priceUSD) {
    return (priceUSD * USD_TO_UZS).toLocaleString('uz-UZ');
}

// Show Section
function showSection(sectionId, event) {
    if (event) {
        event.preventDefault();
    }
    
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    event.target.closest('a').classList.add('active');
    
    if (sectionId === 'dashboard') {
        loadDashboard();
    } else if (sectionId === 'orders') {
        loadOrders();
    } else if (sectionId === 'deliveries') {
        loadDeliveries();
    } else if (sectionId === 'bookings') {
        loadBookings();
    } else if (sectionId === 'menu') {
        loadMenuAdmin();
    } else if (sectionId === 'tables') {
        loadTablesAdmin();
    } else if (sectionId === 'customers') {
        loadCustomers();
    } else if (sectionId === 'statistics') {
        loadStatistics();
    }
}

// Dashboard
function loadDashboard() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    
    const today = new Date().toISOString().split('T')[0];
    const todayOrders = orders.filter(o => o.createdAt.split('T')[0] === today);
    const todayBookings = bookings.filter(b => b.createdAt.split('T')[0] === today);
    
    const todayRevenue = todayOrders.reduce((sum, order) => sum + order.total, 0);
    const totalGuests = bookings.reduce((sum, booking) => sum + parseInt(booking.guests), 0);
    
    document.getElementById('todayOrders').textContent = todayOrders.length;
    document.getElementById('todayBookings').textContent = todayBookings.length;
    document.getElementById('todayRevenue').textContent = formatPrice(todayRevenue) + ' UZS';
    document.getElementById('totalGuests').textContent = totalGuests;
}

// Orders Management
function loadOrders(filter = 'all') {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersBody = document.getElementById('ordersBody');
    
    let filteredOrders = orders;
    if (filter !== 'all') {
        filteredOrders = orders.filter(order => order.status === filter);
    }
    
    ordersBody.innerHTML = '';
    
    filteredOrders.forEach((order) => {
        const itemsList = order.items.map(item => `${item.name} (x${item.quantity})`).join(', ');
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${order.id}</td>
            <td>${order.name}</td>
            <td>${order.phone}</td>
            <td>${itemsList}</td>
            <td>${formatPrice(order.total)} UZS</td>
            <td><span class="status-badge status-${order.status}">${getStatusName(order.status)}</span></td>
            <td>${new Date(order.createdAt).toLocaleString('uz-UZ')}</td>
            <td>
                <div class="action-buttons">
                    ${order.status === 'pending' ? `<button class="btn-small btn-confirm" onclick="updateOrderStatus(${order.id}, 'confirmed')">Tasdiqlash</button>` : ''}
                    ${order.status !== 'completed' ? `<button class="btn-small btn-edit" onclick="updateOrderStatus(${order.id}, 'completed')">Tugatish</button>` : ''}
                    <button class="btn-small btn-delete" onclick="deleteOrder(${order.id})">O'chirish</button>
                </div>
            </td>
        `;
        ordersBody.appendChild(row);
    });
}

function filterOrders() {
    const filter = document.getElementById('orderFilter').value;
    loadOrders(filter);
}

function updateOrderStatus(orderId, newStatus) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id === orderId);
    
    if (order) {
        order.status = newStatus;
        localStorage.setItem('orders', JSON.stringify(orders));
        loadOrders();
    }
}

function deleteOrder(orderId) {
    if (confirm('Bu buyurtmani o\'chirishga rozisizmi?')) {
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders = orders.filter(o => o.id !== orderId);
        localStorage.setItem('orders', JSON.stringify(orders));
        loadOrders();
    }
}

// Deliveries Management
function loadDeliveries(filter = 'all') {
    const deliveries = JSON.parse(localStorage.getItem('deliveries')) || [];
    const deliveriesBody = document.getElementById('deliveriesBody');
    
    let filteredDeliveries = deliveries;
    if (filter !== 'all') {
        filteredDeliveries = deliveries.filter(d => d.status === filter);
    }
    
    deliveriesBody.innerHTML = '';
    
    filteredDeliveries.forEach((delivery) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${delivery.id}</td>
            <td>${delivery.customerName}</td>
            <td>${delivery.customerPhone}</td>
            <td>${delivery.address}</td>
            <td><span class="status-badge status-${delivery.status}">${getDeliveryStatusName(delivery.status)}</span></td>
            <td>${delivery.estimatedTime}</td>
            <td>
                <div class="action-buttons">
                    ${delivery.status === 'preparing' ? `<button class="btn-small btn-confirm" onclick="updateDeliveryStatus(${delivery.id}, 'on-way')">Yo'lga Chiqarish</button>` : ''}
                    ${delivery.status === 'on-way' ? `<button class="btn-small btn-confirm" onclick="updateDeliveryStatus(${delivery.id}, 'delivered')">Yetkazildi</button>` : ''}
                    <button class="btn-small btn-delete" onclick="deleteDelivery(${delivery.id})">O'chirish</button>
                </div>
            </td>
        `;
        deliveriesBody.appendChild(row);
    });
}

function filterDeliveries() {
    const filter = document.getElementById('deliveryFilter').value;
    loadDeliveries(filter);
}

function updateDeliveryStatus(deliveryId, newStatus) {
    const deliveries = JSON.parse(localStorage.getItem('deliveries')) || [];
    const delivery = deliveries.find(d => d.id === deliveryId);
    
    if (delivery) {
        delivery.status = newStatus;
        localStorage.setItem('deliveries', JSON.stringify(deliveries));
        loadDeliveries();
    }
}

function deleteDelivery(deliveryId) {
    if (confirm('Bu yetkazib berilishni o\'chirishga rozisizmi?')) {
        let deliveries = JSON.parse(localStorage.getItem('deliveries')) || [];
        deliveries = deliveries.filter(d => d.id !== deliveryId);
        localStorage.setItem('deliveries', JSON.stringify(deliveries));
        loadDeliveries();
    }
}

// Bookings Management
function loadBookings(filter = 'all') {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const bookingsBody = document.getElementById('bookingsBody');
    
    let filteredBookings = bookings;
    if (filter !== 'all') {
        filteredBookings = bookings.filter(booking => booking.status === filter);
    }
    
    bookingsBody.innerHTML = '';
    
    filteredBookings.forEach((booking) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${booking.id}</td>
            <td>${booking.name}</td>
            <td>${booking.phone}</td>
            <td>${booking.date} ${booking.time}</td>
            <td>${booking.guests} kishi</td>
            <td>${getOccasionName(booking.occasion)}</td>
            <td><span class="status-badge status-${booking.status}">${getStatusName(booking.status)}</span></td>
            <td>
                <div class="action-buttons">
                    ${booking.status === 'pending' ? `<button class="btn-small btn-confirm" onclick="updateBookingStatus(${booking.id}, 'confirmed')">Tasdiqlash</button>` : ''}
                    ${booking.status !== 'completed' ? `<button class="btn-small btn-edit" onclick="updateBookingStatus(${booking.id}, 'completed')">Tugatish</button>` : ''}
                    <button class="btn-small btn-delete" onclick="deleteBooking(${booking.id})">O'chirish</button>
                </div>
            </td>
        `;
        bookingsBody.appendChild(row);
    });
}

function filterBookings() {
    const filter = document.getElementById('bookingFilter').value;
    loadBookings(filter);
}

function updateBookingStatus(bookingId, newStatus) {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const booking = bookings.find(b => b.id === bookingId);
    
    if (booking) {
        booking.status = newStatus;
        localStorage.setItem('bookings', JSON.stringify(bookings));
        loadBookings();
    }
}

function deleteBooking(bookingId) {
    if (confirm('Bu bronni o\'chirishga rozisizmi?')) {
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings = bookings.filter(b => b.id !== bookingId);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        loadBookings();
    }
}

// Menu Management
function loadMenuAdmin() {
    const menu = JSON.parse(localStorage.getItem('menu')) || [];
    const menuBody = document.getElementById('menuBody');
    
    menuBody.innerHTML = '';
    
    menu.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${getCategoryName(item.category)}</td>
            <td>${formatPrice(item.priceUSD)} UZS</td>
            <td>${item.description}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-small btn-edit" onclick="editMenuItem(${item.id})">O'zgartirish</button>
                    <button class="btn-small btn-delete" onclick="deleteMenuItem(${item.id})">O'chirish</button>
                </div>
            </td>
        `;
        menuBody.appendChild(row);
    });
}

function deleteMenuItem(itemId) {
    if (confirm('Bu taomni o\'chirishga rozisizmi?')) {
        let menu = JSON.parse(localStorage.getItem('menu')) || [];
        menu = menu.filter(m => m.id !== itemId);
        localStorage.setItem('menu', JSON.stringify(menu));
        loadMenuAdmin();
    }
}

function editMenuItem(itemId) {
    const menu = JSON.parse(localStorage.getItem('menu')) || [];
    const item = menu.find(m => m.id === itemId);
    
    if (item) {
        window.editingMenuId = itemId;
        document.getElementById('mealName').value = item.name;
        document.getElementById('mealCategory').value = item.category;
        document.getElementById('mealPrice').value = item.priceUSD;
        document.getElementById('mealDescription').value = item.description;
        document.getElementById('mealImage').value = item.image;
        
        document.querySelector('#addMenuForm h3').textContent = 'Taomni O\'zgartirish';
        showAddMenuForm();
    }
}

// Tables Management
function loadTablesAdmin() {
    const tables = JSON.parse(localStorage.getItem('tables')) || [];
    const tablesGrid = document.getElementById('tablesGrid');
    
    tablesGrid.innerHTML = '';
    
    tables.forEach((table) => {
        const card = document.createElement('div');
        card.className = 'table-card';
        card.innerHTML = `
            <div class="table-number">Stol #${table.number}</div>
            <div class="table-info">
                <p><strong>${table.capacity}</strong> o'rindiq</p>
                <p>${table.location}</p>
            </div>
            <div class="table-status ${table.status === 'available' ? 'table-available' : 'table-occupied'}">
                ${table.status === 'available' ? 'Mavjud' : 'Band Qilindi'}
            </div>
            <div class="action-buttons" style="margin-top: 1rem;">
                <button class="btn-small btn-delete" onclick="deleteTable(${table.id})" style="width: 100%;">O'chirish</button>
            </div>
        `;
        tablesGrid.appendChild(card);
    });
}

function deleteTable(tableId) {
    if (confirm('Bu stolni o\'chirishga rozisizmi?')) {
        let tables = JSON.parse(localStorage.getItem('tables')) || [];
        tables = tables.filter(t => t.id !== tableId);
        localStorage.setItem('tables', JSON.stringify(tables));
        loadTablesAdmin();
    }
}

// Customers Management
function loadCustomers() {
    const customers = JSON.parse(localStorage.getItem('customers')) || [];
    const customersBody = document.getElementById('customersBody');
    
    customersBody.innerHTML = '';
    
    customers.forEach((customer) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.phone}</td>
            <td>${customer.email || '-'}</td>
            <td>${customer.address || '-'}</td>
            <td>${customer.totalOrders}</td>
            <td>${formatPrice(customer.totalSpent)} UZS</td>
            <td>${'⭐'.repeat(customer.rating || 0)}</td>
        `;
        customersBody.appendChild(row);
    });
}

// Statistics
function loadStatistics() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const categoryStats = document.getElementById('categoryStats');
    
    const stats = {};
    orders.forEach(order => {
        order.items.forEach(item => {
            if (!stats[item.category]) {
                stats[item.category] = 0;
            }
            stats[item.category] += item.quantity;
        });
    });
    
    let statsHTML = '';
    const totalItems = Object.values(stats).reduce((a, b) => a + b, 1);
    for (const [category, count] of Object.entries(stats)) {
        const percentage = (count / totalItems * 100).toFixed(1);
        statsHTML += `
            <div class="stat-item" style="margin-bottom: 1rem;">
                <p><strong>${getCategoryName(category)}</strong>: ${count} dona (${percentage}%)</p>
                <div style="background: #e0e0e0; height: 10px; border-radius: 5px; overflow: hidden;">
                    <div style="background: #8b4513; width: ${percentage}%; height: 100%;"></div>
                </div>
            </div>
        `;
    }
    categoryStats.innerHTML = statsHTML || '<p>Statistika mavjud emas</p>';
    
    const today = new Date();
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthOrders = orders.filter(o => new Date(o.createdAt) >= monthStart);
    const monthlyRevenue = monthOrders.reduce((sum, order) => sum + order.total, 0);
    document.getElementById('monthlyRevenue').textContent = formatPrice(monthlyRevenue) + ' UZS';
}

// Helper Functions
function getCategoryName(category) {
    const names = {
        main: "Asosiy Taom",
        appetizer: "Ochildi Taom",
        dessert: "Shirinlik",
        drink: "Ichimlik"
    };
    return names[category] || category;
}

function getOccasionName(occasion) {
    const names = {
        normal: "Odiy Bron",
        birthday: "Tug'ilgan Kun",
        wedding: "Nikoh",
        corporate: "Korxona Tadbiri",
        anniversary: "Yildonasi"
    };
    return names[occasion] || occasion;
}

function getStatusName(status) {
    const names = {
        pending: "Kutmoqda",
        confirmed: "Tasdiqlandi",
        completed: "Tugallandi",
        cancelled: "Bekor Qilindi"
    };
    return names[status] || status;
}

function getDeliveryStatusName(status) {
    const names = {
        preparing: "Tayyorlash Jarayonida",
        "on-way": "Yo'lda",
        delivered: "Yetkazildi"
    };
    return names[status] || status;
}

// Menu Form Functions
function showAddMenuForm() {
    document.getElementById('addMenuForm').style.display = 'block';
    document.getElementById('mealName').value = '';
    document.getElementById('mealCategory').value = '';
    document.getElementById('mealPrice').value = '';
    document.getElementById('mealDescription').value = '';
    document.getElementById('mealImage').value = '';
    window.editingMenuId = null;
    document.querySelector('#addMenuForm h3').textContent = 'Taom Qo\'shish';
}

function closeAddMenuForm() {
    document.getElementById('addMenuForm').style.display = 'none';
}

function handleAddMenu(event) {
    event.preventDefault();
    
    const menu = JSON.parse(localStorage.getItem('menu')) || [];
    
    const newItem = {
        id: window.editingMenuId || Date.now(),
        name: document.getElementById('mealName').value,
        category: document.getElementById('mealCategory').value,
        priceUSD: parseFloat(document.getElementById('mealPrice').value),
        description: document.getElementById('mealDescription').value,
        image: document.getElementById('mealImage').value || 'https://via.placeholder.com/300'
    };
    
    if (window.editingMenuId) {
        const index = menu.findIndex(m => m.id === window.editingMenuId);
        menu[index] = newItem;
    } else {
        menu.push(newItem);
    }
    
    localStorage.setItem('menu', JSON.stringify(menu));
    closeAddMenuForm();
    loadMenuAdmin();
    alert('Taom muvaffaqiyatli saqlandi!');
}

// Table Form Functions
function showAddTableForm() {
    document.getElementById('addTableForm').style.display = 'block';
}

function closeAddTableForm() {
    document.getElementById('addTableForm').style.display = 'none';
}

function handleAddTable(event) {
    event.preventDefault();
    
    const tables = JSON.parse(localStorage.getItem('tables')) || [];
    
    const newTable = {
        id: Date.now(),
        number: document.getElementById('tableNumber').value,
        capacity: parseInt(document.getElementById('tableCapacity').value),
        location: document.getElementById('tableLocation').value,
        status: 'available'
    };
    
    tables.push(newTable);
    localStorage.setItem('tables', JSON.stringify(tables));
    
    document.getElementById('tableForm').reset();
    closeAddTableForm();
    loadTablesAdmin();
    alert('Stol muvaffaqiyatli qo\'shildi!');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    const firstSection = document.querySelector('.sidebar-menu a');
    if (firstSection) {
        firstSection.classList.add('active');
    }
    loadDashboard();
    
    // Hook up form submissions
    const menuForm = document.getElementById('menuForm');
    if (menuForm) {
        menuForm.addEventListener('submit', handleAddMenu);
    }
    
    const tableForm = document.getElementById('tableForm');
    if (tableForm) {
        tableForm.addEventListener('submit', handleAddTable);
    }
});
