import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import QrTimekeepingPage from "../pages/QrTimekeepingPage";
import TimekeepingFormPage from "../pages/TimekeepingFormPage";

const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <QrTimekeepingPage />
      },
      {
        path: 'timekeeping/:uuid',
        element: <TimekeepingFormPage />
      }
    ]
  }
]);

export default AppRoutes;
