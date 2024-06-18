import { useEffect, useState } from "react";
import { SignOut, signIn } from "./index";
import PropTypes from "prop-types";
import { auth } from "../firbase-config/firebase";
import Profile from "../profile/Profile";
import ToDo from "../components/ToDo";

const SignIn = ({ toggleForm }) => {
    const [password, setPassword] = useState('');
    const [userEmail, setUserEmail] = useState('')
    const [currentUser, setCurrentUser] = useState(null);
    const [isUserProfile, setIsUserProfile] = useState(false);

    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            console.log(currentUser);
        });
        
        return () => unsubscribe();
    }, [currentUser]);

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            await signIn(userEmail, password);
        } catch (err) {
            console.log(err.message)
        }
    }

    const handleLogOut = async () => {
        try {
            await SignOut(auth);
        } catch (err) {
            console.log(err.message)
        }
    }

    const handleToogleProfile = () => {
        setIsUserProfile(!isUserProfile)
    }

    return ( 
        <>
            <div className="form-group">
            {currentUser &&
                    <h1>Dashboard</h1>
                }
                {!currentUser ? (
                    <>
                        <h1>Sign In</h1>
                        <form className="form-control" onSubmit={handleSignUp}>
                        <label htmlFor="name">Enter name</label>
                        <input type="text" placeholder="enter name here" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                        <label htmlFor="password">enter password</label>
                        <input type="password" placeholder="enterpassword" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button>Sign In</button>
                    </form>
                    </>
                ) : (
                    !isUserProfile ? (
                        <div className="welcome">
                    <p>Welcome, back to your dashboard! {currentUser.displayName}</p>
                    <div>
                        <ToDo />
                    </div>
                    <div>
                    <button onClick={handleLogOut}>Log Out</button>
                    <button onClick={handleToogleProfile} >Profile</button>
                    </div>

                </div>
                    ) : <Profile />
                )}
                {!currentUser && <button onClick={toggleForm} >Dont have an account? Sign Up</button>}
            </div>
        </>
     );
}

SignIn.propTypes = {
    toggleForm: PropTypes.func.isRequired
};
 
export default SignIn;