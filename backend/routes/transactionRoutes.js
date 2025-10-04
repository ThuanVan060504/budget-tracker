const express = require("express");
const router = express.Router();

// 👀 Kiểm tra import Transaction
let Transaction;
try {
  Transaction = require("../models/Transaction");
  console.log("✅ Transaction model loaded:", Transaction.modelName);
} catch (err) {
  console.error("❌ Lỗi khi load Transaction model:", err);
}

// GET: Lấy toàn bộ giao dịch
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    console.error("❌ Lỗi GET /:", err);
    res.status(500).json({ message: err.message });
  }
});

// POST: Thêm giao dịch mới
router.post("/", async (req, res) => {
  try {
    const { text, amount, type, date } = req.body;
    if (!Transaction) throw new Error("Transaction model chưa load");
    
    const newTransaction = new Transaction({ text, amount, type, date });
    const saved = await newTransaction.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ Lỗi khi thêm:", err);
    res.status(400).json({ message: err.message });
  }
});

// PUT: Sửa giao dịch theo id
router.put("/:id", async (req, res) => {
  try {
    if (!Transaction) throw new Error("Transaction model chưa load");

    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error("❌ Lỗi khi PUT /:id:", err);
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Xóa giao dịch theo id
router.delete("/:id", async (req, res) => {
  try {
    if (!Transaction) throw new Error("Transaction model chưa load");

    await Transaction.findByIdAndDelete(req.params.id);
    res.json({ message: "Đã xóa giao dịch" });
  } catch (err) {
    console.error("❌ Lỗi khi DELETE /:id:", err);
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
