const boom = require('boom')
const MonthlyExpenses = require('../models/MonthlyExpenses')
const MonthlyIncomes = require('../models/MonthlyIncomes')

exports.getMonthlyExpenses = async (req, res) => {
    try {
        const expenses = await MonthlyExpenses.find()
        return expenses
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.addMonthlyExpense = async (req, res) => {
    try {
        const model = new MonthlyExpenses(req.body)
        model.save()
        const monthIncome = await MonthlyIncomes.findOne({'year':model.year,'month':model.month})
        monthIncome.amount -= model.cost
        const update = await MonthlyIncomes.findByIdAndUpdate(monthIncome._id, monthIncome, { new: true })
        return  monthIncome;
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.getExpensesByYearAndMonth = async (req, res) => {
    try {
        const year = req.params.year
        const month = req.params.month
        const expense = MonthlyExpenses.find({'year':year,'month':month})
        return expense
    } catch (error) {
        throw boom.boomify(error)

    }
}

exports.updateMonthlyExpense = async (req, res) => {
    try {
        const id = req.params.id
        const expense = req.body
        const currentExpense = await MonthlyExpenses.findById(id)
        const difference = currentExpense.cost - expense.cost

        const { ...updateExpense} = expense
        await MonthlyExpenses.findByIdAndUpdate(id, updateExpense, {new: true})

        const relatedIncome = await MonthlyIncomes.findOne({'year':expense.year,'month':expense.month})
        relatedIncome.amount += difference
        const updatedIncome = await MonthlyIncomes.update({'_id':relatedIncome._id},{'amount':relatedIncome.amount})
        return updatedIncome
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.deleteMonthlyExpense = async (req, res) => {
    try {
        const id = req.params.id
        const expense = await MonthlyExpenses.findByIdAndRemove(id)
        const relatedIncome = await MonthlyIncomes.findOne({'year':expense.year,'month':expense.month})
        relatedIncome.amount += expense.cost
        const updatedIncome = await MonthlyIncomes.update({'_id':relatedIncome._id},{'amount':relatedIncome.amount})
        return updatedIncome
    } catch (error) {
        throw boom.boomify(error)
    }
}