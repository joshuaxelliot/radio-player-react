import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Station = ({
  image,
  name,
  channeltype,
  tagline,
  liveaudio,
  color,
}) => (
  <div className="station" style={{ backgroundColor: `#${color}` }}>
    <div className="stationimg">
      {image ? (
        <img src={image} alt={name} className="stimg" />
      ) : (
        <Skeleton height={150} width={150} />
      )}
    </div>
    <div className="infobox">
      {name ? (
        <>
          <h2>{name || <Skeleton width={220} />}</h2>
          <h4>{channeltype || <Skeleton />}</h4>
          <p>{tagline}</p>
          <audio controls>
            <source src={liveaudio.url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </>
      ) : (
        <>
          <Skeleton height={20} width={150} />
          <audio controls>
            <source src={liveaudio.url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </>
      )}
    </div>
  </div>
);

export default Station;