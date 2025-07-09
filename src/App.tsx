import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routeList } from "./routes";
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={routeList.public.layout}>
          {routeList.public.routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>

        {/* Private Routes */}
        <Route element={routeList.private.layout}>
          {routeList.private.routes.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
