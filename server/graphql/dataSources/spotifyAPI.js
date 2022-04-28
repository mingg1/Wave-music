import { RESTDataSource } from 'apollo-datasource-rest';

class SpotifyAPI extends RESTDataSource {
  constructor() {
    // Always call super()
    super();
    // Sets the base URL for the REST API
    this.baseURL = 'https://api.spotify.com/v1/';
  }

  async search(token, query, type) {
    const result = await this.get(
      `search`,
      {
        q: query,
        type,
        limit: 20,
        market: 'US',
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    return result;
  }

  async getAlbumTracks(token, id) {
    const result = await this.get(
      `albums/${id}/tracks`,
      {
        limit: 50,
        market: 'US',
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    return result.items;
  }

  async getNewAlbums(token) {
    const result = await this.get(
      `browse/new-releases`,
      {
        limit: 50,
        country: 'US',
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    return result.albums.items;
  }

  async getAlbums(token, albums) {
    const result = await this.get(
      `albums`,
      {
        ids: albums,
        market: 'US',
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    return result.albums;
  }

  async getPlayListItems(token, id) {
    const result = await this.get(
      `playlists/${id}/tracks/`,
      {},
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    return result.items;
  }

  async getFeaturedPlayList(token) {
    const result = await this.get(
      `browse/featured-playlists`,
      {
        market: 'US',
      },
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
      { headers: { authorization: `Bearer ${token}` } }
    );
  }

  async getArtists(token, artists) {
    const result = await this.get(
      `artists`,
      {
        ids: artists,
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    return result.artists;
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

  async getTracks(token, tracks) {
    const result = await this.get(
      `tracks`,
      {
        ids: tracks,
        market: 'US',
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    return result.tracks;
  }

  async getRecommendations(token, artistId, seedGenres, trackId) {
    const result = await this.get(
      `recommendations`,
      {
        seed_artists: artistId || '',
        seed_genres: seedGenres || '',
        seed_tracks: trackId || '',
      },
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );
    return result.tracks;
  }
}

export default SpotifyAPI;
