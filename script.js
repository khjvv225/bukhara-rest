// VALYUTA KURSI
const USD_TO_UZS = 12500; // 1 USD = 12,500 UZS

// Default Menu Data with UZS prices
const defaultMenu = [
    {
        id: 1,
        name: "Manti",
        category: "main",
        priceUSD: 8.5,
        description: "O'zbek milliy taomi - go'sht bilan to'ldirilgan manti",
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        name: "Palov",
        category: "main",
        priceUSD: 7.5,
        description: "Aromatic go'sht va sholi bilan tayyorlangan taomidagi palov",
        image: "https://images.unsplash.com/photo-1585521537556-0dadc4c32df9?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        name: "Shurva",
        category: "main",
        priceUSD: 6.5,
        description: "Zamonaviy go'sht va sabzavotlar bilan pishirilgan shurva",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        name: "Somsa",
        category: "appetizer",
        priceUSD: 3.5,
        description: "Tuxum va go'sht bilan to'ldirilgan crispy somsa",
        image: "https://images.unsplash.com/photo-1629452333337-aef1b51e3eef?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        name: "Shami Kabob",
        category: "appetizer",
        priceUSD: 4.5,
        description: "Go'sht va sabzavotlar bilan tayyorlangan lazziz kabob",
        image: "https://images.unsplash.com/photo-1599599810694-b5ac4dd84e58?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        name: "Halva",
        category: "dessert",
        priceUSD: 3.0,
        description: "O'zbek traditional shirinlik - sun'iy qoymaning bilan halva",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop"
    },
    {
        id: 7,
        name: "Choy",
        category: "drink",
        priceUSD: 1.5,
        description: "Sof va aromatik choy",
        image: "https://images.unsplash.com/photo-1597318860023-ec41b0f98d5a?w=400&h=300&fit=crop"
    },
    {
        id: 8,
        name: "Ayran",
        category: "drink",
        priceUSD: 2.0,
        description: "Salqin va sog'ilgan ayran",
        image: "https://images.unsplash.com/photo-1553530666-ba2a8e36cd12?w=400&h=300&fit=crop"
    }
];

// Default Tables
const defaultTables = [
    { id: 1, number: "1", capacity: 2, location: "Oyna yonida", status: "available" },
    { id: 2, number: "2", capacity: 4, location: "Butkun", status: "available" },
    { id: 3, number: "3", capacity: 6, location: "Ichkariga", status: "available" },
    { id: 4, number: "4", capacity: 2, location: "Oyna yonida", status: "available" },
    { id: 5, number: "5", capacity: 4, location: "Butkun", status: "available" }
];

// Narxni USD dan UZS ga o'zgartirish
function formatPrice(priceUSD) {
    return (priceUSD * USD_TO_UZS).toLocaleString('uz-UZ');
}

// Initialize Data
function initializeData() {
    if (!localStorage.getItem('menu')) {
        localStorage.setItem('menu', JSON.stringify(defaultMenu));
    }
    if (!localStorage.getItem('tables')) {
        localStorage.setItem('tables', JSON.stringify(defaultTables));
    }
    if (!localStorage.getItem('bookings')) {
        localStorage.setItem('bookings', JSON.stringify([]));
    }
    if (!localStorage.getItem('orders')) {
        localStorage.setItem('orders', JSON.stringify([]));
    }
    if (!localStorage.getItem('customers')) {
        localStorage.setItem('customers', JSON.stringify([]));
    }
    if (!localStorage.getItem('deliveries')) {
        localStorage.setItem('deliveries', JSON.stringify([]));
    }
}

// Load Menu
function loadMenu(filter = 'all') {
    const menu = JSON.parse(localStorage.getItem('menu')) || [];
    const menuGrid = document.getElementById('menuGrid');
    
    if (!menuGrid) return;
    
    menuGrid.innerHTML = '';
    
    const filteredMenu = filter === 'all' ? menu : menu.filter(item => item.category === filter);
    
    filteredMenu.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        const priceUZS = formatPrice(item.priceUSD);
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="menu-card-image">
            <div class="menu-card-content">
                <span class="menu-card-category">${getCategoryName(item.category)}</span>
                <h3 class="menu-card-name">${item.name}</h3>
                <p class="menu-card-description">${item.description}</p>
                <div class="menu-card-footer">
                    <span class="menu-card-price">${priceUZS} UZS</span>
                    <button class="btn-add-to-cart" onclick="addToCart(${item.id})">+ Qo'shish</button>
                </div>
            </div>
        `;
        menuGrid.appendChild(card);
    });
}

function getCategoryName(category) {
    const names = {
        main: "Asosiy Taom",
        appetizer: "Ochildi Taom",
        dessert: "Shirinlik",
        drink: "Ichimlik"
    };
    return names[category] || category;
}

// Filter Menu
function filterMenu(category) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    loadMenu(category);
}

// Cart Management
let cart = [];

function addToCart(itemId) {
    const menu = JSON.parse(localStorage.getItem('menu')) || [];
    const item = menu.find(m => m.id === itemId);
    
    if (item) {
        const cartItem = cart.find(c => c.id === itemId);
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cart.push({ ...item, quantity: 1 });
        }
        updateCartDisplay();
        showAddedNotification(item.name);
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    
    if (!cartCount) return;
    
    cartCount.textContent = cart.length;
    
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Savat bo\'sh</p>';
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-quantity">Miqdor: ${item.quantity}</div>
                    </div>
                    <div class="cart-item-price">${formatPrice(item.priceUSD * item.quantity)} UZS</div>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">X</button>
                </div>
            `).join('');
        }
    }
    
    if (totalPrice) {
        const total = cart.reduce((sum, item) => sum + (item.priceUSD * item.quantity), 0);
        totalPrice.textContent = formatPrice(total) + ' UZS';
    }
}

// Booking Form Handler
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    loadMenu();
    
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBooking);
    }
    
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrder);
    }
    
    const menuForm = document.getElementById('menuForm');
    if (menuForm) {
        menuForm.addEventListener('submit', handleAddMenu);
    }
    
    const tableForm = document.getElementById('tableForm');
    if (tableForm) {
        tableForm.addEventListener('submit', handleAddTable);
    }
    
    // Set minimum date
    const bookingDate = document.getElementById('bookingDate');
    if (bookingDate) {
        const today = new Date().toISOString().split('T')[0];
        bookingDate.setAttribute('min', today);
    }
    
    // Delivery type change handler
    const deliveryType = document.getElementById('deliveryType');
    const addressGroup = document.getElementById('addressGroup');
    if (deliveryType && addressGroup) {
        deliveryType.addEventListener('change', function() {
            addressGroup.style.display = this.value === 'delivery' ? 'block' : 'none';
        });
    }
});

function handleBooking(e) {
    e.preventDefault();
    
    const booking = {
        id: Date.now(),
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        date: document.getElementById('bookingDate').value,
        time: document.getElementById('bookingTime').value,
        guests: document.getElementById('guests').value,
        occasion: document.getElementById('occasion').value,
        notes: document.getElementById('notes').value,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    // Show success message
    document.getElementById('bookingForm').style.display = 'none';
    const successDiv = document.getElementById('bookingSuccess');
    successDiv.style.display = 'block';
    document.getElementById('successMessage').textContent = 
        `Rahmat ${booking.name}! Stolingiz ${booking.date} soat ${booking.time}da band qilindi.`;
    
    setTimeout(() => {
        location.reload();
    }, 3000);
}

function handleOrder(e) {
    e.preventDefault();
    
    if (cart.length === 0) {
        alert('Iltimos, savatga taomlarni qo\'shing!');
        return;
    }
    
    const order = {
        id: Date.now(),
        name: document.getElementById('orderName').value,
        phone: document.getElementById('orderPhone').value,
        items: cart,
        total: cart.reduce((sum, item) => sum + (item.priceUSD * item.quantity), 0),
        deliveryType: document.getElementById('deliveryType').value,
        address: document.getElementById('address').value,
        notes: document.getElementById('orderNotes').value,
        status: 'pending',
        createdAt: new Date().toISOString()
    };
    
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    // Create delivery record if not dine-in
    if (order.deliveryType !== 'dine-in') {
        let deliveries = JSON.parse(localStorage.getItem('deliveries')) || [];
        deliveries.push({
            id: order.id,
            orderId: order.id,
            customerName: order.name,
            customerPhone: order.phone,
            address: order.address,
            status: 'preparing',
            createdAt: new Date().toISOString(),
            estimatedTime: new Date(Date.now() + 30 * 60000).toLocaleString('uz-UZ')
        });
        localStorage.setItem('deliveries', JSON.stringify(deliveries));
    }
    
    // Show success
    document.getElementById('orderForm').style.display = 'none';
    const successDiv = document.getElementById('orderSuccess');
    successDiv.style.display = 'block';
    document.getElementById('orderSuccessMessage').textContent = 
        `Buyurtmangiz qabul qilindi! Raqami: #${order.id}. Jami: ${formatPrice(order.total)} UZS`;
    
    cart = [];
    updateCartDisplay();
    
    setTimeout(() => {
        location.reload();
    }, 3000);
}

function handleAddMenu(e) {
    e.preventDefault();
    
    const newMeal = {
        id: Date.now(),
        name: document.getElementById('mealName').value,
        category: document.getElementById('mealCategory').value,
        priceUSD: parseFloat(document.getElementById('mealPrice').value),
        description: document.getElementById('mealDescription').value,
        image: document.getElementById('mealImage').value || 'https://via.placeholder.com/400x300?text=Taom'
    };
    
    let menu = JSON.parse(localStorage.getItem('menu')) || [];
    menu.push(newMeal);
    localStorage.setItem('menu', JSON.stringify(menu));
    
    alert('Taom muvaffaqiyatli qo\'shildi!');
    document.getElementById('menuForm').reset();
    closeAddMenuForm();
    loadMenu();
}

function handleAddTable(e) {
    e.preventDefault();
    
    const newTable = {
        id: Date.now(),
        number: document.getElementById('tableNumber').value,
        capacity: parseInt(document.getElementById('tableCapacity').value),
        location: document.getElementById('tableLocation').value,
        status: 'available'
    };
    
    let tables = JSON.parse(localStorage.getItem('tables')) || [];
    tables.push(newTable);
    localStorage.setItem('tables', JSON.stringify(tables));
    
    alert('Stol muvaffaqiyatli qo\'shildi!');
    document.getElementById('tableForm').reset();
    closeAddTableForm();
}

// Smooth Scroll
function scrollToMenu() {
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
}

function scrollToBooking() {
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

// UI Helpers
function showAddedNotification(itemName) {
    console.log(`${itemName} savatga qo'shildi!`);
}

function showAddMenuForm() {
    document.getElementById('addMenuForm').style.display = 'block';
}

function closeAddMenuForm() {
    document.getElementById('addMenuForm').style.display = 'none';
}

function showAddTableForm() {
    document.getElementById('addTableForm').style.display = 'block';
}

function closeAddTableForm() {
    document.getElementById('addTableForm').style.display = 'none';
}

function closeModal() {
    document.getElementById('menuModal').style.display = 'none';
}

// Delete Menu Item
function deleteMenuItem(itemId) {
    if (confirm('Bu taomni o\'chirishga rozisizmi?')) {
        let menu = JSON.parse(localStorage.getItem('menu')) || [];
        menu = menu.filter(m => m.id !== itemId);
        localStorage.setItem('menu', JSON.stringify(menu));
        loadMenu();
    }
}

// Edit Menu Item
function editMenuItem(itemId) {
    const menu = JSON.parse(localStorage.getItem('menu')) || [];
    const item = menu.find(m => m.id === itemId);
    
    if (item) {
        // Store item ID for update
        window.editingMenuId = itemId;
        document.getElementById('mealName').value = item.name;
        document.getElementById('mealCategory').value = item.category;
        document.getElementById('mealPrice').value = item.priceUSD;
        document.getElementById('mealDescription').value = item.description;
        document.getElementById('mealImage').value = item.image;
        
        // Change form title
        document.querySelector('#addMenuForm h3').textContent = 'Taomni O\'zgartirish';
        
        showAddMenuForm();
    }
}

// Update Menu Item
function updateMenuItemFromForm(e) {
    if (window.editingMenuId) {
        e.preventDefault();
        
        let menu = JSON.parse(localStorage.getItem('menu')) || [];
        const itemIndex = menu.findIndex(m => m.id === window.editingMenuId);
        
        if (itemIndex !== -1) {
            menu[itemIndex] = {
                id: window.editingMenuId,
                name: document.getElementById('mealName').value,
                category: document.getElementById('mealCategory').value,
                priceUSD: parseFloat(document.getElementById('mealPrice').value),
                description: document.getElementById('mealDescription').value,
                image: document.getElementById('mealImage').value
            };
            
            localStorage.setItem('menu', JSON.stringify(menu));
            alert('Taom muvaffaqiyatli o\'zgartirildi!');
            window.editingMenuId = null;
            document.getElementById('menuForm').reset();
            closeAddMenuForm();
            
            if (document.querySelector('.admin-page')) {
                loadMenuAdmin();
            } else {
                loadMenu();
            }
        }
    }
}
