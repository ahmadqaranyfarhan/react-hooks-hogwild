import React, { useState } from "react";

function Hogs({ hogs }) {
  const [showMoreMap, setShowMoreMap] = useState({});
  const [filterGreased, setFilterGreased] = useState(false);
  const [sortHogsTile, setSortHogsTile] = useState(null);

  function toggleButton(id) {
    setShowMoreMap((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  }

  function filterHogs(hogs) {
    if (!filterGreased) {
      return hogs;
    }
    return hogs.filter((hog) => hog.greased);
  }

  function sortHogs(hogs) {
    if (!sortHogsTile) {
      return hogs;
    }
    return [...hogs].sort((a, b) => {
      if (sortHogsTile === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortHogsTile === "weight") {
        return a.weight - b.weight;
      }
      return 0;
    });
  }

  const sortedAndFilteredHogs = sortHogs(filterHogs(hogs));

  return (
    <div className="hogsContainer">
      <div className="tile">
        <button onClick={() => setFilterGreased(!filterGreased)}>
          {filterGreased ? "Show All" : "Filter Greased"}
        </button>
        <h1>Hogs</h1>
        <select
          value={sortHogsTile || ""}
          onChange={(e) => setSortHogsTile(e.target.value || null)}
        >
          <option value="">Sort By</option>
          <option value="name">Name</option>
          <option value="weight">Weight</option>
        </select>
      </div>

      {sortedAndFilteredHogs.map((hog, id) => (
        <div key={id} className="ui card">
          <a className="image">
            <img src={hog.image} alt={hog.name} />
          </a>
          <div className="content">
            <a onClick={() => toggleButton(id)} className="header">
              {hog.name}
            </a>
            {showMoreMap[id] && (
              <div>
                <p>
                  Weight: <span>{hog.weight}</span>
                </p>
                <p>
                  Greased: <span>{hog.greased ? "Yes" : "No"}</span>
                </p>
                <p>
                  Highest Medal Achieved:{" "}
                  <span>{hog["highest medal achieved"]}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Hogs;
