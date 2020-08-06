import { Request, Response } from 'express'

import convertHourToMinutes from '../utils/ConvertHourToMinutes'

/* Knex Database */
import knex from '../database/connection'

/* Interfaces */
export interface iClasses {
    subject: string,
    cost: number,
    user_id: null | number
}

export interface iUser {
    name: string,
    avatar: string,
    whatsapp: string,
    bio: string
}

export interface iSchedule {
    week_day: number,
    from: string,
    to: string
}

interface itest {
    week_day: string,
    subject: string,
    time: string
}

class ClassesController {
    async create(req: Request, res: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
        } = req.body

        /* Types of schedule */
        const schedule: iSchedule[] = req.body.schedule

        const UserData: iUser = {
            name, avatar, whatsapp, bio
        }

        const ClassesData: iClasses = {
            subject, cost, user_id: null
        }

        /* Initialize the transaction */
        const trx = await knex.transaction()

        try {
            /* Users insert */
            const InsertedUsersIds = await trx('users').insert(UserData)

            /* Classes insert */
            ClassesData.user_id = InsertedUsersIds[0]
            const InsertedClassesIds = await trx('classes').insert(ClassesData)

            /* Class_Schedule insert */
            const ClassesSchedules = schedule.map(scheduleItem => {
                return {
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                    class_id: InsertedClassesIds[0]
                }
            })
            // insert accept an array, so, return an array of inserted ids
            const InsertedClassScheduleIds = await trx('class_schedule').insert(ClassesSchedules)


            /* Save the transaction */
            await trx.commit()

            return res.status(201).json({
                'status': true,
                'message': 'Created successfully'
            })
        } catch (err) {
            /* Rollback the transaction */
            await trx.rollback()

            return res.status(400).json({
                'status': false,
                'message': err
            })
        }
    }


    async index(req: Request, res: Response) {
        const filters = req.query

        const time = filters.time as string
        const subject = filters.subject as string
        const week_day = filters.week_day as string

        if (!week_day || !subject || !time) {
            return res.status(400).json({
                status: false,
                message: 'Missing query parameters'
            })
        }

        const timeInMinutes = convertHourToMinutes(time)

        try {
            const classes = await knex('classes')
                .whereExists(function () {
                    this.select('class_schedule.*')
                        .from('class_schedule')
                        .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                        .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                        .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                        .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])
                })
                .where({ subject })
                .innerJoin('users', 'users.id', '=', 'classes.user_id')
                .select('classes.*', 'users.*')


            return res.json(classes)
        } catch (err) {
            return res.status(400).json({
                'status': false,
                'message': err
            })
        }

    }
}

export default new ClassesController