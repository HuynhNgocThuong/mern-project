import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './components/layout/Landing';
import About from './components/view/About';
import Auth from './components/view/Auth';
import Dashboard from './components/view/Dashboard';
import AuthContextProvider from './contexts/AuthContext';
import PostContextProvider from './contexts/PostContext';
import ProtectedRoute from './routing/ProtectedRoute';
function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing}></Route>
            <Route
              exact
              path="/login"
              render={(props) => <Auth {...props} authRoute="login" />}></Route>
            <Route
              exact
              path="/register"
              render={(props) => (
                <Auth {...props} authRoute="register" />
              )}></Route>
            <ProtectedRoute
              exact
              path="/dashboard"
              component={Dashboard}></ProtectedRoute>
            <ProtectedRoute
              exact
              path="/about"
              component={About}></ProtectedRoute>
          </Switch>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
