// import { observer } from "mobx-react-lite";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
// import { useStore } from "../../../app/stores/store";
import { Activity } from "../../../app/models/activity";
import { Link } from "react-router-dom";
import { SyntheticEvent, useState } from "react";

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

export default (function ActivityList({
  activities,
  selectActivity,
  deleteActivity,
  submitting,
}: Props) {
  //   const { activityStore } = useStore();
  //   const { groupedActivities } = activityStore;
  const [target, setTarget] = useState("");
  function handleActivityDelete(
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) {
    setTarget(event.currentTarget.name);
    deleteActivity(id);
  }

  return (
    <>
      <Segment>
        <Item.Group divided>
          {activities.map((activity) => (
            <Segment.Group key={activity.id}>
              <Segment>
                <Item.Group>
                  <Item>
                    <Item.Content>
                      <Item.Header as={Link} to={`/activities/${activity.id}`}>
                        {activity.title}
                      </Item.Header>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Segment>
              <Segment>
                <span>
                  <Icon name="marker" /> {activity.venue}
                </span>
              </Segment>
              <Segment secondary></Segment>
              <Segment clearing>
                <span style={{ display: "block" }}>{activity.description}</span>
                <Item.Group>
                  <Button
                    // as={Link}
                    // to={`/activities/${activity.id}`}
                    color="teal"
                    floated="right"
                    content="View"
                    onClick={() => selectActivity(activity.id)}
                  />
                  <Button
                    // as={Link}
                    // to={`/activities/${activity.id}`}
                    name={activity.id}
                    loading={submitting && target === activity.id}
                    color="red"
                    floated="right"
                    content="Delete"
                    onClick={(event) =>
                      handleActivityDelete(event, activity.id)
                    }
                  />
                </Item.Group>
              </Segment>
            </Segment.Group>
          ))}
        </Item.Group>
      </Segment>
    </>
  );
});
