import {Router} from 'express'
import db from '../db-config.js'

const clientsRouter = Router({})

// Все клиенты-физики
clientsRouter.get('/fl', (req, res) => {
    db.query(`SELECT * FROM fl_clients`, (err, data) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.json(data);
    })
})

// Поиск клиента-физика по id. Пример: ".../clients/fl/2"
clientsRouter.get('/fl/:id', (req, res) => {
    const id = +req.params.id;
    if (!id) {
        res.sendStatus(400);
        return;
    }
    db.query(`SELECT * FROM fl_clients WHERE ID_fl = ?`, [id], (err, data) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.json(data);
    })
})

// Все клиенты-юр.лица
clientsRouter.get('/ul', (req, res) => {
    db.query(`SELECT * FROM ul_clients`, (err, data) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.json(data);
    })
})

// Поиск клиента-юр.лица по id. Пример: ".../clients/ul/2"
clientsRouter.get('/ul/:id', (req, res) => {
    const id = +req.params.id;
    if (!id) {
        res.sendStatus(400);
        return;
    }
    db.query(`SELECT * FROM ul_clients WHERE ID_ul = ?`, [id], (err, data) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.json(data);
    })
})

// Поиск клиента-физлица по имени. Пример: ".../clients/fl?fio=andrew"
clientsRouter.get('/fl', (req, res) => {
    param = req.query.fio;
    
    db.query(`SELECT * FROM fl_clients WHERE FIO LIKE '%?%'`, [param], (err, data) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.json(data)
    })
})

export default clientsRouter;