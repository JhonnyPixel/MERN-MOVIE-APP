const app=require('./server.js');
const mongodb=require('mongodb');
const dotenv=require('dotenv');
const moviesDao=require('./dao/movies_dao.js');
const reviewsDao=require('./dao/reviews_dao.js');

async function main(){
	dotenv.config({path: __dirname+'/credenziali.env'});
	console.log(process.env.MOVIES_DB_URI);
	const client= new mongodb.MongoClient(process.env.MOVIES_DB_URI);
	const port= process.env.PORT;

	try{
		await client.connect();
		await moviesDao.injectDb(client);
		await reviewsDao.injectDb(client);
		app.listen(port,()=>console.log('connected to db! listen on port: '+port));

	}
	catch(e){
		console.error(e);
	}


}

main().catch(console.error);
