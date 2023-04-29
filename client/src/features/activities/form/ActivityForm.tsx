import React, { ChangeEvent, useState } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  closeForm: () => void;
  activity: Activity | undefined;
  submitting: boolean;
  CreateOrEditActivity: (activity: Activity) => void;
}
const ActivityForm = ({
  closeForm,
  activity: selectedActivity,
  CreateOrEditActivity,
  submitting,
}: Props) => {
  const initialState = selectedActivity ?? {
    id: "",
    title: "",
    category: "",
    description: "",
    date: new Date(Date.now()),
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState<Activity>(initialState);

  function handleSubmit() {
    CreateOrEditActivity(activity);
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }
  return (
    <Segment>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          value={activity.title}
          name="title"
          onChange={handleInputChange}
          placeholder="Title"
        />
        <Form.TextArea
          value={activity.description}
          name="description"
          placeholder="Description"
          onChange={handleInputChange}
        />
        <Form.Input
          value={activity.category}
          name="category"
          onChange={handleInputChange}
          placeholder="Category"
        />
        <Form.Input
          value={activity.date}
          name="date"
          onChange={handleInputChange}
          placeholder="Date"
          type="date"
        />
        <Form.Input
          value={activity.city}
          name="city"
          onChange={handleInputChange}
          placeholder="City"
        />
        <Form.Input
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
          placeholder="Venue"
        />

        <Button
          loading={submitting}
          float="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button onClick={closeForm} float="right" positive content="Cancel" />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
