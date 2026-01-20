// VALYUTA KURSI
const USD_TO_UZS = 12500;

function formatPrice(priceUSD) {
    return (priceUSD * USD_TO_UZS).toLocaleString('uz-UZ');
}

// Login Handler
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // If on dashboard page, load customer data
    if (document.querySelector('.customer-page')) {
        loadCustomerDashboard();
    }
    
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
        loadProfileForm();
    }
});

function handleLogin(e) {
    e.preventDefault();
    
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    
    // Simple validation (in production, use backend)
    if (phone && password.length === 6) {
        // Store customer session
        const customer = {
            phone: phone,
            name: "Mehmon",
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('currentCustomer', JSON.stringify(customer));
        localStorage.setItem('customerPassword', password); // In production, use secure method
        
        // Get or create customer record
        let customers = JSON.parse(localStorage.getItem('customers')) || [];
        let customerExists = customers.find(c => c.phone === phone);
        
        if (!customerExists) {
            customerExists = {
                id: Date.now(),
                phone: phone,
                name: "Mehmon",
                email: "",
                address: "",
                registeredAt: new Date().toISOString(),
                totalOrders: 0,
                totalSpent: 0,
                rating: 5
            };
            customers.push(customerExists);
            localStorage.setItem('customers', JSON.stringify(customers));
        }
        
        // Redirect to dashboard
        window.location.href = 'customer-dashboard.html';
    } else {
        alert('Telefon raqami yoki parol noto\'g\'ri!');
    }
}

function logout(e) {
    if (e) {
        e.preventDefault();
    }
    localStorage.removeItem('currentCustomer');
    localStorage.removeItem('customerPassword');
    window.location.href = 'customer-login.html';
}

function loadCustomerDashboard() {
    const currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    
    if (!currentCustomer) {
        window.location.href = 'customer-login.html';
        return;
    }
    
    // Get customer data
    let customers = JSON.parse(localStorage.getItem('customers')) || [];
    const customer = customers.find(c => c.phone === currentCustomer.phone);
    
    if (customer) {
        document.getElementById('customerName').textContent = customer.name || 'Mehmon';
        document.getElementById('customerPhone').textContent = customer.phone;
        document.getElementById('totalOrders').textContent = customer.totalOrders || 0;
        document.getElementById('totalSpent').textContent = formatPrice(customer.totalSpent || 0);
        document.getElementById('customerRating').textContent = '⭐'.repeat(customer.rating || 5);
    }
    
    // Load orders
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const customerOrders = orders.filter(o => o.phone === currentCustomer.phone);
    
    if (customerOrders.length > 0) {
        const lastOrder = customerOrders[customerOrders.length - 1];
        document.getElementById('lastOrderPrice').textContent = formatPrice(lastOrder.total) + ' UZS';
    }
    
    // Load deliveries
    const deliveries = JSON.parse(localStorage.getItem('deliveries')) || [];
    const activeDeliveries = deliveries.filter(d => d.customerPhone === currentCustomer.phone && 
        (d.status === 'preparing' || d.status === 'on-way'));
    document.getElementById('activeDeliveries').textContent = activeDeliveries.length;
    
    // Load bookings
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const customerBookings = bookings.filter(b => b.phone === currentCustomer.phone);
    
    if (customerBookings.length > 0) {
        const nextBooking = customerBookings.find(b => new Date(b.date) > new Date());
        if (nextBooking) {
            document.getElementById('nextBooking').textContent = nextBooking.date;
        }
    }
    
    loadOrders();
    loadDeliveries();
    loadBookings();
}

function loadOrders() {
    const currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const customerOrders = orders.filter(o => o.phone === currentCustomer.phone);
    
    const container = document.getElementById('ordersContainer');
    
    if (customerOrders.length === 0) {
        container.innerHTML = '<p class="empty-message">Buyurtmalari mavjud emas</p>';
        return;
    }
    
    container.innerHTML = customerOrders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <span class="order-id">Buyurtma #${order.id}</span>
                <span class="status-badge status-${order.status}">${getStatusName(order.status)}</span>
            </div>
            <div class="order-items">
                <strong>Taomlar:</strong>
                <ul>
                    ${order.items.map(item => `<li>${item.name} x${item.quantity}</li>`).join('')}
                </ul>
            </div>
            <div class="order-footer">
                <strong class="order-total">${formatPrice(order.total)} UZS</strong>
                <small>${new Date(order.createdAt).toLocaleString('uz-UZ')}</small>
            </div>
        </div>
    `).join('');
}

function loadDeliveries() {
    const currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    const deliveries = JSON.parse(localStorage.getItem('deliveries')) || [];
    const customerDeliveries = deliveries.filter(d => d.customerPhone === currentCustomer.phone);
    
    const container = document.getElementById('deliveriesContainer');
    
    if (customerDeliveries.length === 0) {
        container.innerHTML = '<p class="empty-message">Yetkazilar mavjud emas</p>';
        return;
    }
    
    container.innerHTML = customerDeliveries.map(delivery => `
        <div class="delivery-card">
            <div class="delivery-header">
                <span class="delivery-id">Yetkazib Berish #${delivery.id}</span>
                <span class="status-badge status-${delivery.status}">${getDeliveryStatusName(delivery.status)}</span>
            </div>
            <div class="delivery-info">
                <p><strong>Manzil:</strong> ${delivery.address}</p>
                <p><strong>Tahmini vaqt:</strong> ${delivery.estimatedTime}</p>
                <div class="delivery-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${getDeliveryProgress(delivery.status)}%"></div>
                    </div>
                    <div class="progress-steps">
                        <span class="${delivery.status === 'preparing' || delivery.status === 'on-way' || delivery.status === 'delivered' ? 'active' : ''}">
                            <i class="fas fa-box"></i> Tayyorlash
                        </span>
                        <span class="${delivery.status === 'on-way' || delivery.status === 'delivered' ? 'active' : ''}">
                            <i class="fas fa-truck"></i> Yo'lda
                        </span>
                        <span class="${delivery.status === 'delivered' ? 'active' : ''}">
                            <i class="fas fa-check"></i> Yetkazildi
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

function loadBookings() {
    const currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const customerBookings = bookings.filter(b => b.phone === currentCustomer.phone);
    
    const container = document.getElementById('bookingsContainer');
    
    if (customerBookings.length === 0) {
        container.innerHTML = '<p class="empty-message">Bronlar mavjud emas</p>';
        return;
    }
    
    container.innerHTML = customerBookings.map(booking => `
        <div class="booking-card">
            <div class="booking-header">
                <span class="booking-id">Bron #${booking.id}</span>
                <span class="status-badge status-${booking.status}">${getStatusName(booking.status)}</span>
            </div>
            <div class="booking-details">
                <p><strong>Sana:</strong> ${booking.date}</p>
                <p><strong>Vaqt:</strong> ${booking.time}</p>
                <p><strong>Mehmonlar:</strong> ${booking.guests} kishi</p>
                <p><strong>Tadbir:</strong> ${getOccasionName(booking.occasion)}</p>
                ${booking.notes ? `<p><strong>Izohlar:</strong> ${booking.notes}</p>` : ''}
            </div>
        </div>
    `).join('');
}

function loadProfileForm() {
    const currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    let customers = JSON.parse(localStorage.getItem('customers')) || [];
    const customer = customers.find(c => c.phone === currentCustomer.phone);
    
    if (customer) {
        document.getElementById('customerNameInput').value = customer.name || '';
        document.getElementById('customerPhoneInput').value = customer.phone || '';
        document.getElementById('customerEmailInput').value = customer.email || '';
        document.getElementById('customerAddressInput').value = customer.address || '';
    }
}

function handleProfileUpdate(e) {
    e.preventDefault();
    
    const currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
    let customers = JSON.parse(localStorage.getItem('customers')) || [];
    const customerIndex = customers.findIndex(c => c.phone === currentCustomer.phone);
    
    if (customerIndex !== -1) {
        customers[customerIndex].name = document.getElementById('customerNameInput').value;
        customers[customerIndex].email = document.getElementById('customerEmailInput').value;
        customers[customerIndex].address = document.getElementById('customerAddressInput').value;
        
        localStorage.setItem('customers', JSON.stringify(customers));
        alert('Profil muvaffaqiyatli yangilandi!');
        loadCustomerDashboard();
    }
}

function showSection(sectionId, event) {
    if (event) {
        event.preventDefault();
    }
    
    document.querySelectorAll('.customer-section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelectorAll('.sidebar-menu a').forEach(link => {
        link.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    event.target.closest('a').classList.add('active');
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
        on-way: "Yo'lda",
        delivered: "Yetkazildi",
        cancelled: "Bekor Qilindi"
    };
    return names[status] || status;
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

function getDeliveryProgress(status) {
    const progress = {
        preparing: 33,
        "on-way": 66,
        delivered: 100
    };
    return progress[status] || 0;
}
