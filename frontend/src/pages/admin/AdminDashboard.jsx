import { useEffect, useState } from "react";
import { api } from "../../api/client.js";

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [err, setErr] = useState("");
  const token = localStorage.getItem("tv_token");

  useEffect(() => {
    (async () => {
      try {
        const data = await api("/api/leads", { token });
        setLeads(data);
      } catch (e) {
        setErr(e.message);
      }
    })();
  }, []);

  return (
    <div style={{ maxWidth: 900, margin: "40px auto" }}>
      <h2>Leads</h2>
      {err ? <p style={{ color: "crimson" }}>{err}</p> : null}
      <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Service</th><th>Status</th><th>Date</th></tr>
        </thead>
        <tbody>
          {leads.map((l) => (
            <tr key={l._id}>
              <td>{l.name}</td>
              <td>{l.email}</td>
              <td>{l.service}</td>
              <td>{l.status}</td>
              <td>{new Date(l.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
