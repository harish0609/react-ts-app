import { useNavigate } from "react-router-dom";
import "./loginpage.scss"
import { useState } from "react";

const LoginPage = (props: any) => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isNotValid, setIsNotValid] = useState(false);
  const navigate =  useNavigate();

  function validateUser() {
    let isValidUser = usersList.some((user) => (user.name === userName && user.password === password));
    if (isValidUser) {
      navigate('/home')
    } else {
      setIsNotValid(true);
      let timeout = setTimeout(() => {
        setIsNotValid(false);
        clearTimeout(timeout);
      }, 3000);
    }
    console.log(isValidUser)
  }

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Sign in to continue</p>

        <form className="login-form" onSubmit={(e) => {
          e.preventDefault();
        }}>
          <div className="input-group">
            <input type="text" required onChange={e => {
              setUserName(e.target.value);
            }} value={userName}/>
            <label>User Name</label>
          </div>

          <div className="input-group">
            <input type="password" required onChange={e => {
              setPassword(e.target.value);
            }} value={password}/>
            <label>Password</label>
          </div>

          <div className="options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <span className="forgot">Forgot?</span>
          </div>

          <button type="button" onClick={() => {
            validateUser();
          }}>Login</button>
          {isNotValid && <div>Not a Valid User</div>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;


let usersList = [
  {name: "Dhoni", password: "chennai"},
  {name: "Virat", password: "bangalore"},
  {name: "11", password: "12"},
]