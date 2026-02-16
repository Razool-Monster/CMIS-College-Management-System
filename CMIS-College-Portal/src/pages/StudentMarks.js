import { useEffect, useState } from "react";
import axios from "axios";


function StudentMarks() {

  const [marks, setMarks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {

    const fetchMarks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/marks",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setMarks(response.data);
      } catch (error) {
        console.error("Error fetching marks");
      }
    };

    if (token) {
      fetchMarks();
    }

  }, [token]);   // ✅ fixed dependency warning

  return (
    <div style={{ padding: "40px" }}>
      <h2>Student Marks</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Student Email</th>
            <th>Subject</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>
          {marks.map((mark) => (
            <tr key={mark.id}>
              <td>{mark.studentEmail}</td>
              <td>{mark.subject}</td>
              <td>{mark.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentMarks;
