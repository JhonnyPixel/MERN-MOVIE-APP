let movies;
const {ObjectId}=require("mongodb");
class moviesDao{

	static async injectDb(client){
		if(movies)
			return;
		try{
			movies=await client.db(process.env.MOVIES_DB_NAME).collection('movies');
		}
		catch(e){
			console.error(e);
			console.log("error in injectting db in moviesDao...");
		}


	}

	static async getMovies({filters=null,page=0,moviesPerPage=20}={}){
		let query={};
		if(filters){
			if("title" in filters)
				query={$text: {$search: filters.title }};
			else if("rated" in filters)
				query={"rated":{$eq:filters.rated}};
		}
		let cursor;
		try{
			cursor=await movies.find(query).limit(moviesPerPage).skip(page * moviesPerPage);
			const moviesList=await cursor.toArray();
			const totalNumMovies = await movies.countDocuments(query);
			return {moviesList,totalNumMovies};
		}
		catch(e){
			console.error("unable to execute find command in moviesDao" + e);
			return {moviesList:[],totalNumMovies:0};
		}

	}

	static async getRatings(){
		let ratings=[];
		try{
			ratings=await movies.distinct("rated");
			return ratings;
		}
		catch(e){
			console.error("unable to get ratings "+e);
			return ratings;
		}
	}

	static async getMovieById(id){
		try{
			return await movies.aggregate([{$match: {_id: new ObjectId(id)}},{$lookup:{from:"reviews",localField:"_id",foreignField:"movie_id",as:"reviews"}}]).next();
		}
		catch(e){
			console.error("something went wrong in getMovieById: "+e);
			throw e;
		}
	}




}

module.exports=moviesDao;
