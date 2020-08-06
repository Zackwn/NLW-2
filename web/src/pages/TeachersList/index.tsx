import React from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import './styles.css'

const Teacher = {
    name: 'Rafael Azzi',
    img: 'https://avatars0.githubusercontent.com/u/56268564?s=460&u=e173f8d14299f6b17927b793355eba472b7cc30d&v=4',
    materia: 'Química',
    descricao: 'Entusiasta das melhores tecnologias de química avançada.' + '\n' + '\n' + 'Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minha explosões.',
    preco: '80.00'
}

const TeachersList: React.FC = () => {
    return (
        <div id='page-teacher-list' className='container' >
            <PageHeader title='Estes são os proffys disponíveis.'>
                <div id="search-teachers">
                    <Select
                        name='subject'
                        label='Matéria'
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Química', label: 'Química' },
                            { value: 'Português', label: 'Português' },
                            { value: 'Fisíca', label: 'Fisíca' },
                            { value: 'Educação fisíca', label: 'Educação fisíca' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'História', label: 'História' }
                        ]}
                    />

                    <Select
                        name='week-day'
                        label='Dia da semana'
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

                    <Input name='time' label='Hora' type='time' />
                </div>
            </PageHeader>

            <main>
                <TeacherItem teacher={Teacher} />
                <TeacherItem teacher={Teacher} />
                <TeacherItem teacher={Teacher} />
            </main>
        </div>
    )
}

export default TeachersList;