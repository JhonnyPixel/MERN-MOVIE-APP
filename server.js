const express=require('express');
const router=require('./routes/movie_routes.js');
const app=express();
const cors=require('cors');

app.use(cors({
	origin:"http://localhost:3000"	
}));
app.use(express.json()); //middleware interno di express per facilitare il recupero di dati json con req.body
app.use('/api/v1/movies',router);

app.get('*',(req,res)=>{

	res.status(404).json({message: "pagina non trovata"});

});


module.exports = app;
