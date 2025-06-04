import { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import placeholderImg from "../assets/placeholderImg.png";
import axios from "axios";

function PhotoAlbum() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [photosRetrieved, setPhotosRetrieved] = useState(true);
  /* The code below are for placeholder images.
    This will be what is displayed while waiting 
    for a response from the server. More code will be
    added once the backend server has been completed. */

  useEffect(() => {
    axios.get("http://localhost:3000/images").then(({ data }) => {
      setPhotosRetrieved(data);
    });
  }, []);

  const photoFilters = [
    "All",
    "1:1 Buddy Service",
    "Hub",
    "Social",
    "Summer Trips",
  ];
  return (
    <>
      <Header />
      <section className="photo-description">
        <h2>Photo Album</h2>
        <article>
          View our exploits below! You can filter the image results using the
          bar below; just click on which images you'd like to see!
        </article>
      </section>
      <section className="display-photos">
        <ul className="photo-filter-list">
          {photoFilters.map((filter, i) => {
            return (
              <li
                key={i}
                className={
                  filter === selectedFilter
                    ? "selected-filter"
                    : "unselected-filter"
                }
                onClick={
                  filter !== selectedFilter && photosRetrieved
                    ? () => {
                        setSelectedFilter(filter);
                      }
                    : undefined
                }
              >
                {filter}
              </li>
            );
          })}
        </ul>
        <div className="photo-reel">
          <img src={placeholderImg} className="placeholder-img" />
          <img src={placeholderImg} className="placeholder-img" />
          <img src={placeholderImg} className="placeholder-img" />
          <img src={placeholderImg} className="placeholder-img" />
          <img src={placeholderImg} className="placeholder-img" />
          <img src={placeholderImg} className="placeholder-img" />
          <img src={placeholderImg} className="placeholder-img" />
          <img src={placeholderImg} className="placeholder-img" />
          <img src={placeholderImg} className="placeholder-img" />
          <img src={placeholderImg} className="placeholder-img" />
          <img src={placeholderImg} className="placeholder-img" />
          <img src={placeholderImg} className="placeholder-img" />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default PhotoAlbum;
