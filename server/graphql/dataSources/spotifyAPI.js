import { RESTDataSource } from 'apollo-datasource-rest';

class SpotifyAPI extends RESTDataSource {
  constructor() {
    // Always call super()
    super();
    // Sets the base URL for the REST API
    this.baseURL = 'https://api.spotify.com/v1/';
  }

  async getFeaturedPlayList(token) {
    const result = await this.get(
      `browse/featured-playlists`,
      {},
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    const data = result.playlists.items;

    return data;
  }

  // sample id: 7oJoc76R3JMv7dZhxgi7zD
  async getArtist(authorization, id) {
    return this.get(
      `artists/${id}`,
      {},
      {
        headers: { authorization },
      }
    );
  }

  async getSimilarArtists(authorization, id) {
    return this.get(
      `artists/${id}/related-artists`,
      {},
      { headers: { authorization } }
    );
  }

  async getSongs(token) {
    // Send a GET request to the specified endpoint
    console.log('dddd', token);
    //    console.log(this.accessToken);
    return this.get(
      `tracks/6Uj1ctrBOjOas8xZXGqKk4`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}

export default SpotifyAPI;
