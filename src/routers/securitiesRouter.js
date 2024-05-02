import {Router} from 'express'
import db from '../db-config.js'

const securitiesRouter = Router({});

// Представление таблицы securities
securitiesRouter.get('/', (req, res) => {
    db.query(`SELECT * FROM securities_view`, (err, data) => {
        if (err) {
            res.sendStatus(500);
            return;
        }
        res.json(data);
    })
})
export default securitiesRouter;