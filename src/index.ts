import express from "express";
import bodyParser from 'body-parser';
import whoInSpaceRn from './routes/whoinspacern';
import buzz from './routes/buzz';
import yuri from './routes/yuri';
import ghostWebhook from './routes/ghostWebhook';
import clearCache from './routes/clearCache';

const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.urlencoded({extended: true}))

app.post('/whoinspacern', whoInSpaceRn);

app.post('/buzz', buzz);

app.post('/yuri', yuri);

app.post('/ghost', ghostWebhook);

app.post('/clearCache', clearCache);

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );