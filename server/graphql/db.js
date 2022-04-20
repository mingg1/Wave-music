import axios from 'axios';
import cheerio from 'cheerio';
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';
const ALBUM_INFO_URL = `${BASE_URL}?format=json&api_key=${process.env.LAST_FM_API_KEY}&method=chart.gettoptracks`;

export const getTopTracks = async () => {
  const {
    data: {
      tracks: { track },
    },
  } = await axios(ALBUM_INFO_URL);
  // const [obj1, obj2] = await axios.all([
  //   axios.get('https://api.sampleapis.com/beers/ale'),
  //   axios.get('https://api.sampleapis.com/coffee/hot'),
  // ]);

  const getLink = async () => {
    const result = await axios.get(
      'https://www.last.fm/music/Harry+Styles/_/Adore+You'
    );

    const $ = cheerio.load(result.data);

    const playlist = $('.js-video-preview-playlink.video-preview-playlink');
    console.log(playlist.html());
  };
  getLink();
  return track;
};
