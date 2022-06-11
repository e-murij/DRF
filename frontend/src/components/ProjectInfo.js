import {useParams} from 'react-router-dom'


const ProjectInfo = ({projects}) => {
    var {id} = useParams()
    var filteredProject = projects.filter( project =>  project.id === parseInt(id))
    var users_list = filteredProject[0].users.map((user) => `${user} `)
    return (
        <div>
             <table>
                <th> Name </th>
                <th> Link repository </th>
                <th> Users </th>
                <tr>
                    <td> {filteredProject[0].name} </td>
                    <td> {filteredProject[0].link_repository} </td>
                    <td> {users_list} </td>
                 </tr>
             </table>
         </div>
    )
}

export default ProjectInfo;