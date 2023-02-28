import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import parseJwt from '../../utils/jwtUtils';
import fetcher from '../../utils/fetcherUtils';
import './Dashboard.css';

function Dashboard(props) {
  const assignments1 = [
    { id: 1, number: 101, githubUrl: "www.github.com/repo/project101" },
    { id: 2, number: 201, githubUrl: "www.github.com/repo/project201" },
    { id: 3, number: 301, githubUrl: "www.github.com/repo/project301" },
    { id: 4, number: 401, githubUrl: "www.github.com/repo/project401" }
  ];

  const navigate = useNavigate();

  const [assignments, setAssignments] = useState(null);

  useEffect(() => {
    fetcher("api/assignments", "get", props.data)
      .then((assignmentsData) => {
        setAssignments(assignmentsData);
      })
  }, [props.data]);

  function createAssignment(e) {
    e.preventDefault();
    fetcher("api/assignments", "post", props.data)
      .then((assignment) => {
        navigate(`/assignments/${assignment.id}`);
      });
  };

  
  return (
    <div>
      <h1>Dashboard</h1>
      <h3> Welcome {props.data ? parseJwt(props.data)['sub'] : <></>}</h3>
      <button className="create-btn" onClick={(e) => createAssignment(e)}>Make New Assignment</button>
      <div className='assignmentsContainer'>
        {
          assignments1?.map((item) => {
            return (
              <div className='assignmentCard' key={item.id}>
                <h2> Assignment #{item.number}</h2>
                <p>Github URL: {item.githubUrl}</p>
                <button className="edit-btn">Edit</button>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Dashboard;
