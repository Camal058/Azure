import { useState, useEffect } from 'react'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import './App.css'
import axios from 'axios'

function App() {
  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(
      () => {
          if (user) {
                axios
                  .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                      headers: {
                          Authorization: `Bearer ${user.access_token}`,
                          Accept: 'application/json'
                      }
                  })
                  .then((res) => {
                      setProfile(res.data);
                  })
                  .catch((err) => console.log(err));
          }
      },
      [ user ]
  );

  const logOut = () => {
      googleLogout();
      setProfile(null);
  };

  return (
    <>
       <div>
            <h2>Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <h2>User</h2>
                    <p>Name: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google <img src={"https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"} height={"30"}/></button>
            )}
        </div>
    </>
  )
}

export default App