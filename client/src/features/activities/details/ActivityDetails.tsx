import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";

interface Props {
  activity: Activity;
  cancelSelectActivity: () => void;
  openForm: (id: string) => void;
  deleteActivity: (id: string) => void;
}
const ActivityDetails = ({
  activity,
  cancelSelectActivity,
  openForm,
  deleteActivity,
}: Props) => {
  console.log(activity.category);

  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${activity.category}.jpg`} />

      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span>{activity.date.toISOString().split("T")[0]}</span>
        </Card.Meta>
        <Card.Description>{activity.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            onClick={() => openForm(activity.id)}
            basic
            color="blue"
            content="Edit"
          ></Button>
          <Button
            onClick={cancelSelectActivity}
            basic
            color="grey"
            content="Cancel"
          ></Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default ActivityDetails;
