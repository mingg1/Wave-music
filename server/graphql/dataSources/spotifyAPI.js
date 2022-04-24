import { RESTDataSource } from 'apollo-datasource-rest';

class SpotifyAPI extends RESTDataSource {
  constructor() {
    // Always call super()
    super();
    // Sets the base URL for the REST API
    this.baseURL = 'https://api.spotify.com/v1/';
  }

  async getPlayListItems(token, id) {
    const result = await this.get(
      `playlists/${id}/tracks/`,
      {},
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    const items = result.items;
    return items;
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
  async getArtist(token, id) {
    return this.get(
      `artists/${id}`,
      {},
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
  }

  async getSimilarArtists(token, id) {
    return this.get(
      `artists/${id}/related-artists`,
      {},
      { headers: { authorization: `Bearer ${token}` } }
    );
  }

  async getArtistAlbums(token, id) {
    return this.get(
      `artists/${id}/albums`,
      { market: 'US' },
      { headers: { authorization: `Bearer ${token}` } }
    );
  }

  async getArtistsTopTracks(token, id) {
    return this.get(
      `artists/${id}/top-tracks`,
      { market: 'US' },
      { headers: { authorization: `Bearer ${token}` } }
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
