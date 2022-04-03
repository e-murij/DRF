const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>
            <td>
                {user.is_staff.toString()}
            </td>
             <td>
                {user.is_superuser.toString()}
            </td>
        </tr>
    )
}


const UsersList = ({users}) => {
    return (
        <table>
            <th>
                Username
            </th>
            <th>
                First name
            </th>
            <th>
                Last name
            </th>
            <th>
                Email
            </th>
            <th>
                Is staff
            </th>
            <th>
                Is superuser
            </th>
            {users.map((user) => <UserItem user={user} />)}
        </table>
    )
}

export default UsersList
