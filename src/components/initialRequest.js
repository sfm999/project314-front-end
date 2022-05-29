import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
/*
    WHEN A CUSTOMER SENDS A REQUEST 
    THIS FILE WILL SORT THROUGH ALL THE CONTRACTORS
    AND THEIR LOCATIONS. AND SORTS THEM BY HOW FAR AWAY
    THEY ARE FROM THE CUSTOMER. THEN REMOVES THE CONTRACTORS
    THAT ARE FURTHER THAN 50KM AWAY
*/
const ContractorLocationInfo = [
  {
    id: 1,
    first_name: "Spencer",
    last_name: "Whittler",
    longitude: 151.225332432,
    latitude: -33.917329664,
  },
  {
    id: 2,
    first_name: "Jeffry",
    last_name: "Spacey",
    longitude: 150.896549,
    latitude: -34.395331,
  },
];
const within50km = [];

export function InitialRequest() {
  const [getContractors, setContractors] = useState(ContractorLocationInfo);
  const [isloaded, setloaded] = useState(false);

  //this function is getting called twice
  function getRequests() {
    console.log("Outside for loop", within50km.length);

    for (var i = 0; i < ContractorLocationInfo.length; i++) {
      var customerLongitude = 150.87507795460138; //custom values
      var customerLatitude = -34.407254383158325; //custom values
      customerLongitude = (customerLongitude * Math.PI) / 180;
      customerLatitude = (customerLatitude * Math.PI) / 180;

      var contractorLongitude =
        (ContractorLocationInfo[i].longitude * Math.PI) / 180;
      var contractorLatitude =
        (ContractorLocationInfo[i].latitude * Math.PI) / 180;

      if (contractorLongitude > customerLongitude)
        var longitudeDistance = contractorLongitude - customerLongitude;
      else if (contractorLongitude < customerLongitude)
        var longitudeDistance = customerLongitude - contractorLongitude;

      if (contractorLatitude > customerLatitude)
        var latitudeDistance = contractorLatitude - customerLatitude;
      else if (contractorLatitude < customerLatitude)
        var latitudeDistance = customerLatitude - contractorLatitude;

      //if currentLatitude - unswLatitude
      var a =
        Math.pow(Math.sin(latitudeDistance / 2), 2) +
        Math.cos(contractorLatitude) *
          Math.cos(customerLatitude) *
          Math.pow(Math.sin(longitudeDistance / 2), 2);
      var b = 2 * Math.asin(Math.sqrt(a));

      var r = 6371; //radius of the earth;

      var totalDistance = b * r;
      console.log("Distance is : ", totalDistance, "km");
      console.log("outside adding to within50km loop", within50km.length);
      if (totalDistance < 50) {
        if (within50km.indexOf(ContractorLocationInfo[i].id) === -1) {
          within50km.push(ContractorLocationInfo[i]);
        }

        console.log("Inside adding to within50km loop", within50km.length);
      }
    }
    console.log(within50km.length);
    for (var x = 0; x < within50km.length; x++) {
      console.log(within50km[x]);
    }
  }

  useEffect(() => {
    //this is being called twice when you refresh the page
    if (!isloaded) {
      getRequests();

      setloaded(true);
    }

    return () => {};
  }, []);

  return (
    <Container>
      <Typography>Hi.</Typography>
      <List>
        {within50km?.map((within50km) => {
          return (
            <ListItem key={within50km.id} value={within50km.id}>
              <ListItemText key={within50km.id} value={within50km.id}>
                {within50km.first_name + " " + within50km.last_name}
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
}

export default InitialRequest;

/*
    THE getRequests() FUNCTION GETS THE LONGITUDE AND LATITUDE
    OF BOTH THE CONTRACTOR AND THE CUSTOMER, THEN FINDS HOW FAR
    THEY ARE FROM EACHOTHER IN KILOMETERS
*/
/*
function getRequests() {
    //probably get requests from database but for now use these
    var count = 0;
    var unswLatitude = -33.917329664;
    var unswLongitude = 151.225332432; 

    var currentLongitude = (coordsValues.longitude * Math.PI / 180);
    var currentLatitude = (coordsValues.latitude * Math.PI / 180);

    unswLongitude = unswLongitude * Math.PI / 180;
    unswLatitude = unswLatitude * Math.PI / 180;

    if (unswLongitude > currentLongitude)
        var longitudeDistance = unswLongitude - currentLongitude;
    else if (unswLongitude < currentLongitude)
        var longitudeDistance = currentLongitude - unswLongitude;


    if (unswLatitude > currentLatitude)
        var latitudeDistance = unswLatitude - currentLatitude;
    else if (unswLatitude < currentLatitude)
        var latitudeDistance = currentLatitude - unswLatitude;
    

    //if currentLatitude - unswLatitude
    var a = Math.pow(Math.sin(latitudeDistance / 2), 2)
                    + Math.cos(unswLatitude) * Math.cos(currentLatitude)
                    * Math.pow(Math.sin(longitudeDistance / 2), 2);
    var b = 2 * Math.asin(Math.sqrt(a));

    var r = 6371 //radius of the earth;

    console.log("Distance is : ", b * r, "km");

}*/
