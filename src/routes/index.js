const incomesController = require('../controllers/IncomesController')
const expensesController = require('../controllers/ExpensesController')
const routes = [
  {
    method: 'GET',
    url: '/api/incomes',
    handler: incomesController.getIncomes
  },
  {
    method: 'POST',
    url: '/api/incomes',
    handler: incomesController.addIncome,
  },
  {
    method: 'PUT',
    url: '/api/incomes/:id',
    handler: incomesController.updateIncome
  },
  {
    method: 'DELETE',
    url: '/api/incomes/:id',
    handler: incomesController.deleteIncome
  },
  {
    method: 'GET',
    url: '/api/expenses',
    handler: expensesController.getExpenses
  },
  {
      method: 'GET',
      url: '/api/expenses/year/:year/month/:month',
      handler: expensesController.getExpensesByYearAndMonth
  },
  {
      method: 'POST',
      url: '/api/expenses',
      handler: expensesController.addExpense
  },
  {
    method: 'PUT',
    url: '/api/expenses/:id',
    handler: expensesController.updateExpense

  },
  {
    method: 'DELETE',
    url: '/api/expenses/:id',
    handler: expensesController.deleteExpense
  }
]

module.exports = routes