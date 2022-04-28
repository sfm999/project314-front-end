import './css/Profile.css';
import VehicleList from './VehicleList';

const Profile = () => {
    return (
        <div className="profile">
            <div className="personal-details">
                <h1>Your profile</h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Consequatur ipsa in voluptas quod repellat dignissimos,
                    veniam nesciunt tenetur quo eaque fuga iure quas,
                    consequuntur accusantium error, impedit cum dolorem quasi?
                </p>
            </div>
            <div className="vehicle-list">
                <VehicleList />
            </div>
        </div>
      );
}
 
export default Profile;