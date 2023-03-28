import { Star } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [gyms, setGyms] = useState(null);
  const [search, setSearch] = useState("");
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://devapi.wtfup.me/gym/places")
      .then((res) => res.json())
      .then((res) => {
        setCities(res.data);
        console.log(res);
      });
  }, []);

  useEffect(() => {
    fetch(
      "https://devapi.wtfup.me/gym/nearestgym?lat=30.325488815850512&long=78.0042384802231" +
        "&city=" +
        search
    )
      .then((res) => res.json())
      .then((res) => {
        setGyms(res);
        console.log(res);
      });
  }, [search]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={12} lg={4}>
          <h1 style={{margin:"10px",
              padding:"8px"}}>Filters</h1>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: {
                xs: "auto",
                lg: "70vh",
                justifyContent: "space-evenly",
                alignItems: "start",
              },
              margin:"10px",
              padding:"8px"
            }}
          >
            <div>
              <h3>Location</h3>
              <input type="text" placeholder="Enter location" />
            </div>
            <div>
              <h3>Price</h3>
              <input type="number" placeholder="Min" />
              <input style={{marginLeft:"5px"}} type="number" placeholder="Max" />
            </div>
            <div>
              <h3>City</h3>
              <select value={search} onChange={handleChange}>
                <option value="">All</option>
                {cities.map((city) => {
                  return (
                    <option className="option" key={city.city} value={city.city}>
                      {city.city}
                    </option>
                  );
                })}
              </select>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12} lg={8}>
          {gyms?.data.map((gym) => {
            return (
              <div
              className="gym"
                key={gym.user_id}
                style={{
                  position: "relative",
                  margin: "10px",
                  background: "#131313",
                  height: "300px",
                }}
                onClick={()=>{
                  console.log(gym.user_id)
                  navigate("/details/"+gym.user_id)
                }}
              >
                <div>
                <div className="gym-child">{gym.gym_name}</div>
                <div className="gym-child">
                  <span style={{color:"red"}}>{[...Array(Math.round(gym.rating))].map(() => {
                    return <Star />;
                  })}</span>
                  <span>{[...Array(5 - Math.round(gym.rating))].map(() => {
                    return <Star />;
                  })}</span>
                </div>
                <div className="gym-child">
                  {gym.address2}
                  {","}
                  {gym.address1}
                </div>
                <div className="gym-child">
                  {gym.duration_text}
                  {" away|"}
                  {gym.distance_text}
                </div>
                <div
                className="banner free"
                  style={{
                    color: "black",
                    top: "10px",
                    left: "5px",

                  }}
                >
                  Free
                </div>
                <div
                className="banner"
                  style={{
                    bottom: "20px",
                    right: "30px",
                    borderRadius:"4px"
                  }}
                >
                  Book Now
                </div>
                </div>
              </div>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}
