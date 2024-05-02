import express from 'express'
import cors from 'cors'
import clientsRouter from './routers/clientsRouter.js'
import paymentsRouter from './routers/paymentsRouter.js'
import banksRouter from './routers/bankRouter.js'
import logsRouter from './routers/logsRouter.js'
import staffRouter from './routers/staffRouter.js'
import investmentsRouter from './routers/investmentsRouter.js'
import securitiesRouter from './routers/securitiesRouter.js'

// Создаем экземпляр express - приложения
const app = express()
const port = process.env.port || 3001

// Включаем cors, чтобы back мог обрабатывать запросы с других сайтов 
app.use(cors())

// Промежуточных обработчик, анализирует запрос и, если есть, парсит тело запроса 
const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)

// Сгруппированные по ссылкам запросы
app.use('/clients', clientsRouter)
app.use('/payment', paymentsRouter)
app.use('/bank', banksRouter)
app.use('/logs', logsRouter)
app.use('/staff', staffRouter)
app.use('/investment', investmentsRouter)
app.use('/securities', securitiesRouter)

// Запускает приложение
app.listen(port, () => {
    console.log(`Example on port ${port}`)
})

