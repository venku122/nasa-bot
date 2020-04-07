import express from "express";
const app = express();
const port = 8080; // default port to listen


app.post( "/buzz", ( req, res )  => {
  console.log('buzz called');
  res.json({ text: `${Date.now()} current time`});
} );

// start the Express server
app.listen( port, () => {
    // @ts-ignore
    console.log( `server started at http://localhost:${ port }` );
} );