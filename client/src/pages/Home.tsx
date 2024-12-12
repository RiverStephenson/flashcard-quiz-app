import { Link } from "react-router-dom";

import "./homepage.css";

const Home = () => {
  return (
    <main className="background">
      <header>
        <h1>Welcome to QwizMe</h1>
      </header>
      <div className="intro">
        <p className="paragraph">
          Hello, and welcome to QwizMe! Create your own flashcards or have them
          generated for you! Once you've got them down take a quiz to test your
          knowledge. Study any topic you like with as many questions as your
          heart desires. Sign up if this is your first time, otherwise go ahead 
          and login to see your saved study topics.
        </p>
      </div>
        <div>
        <p className="linkHolder">
          <Link className="links" to="/signup">
            {" "}
            Sign Up
          </Link>
        </p>
        <p className="linkHolder">
          <Link className="links" to="/login">
            Log In
          </Link>
        </p>
        </div>
     
    </main>
  );
};

export default Home;