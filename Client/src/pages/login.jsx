// // pages/Login.jsx
// import { useState } from "react";
// // import { loginUser } from "../api";
// import { useNavigate } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({ email: "", password: "" });

//   function update(e) {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   }

//   async function submit() {
//     // e.preventDefault();
//     // await loginUser(form);   // TODO: server POST /auth/login
//     navigate("/home");
//   }

//   return (
//     <div>
//       <form onSubmit={submit} style={{ maxWidth: "300px", margin: "auto" }}>
//         <h1>Login</h1>
//         <br />

//         <label>Email</label>
//         <input name="email" onChange={update} value={form.email} />
//         <br />
//         <label>Password</label>
//         <input
//           name="password"
//           type="password"
//           onChange={update}
//           value={form.password}
//         />
//         <br />

//         <button type="submit">Login</button>
//       </form>
//       <button onClick={() => navigate("/register")}>register</button>
//       <button onClick={() => navigate("/home")}>home</button>
//     </div>
//   );
// }

import { useState } from "react";
// import { loginUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();

    // TODO: call server POST /auth/login
    // const userData = await loginUser(form);
    const userData = { username: form.username, id: "temp-id" };
    localStorage.setItem("currentUser", JSON.stringify(userData));

    // For now, simulate successful login:

    // Navigate to Home and pass user as state
    navigate("/home", { state: { user: userData } });
  }

  return (
    <div>
      <form onSubmit={submit} style={{ maxWidth: "300px", margin: "auto" }}>
        <h1>Login</h1>
        <label>username</label>
        <input name="text" onChange={update} value={form.username} />
        <br />
        <label>Password</label>
        <input
          name="password"
          type="password"
          onChange={update}
          value={form.password}
        />
        <br />
        <button type="submit">Login</button>
      </form>

      <button onClick={() => navigate("/register")}>Register</button>
    </div>
  );
}
