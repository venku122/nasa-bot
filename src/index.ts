import express from "express";
import bodyParser from 'body-parser';
import request from 'request';
const app = express();
const port = 8080; // default port to listen

app.use(bodyParser.urlencoded({extended: true}))

const column1 = [
  'integrated',
  'total',
  'systematized',
  'parallel',
  'functional',
  'responsive',
  'optimal',
  'synchronized',
  'compatible',
  'balanced'
];
const column2 = [
  'management',
  'organizational',
  'monitored',
  'reciprocal',
  'digital',
  'logistical',
  'transitional',
  'incremental',
  'third-generation',
  'policy',
];
const column3 = [
  'options',
  'flexibility',
  'capability',
  'mobility',
  'programming',
  'concept',
  'time-phase',
  'projection',
  'hardware',
  'contingency'
];

function generateBuzzword(text: string): string {
  let numericSeed = Number.parseInt(text, 10);
  if (Number.isNaN(numericSeed)) {
    numericSeed = Math.round((Math.random() * 999) + 1);
  }
  if (numericSeed > 999) {
    numericSeed = 999;
  }
  if (numericSeed < 100 ) {
    numericSeed = 100
  }

  const indices = numericSeed.toString().split('');

  return `${column1[Number.parseInt(indices[0], 10)]} ${column2[Number.parseInt(indices[1], 10)]} ${column3[Number.parseInt(indices[2], 10)]}`
}

app.post('/whoinspacern', (req, res) => {
  console.log('whoinspacern called');
  request.get('http://api.open-notify.org/astros.json', {json: true}, (error, response, body) => {
    if (error) {
      console.log('error checking satronauts', error);
      res.status(500);
    }
    const peopleInSpace = body.number;
    const answer = `There are ${peopleInSpace} people in space right now`;
    res.json({ text: answer, response_type: 'in_channel' });
  });
})

app.post( "/buzz", ( req, res )  => {
  console.log('buzz called');
  try {
    const { body } = req;
    const { text } = body;
    const buzzword = generateBuzzword(text);
    console.log(`Slack sent ${text} and we returned ${buzzword}`);
    res.json({ text: buzzword, response_type: 'in_channel',});
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