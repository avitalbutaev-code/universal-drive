// pages/Register.jsx
import { useState } from "react";
// import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    // await registerUser(form);  // TODO: server POST /auth/register
  }

  return (
    <div>
      <form onSubmit={submit} style={{ maxWidth: "300px", margin: "auto" }}>
        <h1>Register</h1>
        <br />

        <label>Email</label>
        <input name="email" onChange={update} value={form.email} />
        <br />

        <label>Password</label>
        <input
          name="password"
          type="password"
          onChange={update}
          value={form.password}
        />
        <br />
        <label>Confirm Password</label>
        <input
          name="confirm"
          type="password"
          onChange={update}
          value={form.confirm}
        />
        <br />

        <button type="submit">Create Account</button>
      </form>
      <button onClick={() => navigate("/login")}>login</button>
    </div>
  );
}
