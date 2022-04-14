import { useEffect, useState } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import "./Forms.css";

export const Forms = () => {
  const [formsdata, setFormsdata] = useState({
    username: "",
    age: "",
    address: "",
    department: "",
    salary: "",
    marital: "",
    id: nanoid(4),
  });
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = () => {
    axios.get("http://localhost:3005/formdata").then((res) => {
      //   console.log("res:", res);
      setData(res.data);
    });
  };
  const handleChange = (e) => {
    let { name, value, checked, type } = e.target;
    value = type === "checkbox" ? checked : value;
    setFormsdata({
      ...formsdata,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3005/formdata", formsdata).then(getData);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="username"
          type="text"
          placeholder="Enter Name"
        />
        <input
          onChange={handleChange}
          name="age"
          type="number"
          placeholder="Enter age"
        />
        <input
          onChange={handleChange}
          name="address"
          type="text"
          placeholder="Enter Address"
        />
        <select name="department" onChange={handleChange}>
          <option value="--">--</option>
          <option value="police">Police</option>
          <option value="Doctor">Doctor</option>
          <option value="Teacher">Teacher</option>
          <option value="hardware">Hardware</option>
          <option value="software">Software</option>
        </select>
        <input
          onChange={handleChange}
          name="salary"
          type="number"
          placeholder="Enter salary"
        />
        <input
        className="checkbox"
          type="checkbox"
          checked={formsdata.marital}
          onChange={handleChange}
          name="marital"
        />
        <input className="submit" type="submit" value="submit" />
      </form>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Address</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Marital</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e) => {
              return (
                <tr key={e.id}>
                  <td>{e.username}</td>
                  <td>{e.age}</td>
                  <td>{e.address}</td>
                  <td>{e.department}</td>
                  <td>{e.salary}</td>
                  <td>{e.marital ? "True" : "False"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
