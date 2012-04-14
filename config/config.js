/*
I hate having this public! :)
*/
exports.config = {
  //Server settings
  port: 3000,
  host: 'http://localhost',

  //Rdio settings
  rdio_oauth_request: 'http://api.rdio.com/oauth/request_token',
  rdio_oauth_access: 'http://api.rdio.com/oauth/access_token',
  rdio_oauth_auth: 'https://www.rdio.com/oauth/authorize?oauth_token=',
  rdio_api: 'http://api.rdio.com/1/',
  rdio_api_key: 'bhv3ckpuwzexvtgf6gztst3h',
  rdio_api_shared: 'sR4aDBKAgu',
  songs_to_grab: 10,
};
