import { useEffect, useState } from "react";
// import PropTypes from "prop-types";
import { auth } from "../firbase-config/firebase";
import { passwordReset, profileUpdate, updateUserEmail } from "../accounts";

const Profile = () => {

    const [isUserProfile, setIsUserProfile] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleToogleProfile = () => {
        setIsUserProfile(!isUserProfile);
    }

    const user = auth.currentUser
    useEffect(() => {
        // const user = auth.currentUser;
        if (user) {
            setName(user.displayName);
            setEmail(user.email);
        }
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await profileUpdate(name);
            await updateUserEmail(email); 
        } catch (error) {
            console.log(error.message);
        }
    }

    const handlePasswordReset = async (e) => {
        e.preventDefault()
        try {
            await passwordReset(email)
        } catch (err) {
            console.log(err.message);
        }
    }
    
    return ( 
        <>
            <div className="profile" style={{
                width: '100%',
            }}>
                <h1>Profile</h1>

                <div className="user-info">
                    <span>name</span>
                    <h4>
                        {user.displayName}
                    </h4>
                    <span>Email</span>
                    <p>{user.email}</p>
                </div>

                <div className="update-profile">
                    

                    {
                        !isUserProfile ? <button onClick={handleToogleProfile}>update profile</button> : (
                            <div className="form-group" style={{
                                width: '95%',
                                padding: '20px'
                            }}>
                        <form className="form-control" onSubmit={handleUpdate}>
                            <label htmlFor="name">Name</label>
                            <input type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                            <label htmlFor="email" placeholder>
                                Email
                            </label>
                            <input type="email" placeholder="Enter email"/>

                            <button>update</button>
                        </form>

                        <div>
                            <div className="form-group" style={{
                                width: '97%',
                                margin: '20px auto',
                                padding: '20px'
                            }}>
                                <form className="from-control" onSubmit={handlePasswordReset}>
                                    <h3 style={{padding: '10px 0'}}>Reset Password!</h3>
                                    <label htmlFor="email">enter email</label>
                                    <input type="email" placeholder="Enter Email" />
                                    <button>Reset Password</button>
                                </form>
                            </div>
                        </div>
                    </div>
                        )
                    }
                </div>

                <button>Log Out</button>
            </div>
        </>
     );
}

// Profile.propTypes = {
//     currentUser: PropTypes.shape({
//         displayName: PropTypes.string,
//         email: PropTypes.string
//     })
// };

 
export default Profile;