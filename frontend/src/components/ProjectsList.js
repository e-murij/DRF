import {Link} from 'react-router-dom'
const ProjectItem = ({project, deleteProject}) => {
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
            <td><button onClick={()=>deleteProject(project.id)}>Delete</button></td>
        </tr>
    )
}


const ProjectsList = ({projects, deleteProject}) => {
    return (
    <div>
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
            <th>
            </th>
            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
        </table>
        <Link to='/projects/create'>New project</Link>
    </div>
    )
}

export default ProjectsList
