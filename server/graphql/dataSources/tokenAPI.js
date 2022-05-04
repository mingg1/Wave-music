import { RESTDataSource } from 'apollo-datasource-rest';

// get access token to get the data from Spotify API

class TokenAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://accounts.spotify.com/api/';
    this.clientId = process.env.SPOTIFY_CLIENT_ID;
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  }

  getToken = async () => {
    const data = await this.post('token', 'grant_type=client_credentials', {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(this.clientId + ':' + this.clientSecret).toString(
            'base64'
          ),
      },
    });
    return data;
  };
}
export default TokenAPI;
