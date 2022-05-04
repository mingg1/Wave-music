import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import playlistPlaceholder from './images/playlistPlaceholder.png';

const NoLinkCard = ({ element, clickEvt, selected }) => {
  const [toggled, setToggled] = useState(false);
  const [border, setBorder] = useState(false);

  return (
    <div
      onClick={() => {
        clickEvt(element.id, element.type);
        if (selected < 5 || toggled) {
          setBorder(!toggled);
          setToggled(!toggled);
        } else setBorder(false);
      }}
      key={element.id}
      style={{
        borderRadius: 15,
        margin: 'auto',
        padding: '10%',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        minWidth: '80%',
        maxWidth: '80%',
        height: 260,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: border && '3px solid black',
        cursor: (selected < 5 || toggled) && 'pointer',
      }}
    >
      <img
        alt={element.type}
        src={
          (element?.images && element?.images[0]?.url) || playlistPlaceholder
        }
        style={{
          minWidth: '100%',
          height: 200,
          borderRadius: 15,
          maxWidth: '100%',
        }}
      />
      <h5>{element.name}</h5>
    </div>
  );
};
export default NoLinkCard;
