// import { observer } from 'mobx-react-lite';
// import React, { useEffect, useState } from 'react';
// import InfiniteScroll from 'react-infinite-scroller';
// import { Grid, Loader } from 'semantic-ui-react';
// import { PagingParams } from '../../../app/models/pagination';
// import { useStore } from '../../../app/stores/store';
// import ActivityFilters from './ActivityFilters';
// import ActivityList from './ActivityList';
// import ActivityListItemPlaceholder from './ActivityListItemPlaceholder';

// export default observer(function ActivityDashboard() {
//     const { activityStore } = useStore();
//     const { loadActivities, activityRegistry, setPagingParams, pagination } = activityStore;
//     const [loadingNext, setLoadingNext] = useState(false);

//     function handleGetNext() {
//         setLoadingNext(true);
//         setPagingParams(new PagingParams(pagination!.currentPage + 1))
//         loadActivities().then(() => setLoadingNext(false));
//     }

//     useEffect(() => {
//         if (activityRegistry.size <= 1) loadActivities();
//     }, [activityRegistry.size, loadActivities])

//     return (
//         <Grid>
//             <Grid.Column width='10'>
//                 {activityStore.loadingInitial && !loadingNext ? (
//                     <>
//                         <ActivityListItemPlaceholder />
//                         <ActivityListItemPlaceholder />
//                     </>
//                 ) : (
//                         <InfiniteScroll
//                             pageStart={0}
//                             loadMore={handleGetNext}
//                             hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
//                             initialLoad={false}
//                         >
//                             <ActivityList />
//                         </InfiniteScroll>
//                     )}
//             </Grid.Column>
//             <Grid.Column width='6'>
//                 <ActivityFilters />
//             </Grid.Column>
//             <Grid.Column width={10}>
//                 <Loader active={loadingNext} />
//             </Grid.Column>
//         </Grid>
//     )
// })

import React from "react";
import { Activity } from "../../../app/models/activity";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";

interface Props {
  activities: Activity[];
  selectActivity: (id: string) => void;
  deleteActivity: (id: string) => void;
  cancelSelectActivity: () => void;
  editMode: boolean;
  openForm: (id: string) => void;
  closeForm: () => void;
  selectedActivity: Activity | undefined;
  submitting: boolean;

  CreateOrEditActivity: (activity: Activity) => void;
}

const ActivityDashboard = ({
  activities,
  selectedActivity,
  selectActivity,
  cancelSelectActivity,
  editMode,
  openForm,
  closeForm,
  CreateOrEditActivity,
  deleteActivity,
  submitting,
}: Props) => {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          deleteActivity={deleteActivity}
          activities={activities}
          selectActivity={selectActivity}
          submitting={submitting}
        />
      </Grid.Column>

      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            cancelSelectActivity={cancelSelectActivity}
            openForm={openForm}
            deleteActivity={deleteActivity}
          />
        )}
        {editMode && (
          <ActivityForm
            submitting={submitting}
            CreateOrEditActivity={CreateOrEditActivity}
            closeForm={closeForm}
            activity={selectedActivity}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};
export default ActivityDashboard;
