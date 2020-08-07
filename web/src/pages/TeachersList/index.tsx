import React, { FormEvent, useState } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { iTeacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css'
import { api } from '../../services/api';

const TeachersList: React.FC = () => {

    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState<number>()
    const [time, setTime] = useState('')

    const [teachers, setTeachers] = useState<iTeacher[]>()

    async function handleSearchTeachers(e: FormEvent) {
        e.preventDefault()

        try {
            const response = await api.get<iTeacher[]>('/classes', {
                params: {
                    subject,
                    week_day,
                    time
                }
            })

            setTeachers(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div id='page-teacher-list' className='container' >
            <PageHeader title='Estes são os proffys disponíveis.'>

                <form id='search-teachers' onSubmit={handleSearchTeachers}>
                    <Select
                        name='subject'
                        label='Matéria'
                        onChange={e => { setSubject(e.target.value) }}
                        value={subject}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Química', label: 'Química' },
                            { value: 'Português', label: 'Português' },
                            { value: 'Fisíca', label: 'Fisíca' },
                            { value: 'Educação fisíca', label: 'Educação fisíca' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'História', label: 'História' },
                            { value: 'Inglês', label: 'Inglês' }
                        ]}
                    />

                    <Select
                        name='week-day'
                        label='Dia da semana'
                        onChange={e => { setWeekDay(Number(e.target.value)) }}
                        value={week_day}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sábado' }
                        ]}
                    />

                    <Input
                        name='time'
                        label='Hora'
                        type='time'
                        onChange={e => { setTime(e.target.value) }}
                        value={time}
                    />

                    <button type='submit'>
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {
                    teachers?.map(teacher => (
                        <TeacherItem key={teacher.id} teacher={teacher} />
                    ))
                }
            </main>
        </div>
    )
}

export default TeachersList;