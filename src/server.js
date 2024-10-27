
const express = require('express'); 
const { sequelize } = require('./config/db'); 
const app = express();
const PORT = 3001;
const Transaction = require('./models/transaction');

app.use(express.json());

(async () => {
    try {
        await sequelize.sync(); 
        console.log('Database synchronized!');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to sync database:', error);
    }
})();

app.post('/transactions', async (req, res) => {
  try {
    const { type, amount, date, description, category } = req.body; 
    const newTransaction = await Transaction.create({
      type,
      amount,
      date,
      description,
      category,
    });

    res.status(201).json(newTransaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ message: 'Unable to create transaction' });
  }
});

app.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch transactions' });
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Finance API');
});

