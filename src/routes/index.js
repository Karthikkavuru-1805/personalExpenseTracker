const express = require('express');
const router = express.Router();
const transactionController=require('../controller/transactionController');
const summaryController = require('../controller/summaryController');

router.post('/transactions', transactionController.createTransaction);
router.get('/transactions', transactionController.getTransactions);
router.get('/transactions/:id', transactionController.getTransactionById);
router.put('/transactions/:id', transactionController.updateTransaction);
router.delete('/transactions/:id', transactionController.deleteTransaction);

router.get('/summary', summaryController.getSummary);

module.exports = router;

