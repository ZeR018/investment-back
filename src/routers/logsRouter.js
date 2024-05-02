import {Router} from 'express'
import db from '../db-config.js'

const logsRouter = Router({});

// Все логи
logsRouter.get('/', (req, res) => {
    db.query(`SELECT * FROM logs`, (err, data) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.json(data);
    })
})

// Выводит все логи первого банка
logsRouter.get('/first', (req, res) => {
    db.query(`SELECT * FROM logs_first_bank_view`, (err, data) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.json(data);
    })
})

export default logsRouter;