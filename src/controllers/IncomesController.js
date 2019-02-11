const boom = require('boom')
const Incomes = require('../models/Incomes')
const Expenses = require('../models/Expenses')

exports.getIncomes = async (req, res) => {
     try {
         const incomes = await Incomes.find()
         return incomes
     } catch (error) {
         throw boom.boomify(error)
     }
}

exports.addIncome = async (req, res) => {
    try {
        const model = new Incomes(req.body)
        return model.save()
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.updateIncome = async (req, res) => {
    try {
        const id = req.params.id
        const income = req.body
        const { ...updateData} = income
        const update = await Incomes.findByIdAndUpdate(id, updateData, {new: true})
        return update
    } catch (error) {
        throw boom.boomify(error)
    }
}

exports.deleteIncome = async (req, res) => {
    try {
        const id = req.params.id
        const income = await Incomes.findByIdAndRemove(id)
        const relatedExpenses = await Expenses.find({'year':income.year,'month':income.month})
        const ids = relatedExpenses.map(function(item) {return item._id})
        await Expenses.remove({'_id':{'$in':ids}})
        return income
    } catch (error) {
        throw boom.boomify(error)
    }
}
