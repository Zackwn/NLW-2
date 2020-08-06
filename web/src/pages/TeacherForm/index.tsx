import React, { useState, FormEvent } from 'react';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Textarea from '../../components/TextArea';
import Select from '../../components/Select';

import warningIcon from '../../assets/images/icons/warning.svg'

import './styles.css'

const TeacherForm: React.FC = () => {

  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [bio, setBio] = useState('')

  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')

  const [scheduleItems, setScheduleItems] = useState([{
    week_day: 0,
    from: '',
    to: ''
  }])

  function addScheduleItem() {
    setScheduleItems([...scheduleItems, {
      week_day: 0,
      from: '',
      to: ''
    }])
  }

  function setScheduleItemValue(postition: number, field: string, value: string) {
    const newArray = scheduleItems.map((scheduleItem, index) => {
      if (index === postition) {
        return { ...scheduleItem, [field]: value }
      }

      return scheduleItem
    })

    console.log(newArray)
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault()

    console.log(scheduleItems)
  }

  return (
    <div id='page-teacher-form' className='container' >
      <PageHeader
        title='Que incrível que você quer dar aulas.'
        description='O primeiro passo é passo é preencher esse formulário de inscrição'
      />

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>Seus dados</legend>

            <Input
              name='name'
              label='Nome completo'
              type='text'
              onChange={e => { setName(e.target.value) }}
              value={name}
            />

            <Input
              name='avatar'
              label='Avatar'
              type='text'
              onChange={e => { setAvatar(e.target.value) }}
              value={avatar}
            />

            <Input
              name='whatsapp'
              label='WhatsApp'
              type='text'
              onChange={e => { setWhatsapp(e.target.value) }}
              value={whatsapp}
            />

            <Textarea
              name='bio'
              label='Biografia'
              onChange={e => { setBio(e.target.value) }}
              value={bio}
            />
          </fieldset>

          <fieldset>
            <legend>Sobre a aula</legend>

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
                { value: 'História', label: 'História' }
              ]}
            />

            <Input
              name='cost'
              label='Custo da sua hora por aula'
              onChange={e => { setCost(e.target.value) }}
              value={cost}
            />

          </fieldset>

          <fieldset>
            <legend>
              Horários disponíveis
            <button
                type='button'
                onClick={addScheduleItem}
              >
                + Novo horário
          </button>
            </legend>

            {
              scheduleItems.map((scheduleItem, index) => {
                return (
                  <div className="schedule-item" key={index}>
                    <Select
                      name='week-day'
                      label='Dia da semana'
                      value={scheduleItem.week_day}
                      onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                      name='from' 
                      label='Das' 
                      type='time'
                      value={scheduleItem.from}
                      onChange={e => setScheduleItemValue(index, 'from', e.target.value)} 
                    />

                    <Input 
                      name='to' 
                      label='Até' 
                      type='time'
                      value={scheduleItem.to}
                      onChange={e => setScheduleItemValue(index, 'to', e.target.value)} 
                    />

                  </div>
                )
              })
            }
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt='Aviso importante' />
            Importante! <br />
            Preencha todos os dados
          </p>
            <button type='submit'>
              Salvar cadastro
          </button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm;