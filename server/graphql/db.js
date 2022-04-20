import axios from 'axios';
import cheerio from 'cheerio';

const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';
const ALBUM_INFO_URL = `${BASE_URL}?format=json&api_key=2d1938e40bbc2ae14ee1fde1ccd061d7&method=chart.gettoptracks`;

export const getTopTracks = async () => {
  const {
    data: {
      tracks: { track },
    },
  } = await axios(ALBUM_INFO_URL);
  const [obj1, obj2] = await axios.all([
    axios.get('https://api.sampleapis.com/beers/ale'),
    axios.get('https://api.sampleapis.com/coffee/hot'),
  ]);

  const getLink = async () => {
    const result = await axios.get(
      'https://www.last.fm/music/5+Seconds+of+Summer/Youngblood+(Deluxe)/Want+You+Back'
    );

    const $ = cheerio.load(result.data);

    const playlist = $('.js-video-preview-playlink.video-preview-playlink');
    console.log(playlist.html());
  };
  getLink();
  return track;
};
