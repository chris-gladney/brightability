import { Link } from "react-router-dom";

function LoginForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form>
        <label for="username">UserName:</label>
        <br />
        <input type="text" id="username" name="username"></input>
        <br />
        <label for="password">Password:</label>
        <br />
        <input type="password" id="password" name="password"></input>
        <br />
        <Link to="/authenticated">
          <button>Login</button>
        </Link>
      </form>
    </>
  );
}

export default LoginForm;
