
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./components/Root";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root/>}>
    </Route>
  )
)


function App() {
  return (
    <>
       <RouterProvider router={router} />
    </>
  );
}

export default App;
