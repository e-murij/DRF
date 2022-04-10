import React from 'react'

class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'name': '',
            'link_repository': '',
            'users': ''
        }
    }

    handleSubmit(event) {
        this.props.newProject(this.state.name, this.state.link_repository, this.state.users)
        event.preventDefault()
    }

    handleUsersChange(event) {
        if (!event.target.selectedOptions) {
            return
        }

        let users = []
        for (let i=0; i < event.target.selectedOptions.length; i++) {
            users.push(parseInt(event.target.selectedOptions.item(i).value))
        }

        this.setState({
            'users': users
        })
    }

    handleNameLinkChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)} >
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    onChange={(event) => this.handleNameLinkChange(event)}
                    value={this.state.name}
                />
                <input
                    type="text"
                    name="link_repository"
                    placeholder="link_repository"
                    onChange={(event) => this.handleNameLinkChange(event)}
                    value={this.state.link_repository}
                />
                <select multiple onChange={(event) => this.handleUsersChange(event)}>
                    {this.props.users.map((user) => <option value={user.id}> {user.first_name} {user.last_name}</option>)}
                </select>
                <input type="submit" value="Create" />
            </form>
        )
    }
}

export default ProjectForm