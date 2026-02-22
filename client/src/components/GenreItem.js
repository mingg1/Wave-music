import React, { useState } from 'react';

const GenreItem = ({ genre, clickEvt, selected }) => {
  const [toggled, setToggled] = useState(false);
  const [border, setBorder] = useState(false);

  return (
    <li
      onClick={() => {
        clickEvt(genre, 'genre');
        if (selected < 5 || toggled) {
          setBorder(!toggled);
          setToggled(!toggled);
        } else setBorder(false);
      }}
      key={genre}
      style={{
        padding: 16,
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        color: '3747f2',
        fontWeight: 600,
        border: border && '3px solid black',
        cursor: (selected < 5 || toggled) && 'pointer',
        listStyleType: 'none',
      }}
    >
      {genre}
    </li>
  );
};
export default GenreItem;
