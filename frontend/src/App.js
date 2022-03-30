import React from 'react'
import logo from './logo.svg'
import './App.css'
import UsersList from './components/UsersList.js'
import NoteToDoList from './components/NoteToDoList.js'
import ProjectsList from './components/ProjectsList.js'
import ProjectInfo from './components/ProjectInfo.js'
import LoginForm from './components/LoginForm.js'
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
           'noteToDo': [],
           'token': ''
       }
   }

   getData() {
        let headers = this.getHeader()
        axios
            .get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                const users = response.data

                this.setState({
                    'users': users
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'users': []
                })
            })
        axios
            .get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                const projects = response.data.results

                this.setState({
                    'projects': projects
                })
            })
            .catch(error => {
                console.log(error)
                this.setState({
                    'projects': []
                })
            })
        axios
            .get('http://127.0.0.1:8000/api/notes/', {headers})
            .then(response => {
                const noteToDo = response.data.results

                this.setState({
                    'noteToDo': noteToDo
                })
            })
             .catch(error => {
                console.log(error)
                this.setState({
                    'noteToDo': []
                })
            })
    }


    componentDidMount() {
        let token = localStorage.getItem('token')
        this.setState({
            'token': token
        }, this.getData)
    }

    isAuth() {
        return !!this.state.token
    }

    getHeader() {
        if (this.isAuth()) {
            return {
                'Authorization': 'Token ' + this.state.token
            }
        }
        return {}
    }

    getToken(login, password) {
        console.log(login, password)
        axios
            .post('http://127.0.0.1:8000/api-auth-token/', {'username': login, 'password': password})
            .then(response => {
                const token = response.data.token
                localStorage.setItem('token', token)
                localStorage.setItem('username', login)
                this.setState({
                    'token': token,
                }, this.getData)
            })
            .catch(error => console.log(error))
    }

    logout() {
        localStorage.setItem('token', '')
        this.setState({
            'token': '',
        }, this.getData)
    }

    getUserName(){
        let firstName = this.state.users.find(el => el['username'] === localStorage.getItem('username'))
        if (firstName) {
         return firstName['first_name']
        }

    }

   render () {
       return (
            <div>
                <BrowserRouter>
                     <li>
                        { this.isAuth() ? <div class='raz'> Привет, { this.getUserName() } </div> : <div> Привет </div> }
                    </li>
                    <Menu />
                    <Routes>
                        <Route exact path='/' element = {<Info />} />
                        <Route exact path='/users' element = {<UsersList users={this.state.users} />} />
                        <Route exact path='/projects' element = {<ProjectsList projects={this.state.projects} />} />
                        <Route exact path='/notes' element = {<NoteToDoList noteToDoes={this.state.noteToDo} />} />
                        <Route path='/project/:id' element = {<ProjectInfo projects={this.state.projects} />} />
                        <Route exact path='/login' element = {<LoginForm getToken={(login, password) => this.getToken(login, password)} />} />
                        <Route path="*" element = {<NotFound />} />
                    </Routes>
                    <li>
                        { this.isAuth() ? <button class="btn btn-primary btn-block create-account" onClick={()=>this.logout()}> Выход </button> : <Link to='/login'> Вход </Link> }
                    </li>

                  <Footer />
                </BrowserRouter>
            </div>
       )
   }
}

export default App;

