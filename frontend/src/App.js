import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import {Switch,Route,Link} from "react-router-dom";
import MoviesList from "./components/movies-list.js";
import Movie from "./components/movie.js";
import Login from "./components/login.js";
import AddReview from "./components/add-reviews.js";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

console.log("ciaooo");

function App() {
  const [user,setUser]=React.useState(null);
  async function login(user=null){
    setUser(user);
  }
  async function logout(){
    setUser(null);
  }
  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Movie Reviews</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              <Link to={"/movies"}>Movies</Link>
            </Nav.Link>
            <Nav.Link>
              {user? (<a onClick={logout}>Logout User</a>):(<Link to={"/login"}>Login</Link>)}
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Switch>
        <Route exact path={["/","/movies"]} component={MoviesList}></Route>
        <Route path="/movies/:id/review" render={(props)=>
          <AddReview {...props} user={user} />
        }></Route>
        <Route path="/movies/:id" render={(props)=>
          <Movie {...props} user={user} />
        }></Route>
          <Route path="/login" render={(props)=>
            <Login {...props} login={login}/>
          }></Route>
      </Switch>
    </div>
  );
}

export default App;
