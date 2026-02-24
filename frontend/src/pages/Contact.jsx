import { useState } from "react";
import { api } from "../api/client.js";

export default function Contact() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", service:"", budget:"", message:"" });
  const [msg, setMsg] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg("Sending...");
    try {
      await api("/api/leads", { method: "POST", body: form });
      setMsg("Thanks! We will contact you soon.");
      setForm({ name:"", email:"", phone:"", service:"", budget:"", message:"" });
    } catch (err) {
      setMsg(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: "40px auto" }}>
      <h2>Contact Techvera</h2>
      <form onSubmit={submit}>
        <input name="name" value={form.name} onChange={onChange} placeholder="Name" required />
        <input name="email" value={form.email} onChange={onChange} placeholder="Email" required />
        <input name="phone" value={form.phone} onChange={onChange} placeholder="Phone" />
        <input name="service" value={form.service} onChange={onChange} placeholder="Service (SEO / Website / Ads)" />
        <input name="budget" value={form.budget} onChange={onChange} placeholder="Budget" />
        <textarea name="message" value={form.message} onChange={onChange} placeholder="Message" />
        <button type="submit">Submit</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
