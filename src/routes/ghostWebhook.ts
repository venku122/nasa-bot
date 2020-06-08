import * as express from 'express';
import clearCloudflareCache from '../controllers/clearCloudflareCache';
import preWarmBlogCache from '../controllers/preWarmBlogCache';

const ghostWebhook = async (req: express.Request, res: express.Response) => {
  console.log('ghostWebhook called');
  try {
      await clearCloudflareCache();
      console.log('cloudflare cache purged');
      res.status(200).send({});
  } catch(error) {
    console.log('error purging cloudflare cache', error);
    res.status(500).json(error);
  }
  // wait 30 seconds and pre-load key html for the blog
  setTimeout((preWarmBlogCache), 30000);

};

export default ghostWebhook;