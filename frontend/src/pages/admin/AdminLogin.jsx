import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../api/client.js";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const data = await api("/api/auth/login", { method: "POST", body: { email, password } });
      localStorage.setItem("tv_token", data.token);
      nav("/admin/dashboard");
    } catch (e2) {
      setErr(e2.message);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2>Admin Login</h2>
      <form onSubmit={submit}>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" type="password" />
        <button type="submit">Login</button>
      </form>
      <p style={{ color: "crimson" }}>{err}</p>
    </div>
  );
}
