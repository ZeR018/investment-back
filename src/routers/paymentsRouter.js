import {Router} from 'express'
import db from '../db-config.js'

const paymentsRouter = Router({});

// Все чеки
paymentsRouter.get('/', (req, res) => {
    db.query(`SELECT * FROM payment`, (err, data) => {
        if (err) {
            res.sendStatus(500);
        }
        else {
            res.json(data);
        }
    })
})

// Найти чек по id
paymentsRouter.get('/:id', (req, res) => {
    const id = +req.params.id;
    if (!id) {
        res.sendStatus(400);
        return;
    }
    db.query(`SELECT * FROM payment WHERE ID_check = ?`, [id], (err, data) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        else {
            res.json(data);
        }
    })
})

// Для ФЛ добавление чека должно иметь тело:
// {
//     "amount": ?,
//     "operation": ?,
//     "client": {
//         "type": "fl",
//         "number": ?,
//         "FIO": ?,
//         "address": ?
//     }
// }

// Для ЮЛ добавление чека должно иметь тело:
// {
//     "amount": ?,
//     "operation": ?,
//     "client": {
//         "type": "ul",
//         "number": ?,
//         "manager": ?,
//         "inn": ?,
//         "address": ?
//     }
// }

// Добавить чек
paymentsRouter.post('/', (req, res) => {
    const amount = +req.body.amount;
    const operation = req.body.operation;
    const client = req.body.client;

    // Если неправильные данные
    if (!amount || !operation || !client) {
        res.sendStatus(400);
        return;
    }

    let params;
    let sql_str = '';
    if (client.type == "fl") {
        if (!client.number || !client.FIO || !client.address) {
            res.sendStatus(400);
            return;
        }
        sql_str = `INSERT INTO fl_clients (Number, FIO, Address, ID_check) VALUES (?, ?, ?, ?)`;
        params = [client.number, client.FIO, client.address];
    }
    else if (client.type == "ul") {
        if (!client.number || !client.manager || !client.inn || !client.address ) {
            res.sendStatus(400);
            return;
        }
        
        sql_str = `INSERT INTO ul_clients (Number, Manager, inn, Address, ID_check) VALUES (?, ?, ?, ?, ?)`;
        params = [client.number, client.manager, client.inn, client.address];
    }
    else {
        res.sendStatus(400);
        return;
    }

    // Добавляем чек в таблицу
    db.query('INSERT INTO payment (Amount, Operation) VALUES (?, ?)', [amount, operation], (err, data) => {
        if (err) {
            res.sendStatus(500);
            return;
        }

        // Узнаем id добавленного чека
        db.query('SELECT LAST_INSERT_ID()', (err, data) => {
            if (err) {
                res.sendStatus(500);
                return;
            }
            
            // узнав id можем добавить его в параметры
            const id_check = Object.values(data[0])[0];
            params.push(id_check)
            
            // Добавляем клиента, чек которого добавили выше
            db.query(sql_str, params, (err) => {
                    if (err) {
                        console.log(err)
                        res.sendStatus(500);
                        return;
                    }

                    res.sendStatus(201);
                });
        });
    });

})

export default paymentsRouter;