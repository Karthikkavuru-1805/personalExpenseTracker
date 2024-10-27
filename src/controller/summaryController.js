const Transaction = require('../models/transaction');

exports.getSummary = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.totalIncome += parseFloat(transaction.amount);
        } else {
          acc.totalExpense += parseFloat(transaction.amount);
        }
        return acc;
      },
      { totalIncome: 0, totalExpense: 0 }
    );
    summary.balance = summary.totalIncome - summary.totalExpense;
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};