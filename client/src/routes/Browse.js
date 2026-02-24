import React, { useContext, useEffect } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import TokenContext from "../contexts/token-context";
import styled from "styled-components";
import Carousel from "react-elastic-carousel";
import { MainTitle, SubTitle } from "../components/Typographies";

const GET_PL = gql`
  {
    Paylists {
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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 10% 0 10%;
`;

export const getPlaylists = async (getUserPlaylists) => {
  try {
    const { data } = await getUserPlaylists({
      variables: {
        userId: JSON.parse(localStorage.getItem("user"))?.id,
      },
    });

    return data?.userPlaylists;
  } catch (e) {
    console.log(e);
  }

  //  setUserPlaylists((prevState) => userPlaylists);
};

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 100,
      width: 250,
    },
  },
};

const Browse = () => {
  const { fetchToken, tokenReady } = useContext(TokenContext);
  const { loading, error, data, refetch } = useQuery(GET_PL, {
    skip: !tokenReady,
  });

  return (
    <Container>
      <MainTitle>Browse</MainTitle>
      <SubTitle>Check featured playlists</SubTitle>
      <Carousel itemsToShow={4} itemsToScroll={4}>
        {data &&
          data.Paylists.map((pl) => {
            return (
              <div
                key={pl.id}
                style={{
                  width: "fit-content",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Link
                  id={pl.id}
                  to={`/playlist/${pl.id}`}
                  state={{
                    name: pl.name,
                    description: pl.description,
                    coverImg: pl.images[0].url,
                  }}
                >
                  <img
                    src={pl.images[0].url}
                    style={{ width: 200, borderRadius: 15 }}
                  />
                </Link>
                <Link
                  id={pl.id}
                  to={`/playlist/${pl.id}`}
                  state={{
                    name: pl.name,
                    description: pl.description,
                    coverImg: pl.images[0].url,
                  }}
                  style={{
                    marginRight: 12,
                    fontWeight: 600,
                    textDecoration: "none",
                    color: "#05396d",
                  }}
                >
                  {pl.name}
                </Link>
              </div>
            );
          })}
      </Carousel>
    </Container>
  );
};

export default Browse;
