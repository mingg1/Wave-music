import React, { useContext, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import '../App.css';
import TokenContext from '../contexts/token-context';
import Input from '../components/UI/Input/Input';
//import Button from '../components/UI/Button/Button';
import AuthContext from '../contexts/auth-context';
import { Button, Menu, MenuItem, Fade } from '@mui/material';

const GET_PL = gql`
  {
    featuredPaylists {
      id
      name
      images {
        url
      }
      description
      collaborative
    }
  }
`;

const Home = () => {
  const { fetchToken } = useContext(TokenContext);
  const { isLoggedIn } = useContext(AuthContext);
  const { loading, error, data } = useQuery(GET_PL);
  console.log(loading, error);
  useEffect(() => {
    // validation
    //  fetchToken();
    if (!loading && error) {
      fetchToken();
      // refetch();
    }
    // update or not
  }, [error]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };
  const handleClose = (event) => {
    console.log(event.currentTarget.innerText);
    setAnchorEl(null);
  };

  return (
    <div className="App">
      <form>
        <div>
          <Button
            id="fade-button"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Dashboard
          </Button>
          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            <MenuItem onClick={handleClose}>track</MenuItem>
            <MenuItem onClick={handleClose}>album</MenuItem>
            <MenuItem onClick={handleClose}>artist</MenuItem>
            <MenuItem onClick={handleClose}>all</MenuItem>
          </Menu>
        </div>
        <Input placeholder="Search for" />
        <Button type="submit" variant="outlined">
          Search
        </Button>
      </form>

      <p> {(loading || error) && 'Loading..'} </p>
      <div>
        {data &&
          data.featuredPaylists.map((pl) => {
            console.log(pl);
            return (
              <div key={pl.id}>
                <Link
                  id={pl.id}
                  to={`/playlist/${pl.id}`}
                  state={{
                    name: pl.name,
                    description: pl.description,
                    coverImg: pl.images[0].url,
                  }}
                >
                  <img src={pl.images[0].url} style={{ width: 140 }} />
                </Link>
                <Link
                  id={pl.id}
                  to={`/playlist/${pl.id}`}
                  state={{
                    name: pl.name,
                    description: pl.description,
                    coverImg: pl.images[0].url,
                  }}
                >
                  <h5>{pl.name}</h5>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
