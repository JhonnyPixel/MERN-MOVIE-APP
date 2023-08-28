const moviesDao=require('./dao/movies_dao.js');

class moviesController{


	static async getMoviesApi(req,res,next){
		const moviesPerPage= req.query.moviesPerPage? Number(req.query.moviesPerPage) : 20;
		const page= req.query.page? Number(req.query.page) : 0;
		const filters={};
		if(req.query.title)
			filters.title=req.query.title;
		else if(req.query.rated)
			filters.rated=req.query.rated;

		const {moviesList,totalNumMovies}=await moviesDao.getMovies({filters, page, moviesPerPage});
		let response={
			movies:moviesList,
			page:page,
			filters:filters,
			enties_per_page: moviesPerPage,
			total_results: totalNumMovies,

		}

		res.json(response);


	}

	static async getMovieByIdApi(req,res,next){
		try{
			let id= req.params.id || {};
			let movie= await moviesDao.getMovieById(id);
			if(!movie){
				res.status(404).json({error : "not found"});
				return;
			}
			res.json(movie);
		}
		catch(e){
			console.log('api'+ e);
			res.status(500).json({error: e});
		}
	}

	static async getRatingsApi(req,res,next){
		try{
			let propertyTypes = await moviesDao.getRatings();
			res.json(propertyTypes);

		}
		catch(e){
			console.log("api "+ e)
			res.status(500).json({error: e});
		}

	}


}

module.exports=moviesController;
