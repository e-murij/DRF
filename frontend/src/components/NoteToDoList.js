const NoteToDoItem = ({noteToDo}) => {
    const users_list = noteToDo.project.users.map((user) => `${user} `)
    return (
        <tr>
            <td>
                {noteToDo.project.name}
            </td>
            <td>
                {noteToDo.text}
            </td>
            <td>
                {noteToDo.user}
            </td>
            <td>
                {users_list}
            </td>
        </tr>
    )
}


const  NoteToDoList = ({noteToDoes}) => {
    return (
        <table>
            <th>
                project
            </th>
            <th>
                text
            </th>
            <th>
                user
            </th>
            <th>
                users
            </th>
            {noteToDoes.map((noteToDo) => <NoteToDoItem noteToDo={noteToDo} />)}
        </table>
    )
}

export default NoteToDoList
