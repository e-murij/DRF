import React from 'react'

class NoteToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'project': '',
            'text': '',
            'user': ''
        }
    }

    handleSubmit(event) {
        this.props.newNoteToDo(this.state.project, this.state.text, this.state.user)
        event.preventDefault()
    }

    handleUserProjectChange(event) {
        console.log(event.target.value, event.target.name)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleTextChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)} >
                <input
                    type="text"
                    name="text"
                    placeholder="text"
                    onChange={(event) => this.handleTextChange(event)}
                    value={this.state.text}
                />
                <select name="user" onChange={(event) => this.handleUserProjectChange(event)}>
                    {this.props.users.map((user) => <option value={user.id}> {user.first_name} {user.last_name}</option>)}
                </select>
                <select name="project" onChange={(event) => this.handleUserProjectChange(event)}>
                    {this.props.projects.map((project) => <option value={project.id}> {project.name}</option>)}
                </select>
                <input type="submit" value="Create" />
            </form>
        )
    }
}

export default NoteToDoForm