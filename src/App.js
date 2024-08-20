import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch data based on the search term
    fetch(`http://localhost:3002/customers?name=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, [searchTerm]); // Refetch data whenever the searchTerm changes

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
      {data.length > 0 && (
        <table className="customer-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
              <th>Mobile No</th>
              <th>Occupation</th>
              <th>Date of Birth</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i}>
                <td>{d.First_name}</td>
                <td>{d.Last_name}</td>
                <td>{d.city}</td>
                <td>{d.mobile_no}</td>
                <td>{d.occupation}</td>
                <td>{d.dob}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
