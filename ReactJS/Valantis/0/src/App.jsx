import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements
} from "react-router-dom"
import { Shop, shopDataLoader } from "./pages/Shop"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="shop" index element={<Shop />} loader={shopDataLoader} />
    </Route>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
