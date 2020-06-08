import request from 'request-promise';

const clearCloudflareCache = () => {
  console.log('calling cloudflare api');
  return request.post('https://api.cloudflare.com/client/v4/zones/2d5e9e3d92ddf3eb07905978e32f9a94/purge_cache',
  {
    json: true,
    body: {"purge_everything":true},
    headers: {
      'Authorization': `Bearer ${process.env.CLOUDFLARE_SECRET}`
  }});
}

export default clearCloudflareCache;
