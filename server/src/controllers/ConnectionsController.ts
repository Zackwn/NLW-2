import { Request, Response } from 'express'
import knex from '../database/connection'

class ConnectionsController {
    async index(req: Request, res: Response) {
        try {
            const TotalConnections = await knex('connections').count('* as total')

            const { total } = TotalConnections[0]
    
            return res.json({ total })
        } catch (err) {
            return res.status(500).json({
                'status': false,
                'message': err
            })
        }
    }

    async create(req: Request, res: Response) {
        const { user_id } = req.body

        try {
            const newConnectionId = await knex('connections').insert({user_id})
            return res.status(201).json({'insertedId': newConnectionId})
        } catch (err) {
            return res.status(400).json({
                'status': false,
                'message': err
            })
        }
    }
}

export default new ConnectionsController