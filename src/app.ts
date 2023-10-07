import express from "express";
import "dotenv/config";
import { conectionDataBase } from "./database";
import { createMovie, deleteMovie, getMovie, getMovies, updateMovie } from "./logic";
import { IsNameValid, isValidMovie } from "./middlewares";

const app = express();
app.use(express.json());

const PORT = 3000;

app.post("/movies",IsNameValid,createMovie);
app.get("/movies",getMovies);
app.get("/movies/:id",isValidMovie,getMovie);
app.patch("/movies/:id",isValidMovie,IsNameValid,updateMovie);
app.delete("/movies/:id",isValidMovie,deleteMovie)

app.listen(PORT, async () => {    
    console.log(`API started sucessfully in port ${PORT}`)
    await conectionDataBase()
});