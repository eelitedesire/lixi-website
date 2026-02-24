# Admin Panel Managers - Quick Reference

## 📊 Shopping Manager (`/admin/shopping`)
**Purpose:** Overview dashboard for e-commerce statistics

**Shows:**
- Total number of orders
- Total quote requests  
- Total revenue from orders
- Explanation of different managers

**Use Case:** Quick glance at business metrics

---

## 📦 Orders Manager (`/admin/orders`)
**Purpose:** Manage completed customer purchases

**Features:**
- View all orders with items and quantities
- See complete shipping addresses
- View customer contact info (name, email, phone)
- Calculate order totals
- Delete orders

**Data Source:** When customers:
1. Add products/services to cart
2. Fill out shipping address form
3. Click "Place Order" on checkout page
4. Data saved to `backend/data/orders.json`

**Use Case:** Process and fulfill customer orders

---

## 💬 Quotes Manager (`/admin/quotes`)
**Purpose:** Manage quote requests from potential customers

**Features:**
- View customer information (name, email, phone, company)
- See system requirements (voltage, capacity, monthly bill)
- Check if they have existing solar
- View interest in CARBONOZ trading
- Read custom messages
- Delete quote requests

**Data Source:** When customers:
1. Visit `/quote` page
2. Fill out multi-step quote wizard
3. Submit requirements and contact info
4. Data saved to `backend/data/quotes.json`

**Use Case:** Follow up with potential customers, prepare custom quotes

---

## 🔑 Key Differences

| Feature | Orders Manager | Quotes Manager |
|---------|---------------|----------------|
| **Type** | Completed purchases | Inquiries/Requests |
| **Payment** | Yes (prices shown) | No (just requirements) |
| **Address** | Full shipping address | Contact info only |
| **Purpose** | Fulfill orders | Follow up & quote |
| **Data** | Cart items + quantities | System requirements |

---

## 🐛 Troubleshooting

### "I don't see my quote in admin panel"

**Check:**
1. Backend server is running: `cd backend && node server.js`
2. Quote was submitted successfully (check browser console)
3. Refresh admin panel page
4. Check `backend/data/quotes.json` file exists and has data

**Test Quote Submission:**
```bash
# Check if quotes.json has data
cat backend/data/quotes.json

# Should show array with quote objects, not empty []
```

### "Orders not showing"

**Check:**
1. Customer completed checkout with shipping address
2. Backend server running
3. Check `backend/data/orders.json`

---

## 📝 Data Files Location

All data stored in: `backend/data/`

- `orders.json` - Customer orders
- `quotes.json` - Quote requests
- `products.json` - Product catalog
- `services.json` - Service packages
- `comparison.json` - Product comparison specs

---

## ✅ Current Status

- ✅ Quote submission saves to database
- ✅ Orders save to database  
- ✅ Admin can view both quotes and orders
- ✅ Full customer information captured
- ✅ Delete functionality works
