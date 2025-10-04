import React, { useEffect, useState } from "react";
import "./App.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [date, setDate] = useState("");
  const [editing, setEditing] = useState(null);

  const formatMoney = (num) => Number(num).toLocaleString("vi-VN") + " ₫";

  const handleAmountChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (!value) return setAmount("");
    const formatted = Number(value).toLocaleString("vi-VN");
    setAmount(formatted);
  };

  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/transactions");
      const data = await res.json();
      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description || !amount || !date) {
      return alert("Điền đầy đủ thông tin nha 😎");
    }

    const newTransaction = {
      text: description,
      amount: Number(amount.replace(/\./g, "")),
      type,
      date,
    };

    try {
      if (editing) {
        await fetch(`http://localhost:5000/api/transactions/${editing}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTransaction),
        });
        setEditing(null);
      } else {
        await fetch("http://localhost:5000/api/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTransaction),
        });
      }

      setDescription("");
      setAmount("");
      setType("income");
      setDate("");
      fetchTransactions();
    } catch (error) {
      console.error("Lỗi khi lưu:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa giao dịch này?")) return;
    try {
      await fetch(`http://localhost:5000/api/transactions/${id}`, {
        method: "DELETE",
      });
      fetchTransactions();
    } catch (error) {
      console.error("Lỗi khi xóa:", error);
    }
  };

  const handleEdit = (t) => {
    setDescription(t.text);
    setAmount(Number(t.amount).toLocaleString("vi-VN"));
    setType(t.type);
    setDate(t.date ? t.date.substring(0, 10) : "");
    setEditing(t._id);
  };

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

  const chartData = [
    { name: "Thu", value: totalIncome },
    { name: "Chi", value: totalExpense },
  ];

  const COLORS = ["#2ecc71", "#e74c3c"];

  // Gom dữ liệu theo ngày để vẽ biểu đồ đường
  const groupedData = Object.values(
    transactions.reduce((acc, t) => {
      const date = new Date(t.date).toLocaleDateString("vi-VN");
      if (!acc[date]) acc[date] = { date, income: 0, expense: 0 };
      acc[date][t.type] += Number(t.amount);
      return acc;
    }, {})
  );

  return (
    <div className="app-container">
      <h1>💰 Ứng dụng Quản lý Chi tiêu</h1>

      {/* Tổng quan thu chi */}
      <div className="summary">
        <div className="card income">
          <h3>Tổng Thu</h3>
          <p>{formatMoney(totalIncome)}</p>
        </div>
        <div className="card expense">
          <h3>Tổng Chi</h3>
          <p>{formatMoney(totalExpense)}</p>
        </div>
        <div className="card balance">
          <h3>Số Dư</h3>
          <p>{formatMoney(balance)}</p>
        </div>
      </div>

      <div className="content-section">
        {/* Bên trái */}
        <div className="left-panel">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nội dung..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Số tiền..."
              value={amount}
              onChange={handleAmountChange}
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="income">Thu nhập</option>
              <option value="expense">Chi tiêu</option>
            </select>
            <button type="submit">
              {editing ? "💾 Lưu thay đổi" : "➕ Thêm"}
            </button>
          </form>

          <ul className="transaction-list">
            {transactions.length === 0 ? (
              <p style={{ color: "#777", marginTop: "20px" }}>
                Chưa có giao dịch nào cả 😅
              </p>
            ) : (
              transactions.map((t) => (
                <li
                  key={t._id}
                  className={t.type === "income" ? "income-item" : "expense-item"}
                >
                  <div>
                    <strong>{t.text}</strong>
                    <p>
                      {formatMoney(t.amount)} •{" "}
                      {new Date(t.date).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                  <div className="actions">
                    <button onClick={() => handleEdit(t)}>✏️</button>
                    <button onClick={() => handleDelete(t._id)}>🗑️</button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>

        {/* Bên phải */}
        <div className="right-panel">
          {/* Biểu đồ Thu - Chi */}
          <div className="chart-box">
            <h4>📊 Biểu đồ Thu - Chi</h4>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) =>
                      `${name}: ${value.toLocaleString("vi-VN")}₫`
                    }
                    outerRadius={90}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => v.toLocaleString("vi-VN") + "₫"} />
                  <Legend verticalAlign="bottom" align="center" iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Biểu đồ đường */}
          <div className="chart-box">
            <h4>📅 Biến động Thu - Chi theo ngày</h4>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={groupedData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis tickFormatter={(v) => v.toLocaleString("vi-VN")} />
                  <Tooltip formatter={(v) => v.toLocaleString("vi-VN") + "₫"} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#2ecc71"
                    name="Thu nhập"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="#e74c3c"
                    name="Chi tiêu"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
