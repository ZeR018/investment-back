import {Router} from 'express'
import db from '../db-config.js'

const staffRouter = Router({});

staffRouter.get('/', (req, res) => {
    db.query(`CALL get_staff_procedure();`, (err, data) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.json(data[0]);
    })
})

staffRouter.post('/', (req, res) => {
    const idBank = req.body.id_bank;
    const jobTitle = req.body.job_title;
    const phoneNumber = req.body.number;
    const fio = req.body.FIO;
    if (!idBank || !jobTitle || !phoneNumber || !fio) {
        res.sendStatus(400)
        return;
    }
    // Проверим, есть ли такой id банка
    db.query(`SELECT * FROM banks WHERE ID_bank = ?`, [idBank], (err, data) => {
        if (err) {
            res.sendStatus(400);
            return;
        }
        // Такой id банка есть, можно добавлять
        db.query(`CALL add_staff_procedure(?, ?, ?, ?)`, 
        [idBank, jobTitle, phoneNumber, fio], (err, data) => {
            if (err) {
                res.sendStatus(500);
                return;
            }
            res.sendStatus(201)
        })
    })
})

staffRouter.put('/change_job/:id', (req, res) => {
    const newJobTitle = req.body.job_title;
    const id = req.params.id;

    if(!newJobTitle || !id) {
        res.sendStatus(400);
        return;
    }
    db.query(`CALL change_staffs_position_procedure(?, ?)`, [id, newJobTitle], (err, data) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.sendStatus(204)
    })
})

staffRouter.delete('/:id', (req, res) => {
    const id = req.params.id;

    if(!id) {
        res.sendStatus(400);
        return;
    }

    db.query(`CALL delete_staff_procedure(?)`, [id], (err, data) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.sendStatus(204)
    })
})

export default staffRouter;