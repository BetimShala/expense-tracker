const monthlyIncomesController = require('../controllers/monthlyIncomesController')
const monthlyExpensesController = require('../controllers/monthlyExpensesController')
const routes = [
  {
    method: 'GET',
    url: '/api/monthlyIncomes',
    handler: monthlyIncomesController.getMonthlyIncomes
  },
  {
    method: 'POST',
    url: '/api/monthlyIncomes',
    handler: monthlyIncomesController.addMonthlyIncome,
  },
  {
    method: 'PUT',
    url: '/api/monthlyIncomes/:id',
    handler: monthlyIncomesController.updateMonthlyIncome
  },
  {
    method: 'DELETE',
    url: '/api/monthlyIncomes/:id',
    handler: monthlyIncomesController.deleteMonthlyIncome
  },
  {
    method: 'GET',
    url: '/api/monthlyExpenses',
    handler: monthlyExpensesController.getMonthlyExpenses
  },
  {
      method: 'GET',
      url: '/api/expenses/year/:year/month/:month',
      handler: monthlyExpensesController.getExpensesByYearAndMonth
  },
  {
      method: 'POST',
      url: '/api/monthlyExpenses',
      handler: monthlyExpensesController.addMonthlyExpense
  },
  {
    method: 'PUT',
    url: '/api/monthlyExpenses/:id',
    handler: monthlyExpensesController.updateMonthlyExpense

  },
  {
    method: 'DELETE',
    url: '/api/monthlyExpenses/:id',
    handler: monthlyExpensesController.deleteMonthlyExpense
  }
]

module.exports = routes