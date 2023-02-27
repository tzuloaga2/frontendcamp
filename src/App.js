import './App.css';
import { useEffect } from 'react';
import { useLocalState } from './utils/useLocalState';
import { Route, Routes} from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import AssigmentView from './components/AssignmentView';
import parseJwt from './utils/jwtUtils';

function App() {

  // jwt ? parseJwt(jwt)["authorities"][0] == "ROLE_LEARNER" ? <LearnerAssignmentView /> : <CodeReviewerAssigmentView />

  const [jwt, setJwt] = useLocalState("", "jwt")


  return (
    <div className = "App">
      <Routes>
        <Route path= "/login" element ={<Login />} />
        <Route path= "/dashboard" element ={<PrivateRoute><Dashboard data = {jwt} /></PrivateRoute>} />
        <Route path= "/assigments/:id" element ={<PrivateRoute><AssigmentView data = {jwt} /></PrivateRoute>} />
        <Route path= "/" element ={<HomePage/>} />
      </Routes>
    </div>
  );

}

export default App;
