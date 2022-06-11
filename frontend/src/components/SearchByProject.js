import React from 'react'
import axios from 'axios'
import NoteToDoList from './NoteToDoList.js'
import ProjectsList from './ProjectsList.js'

class SearchByProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'name': '',
            'projects':'',
            'noteToDo':''
        }
    }

     searchByProject(name) {
      let headers = this.props.getHeader()
      axios
            .get(`http://127.0.0.1:8000/api/projects/?name=${name}`, {headers})
            .then(response => {
                const projects = response.data.results
                this.setState({
                    'projects': projects
                })
            })
            .catch(error => {
                console.log(error)
      })
      axios
            .get(`http://127.0.0.1:8000/api/notes/?project=${name}`, {headers})
            .then(response => {
                const noteToDo = response.data.results
                this.setState({
                    'noteToDo': noteToDo
                })
            })
            .catch(error => {
                console.log(error)
      })
    }

    handleSubmit(event) {
        this.searchByProject(this.state.name)
        event.preventDefault()
    }

    handleNameChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
        <div>
            <form onSubmit={(event) => this.handleSubmit(event)} >
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    onChange={(event) => this.handleNameChange(event)}
                    value={this.state.name}
                />
                <input type="submit" value="Search" />
            </form>
            <h1> Projects </h1>
            {this.state.projects ? <ProjectsList projects={this.state.projects} deleteProject={(id) => this.props.deleteProject(id)}/> : null}
            <h1> Note to Do </h1>
            {this.state.noteToDo ? <NoteToDoList noteToDoes={this.state.noteToDo} deleteNoteToDo={(id) => this.props.deleteNoteToDo(id)}/> : null}
        </div>
        )

    }
}

export default SearchByProjectForm