import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";
import "react-calendar/dist/Calendar.css";
import 'react-toastify/dist/ReactToastify.min.css';
import { StoreContext, store } from "./app/stores/store";
import "./app/layout/styles.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/routes/Routes";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>
);

reportWebVitals();
