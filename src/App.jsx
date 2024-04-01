import React, { useEffect, useState } from "react";
import Station from "./Station";

const App = () => {
  const [channels, setChannels] = useState([]);
  const [filteredChannels, setFilteredChannels] = useState([]);
  const [channelTypeFilter, setChannelTypeFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.sr.se/api/v2/channels?format=json&size=100"
        );
        const data = await response.json();
        setChannels(data.channels);
        setFilteredChannels(data.channels);
      } catch (error) {
        console.error("Data fetching error:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (event) => {
    setChannelTypeFilter(event.target.value);
    filterChannels(event.target.value);
  };

  const filterChannels = (type) => {
    if (type === "all") {
      setFilteredChannels(channels);
    } else {
      const filtered = channels.filter(
        (channel) => channel.channeltype === type
      );
      setFilteredChannels(filtered);
    }
  };

  return (
    <>
      <div className="radiolist">
        <div className="filter">
          <label htmlFor="channelFilter">Filter: </label>
          <select
            id="channelFilter"
            onChange={handleFilterChange}
            value={channelTypeFilter}
          >
            <option value="all">Alla kanaler</option>
            <option value="Rikskanal">Rikskanal</option>
            <option value="Lokal kanal">Lokal kanal</option>
            <option value="Minoritet och språk">Minoritet och språk</option>
            <option value="Fler kanaler">Fler kanaler</option>
            <option value="Extrakanaler">Extrakanaler</option>
          </select>
        </div>

        <div className="channels">
          {filteredChannels.map((channel) => (
            <Station key={channel.id} {...channel} />
          ))}
        </div>
      </div>
    </>
  );
};

export default App;