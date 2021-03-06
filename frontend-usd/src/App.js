import "./styles/App.less";
import SiteLayout from "./layout/SiteLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CoursesList from "./pages/CoursesList";
import Course from "./pages/Course";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/register" exact component={Register} />
          <Route path="/login" exact component={Login} />

          <SiteLayout>
            <Route path="/" exact component={Home} />
            <Route path="/courses" exact component={CoursesList} />
            <Route path="/courses/:id" component={Course} />
          </SiteLayout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
