const fastify = require('fastify')({
    logger: true
})
const mongoose = require('mongoose')
const routes = require('./routes')
const swagger = require('./config/swagger')


fastify.get('/', async (req, res) => {
    return { hello: 'world' }
})

routes.forEach((route, index) => {
    fastify.route(route)
})

fastify.register(require('fastify-swagger'), swagger.options)


const start = async () => {
    try {
        await fastify.listen(3000)
        fastify.swagger()
        fastify.log.info(`Server is listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

mongoose.connect('mongodb://localhost/ExpenseTracker')
    .then(() => console.log('DB connected...'))
    .catch(err => console.log(err))

start()