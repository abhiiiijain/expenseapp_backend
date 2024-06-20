const ExpenseSchema = require("../models/expenseModel");

exports.addExpense = async (req, res) => {
  const { email, title, amount, category, subcategory, icon } = req.body;

  console.log("Received payload:", req.body); // Debugging line

  const expense = new ExpenseSchema({
    email,
    title,
    amount,
    category,
    subcategory,
    icon,
  });

  try {
    // Validations
    if (!email || !title || !category || !subcategory || !icon) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    if (amount <= 0 || amount !== "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number!" });
    }
    await expense.save();
    res.status(200).json({ message: "Expense Added" });
  } catch (error) {
    console.error("Error saving expense:", error); // Debugging line
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const expenses = await ExpenseSchema.find({ email: userEmail }).sort({
      createdAt: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await ExpenseSchema.findById(id);
    if (expense.email !== req.user.email) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    await ExpenseSchema.findByIdAndDelete(id);
    res.status(200).json({ message: "Expense Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
