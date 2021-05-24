import './styles/App.less';
import SiteLayout from './layout/SiteLayout';
import Home from './pages/Home';
import CoursesList from './pages/CoursesList';
import Course from './pages/Course';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <SiteLayout>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/courses" exact component={CoursesList} />
            <Route path="/courses/:id" component={Course} />
          </Switch>
        </SiteLayout>
      </Router>
    </div>
  );
}

export default App;
