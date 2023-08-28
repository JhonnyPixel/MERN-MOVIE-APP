const express=require('express');
const moviesController=require('../movies_controller.js');
const reviewsController=require('../reviews_controller.js');
const router= express.Router(); //mi serve il router


router.get('/',moviesController.getMoviesApi,(req,res)=>{});

router.post('/review',reviewsController.postReviewApi,(req,res)=>{});

router.put('/review',reviewsController.updateReviewApi,(req,res)=>{});

router.delete('/review',reviewsController.deleteReviewApi,(req,res)=>{});

router.get('/id/:id',moviesController.getMovieByIdApi,(req,res)=>{});

router.get('/ratings',moviesController.getRatingsApi,(req,res)=>{});



module.exports=router;
