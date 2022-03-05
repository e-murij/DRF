import {Link} from 'react-router-dom'
import './Menu.css'

function Menu() {
    return(
     <div class="menu">
        <ul>
            <li> <Link to='/'>Info</Link> </li>
            <li> <Link to='/users'>Users</Link> </li>
            <li> <Link to='/projects'>Projects</Link></li>
            <li> <Link to='/notes'>Note To Do</Link></li>
        </ul>
     </div>
     );
}

export default Menu;