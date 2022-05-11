# Wave music

Music app for browsing music-related things such as songs, artists, and albums.
The application suggests songs according to the users' taste. Users can create their own accounts to display their favorite artists, tracks, or albums.
<br> <br> 
By giving seed artists, tracks from user's favorites with genres, users can get suggestion songs based on them. The app also allows users to search for albums, artists, tracks, and users. It is possible to preview music for 30 seconds while browsing the app.
<br>

## Tech used
#### Frontend <br> 
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql)
#### Backend <br>
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Apollo-GraphQL](https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
#### Deployed to  <br>
![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=microsoftazure&logoColor=white)

## Demo
[Frontend demo](https://wave-music.azurewebsites.net) (If the app get stuck, please try refreshing the page 😅)<br>
[Backend Graphql server](https://wave-music-server.azurewebsites.net/graphql)
<br>

## ERD
<img width="750" alt="image" src="https://user-images.githubusercontent.com/61379336/167941862-ab702d28-809b-416c-9c85-4e06375ce653.png">


## Features

- **Register / Login**
- **Search<br>**
  Users can search about tracks, artists, albums, and users.<br>
  <img width="975" alt="스크린샷 2022-05-06 04 08 48" src="https://user-images.githubusercontent.com/61379336/167847215-50d9e4f9-f58b-4ea1-9206-98c33fdbcd43.png">

- **Track info<br>**
  In this page, users can see a list of similar tracks.<br>
  <img width="975" alt="스크린샷 2022-05-06 06 00 29" src="https://user-images.githubusercontent.com/61379336/167848014-121c55e4-0114-44af-ac9e-4bb494a30944.png">
- **Artist info<br>**
  In this page, users can see the artist's popular tracks, realeased albums, and also similar artists.<br>
  ![image](https://user-images.githubusercontent.com/61379336/167848226-96271377-1250-4764-af74-105d69ffaf97.png)
  ![image](https://user-images.githubusercontent.com/61379336/167848331-244b8d8b-e9b6-491d-88b5-dee3d82e6589.png)
  ![image](https://user-images.githubusercontent.com/61379336/167848378-99051181-9af6-47ff-85bf-a7bc6a143f54.png)

- **Album info<br>**
  In this page, users can see all the tracks in the album.
- **Featured playlists<br>**
  Users can look around featured playlists made by Spotify. It is possible to play all playable songs by clicking the button under the title.
  <img width="975" alt="스크린샷 2022-05-06 06 00 16" src="https://user-images.githubusercontent.com/61379336/167847758-1cf090af-8c4f-4362-8032-fe878a179357.png">
  <img width="975" alt="스크린샷 2022-05-06 06 02 30" src="https://user-images.githubusercontent.com/61379336/167847921-13c62ca8-9637-4417-89e9-ae8dc9b09166.png">

- **User profile <br>**
  On the right side of the header, users can find their nickname. Users can see their own profile by clicking it.
  <img width="975" alt="스크린샷 2022-05-10 23 35 50" src="https://user-images.githubusercontent.com/61379336/167717608-52910aa8-6f98-4c1f-8cc1-785de97a99ef.png"><br><br>
  Users can see their playlists and lists of favorite songs, artist, and albums.
  <img width="975" alt="스크린샷 2022-05-06 00 57 58" src="https://user-images.githubusercontent.com/61379336/167718388-ff8f4030-d838-465e-9092-aefba01e8cd9.png"><br>
 ![image](https://user-images.githubusercontent.com/61379336/167719200-fb66e71c-b965-4862-bbef-27f1e6925f0d.png)
  <img width="975" alt="image" src="https://user-images.githubusercontent.com/61379336/167719712-9d28eb53-3392-42ba-abe4-2c7487db8f6d.png">
  <img width="975" alt="image" src="https://user-images.githubusercontent.com/61379336/167719935-6c6d39f6-c57f-41e6-a280-34539e574bb7.png"><br>
  
- **Curation**<br>
  Users can get suggestions based on their favorite tracks and artists. Users can select up to 5 options from their favorites and with specific genres as needed.
  ![image](https://user-images.githubusercontent.com/61379336/167931729-28adc9ab-5797-46fa-92fe-513a3ba1f70c.png)
  ![image](https://user-images.githubusercontent.com/61379336/167931764-02c99337-76d3-4754-ace7-f75eda8a88cf.png)
  <img width="1155" alt="스크린샷 2022-05-06 00 56 19" src="https://user-images.githubusercontent.com/61379336/167931800-427c6d4f-a00c-4d52-89ad-a745d61ec25b.png">
  <img width="1067" alt="스크린샷 2022-05-06 00 57 33" src="https://user-images.githubusercontent.com/61379336/167931886-a9e73361-b724-4c89-90a3-1ded9349449f.png">


  

- **DJ station**<br>
  Forum for sharing user's music tastes and stories. It is possible to leave comments on posts.
  <img width="975" alt="스크린샷 2022-05-06 00 49 15" src="https://user-images.githubusercontent.com/61379336/167930215-f1008789-7d51-498e-958a-16c073e4cf94.png">

- **Comments**<br>
  Users are able to leave comments on info pages of tracks, artists, and albums as well as the forum.
- **Player <br>**
  supports loop and random play. <br>
  When users put their mouse on the album cover image from a track info card, they can find a play button on top of the cover image, if there is a preview for the track. There is a possibility that the button will not show up because there is no preview for some tracks.
  ![player](https://user-images.githubusercontent.com/61379336/167723523-24a6de3a-ba2e-4204-8896-ae4a9a330054.gif)
