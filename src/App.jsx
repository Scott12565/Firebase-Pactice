import { useState } from "react"
import SignUp from "./accounts/SignUp"
import SignIn from "./accounts/SignIn";

function App() {
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  }
  
  return (
    <div className="app">
      {
        isSignIn ? (
          <SignIn toggleForm={toggleForm} />
        ) : (
          <SignUp toggleForm={toggleForm} />
        )
      }
    </div>
  )
}

export default App
