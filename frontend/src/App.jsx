import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [val, setVal] = useState({ username: "", password: "" });
  const [mes, setmes] = useState("");
  const [col, setcol] = useState([]);

  const handleChange = (e) => {
    setVal({ ...val, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const g = async () => {
      const a = await fetch("http://localhost:3000/")
      const k = await a.json()
      setcol(k)
    }
    g()
  });

  const del = async (use) => {
    try {
      console.log(use)
      const response = await fetch('http://localhost:3000/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(use)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setmes(data.message);

    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(val),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setmes(data.message);

    } catch (error) {
      console.error('Error:', error);
    }
    console.log(val);
  };

  const update = async (col) => {
    setVal({ username: col.username, password: col.password })
    del(col);
  }

  return (
    <>
      <h1>PASSWORD MANAGER</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label"></label>
          <input
            type="email"
            name="username"
            value={val.username}
            onChange={handleChange}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label"></label>
          <input
            type="password"
            name="password"
            value={val.password}
            onChange={handleChange}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="password"
          />
        </div>
        <div className='status'>{mes}</div>
        <div><button type="submit" className="btn btn-primary">Submit</button></div>
      </form>
      <div>
        <table>
          <tbody>
            <tr>
              <th>Username</th>
              <th>Password</th>
              <th>Delete</th>
              <th>Update</th>
            </tr>
            {col.map((col) => (
              <tr key={col._id}>
                <td>{col.username}</td>
                <td>{"*".repeat((col.password).length)}</td>
                <td><button className='abc' onClick={() => { del(col) }}>Delete</button></td>
                <td><button className='abc' onClick={() => { update(col) }}>Update</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          hghcvjbknm
          <script src="https://cdn.lordicon.com/lordicon.js"></script>
          <lord-icon
            src="https://cdn.lordicon.com/skkahier.json"
            trigger="hover"
            >uoim
          </lord-icon>
        </div>
      </div>
    </>
  );
}

export default App;
