import { useEffect, useState } from "react";
import { auth, db } from "../firbase-config/firebase";
import { SignOut, signUp } from "./index";
import PropTypes from "prop-types";
import Profile from "../profile/Profile";
import ToDo from "../components/ToDo";
import { doc, setDoc } from "firebase/firestore";

const SignUp = ({ toggleForm }) => {
    
    const [userEmail, setUserEmail] = useState('')
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [isUserProfile, setIsUserProfile] = useState(false);
    // const [isUpdateProfile, setIsUpdateProfile] = useState(false)

    
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
            await signUp(userEmail, password);
            console.log('user document:')
        } catch (error) {
            console.log(error.message)
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
                {
                    !currentUser ? (
                    <>
                        <h1>Sign Up</h1>
                        <form className="form-control" onSubmit={handleSignUp}>
                            <label htmlFor="name">Enter name</label>
                            <input type="text" placeholder="enter name here" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                            <label htmlFor="password">enter password</label>
                            <input type="password" placeholder="enterpassword" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button>Sign Up</button>
                        </form>
                        {!currentUser && <button onClick={toggleForm} >Have an account? Sign In</button>}
                    </>    
                ) : (
                !isUserProfile ? (<div>
                <p>Welcome, to your dashboard! {currentUser.displayName} </p>
                <div>

                    <ToDo />
                    <GetDocs />
                </div>
                <div>
                <button onClick={handleLogOut}>Log Out</button>
                <button onClick={handleToogleProfile} >Profile</button>
                </div>
            </div>) : <Profile currentUser={currentUser} />
            )
                }
            </div>
        </>
     );
}

SignUp.propTypes = {
    toggleForm: PropTypes.func.isRequired
};

export default SignUp;