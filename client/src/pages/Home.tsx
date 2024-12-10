import { Link } from "react-router-dom";

const Home = () => {
  


    return(
        <main>
            <h1>Welcome to QwizMe</h1>
        <Link to='/signup'>Sign Up</Link>
        <Link to='/login'>Log In</Link>
        </main>
    );
};

export default Home;