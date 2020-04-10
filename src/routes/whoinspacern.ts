import * as express from 'express';
import request from 'request-promise';

type SpacePerson = {
  name: string;
  craft: string;
}

type WhoInSpaceAPIResponse = {
  message: string;
  number: number;
  people: SpacePerson[];
}

const whoInSpaceRn = async (req: express.Request, res: express.Response) => {
  console.log('whoinspacern called');
  try {
    const response: WhoInSpaceAPIResponse = await request.get('http://api.open-notify.org/astros.json', {json: true});
    const peopleInSpace = response.number;
    const astronautNames = response.people.map((astronaut) => astronaut.name).join(', ');
    const answer = `There are ${peopleInSpace} people in space right now: ${astronautNames}`;
    res.json({ text: answer, response_type: 'in_channel' });

  } catch(error) {
    console.log('error checking satronauts', error);
    res.status(500).json(error);
  }
};

export default whoInSpaceRn;
