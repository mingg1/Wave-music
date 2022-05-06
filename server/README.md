## Wave server

Backend server for Wave music app.
You can test with this [link](https://wave-music-server.azurewebsites.net/graphql).

### 🚨 Before you use query / mutation

Take access token using this query. The token will be valid for an hour.
This is not related to user athentication but to Spotify API.

```sh
query User {
  sf_token
}
```

After getting it, set header like this `{sf_token: TOKEN_KEY}`.

### Get user info

```sh
query User($userId: ID!) {
  user(id: $userId) {
  favorites {
      id
    }
  }
}
```

### Find user by nickname

```sh
query Query($nickname: String) {
  userByNickname(nickname: $nickname) {
    id
  }
}
```

### Log in

```sh
query User($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
  }
}
```

### Register new user

```sh
mutation Mutation($nickname: String!, $password: String!, $email: String!) {
  registerUser(nickname: $nickname, password: $password, email: $email) {
    id
    nickname
  }
}
```

### Get favorites info by Id

```sh
query Query($userFavoritesId: ID) {
  userFavorites(id: $userFavoritesId) {
    id
    owner {
      id
      nickname
    }
    tracks {
      id
    }
    artists {
      id
    }
    albums {
      id
    }
  }
}
```

### Get tracks of playlist

```sh
query Query($playlistId: ID!) {
  playlistTracks(playlistId: $playlistId) {
    track {
      id
    }
  }
}
```

### Get tracks' info

You need to know track's id from Spotify. You can get easily this from the endpoint's parameter.

```sh
query Query($ids: ID!) {
  tracks(ids: $ids) {
    id
  }
}
```

### Get recommendations

Get song recommendations based on seed artists, genres, and tracks.
You can set up to 5 seeds in total.

```sh
query Query($seedArtists: ID, $seedGenres: String, $seedTracks: ID) {
  recommendations(seedArtists: $seedArtists, seedGenres: $seedGenres, seedTracks: $seedTracks) {
    id
    name
  }
}
```

### Get available genres

Get available genres to curate music from Spotify.

```sh
query Query {
  genres
}
```

### Get artists' info

You need to know track's id from Spotify. You can get easily this from the url's parameter.

```sh
query Query($ids: ID!) {
  artist(ids: $ids) {
    id
    genres
    name
  }
}
```

### Get related artists

Get related artists based on a seed artist.

```sh
query Query($artistId: ID!) {
  relatedArtists(id: artistId) {
    id
    genres
  }
}
```

### Get artist top tracks

Get an artist's popular songs.

```sh
query Query($artistId: ID!) {
  artistTopTracks(id: $artistId) {
  }
}
```

### Get artist's albums

Get an artist's albums.

```sh
query ArtistAlbums($artistAlbumsId: ID!) {
  artistAlbums(id: $artistAlbumsId) {
    id
    name
  }
}
```

### Get albums information

Get info of albums

```sh
query Albums($ids: ID!) {
  albums(ids: $ids) {
    id
  }
}
```

### Get tracks of album

```sh
query AlbumTracks($albumTracksId: ID!) {
  albumTracks(id: $albumTracksId) {
    id
  }
}
```

### Get featured playlists

Get ids of featured playlists on Spotify

```sh
query ArtistAlbums {
  featuredPaylists {
    id
  }
}
```

### Get user's playlists

Get user's playlist

```sh
query UserPlaylists($userId: ID!) {
  userPlaylists(userId: $userId) {
    id
    name
    owner {
      id
    }
    tracks {
      id
    }
    userMade
  }
}
```

### Get user's playlist

Get a single playlist made by an user.

```sh
query Query($playlistId: ID!) {
  userPlaylist(playlistId: $playlistId) {
    id
  }
}
```

### Search

Get search results about albums / artists / tracks / users.

```sh
query Query($query: String!, $type: String!) {
  search(query: $query, type: $type) {
    albums {
      items {
        id
      }
    }
    artists {
      items {
        id
      }
    }
    tracks {
      items {
        id
      }
    }
    users {
      id
    }
  }
}
```

### Get comments

Get comments from a page.

```sh
query Query($type: String!, $pageId: ID!) {
  comments(type: $type, pageId: $pageId) {
    id
  }
}
```

### Get posts

Get all posts.

```sh
query Query {
  posts {
    id
  }
}
```

### Get single post

Get a post by id.

```sh
query Post($postId: ID!) {
  post(postId: $postId) {
    id
  }
}
```

### Get user's posts

Get user's posts

```sh
query Post($userId: ID!) {
  userPosts(userId: $userId) {
    id
  }
}
```

### Add favorite

Save artist / song / album into user's favorite list.

```sh
mutation Mutation($addFavoriteId: ID, $type: String, $userId: ID) {
  addFavorite(id: $addFavoriteId, type: $type, userId: $userId) {
    id
    albums {
      id
    }
  }
}
```

### Add playlist

Add a playlist

```sh
mutation Mutation($addFavoriteId: ID, $type: String, $userId: ID) {
  addFavorite(id: $addFavoriteId, type: $type, userId: $userId) {
    id
    albums {
      id
    }
  }
}
```

### Delete playlist

delete user's playlist.

```sh
mutation Mutation($playlistId: ID!) {
  deletePlaylist(playlistId: $playlistId) {
    id
  }
}
```

### Add track to playlist

Add track to a playlist.

```sh
mutation Mutation($playlistId: ID!, $trackId: ID!) {
  addTrackToPlaylist(playlistId: $playlistId, trackId: $trackId) {
    id
  }
}
```

### Add track to playlist

Delte a song from the playlist.

```sh
mutation Mutation($playlistId: ID!, $trackId: ID!) {
  deleteTrackFromPlaylist(playlistId: $playlistId, trackId: $trackId) {
    id
  }
}
```

### Add comment on a post

Add a comment on a post.

```sh
mutation Mutation($owner: ID!, $text: String!, $type: String!, $postId: ID) {
  addComment(owner: $owner, text: $text, type: $type, postId: $postId) {
    id
  }
}
```

### Add comment on a artist / album / track page

Add a comment

```sh
mutation Mutation($owner: ID!, $text: String!, $type: String!, $postId: ID) {
  addComment(owner: $owner, text: $text, type: $type, refId: $refId) {
    id
  }
}
```

### Delete comment

```sh
mutation Mutation($commentId: ID) {
  deleteComment(commentId: $commentId) {
    id
  }
}
```

### Add post

```sh
mutation Mutation($owner: ID!, $title: String!, $description: String!) {
  addPost(owner: $owner, title: $title, description: $description) {
    id
  }
}
```

### Delete post

```sh
mutation Mutation($postId: ID!) {
  deletePost(postId: $postId) {
    id
  }
}
```

### Edit post

```sh
mutation Mutation($postId: ID!, $title: String, $description: String) {
  editPost(postId: $postId, title: $title, description: $description) {
    id
  }
}
```
