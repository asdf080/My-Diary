import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Nav from "./components/Nav";
import { useAuthContext } from "./hooks/useAuthContext";
import loadGif from "./components/load.gif";

function App() {
  const { isAuthReady, user } = useAuthContext();
  return (
    <div className="App">
      {isAuthReady ? (
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route
              path="/"
              element={
                user ? <Home /> : <Navigate replace={true} to="/login" />
              }
            ></Route>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate replace={true} to="/" />}
            ></Route>
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate replace={true} to="/" />}
            ></Route>
          </Routes>
        </BrowserRouter>
      ) : (
        <img
          style={{ position: "absolute", top: "30%", left: "45%" }}
          src={loadGif}
          alt="Loading..."
        />
      )}
    </div>
  );
}

console.log(`
      ROCKET SCIENCE

            ##
           #  #
          #    #
         #      #
        #   ##   #
       #  #    #  #
       #  #    #   #
     ##     ##     ##
    # #            # #
   #  #            #  #
  #   #            #   #
 #    #            #    #
 #  # #            # #  #
 # #   #          #   # #
 #      # # # # ##      #

         #      #
          #    #
           #  #
            ##

`)

export default App;
