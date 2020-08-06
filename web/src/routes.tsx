import React from 'react'

import { BrowserRouter, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import TeacherList from './pages/TeachersList'
import TeacherForm from './pages/TeacherForm'

const Routes: React.FC = () => {
    return (
        <BrowserRouter>
            <Route path='/' component={Landing} exact />
            <Route path='/study' component={TeacherList} exact />
            <Route path='/give-classes' component={TeacherForm} exact />
        </BrowserRouter>
    )
}

export default Routes