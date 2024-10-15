import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { get } from 'lodash';

const SignIn = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById('body').className = 'bg-gradient-primary';
    return () => {
      document.getElementById('body').className = '';
    };
  }, []);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});

  // Redirect to dashboard if profileDetails are populated
  useEffect(() => {
    const timer = setTimeout(() => {
      if (get(props.profileDetails, "customerId", "") != "") {
        console.log("Redirecting to dashboard..."); // Debugging line
        navigate('/dashboard');
      }
    }, 1000); // Delay of 1 second

    return () => clearTimeout(timer);
  }, [props.profileDetails, navigate]); // Ensure you're watching the token specifically

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('email');
    const rememberedPassword = localStorage.getItem('password');
    const rememberMeChecked = localStorage.getItem('rememberMe') === 'true';

    if (rememberMeChecked) {
      setFormData({
        email: rememberedEmail || '',
        password: rememberedPassword || '',
        rememberMe: rememberMeChecked
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: '',
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    if (validate()) {
      if (formData.rememberMe) {
        localStorage.setItem('email', formData.email);
        localStorage.setItem('password', formData.password);
        localStorage.setItem('rememberMe', true);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
      }

      // Dispatch the Redux action with formData
      props.SignInUser(formData)
        .then(() => {
          // Handle success scenario - this can be monitored via useEffect
          console.log("Login successful."); // Debugging line
        })
        .catch((error) => {
          console.error('SignIn error:', error);
          setErrors((prevErrors) => ({
            ...prevErrors,
            loginError: 'Login failed due to a server error',
          }));
        });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center" style={ { minHeight: '100vh' } }>
        <div className="col-xl-6 col-lg-8 col-md-12">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-12">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    <form onSubmit={ handleSignIn } className="user">
                      <div className="form-group">
                        <input
                          type="email"
                          className={ `form-control form-control-user ${errors.email ? 'is-invalid' : ''}` }
                          value={ formData.email }
                          onChange={ handleInputChange }
                          id="email"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email Address..."
                        />
                        { errors.email && <div className="invalid-feedback">{ errors.email }</div> }
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          className={ `form-control form-control-user ${errors.password ? 'is-invalid' : ''}` }
                          value={ formData.password }
                          onChange={ handleInputChange }
                          id="password"
                          placeholder="Password"
                        />
                        { errors.password && <div className="invalid-feedback">{ errors.password }</div> }
                      </div>
                      <div className="form-group">
                        <div className="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="rememberMe"
                            checked={ formData.rememberMe }
                            onChange={ handleInputChange }
                          />
                          <label className="custom-control-label" htmlFor="rememberMe">
                            Remember Me
                          </label>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary btn-user btn-block">
                        Login
                      </button>
                      { errors.loginError && <div className="invalid-feedback d-block">{ errors.loginError }</div> }
                      <hr />
                    </form>
                    <hr />
                    <div className="text-center">
                      <Link className="small" to="/signup">Create an Account!</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
