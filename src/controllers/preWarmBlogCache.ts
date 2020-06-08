import cheerio from 'cheerio';
import request from 'request-promise';

const PRE_WARM_URLS = [
  'https://blog.spexcast.com/'
];

const preWarmBlogCache = async () => {
  console.log('prewarming blog cache');
  const promiseArray = PRE_WARM_URLS.map((uri) => {
    const options = {
      uri,
      method: 'GET',
      transform: (body: string) => cheerio.load(body),
    };
    return request(options);
  });
  try {
    await Promise.all(promiseArray);
    console.log(`${promiseArray.length} blog pages have been pre-warmed`);
  } catch (error) {
    console.log('error fetching blog pages');
    console.log(error);
  }
}

export default preWarmBlogCache;