# 🌾 Farmhouse Income & Expense Management System

A web-based financial management dashboard built using **Angular** and **JSON Server** to track, manage, and analyze **income and expense transactions** for multiple farmhouse properties.

The application provides **separate dashboards** for income and expenses with **property-wise, category-wise, and visual analysis**.

---

## 📌 Project Overview

XYZ Company manages two farmhouse properties:

- **Earthy Escape**
- **Millennium Farm House**

This system centralizes financial data to:
- Track income and expenses efficiently
- Compare financial performance across properties
- Provide visual insights using charts
- Improve transparency and decision-making

---

## ✨ Key Features

### 🔹 Separate Dashboards
- **Income Dashboard**
- **Expense Dashboard**

Each dashboard operates independently with its own analytics.

### 🔹 Multi-Property Support
- Property-wise filtering:
  - Earthy Escape
  - Millennium Farm House
  - All Properties

### 🔹 Transaction Management
- Add income and expense transactions
- Toggle-based Add Transaction form
- Fields include:
  - Property
  - Description
  - Category
  - Amount
  - Date
  - Payment Mode (Expenses)
  - Status (Paid / Pending)

### 🔹 Financial Analysis
- Total income and expenses
- Number of transactions
- Category-wise breakdown
- Visual charts (Pie charts)

### 🔹 User-Friendly Interface
- Clean dashboard layout
- Responsive design
- Easy navigation between dashboards

---

## 🛠️ Tech Stack

| Technology | Purpose |
|----------|--------|
| Angular | Frontend framework |
| TypeScript | Application logic |
| HTML & CSS | UI and styling |
| JSON Server | Mock backend API |
| Chart.js / Custom Charts | Data visualization |

---

## 📂 Project Structure

```bash
src/
 ├── app/
 │   ├── components/
 │   │   ├── add-transaction/
 │   │   ├── dashboard-chart/
 │   │   └── financial-analysis/
 │   ├── dashboard/
 │   │   ├── income-dashboard/
 │   │   ├── expense-dashboard/
 │   │   └── dashboard-module.ts
 │   ├── models/
 │   │   └── transaction.model.ts
 │   ├── pages/
 │   │   └── home/
 │   ├── services/
 │   │   └── finance.ts
 │   ├── app.routes.ts
 │   ├── app.config.ts
 │   ├── app.ts
 │   ├── app.html
 │   └── app.css
 ├── assets/
 ├── styles.css
 └── main.ts
<img width="1902" height="875" alt="Screenshot 2026-01-20 201618" src="https://github.com/user-attachments/assets/19de329e-3e9c-4b52-bac1-88137bb1858d" />
<img width="1805" height="866" alt="Screenshot 2026-01-20 201642" src="https://github.com/user-attachments/assets/956e0200-d19a-474b-ab1f-81ed03a855c4" />

---

## 💰 Income Dashboard

The **Income Dashboard** provides a comprehensive overview of all income transactions generated from farmhouse operations. It helps track revenue, analyze income sources, and evaluate overall financial performance.

### 🔹 Key Features
- Displays **total income** across selected properties
- Shows **average transaction value**
- Calculates **net profit**
- Displays **total number of income transactions**
- Highlights **top income category**
- Shows **profit margin percentage**

### 🔹 Property-Based Filtering
- Filter income by:
  - Earthy Escape
  - Millennium Farm House
  - All Properties
- All metrics, charts, and tables update dynamically based on the selected property

### 🔹 Income Transaction Management
- Add new income using a toggle-based **Add Income** form
- Fields include:
  - Property
  - Description
  - Category (Bookings, Events, etc.)
  - Amount
  - Date
- Supports opening and closing the form without page reload

### 🔹 Visual Insights
- Category-wise **income distribution chart**
- Summary cards for quick financial insights
- Clear numerical representation for better decision-making

### 🔹 Recent Income Transactions
- Displays the latest income records in a tabular format
- Includes:
  - Date
  - Description
  - Category
  - Amount
- Color-coded category tags and highlighted income values for readability

### 🔹 Benefits
- Helps analyze revenue trends
- Identifies high-performing income categories
- Improves financial transparency
- Useful for reporting, audits, and business planning

<img width="1919" height="831" alt="image" src="https://github.com/user-attachments/assets/263c338d-e891-4fff-aafd-4aae1cfdaa78" />
<img width="1910" height="771" alt="image" src="https://github.com/user-attachments/assets/0b6ae608-0ad6-474d-a609-541aee85314d" />
<img width="1919" height="283" alt="image" src="https://github.com/user-attachments/assets/c34d23fc-e570-4f7a-abb8-a2ebcc5b974f" />

---

### **Millennium Farm House**
<img width="1919" height="848" alt="image" src="https://github.com/user-attachments/assets/4e674e37-ba62-4ded-bc00-2c1126f30a2d" />
<img width="1919" height="857" alt="image" src="https://github.com/user-attachments/assets/59a579e6-b5fc-44d9-b40a-ada5f12082c6" />
<img width="1916" height="425" alt="image" src="https://github.com/user-attachments/assets/b2c668c4-2fbe-4634-bf60-76733e72e4f3" />

---

## 💸 Expenses Dashboard

The **Expenses Dashboard** provides a comprehensive view of all operational expenses incurred across farmhouse properties. It helps monitor spending, analyze cost distribution, and evaluate financial efficiency for each property.

### 🔹 Key Metrics Displayed
- **Total Expenses** for the selected property
- **Average Transaction Amount**
- **Net Savings** (difference between income and expenses)
- **Total Number of Expense Transactions**
- **Top Expense Category**
- **Expense Ratio (%)**

All metrics update dynamically based on the selected property.

---

### 🔹 Property-Based Filtering
- Users can filter expenses by:
  - Earthy Escape
  - Millennium Farm House
- The dashboard recalculates totals, charts, and transaction lists according to the selected property.

---

### 🔹 Expense Transaction Management
- Add new expenses using a toggle-based **Add Expense** form
- Fields include:
  - Property
  - Description
  - Category (Staff, Utilities, Maintenance, Supplies, etc.)
  - Amount
  - Date
- The form can be opened and closed without refreshing the page.

---

### 🔹 Visual Expense Analysis
- **Expense Distribution by Category** displayed using a pie chart
- Clear visualization of how expenses are split across different categories
- Helps identify high-cost operational areas

---

### 🔹 Expenses by Category
- Category-wise expense summary displayed in a list format
- Shows total amount spent for each category
- Useful for quick comparison and budgeting decisions

---

### 🔹 Recent Expense Transactions
- Displays latest expense records in a tabular format
- Includes:
  - Date
  - Description
  - Category (with color-coded badges)
  - Amount
- Helps track recent spending activity at a glance

---

### 🔹 Benefits
- Improves cost control and financial planning
- Identifies major expense contributors
- Provides transparency in farmhouse operations
- Useful for audits, reporting, and decision-making

<img width="1919" height="839" alt="image" src="https://github.com/user-attachments/assets/43cbde74-f084-4cc3-b180-9943dce57964" />
<img width="1917" height="842" alt="image" src="https://github.com/user-attachments/assets/15902f59-a257-49d3-8105-a7760fe22a68" />
<img width="1919" height="329" alt="image" src="https://github.com/user-attachments/assets/e3b68e36-d141-47ae-88fd-4504444741d9" />

---
### **Millennium Farm House**
<img width="1919" height="822" alt="image" src="https://github.com/user-attachments/assets/a8161142-94e2-4063-8177-17e67b67855b" />
<img width="1917" height="780" alt="image" src="https://github.com/user-attachments/assets/59ed71ae-61e1-4ac3-bd9d-ac65948abddc" />
<img width="1919" height="277" alt="image" src="https://github.com/user-attachments/assets/a5dccbdd-9b67-4433-aa04-e08fbcbd799e" />























