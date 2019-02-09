const boom = require('boom')
const MonthlyIncomes = require('../models/MonthlyIncomes')
const MonthlyExpenses = require('../models/MonthlyExpenses')

exports.getMonthlyIncomes = async (req, res) => {
     try {
         const incomes = await MonthlyIncomes.find()
         return incomes
     } catch (error) {
         throw boom.boomify(error)
     }
}

exports.addMonthlyIncome = async (req, res) => {
    try {
        const model = new MonthlyIncomes(req.body)
        return model.save()
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.updateMonthlyIncome = async (req, res) => {
    try {
        const id = req.params.id
        const income = req.body
        const { ...updateData} = income
        const update = await MonthlyIncomes.findByIdAndUpdate(id, updateData, {new: true})
        return update
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.deleteMonthlyIncome = async (req, res) => {
    try {
        const id = req.params.id
        const income = await MonthlyIncomes.findByIdAndRemove(id)
        const relatedExpenses = await MonthlyExpenses.find({'year':income.year,'month':income.month})
        const ids = relatedExpenses.map(function(item) {return item._id})
        await MonthlyExpenses.remove({'_id':{'$in':ids}})
        return income
    } catch (error) {
        throw boom.boomify(error)
    }
}
