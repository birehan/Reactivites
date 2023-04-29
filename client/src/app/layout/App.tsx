import React, { useState, useEffect, Fragment } from "react";
import { Activity } from "../models/activity";
import { v4 as uuid } from "uuid";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

const HomePage = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function GetActivities() {
      try {
        const response = await agent.Activities.list();
        let activities: Activity[] = [];
        response.forEach((activity) => {
          activity.date = new Date(activity.date);
          let date = new Date(activity.date);

          activities.push(activity);
        });
        setActivities(activities);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    GetActivities();
  }, []);

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
  }
  function handleCancelSelectActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  async function handleCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    console.log(activity);
    activity.date = new Date(activity.date);
    if (activity.id) {
      try {
        await agent.Activities.update(activity);
        setActivities([
          activity,
          ...activities.filter((x) => x.id !== activity.id),
        ]);
      } catch (error) {
        console.log("Update error: ", error);
      }
    } else {
      try {
        activity.id = uuid();
        await agent.Activities.create(activity);
        setActivities([activity, ...activities]);
      } catch (error) {}
    }

    setEditMode(false);
    setSelectedActivity(activity);
    setSubmitting(false);
  }

  async function handleDeleteActivity(id: string) {
    setSubmitting(true);
    try {
      await agent.Activities.delete(id);
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmitting(false);
    } catch (error) {
      console.log("Update error: ", error);
    }
    setActivities([...activities.filter((x) => x.id !== id)]);
  }
  if (loading) {
    return <LoadingComponent content="Loading app" />;
  }
  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          CreateOrEditActivity={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </>
  );
};

export default App;
