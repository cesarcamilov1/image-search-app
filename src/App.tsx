import React, { useState, useEffect } from "react";
import { environment } from "./environtment/environtment";
import "./App.css";

interface UnsplashImage {
  urls: {
    regular: string;
  };
  id: string;
  alt_description: string;
}

function App() {
  const [image, setImage] = useState<string>("");
  const [response, setResponse] = useState<UnsplashImage[]>([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);

  const imageRequestFetch = async () => {
    const firstdata = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${image}&client_id=${environment.apiKey}`
    );
    const data = await firstdata.json();
    const result = data.results;
    setResponse(result);
  };

  useEffect(() => {
    imageRequestFetch();
  }, []);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImageUrl(imageUrl);
  };

  return (
    <>
      <div className="container ">
        <div className="profile-background">
          {response.map((value) => {
            return (
              <img
                src={value.urls.regular}
                alt={value.alt_description}
                key={value.id}
                onClick={() => handleImageClick(value.urls.regular)}
              />
            );
          })}
        </div>
        <div className="profile-picture"></div>
        <div className="content">
          <input
            type="text"
            placeholder="Change background picture"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
      </div>

      <div
        className="profile-container"
        style={{ backgroundImage: `url(${selectedImageUrl})` }}
      >
        <div className="profile-container-wrapper">
          <div className="profile-photo">
            <img
              src={
                "https://cesarcamilo.com/_next/image?url=%2Fstatic%2Fcesarcamilo.jpg&w=256&q=75"
              }
              alt="profile photo"
            />
          </div>
          <div className="profile-info">
            <span className="display-name">Cesar Camilo</span>
            <span className="username">@whysocamilo</span>
            <span className="website">
              <a href="https://cesarcamilo.com">"www.cesarcamilo.com</a>
            </span>
          </div>
          <div className="profile-bio">
            <span>Bio</span>
            <p>Web developer</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

//https://api.unsplash.com/search/photos?page=1&query=office
