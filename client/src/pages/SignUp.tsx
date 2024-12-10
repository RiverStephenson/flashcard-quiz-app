import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import'./SignUp.css';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
    const [formState, setFormState] = useState({
      email: '',
      password: '',
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { input: { ...formState } },
      });

      Auth.login(data.addUser.token)
    } catch (error) {
      console.error(error)
    }
  };

  return (
    <main>
      <div className= "addUser">
        <h4>Sign Up</h4>
      {data ? (
        <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit} className= "userForm">
                <div className= "inputGroup">
                  <label htmlFor="email">Email:</label>
                
                  <input
                    className="form-input"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  
                  <label htmlFor="password">Password:</label>
                  
                  <input
                    className="form-input"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                  <button
                    className="btn btn-block btn-primary"
                    style={{ cursor: 'pointer' }}
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}

            {error && (
              <div className="error">
                {error.message}
              </div>
            )}
            <div className= "login">
              <p>Already have an account?</p>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </div>
        </div>
    </main>
  );
};

export default Signup;