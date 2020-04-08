import * as express from 'express';

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
  let lookupString = text;
  if (!text || lookupString.length < 3 || /[\D]/gi.test(lookupString)) {
    lookupString = Math.round((Math.random() * 999) + 1).toString();
  }

  if (lookupString.length > 3) {
    lookupString = lookupString.slice(0, 3);
  }
  console.log('www', lookupString);

  const indices = lookupString.split('');

  return `${column1[Number.parseInt(indices[0], 10)]} ${column2[Number.parseInt(indices[1], 10)]} ${column3[Number.parseInt(indices[2], 10)]}`
}

const buzz =  ( req: express.Request, res: express.Response )  => {
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
}

export default buzz;