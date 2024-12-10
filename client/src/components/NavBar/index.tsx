import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    const nav = useNavigate();

    const handleLogout = () => {
        nav('/')
    }
    return (
        <nav>
          <p className='logo'>Q</p>
          <ul>
            <li ><Link to="/categories">Categories</Link></li>
            <li ><Link to="/flashcards">Flashcards</Link></li>
            <li ><Link to="/quiz">Quiz</Link></li>
          </ul>
          <button onClick={handleLogout}>Logout</button>
        </nav>
      );
    };
    
    export default NavBar;