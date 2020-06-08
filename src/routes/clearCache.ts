import * as express from 'express';
import clearCloudflareCache from '../controllers/clearCloudflareCache';
import preWarmBlogCache from '../controllers/preWarmBlogCache';

const NOT_FOUND_RESPONSE = Object.freeze({
  response_type: 'ephemeral',
  text: 'There was an issue clearing the cloudflare cache. Please check the ghost logs.',
});

const clearCache = async (req: express.Request, res: express.Response) => {
  try {
    console.log('clearing cloudflare cache via slack command');
    await clearCloudflareCache();
    const botPayload = {
      response_type: 'in_channel',
      text: `Cloudflare cache has been cleared for https://blog.spexcast.com/`,
      mrkdwn: true,
    };
    console.log('Cloudflare cached cleared via slack command');
    res.json(botPayload);
  } catch (error) {
    console.log('Issue clearing Cloudflare cache via slack command');
    console.log(error);
    return res.status(200).json(NOT_FOUND_RESPONSE);
  }
  setTimeout((preWarmBlogCache), 30000);
};

export default clearCache;
