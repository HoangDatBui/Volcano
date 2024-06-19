import "../styling/Volcano_page.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Map, Marker } from "pigeon-maps";
import { useAuth } from "./AuthContext";
import ChartComponent from "./Chart";
import { Alert } from "reactstrap";

function VolcanoData(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>Country: {props.country}</p>
      <p>Region: {props.region}</p>
      <p>Subregion: {props.subregion}</p>
      <p>Last Eruption: {props.last_eruption}</p>
      <p>Summit: {props.summit} m</p>
      <p>Elevation: {props.elevation} ft</p>
    </div>
  );
}

export default function VolcanoPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { isLoggedIn } = useAuth();

  const [volcano, setVolcano] = useState(null);
  const [hue, setHue] = useState(0);
  const [errorType, setErrorType] = useState(null);

  const token = localStorage.getItem("token");
  const color = `hsl(${hue % 360}deg 39% 70%)`;
  const {
    latitude,
    longitude,
    population_5km,
    population_10km,
    population_30km,
    population_100km,
  } = volcano || {};
  const chartData = {
    labels: ["5km", "10km", "30km", "100km"],
    datasets: [
      {
        label: "Number of population lives within the area",
        data: [
          population_5km,
          population_10km,
          population_30km,
          population_100km,
        ],
        backgroundColor: "rgba(0, 99, 132, 0.5)",
      },
    ],
  };

  useEffect(() => {
    async function fetchVolcano() {
      try {
        const url = `http://4.237.58.241:3000/volcano/${id}`;
        const response = await fetch(url, {
          headers: isLoggedIn ? { Authorization: `Bearer ${token}` } : {},
        });

        if (response.status === 401) {
          throw new Error("Token has expired");
        }

        const data = await response.json();
        setVolcano(data);
        setErrorType(null);
      } catch (error) {
        if (error.message === "Token has expired") {
          setErrorType("Your login session has expired please log in again");
        } else {
          setErrorType("An unexpected error occurred please try again later");
        }
      }
    }
    fetchVolcano();
  }, [id, isLoggedIn, token]);

  if (!volcano) {
    return <Alert color="danger" className="error-mess">{errorType}</Alert>;
  }

  return (
    <div className="page-container">
      <span className="volcano-info">
        <VolcanoData {...volcano} />
      </span>
      <span className="map-wrapper" alt="Volcano Location Map">
        <Map
          height={400}
          width={600}
          defaultCenter={[parseFloat(latitude), parseFloat(longitude)]}
          defaultZoom={4}
        >
          <Marker
            width={30}
            anchor={[parseFloat(latitude), parseFloat(longitude)]}
            color={color}
            onClick={() => setHue(hue + 20)}
          />
        </Map>
      </span>
      {isLoggedIn && ( // if logged in, display the chart
        <div className="chart-wrapper" alt="Population Chart">
          <ChartComponent data={chartData} />
        </div>
      )}
      {!isLoggedIn && (
        <h5 className="message">
          You need to log in to view a chart describing the number of people
          living near this volcano!
        </h5>
      )}
      <button className="back-button" onClick={() => navigate("/VolcanoList")}>
        Back
      </button>
    </div>
  );
}
