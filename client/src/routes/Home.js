import React, { useContext, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import '../App.css';
import TokenContext from '../contexts/token-context';
import Input from '../components/UI/Input/Input';
import Button from '../components/UI/Button/Button';
import AuthContext from '../contexts/auth-context';

const GET_PL = gql`
  {
    featuredPaylists {
      id
      name
      images {
        url
      }
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

  return (
    <div className="App">
      <form>
        <Input placeholder="Search for" />
        <Button type="submit">Search</Button>
      </form>

      <p> {(loading || error) && 'Loading..'} </p>
      <div>
        {data &&
          data.featuredPaylists.map((pl) => {
            return (
              <div key={pl.id}>
                <Link id={pl.id} to={`/playlist/${pl.id}`}>
                  <img src={pl.images[0].url} style={{ width: 140 }} />
                </Link>
                <Link id={pl.id} to={`/playlist/${pl.id}`}>
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
