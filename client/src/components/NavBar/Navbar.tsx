import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const NavBar = () => {
    const nav = useNavigate();

    const handleLogout = () => {
        nav('/')
    }
    return (
        <nav className='mainNav'>
          <Link className='logo' to='/'><p>Q</p></Link>
          <ul>
            <li ><Link className='navLink' to="/categories">Categories</Link></li>
            <li ><Link className='navLink' to="/flashcards">Flashcards</Link></li>
            <li ><Link className='navLink' to="/quiz/javascript">Quiz</Link></li>
            <li><Link className='navLink' to="/create-flashcard">Create Flashcard</Link></li>
          </ul>
          <button className='navLink button'  onClick={handleLogout}>Logout</button>
        </nav>
      );
    };
    
    export default NavBar;
