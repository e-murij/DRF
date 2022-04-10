import React from 'react'
import logo from './logo.svg'
import './App.css'
import UsersList from './components/UsersList.js'
import NoteToDoList from './components/NoteToDoList.js'
import ProjectsList from './components/ProjectsList.js'
import ProjectInfo from './components/ProjectInfo.js'
import LoginForm from './components/LoginForm.js'
import ProjectForm from './components/ProjectForm.js'
import NoteToDoForm from './components/NoteToDoForm.js'
import SearchByProjectForm from './components/SearchByProject.js'
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
                    console.log(users)
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
            .get('http://127.0.0.1:8000/api/notes/?is_active=True', {headers})
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
                'Authorization': 'Token ' + this.state.token,
                'Accept': 'application/json; version=2.0'
            }
        }
        return {
            'Accept': 'application/json; version=2.0'
        }
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
        if ((firstName) && (firstName['first_name'])) {
         return firstName['first_name']
        }
        if (firstName) {
         return firstName['username']
        }

    }

    deleteNoteToDo(id) {
        const headers = this.getHeader()
        axios
            .delete(`http://127.0.0.1:8000/api/notes/${id}`, {headers, headers})
            .then(response => {
                this.setState({noteToDo: this.state.noteToDo.filter((item)=>item.id !==id)})})
            .catch(error => console.log(error))
    }

    deleteProject(id) {
        const headers = this.getHeader()
        axios
            .delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers, headers})
            .then(response => {
                this.setState({projects: this.state.projects.filter((item)=>item.id !==id)})})
            .catch(error => console.log(error))
    }

   newProject(name, link_repository, users) {
       let headers = this.getHeader()
       axios
            .post('http://127.0.0.1:8000/api/projects/', {'name': name, 'link_repository': link_repository, 'users': users }, {headers})
            .then(response => {
                this.getData()
            })
            .catch(error => {
                console.log(error)
       })
    }

   newNoteToDo(project, text, user) {
      let headers = this.getHeader()
      axios
            .post('http://127.0.0.1:8000/api/notes/', {'project': project, 'text': text, 'user': user }, {headers})
            .then(response => {
                this.getData()
            })
            .catch(error => {
                console.log(error)
      })
    }

    searchByProject(name) {
      let headers = this.getHeader()
      axios
            .get(`http://127.0.0.1:8000/api/projects/?name=${name}`, {headers})
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
      })
    }

   render () {
       return (
            <div>
                <BrowserRouter>
                    <li>
                        { this.isAuth() ? <div> Привет, { this.getUserName() } </div> : <div> Привет </div> }
                        { this.isAuth() ? <button onClick={()=>this.logout()}> Выход </button> : <button> <Link to='/login'> Вход </Link> </button>}
                    </li>
                    <Menu />
                    <Routes>
                        <Route exact path='/' element = {<Info />} />
                        <Route exact path='/users' element = {<UsersList users={this.state.users} />} />
                        <Route exact path='/projects' element = {<ProjectsList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)}/>} />
                        <Route exact path='/projects/create' element = {<ProjectForm users={this.state.users} newProject={(name, link_repository, users) => this.newProject(name, link_repository, users)}/>} />
                        <Route exact path='/notes'  element = {<NoteToDoList noteToDoes={this.state.noteToDo} deleteNoteToDo={(id) => this.deleteNoteToDo(id)}/>} />
                        <Route exact path='/notes/create' element = {<NoteToDoForm users={this.state.users} projects={this.state.projects} newNoteToDo={(project, text, user) => this.newNoteToDo(project, text, user)}/>} />
                        <Route exact path='/search' element = {<SearchByProjectForm  getHeader={() => this.getHeader()} deleteProject={(id) => this.deleteProject(id)}/>} />
                        <Route path='/project/:id' element = {<ProjectInfo projects={this.state.projects} />} />
                        <Route exact path='/login' element = {<LoginForm getToken={(login, password) => this.getToken(login, password)} />} />
                        <Route path="*" element = {<NotFound />} />
                    </Routes>
                  <Footer />
                </BrowserRouter>
            </div>
       )
   }
}

export default App;

