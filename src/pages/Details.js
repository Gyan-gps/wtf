import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const bgcolor = ["#609671", "#995e7c", "#a84442", "#3f79a1", "#609671"];

const Details = () => {
  const { id } = useParams();
  const [gym, setGym] = useState(null);
  const [facility, setFacility] = useState(null);
  const [plans, setPlans] = useState(null);
  const [terms, setTerms] = useState(null);

  useEffect(() => {
    fetch(
      "https://devapi.wtfup.me/gym/nearestgym?lat=30.325488815850512&long=78.0042384802231"
    )
      .then((res) => res.json())
      .then((res) => {
        let data = res.data.find((prev) => prev.user_id === id);
        setGym(data);
        setTerms(res.terms);
        setFacility(res.data[0].benefits);
        // console.log(data)
      });
  }, []);

  useEffect(() => {
    axios
      .post("https://devapi.wtfup.me/gym/plan", { plan_uid: "VMxSCNaZTYxd3" })
      .then((res) => {
        let arr = res.data.data.slice(0, 5);
        setPlans(arr);
        // console.log(res.data.data)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* {
        gym?.user_id
      }
      details */}
      <Grid container>
        <Grid item xs={12} lg={6}>
          <Box className="details" style={{height:{xs:"auto", lg:'90vh'}, margin: "10px", padding: "8px",display:"flex",flexDirection:"column",justifyContent:"space-between" }}>
            <div>
              <h3>Description</h3>
              <p style={{ fontSize: "12px" }}>{gym?.description}</p>
            </div>
            <div>
              <h3>Facilities</h3>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {facility?.map((ele) => {
                  return <div>{ele.name}</div>;
                })}
              </div>
              </div>
              <div>
                <h3>Why to choose WTF?</h3>
                <div style={{display:"flex",justifyContent:"space-around"}}>
                  {terms?.slice(4).map((ele, i) => {
                    return (
                      <Box
                        key={i}
                        sx={{
                          width: {xs:"70px",lg:"90px"},
                          height: "130px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "red",
                          borderRadius:"8px",
                          fontSize:{xs:"12px",lg:"16px"}
                        }}
                      >
                        {ele.name}
                      </Box>
                    );
                  })}
                </div>
              </div>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <div
            style={{
              backgroundColor: "#2e2e2e",
              margin: "10px",
              borderRadius: "8px",
              padding: "8px",
            }}
          >
            <h3 style={{ textAlign: "center" }}>Choose Membership</h3>
            <div style={{ textAlign: "start" }}>
              {plans?.map((plan, i) => {
                return (
                  <div
                    className="plan-card"
                    key={i}
                    style={{ backgroundColor: bgcolor[i] }}
                  >
                    <div>
                      <div>PLAN {i + 1}</div>
                      <div>
                        <b>WTF</b> <span style={{}}>{plan.plan_name}</span>
                      </div>
                    </div>
                    <div style={{ width: "60px" }}>
                      <div>${plan.plan_price}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Details;
