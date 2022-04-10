import {Link} from 'react-router-dom'
const NoteToDoItem = ({noteToDo, deleteNoteToDo}) => {
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
                <td><button onClick={()=>deleteNoteToDo(noteToDo.id)}>Delete</button></td>
            </tr>
    )
}


const  NoteToDoList = ({noteToDoes, deleteNoteToDo}) => {
    return (
        <div>
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
                <th>
                </th>
                {noteToDoes.map((noteToDo) => <NoteToDoItem noteToDo={noteToDo} deleteNoteToDo={deleteNoteToDo}/>)}
            </table>
             <Link to='/notes/create'>New Note</Link>
        </div>
    )
}

export default NoteToDoList
