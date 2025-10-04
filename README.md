# Budget Tracker App  

A simple and modern **Budget Tracker App** built with **React.js** (frontend) and **Node.js + Express + MongoDB** (backend).  
Track your income, manage expenses, and visualize your financial data easily!  

---

## Features  

| Feature | Description |
|----------|-------------|
|  Add Transactions | Quickly add income or expense entries |
|  Edit Transactions | Modify existing records easily |
|  Delete Transactions | Remove transactions you no longer need |
|  Visual Charts | See spending and income through charts |
|  MongoDB Database | Securely store your data in the cloud |
|  Responsive | Works smoothly on both desktop and mobile |

---

## Tech Stack  

| Layer | Technology |
|--------|-------------|
| Frontend | React.js, Recharts, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |

---

## Installation & Usage  

### 1. Clone the repo  

| Step | Command |
|------|----------|
| Clone project | `git clone https://github.com/ThuanVan060504/Budget-Tracker.git` |
| Go to folder | `cd Budget-Tracker` |

---

### 2. Setup Backend  

| Step | Command |
|------|----------|
| Move to backend folder | `cd backend` |
| Install dependencies | `npm install` |
| Create `.env` file | Add the following content: <br> `MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/budget_tracker` <br> `PORT=5000` |
| Start the server | `npm start` |
| Backend runs on | `http://localhost:5000` |

---

### 3. Setup Frontend  

| Step | Command |
|------|----------|
| Move to frontend folder | `cd ../frontend` |
| Install dependencies | `npm install` |
| Start the frontend | `npm start` |
| Frontend runs on | `http://localhost:3000` |

---

## Actions  

| Action | How to do |
|---------|-----------|
|  Add Transaction | Fill in details and click **Add** |
|  Edit Transaction | Click **Edit**, modify, then save |
|  Delete Transaction | Click **Delete** to remove a record |
|  View Chart | Visualize income and expenses over time |

---

## Folder Structure  

| Path | Files / Description |
|-------|----------------------|
| backend/ | `server.js`, `routes/`, `models/` |
| frontend/ | `src/`, `public/`, `App.js`, `package.json` |
| README.md | Project documentation |

---

## Notes  

| Note | Description |
|-------|--------------|
| .gitignore | Add `node_modules/` and `.env` to ignore list |
| Ports | Backend: `5000`, Frontend: `3000` |
| MongoDB | Use your own MongoDB Atlas connection string |
| API Endpoint | Adjust `fetch("http://localhost:5000/api/transactions")` in `App.js` if deploying online |

---

*Thank you for checking out my project! Hope this helps you manage your budget better!* 
