const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());          // cho phép frontend khác cổng truy cập
app.use(express.json());  // đọc JSON body

// Kết nối MongoDB
mongoose.connect("mongodb://localhost:27017/financeDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.log("❌ MongoDB connection error:", err));

// Routes
const transactionRoutes = require("./routes/transactionRoutes");
app.use("/api/transactions", transactionRoutes);

// Start server
app.listen(PORT, () => console.log(`🚀 Server đang chạy ở cổng ${PORT}`));
