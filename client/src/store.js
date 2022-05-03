import { configureStore, createSlice } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
const middleware = [thunk];

const postSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    fetch: (state, action) => {
      return action.payload;
    },
    add: (state, action) => {
      console.log(action.payload);
      state.push(action.payload);
    },
    remove: (state, action) =>
      state.filter((post) => post.id !== action.payload),
  },
});

const commentSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    fetch: (state, action) => {
      console.log(action.payload);
      return action.payload;
    },
    add: (state, action) => {
      console.log(action.payload);
      state.push(action.payload);
    },
    remove: (state, action) =>
      state.filter((comment) => comment.id !== action.payload),
  },
});

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    songs: [],
    currentSong: 0,
    playing: false,
    random: false,
    repeat: false,
  },
  reducers: {
    setPlayerSongs: (state, action) => ({
      ...state,
      songs: action.payload,
    }),
    addSong: (state, action) => {
      state.songs.push(action.payload);
    },
    setCurrentSong: (state, action) => ({
      ...state,
      currentSong: action.payload,
      playing: true,
    }),
    toggleRandom: (state, action) => ({ ...state, random: action.payload }),
    toggleRepeat: (state, action) => ({ ...state, repeat: action.payload }),
    togglePlaying: (state, action) => ({ ...state, playing: action.payload }),
  },
});

const userPlaylistSlice = createSlice({
  name: 'userPlaylist',
  initialState: [],
  reducers: {
    fetch: (state, action) => {
      console.log(action.payload);
      return action.payload;
    },
    add: (state, action) => {
      state.push(action.payload);
    },
    addTracks: (state, action) => {
      const { id, tracks } = action.payload;
      const index = state.findIndex((pl) => pl.id === id);
      const newPlaylist = [...state];
      newPlaylist[index].tracks = tracks;
    },
    deleteTracks: (state, action) => {
      console.log(action.payload);
      const { playlistId, trackId } = action.payload;
      const index = state.findIndex((pl) => pl.id === playlistId);
      const newPlaylist = [...state];
      newPlaylist[index].tracks = newPlaylist[index].tracks.filter(
        (track) => track.id !== trackId
      );
    },
  },
});

const currentPlSlice = createSlice({
  name: 'currentPlaylist',
  initialState: [],
  reducers: {
    fetchCurrentPl: (state, action) => {
      console.log(action.payload);
      return action.payload;
    },
    removeTrackFromPl: (state, action) =>
      state.tracks.filter((track) => track.id !== action.payload),
  },
});

export const { fetchCurrentPl, removeTrackFromPl } = currentPlSlice.actions;

export const {
  add: addPost,
  remove: removePost,
  fetch: fetchPost,
} = postSlice.actions;
export const {
  add: addComment,
  remove: removeComment,
  fetch: fetchComments,
} = commentSlice.actions;
export const { fetch, add, addTracks, deleteTracks } =
  userPlaylistSlice.actions;
export const {
  setPlayerSongs,
  addSong,
  setCurrentSong,
  togglePlaying,
  toggleRandom,
  toggleRepeat,
} = playerSlice.actions;

export default configureStore({
  reducer: {
    posts: postSlice.reducer,
    comments: commentSlice.reducer,
    userPlaylist: userPlaylistSlice.reducer,
    currentPlaylist: currentPlSlice.reducer,
    player: playerSlice.reducer,
  },
  middleware,
});
