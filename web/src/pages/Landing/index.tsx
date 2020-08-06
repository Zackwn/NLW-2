import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import LogoImg from '../../assets/images/logo.svg'
import LandingImg from '../../assets/images/landing.svg'

import studyIcon from '../../assets/images/icons/study.svg'
import giveClassesIcon from '../../assets/images/icons/give-classes.svg'
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg'

import { api } from '../../services/api';

import './styles.css'

const Landing: React.FC = () => {

  const [loading, setLoading] = useState(false)
  const [totalConnections, setTotalConnections] = useState('')

  useEffect(() => {
    setLoading(true)
    api.get('/total-connections').then(response => {
      setTotalConnections(response.data.total)
      setLoading(false)
    })
  }, [])

  // if (loading) {
  //   return (
  //     <div id="page-landing-content" className="container">
  //       <p>Aguarde, carregando...</p>
  //     </div>
  //   )
  // }

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={LogoImg} alt="Proffy" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img
          src={LandingImg}
          alt='Plataforma de Estudos'
          className='hero-image'
        />

        <div className='buttons-container'>
          <Link to='/study' className='study'>
            <img src={studyIcon} alt="Estudar" />
            Estudar
          </Link>

          <Link to='/give-classes' className='give-classes'>
            <img src={giveClassesIcon} alt="Dar aulas" />
            Dar aulas
          </Link>
        </div>
        {
          loading
            ? <span className='total-connections'>
              Carregando...
              <img src={purpleHeartIcon} alt="Coração roxo" />
            </span>
            : <span className='total-connections'>
              Total de {totalConnections} conexões já realizadas
                <img src={purpleHeartIcon} alt="Coração roxo" />
            </span>
        }
      </div>
    </div>
  )
}

export default Landing;