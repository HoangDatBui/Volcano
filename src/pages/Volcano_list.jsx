import "../styling/Volcano_list.css";
import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";
import { useNavigate } from "react-router-dom";

export default function VolcanoList() {
  const [rowData, setRowData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPopulatedWithin, setSelectedPopulatedWithin] = useState("");
  const [countryOptions, setCountryOptions] = useState([]);

  const navigate = useNavigate();
  const countryListUrl = "http://4.237.58.241:3000/countries";
  const url = `http://4.237.58.241:3000/volcanoes?country=${selectedCountry}&populatedWithin=${selectedPopulatedWithin}`;

  const columns = [
    { headerName: "Name", field: "name" },
    { headerName: "Region", field: "region" },
    { headerName: "Subregion", field: "subregion" },
  ];

  /* fetch list of countries */
  useEffect(() => {
    fetch(countryListUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch country list");
        }
        return res.json();
      })
      .then((data) => {
        setCountryOptions(data);
      })
      .catch((error) => {
        console.error("Error fetching country list:", error);
        alert("Failed to fetch country list. Please try again.");
      });
  }, []);

  /* fetch volcano in selected country */
  const handleSearch = () => {
    if (!selectedCountry) {
      alert("Please select a country.");
      return;
    }
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch volcano data");
        }
        return res.json();
      })
      .then((data) => {
        setRowData(data);
      })
      .catch((error) => {
        console.error("Error fetching volcano data:", error);
        alert("Failed to fetch volcanoes data. Please try again.");
      });
  };

  return (
    <div className="volcano-list-container">
      <h1>VOLCANOES</h1>
      <div className="search-container">
        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">Select a country...</option>
          {countryOptions.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          value={selectedPopulatedWithin}
          onChange={(e) => setSelectedPopulatedWithin(e.target.value)}
        >
          <option value="">No filter</option>
          <option value="5km">Populated within 5km</option>
          <option value="10km">Populated within 10km</option>
          <option value="30km">Populated within 30km</option>
          <option value="100km">Populated within 100km</option>
        </select>

        <button onClick={handleSearch}>Search</button>
      </div>
      <div
        className="ag-theme-balham"
        style={{ height: "400px", width: "600px" }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={rowData}
          pagination={true}
          paginationPageSize={11}
          paginationPageSizeSelector={false}
          onRowClicked={(row) => navigate(`/map?id=${row.data.id}`)}
        />
      </div>
    </div>
  );
}
