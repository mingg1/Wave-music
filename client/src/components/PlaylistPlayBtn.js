import { MdPlayCircleFilled } from 'react-icons/md';

const PlaylistPlayBtn = ({ setPlaylist }) => {
  return (
    <MdPlayCircleFilled
      style={{ cursor: 'pointer' }}
      size={40}
      onClick={()=> {
        console.log("playlist play btn clicked");
        setPlaylist();
      }}
    />
  );
};

export default PlaylistPlayBtn;
