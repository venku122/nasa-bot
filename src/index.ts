import express from "express";
import bodyParser from 'body-parser';
const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.urlencoded({extended: true}))



app.post( "/buzz", ( req, res )  => {
  console.log('buzz called');
  console.log('request');
  console.log(req);
  try {
    const { body } = req;
    const { text } = body;
    res.json({ text: `current time -${Date.now()}, sent ${text}`});
  } catch (error) {
    console.log('error ', error);
    res.status(400).send(error);
  }

} );

// start the Express server
app.listen( port, () => {
    // @ts-ignore
    console.log( `server started at http://localhost:${ port }` );
} );