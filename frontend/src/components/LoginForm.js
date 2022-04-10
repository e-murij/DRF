import React from 'react'
import './LoginForm.css'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'login': '',
            'password': ''
        }
    }

    handleSubmit(event) {
        this.props.getToken(this.state.login, this.state.password)
        event.preventDefault()
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
             <div class="registration-cssave">
                    <form onSubmit={(event) => this.handleSubmit(event)} >
                        <h3 class="text-center"> Логин </h3>
                            <div class="form-group">
                                <input class="form-control item" type="text" name="login" maxlength="15" minlength="4" pattern="^[a-zA-Z0-9_.-]*$" id="username" placeholder="Логин" required onChange={(event) => this.handleChange(event)} value={this.state.login}/>
                            </div>
                            <div class="form-group">
                                <input class="form-control item" type="password" name="password" id="password" placeholder="Пароль" required onChange={(event) => this.handleChange(event)} value={this.state.password}/>
                            </div>
                            <div class="form-group">
                                <button class="btn btn-primary btn-block create-account" type="submit" value="Login">Вход в аккаунт</button>
                            </div>
                    </form>
                </div>
        )
    }
}

export default LoginForm