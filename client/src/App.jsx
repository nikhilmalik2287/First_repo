import { useEffect, useState } from "react";
import axios from "axios";

const API = "/api/students";
const emptyForm = { name: "", rollNo: "", email: "", course: "", year: "", phone: "" };

export default function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const loadStudents = async (q = "") => {
    try {
      const res = await axios.get(API, { params: q ? { search: q } : {} });
      setStudents(res.data);
    } catch {
      setError("Could not load students. Is the server running?");
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => loadStudents(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const payload = { ...form, year: Number(form.year) };
    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, payload);
      } else {
        await axios.post(API, payload);
      }
      setForm(emptyForm);
      setEditingId(null);
      loadStudents(search);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (s) => {
    setEditingId(s._id);
    setForm({
      name: s.name,
      rollNo: s.rollNo,
      email: s.email,
      course: s.course,
      year: s.year,
      phone: s.phone || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;
    try {
      await axios.delete(`${API}/${id}`);
      loadStudents(search);
    } catch {
      setError("Delete failed");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div className="container">
      <header>
        <h1>Student Management</h1>
        <span className="count">{students.length} students</span>
      </header>

      <form className="card form" onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit student" : "Add student"}</h2>
        <div className="grid">
          <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
          <input name="rollNo" placeholder="Roll number" value={form.rollNo} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="course" placeholder="Course (e.g. B.Tech CSE)" value={form.course} onChange={handleChange} required />
          <select name="year" value={form.year} onChange={handleChange} required>
            <option value="">Year</option>
            {[1, 2, 3, 4, 5].map((y) => (
              <option key={y} value={y}>Year {y}</option>
            ))}
          </select>
          <input name="phone" placeholder="Phone (optional)" value={form.phone} onChange={handleChange} />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="actions">
          <button type="submit">{editingId ? "Update" : "Add student"}</button>
          {editingId && (
            <button type="button" className="secondary" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="card">
        <input
          className="search"
          placeholder="Search by name, roll number or course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {students.length === 0 ? (
          <p className="empty">No students found.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Year</th>
                  <th>Phone</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s._id}>
                    <td>{s.rollNo}</td>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.course}</td>
                    <td>{s.year}</td>
                    <td>{s.phone || "-"}</td>
                    <td className="row-actions">
                      <button className="small" onClick={() => handleEdit(s)}>Edit</button>
                      <button className="small danger" onClick={() => handleDelete(s._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
