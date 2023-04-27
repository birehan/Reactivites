import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function GetActivities() {
      try {
        const response = await axios.get("https://localhost:5000/api/activity");
        setActivities(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    GetActivities();
  }, []);

  return (
    <div>
      <ul>
        {activities.map((activity: any, index) => {
          return <li key={index}>{activity.title}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
