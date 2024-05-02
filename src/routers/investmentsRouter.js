import {Router} from 'express'
import db from '../db-config.js'

const investmentsRouter = Router({});

// Представление таблицы investment
investmentsRouter.get('/', (req, res) => {
    db.query(`SELECT * FROM investment_view`, (err, data) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.json(data);
    })
})

export default investmentsRouter;