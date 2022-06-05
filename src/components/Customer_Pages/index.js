/* 
  Serves as a way to expedite/minimise the importing process of our individual pages.
  With this approach, you minimise your import statements in files such as App.js, which
  contains the link declarations for all components on single pages.
*/

import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";
import CustomerProfile from "./CustomerProfile.js";
import CustomerHomePage from "./CustomerHomePage.js";
import AddVehicle from "./AddVehicle.js";
import EditVehicle from "./EditVehicle.js";
import Details from "./Details.js";
import ManageVehicle from "./ManageVehicle.js";
import CardDetails from "./CardDetails.js";

export {
  SignIn,
  SignUp,
  CustomerProfile,
  CustomerHomePage,
  AddVehicle,
  EditVehicle,
  Details,
  ManageVehicle,
  CardDetails,
};
