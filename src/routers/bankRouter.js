import {Router} from 'express'
import db from '../db-config.js'

const banksRouter = Router({});

// Получить все банки
banksRouter.get('/', (req, res) => {
    db.query(`SELECT * FROM banks`, (err, data) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.json(data);
    })
})

// Добавить банк
banksRouter.post('/', (req, res) => {
    const bankName = req.body.name;
    if (!bankName) {
        res.sendStatus(400)
    }

    db.query(`INSERT INTO banks (Name) VALUES (?)`, [bankName], (err, data) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.sendStatus(201);
    })
})

// Удалить банк
banksRouter.delete('/:id', (req, res) => {
    const id = req.params.id;

    db.query(`DELETE FROM banks WHERE ID_bank = ?`, [id], (err, data) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.sendStatus(204);
    })
})

// Изменить имя банка
banksRouter.put('/:id', (req, res) => {
    const newName = req.body.name;
    const id = req.params.id;

    if (!newName || !id) {
        res.sendStatus(400);
        return;
    }
    db.query(`UPDATE banks set Name = ? WHERE ID_bank = ?`, [newName, id], err => {
        if (err) {
            res.sendStatus(500);
            console.log(err)
            return;
        }
        res.sendStatus(204);
    })
})


export default banksRouter;