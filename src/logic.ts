import { Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "./database";
import format from "pg-format";

export const createMovie = async (req: Request, res: Response) => {
    const queryString = `INSERT INTO movies (name, category, duration, price) 
    VALUES ($1, $2, $3, $4)
    RETURNING *;`;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.body.name, req.body.category, req.body.duration, req.body.price]
    };

    const query = await client.query(queryConfig)

    return res.status(201).json(query.rows[0]);
}

export const getMovies = async (req: Request, res: Response) => {

    if (req.query.category) {
        const queryString = `SELECT * FROM movies WHERE category = $1;`;
        const queryConfig: QueryConfig = {
            text: queryString,
            values: [req.query.category]
        }
        const query = await client.query(queryConfig);

        if(query.rowCount === 0){
            const query = await client.query(`SELECT * FROM movies;`)
            return res.status(200).json(query.rows);
        }
        return res.status(200).json(query.rows);

    }else{
        const queryString = `SELECT * FROM movies;`;
        const queryConfig: QueryConfig = {
            text: queryString
        }
        const query = await client.query(queryConfig);
        return res.status(200).json(query.rows);
    }
}

export const getMovie = async (req: Request, res: Response) => {
    const queryString = `SELECT * FROM movies WHERE id = $1;`

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.params.id]
    };

    const query = await client.query(queryConfig)

    return res.status(200).json(query.rows[0])

}

export const updateMovie = async (req: Request, res: Response) => {
    const queryConfig = format(`
        UPDATE movies SET (%I) = ROW (%L) WHERE id = %L RETURNING *;
    `, Object.keys(req.body), Object.values(req.body), req.params.id);

    const query = await client.query(queryConfig)

    return res.status(200).json(query.rows[0])
}

export const deleteMovie = async (req: Request, res: Response) => {
    const queryString = `DELETE FROM movies WHERE id = $1;`;

    const queryConfig: QueryConfig = {
        text: queryString,
        values: [req.params.id]
    }

    await client.query(queryConfig);

    return res.status(204).json();
}