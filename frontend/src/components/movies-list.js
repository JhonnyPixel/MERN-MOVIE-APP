import React,{useState,useEffect} from 'react';
import MovieDataService from "../services/movies.js";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const MoviesList=(props)=>{
	const [movies,setMovies]=useState([]);
	const [searchTitle,setSearchTitle]=useState("");
	const [searchRating,setSearchRating]=useState("");
	const [ratings,setRatings]=useState(["All Ratings"]);

	useEffect(()=>{
		retrieveMovies();
		retrieveRatings();
	},[]);

	const retrieveMovies=()=>{
		MovieDataService.getAll().then(response=>{
			console.log(response.data);
			setMovies(response.data.movies);
		}).catch(e=>{
			console.log(e);
		})
	}

	const retrieveRatings=()=>{
		MovieDataService.getRatings().then(response=>{
			console.log(response.data);
			setRatings(["All ratings"].concat(response.data));
		}).catch(e=>{
			console.log(e);
		});
	}

	const onChangeSearchTitle = e=>{
		console.log("hei");
		const searchTitle = e.target.value;
		setSearchTitle(searchTitle);
	}
	const onChangeSearchRating = e=>{
		const searchRating = e.target.value;
		setSearchRating(searchRating);
	}

	const find=(query,by)=>{
		MovieDataService.find(query,by)
		.then(response=>{
			console.log(response.data);
			setMovies(response.data.movies);
		})
		.catch(e=>{
			console.log(e);
		});
	}
	const findByTitle=()=>{
		find(searchTitle,"title");
	}
	const findByRating=()=>{
		if(searchRating==="All Ratings"){
			retrieveMovies();
		}
		else{
			find(searchRating,"rated");
		}
	}

	return (
	<>
	<Form>
      <Form.Group className="mb-3">
        <Form.Control type="text" placeholder="Search by title" value={searchTitle} onChange={onChangeSearchTitle}/>
      </Form.Group>

      <Button variant="primary" type="button" onClick={findByTitle}>
        Search
      </Button>

	  <Form.Group className="mb-3">
        <Form.Control as="select" onChange={onChangeSearchRating}>
			{ratings.map(rating=>{
				return <option value={rating}>{rating}</option>
			})}
		</Form.Control>
      </Form.Group>

	  <Button variant="primary" type="button" onClick={findByRating}>
        Search
      </Button>

    </Form>
	<Row>
			{movies.map((movie)=>{
				return(
					<Col>
						<Card style={{ width: '18rem' }}>
      						<Card.Img variant="top" src={movie.poster+"/100px180"} />
      						<Card.Body>
     							<Card.Title>{movie.title}</Card.Title>
        						<Card.Text>
          							Rating: {movie.rated}
        						</Card.Text>
								<Card.Text>
          							{movie.plot}
        						</Card.Text>
								<Link to={"/movies/"+movie._id}>View Reviews</Link>
      						</Card.Body>
    					</Card>
					</Col>
				);				
			})}
	</Row>
	</>
	);



}

export default MoviesList;

