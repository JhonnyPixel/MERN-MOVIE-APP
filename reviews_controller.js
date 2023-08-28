const reviewsDao=require('./dao/reviews_dao.js');

class reviewsController{

	static async postReviewApi(req,res,next){
		try{
			const movieId = req.body.movie_id;
			const review = req.body.review;
			const userInfo={
				name: req.body.name,
				_id: req.body.user_id,
			};
			const date = new Date();
			const reviewResponse = await reviewsDao.addReview(movieId,userInfo,review,date);
			res.json({status:"success"});
		}
		catch(e){
			res.status(500).json({error: e.message});
		}

	}
	static async updateReviewApi(req,res,next){
		try{
			const reviewId = req.body.review_id;
			const review= req.body.review;
			const date= new Date();
			const reviewResponse=  await reviewsDao.updateReview(reviewId,req.body.user_id,review,date);
			var {error}=reviewResponse;
			if(error){
				res.status.json({error});
			}
			if(reviewResponse.modifedCount===0){
				throw new Error("unable to update review. User may not be original poster");
			}
			res.json({status:"success"});
		}
		catch(e){
			res.status(500).json({error: e.message});
		}


	}
	static async deleteReviewApi(req,res,next){
		try{
			const reviewId = req.body.review_id;
			const userId= req.body.user_id;
			const reviewResponse = await reviewsDao.deleteReview(reviewId,userId);
			res.json({status:"success"});

		}
		catch(e){
			res.status(500).json({error: e.message});
		}



	}


}

module.exports=reviewsController;
