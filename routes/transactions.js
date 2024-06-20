const {
  addExpense,
  getExpenses,
  deleteExpense,
} = require("../controllers/expense");
const authenticateToken = require("../middleware/auth");
const router = require("express").Router();

router.post("/add-expense", authenticateToken, addExpense);
router.get("/get-expenses", authenticateToken, getExpenses);
router.delete("/delete-expense/:id", authenticateToken, deleteExpense);

module.exports = router;
