import {Link} from 'react-router-dom'
const ProjectItem = ({project}) => {
    const users_list = project.users.map((user) => `${user} `)
    return (
        <tr>
            <td>
                <Link to={`/project/${project.id}`} >{project.name}</Link>
            </td>
            <td>
                {project.link_repository}
            </td>
            <td>
                {users_list}
            </td>
        </tr>
    )
}


const ProjectsList = ({projects}) => {
    return (
        <table>
            <th>
                Name
            </th>
            <th>
                Link repository
            </th>
            <th>
                Users
            </th>
            {projects.map((project) => <ProjectItem project={project} />)}
        </table>
    )
}

export default ProjectsList
