import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", password: "" });

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    try {
      const user = await registerUser(form);
      navigate("/home", { state: { user } });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div>
      <form onSubmit={submit} style={{ maxWidth: "300px", margin: "auto" }}>
        <h1>Register</h1>
        <label>Username</label>
        <input name="name" value={form.name} onChange={update} />
        <br />
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={update}
        />
        <br />
        <button type="submit">Register</button>
      </form>
      <button onClick={() => navigate("/")}>login</button>
    </div>
  );
}
