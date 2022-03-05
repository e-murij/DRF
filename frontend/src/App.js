import React from 'react'
import logo from './logo.svg'
import './App.css'
import UsersList from './components/UsersList.js'
import NoteToDoList from './components/NoteToDoList.js'
import ProjectsList from './components/ProjectsList.js'
import ProjectInfo from './components/ProjectInfo.js'
import Menu from './components/Menu.js'
import Info from './components/Info.js'
import Footer from './components/Footer.js'
import axios from 'axios'
import {BrowserRouter, Route, Routes, Link, useLocation, Navigate} from 'react-router-dom'


const NotFound = () => {
    let location = useLocation()
    return (
        <div> Page {location.pathname} not found </div>
    )
}



class App extends React.Component {
   constructor(props) {
       super(props)
       this.state = {
           'users': [],
           'projects': [],
           'noteToDo': []
       }
   }

   componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data

                this.setState({
                    'users': users
                })
            })
            .catch(error => console.log(error))
        axios
            .get('http://127.0.0.1:8000/api/projects/')
            .then(response => {
                const projects = response.data.results

                this.setState({
                    'projects': projects
                })
            })
            .catch(error => console.log(error))
        axios
            .get('http://127.0.0.1:8000/api/notes/')
            .then(response => {
                const noteToDo = response.data.results

                this.setState({
                    'noteToDo': noteToDo
                })
            })
            .catch(error => console.log(error))
    }

   render () {
       return (
            <div>
                <BrowserRouter>
                    <Menu />
                    <Routes>
                        <Route exact path='/' element = {<Info />} />
                        <Route exact path='/users' element = {<UsersList users={this.state.users} />} />
                        <Route exact path='/projects' element = {<ProjectsList projects={this.state.projects} />} />
                        <Route exact path='/notes' element = {<NoteToDoList noteToDoes={this.state.noteToDo} />} />
                        <Route path='/project/:id' element = {<ProjectInfo projects={this.state.projects} />} />
                        <Route path="*" element = {<NotFound />} />
                    </Routes>
                  <Footer />
                </BrowserRouter>
            </div>
       )
   }
}

export default App;

