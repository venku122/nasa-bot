import * as express from 'express';
import request from 'request-promise';

type Link = {
  rel: string;
  href: string;
  render: string;
}

type ResourceData = {
  title?: string;
  center?: string;
  nasa_id?: string;
  date_created?: string;
  keywords?: string[];
  location?: string;
  description?: string;
  media_type: string;
}

type SpaceResource = {
  links: Link[];
  href: string;
  data: ResourceData[]
}

type NASAImageAPIResponse = {
  collection: {
    items: SpaceResource[]
  };
  version: string;
  href: string;
  metadata: {
    total_hits: number;
  }

}


const NASA_URL = 'https://images-api.nasa.gov';

const NOT_FOUND_RESPONSE = Object.freeze({
  response_type: 'ephemeral',
  text: 'There was an issue with your query',
  attachments: [
    {
      image_url: 'https://picsum.photos/200'
    }
  ]
});

const yuri = async (req: express.Request, res: express.Response) => {

  const { text } = req.body;

  if (!text) {
    return res.status(200).json(NOT_FOUND_RESPONSE);
  }

  try {
    const response: NASAImageAPIResponse = await request(`${NASA_URL}/search?q=${encodeURI(text)}&media_type=image`, {json: true});

    if (response?.metadata?.total_hits === 0) {
      return res.status(200).json(NOT_FOUND_RESPONSE);
    }

    const href = response.collection.items[0].links[0].href;
    const title = response.collection.items[0].data[0].title;
    const description = response.collection.items[0].data[0].description;
    const botPayload = {
      response_type: 'in_channel',
      text: `${title}`,
      mrkdwn: true,
      attachments: [
        {
          image_url: href,
        },
        {
          text: description
        }
      ]
    };

    return res.json(botPayload);

  } catch (error) {
    return res.status(200).json(NOT_FOUND_RESPONSE);
  }
};

export default yuri;