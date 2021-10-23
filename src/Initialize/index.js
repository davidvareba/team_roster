import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import { getPlayers } from '../api/data/playerData';
import SignIn from '../views/SignIn';
import Navigation from '../components/Navigation';
import Routes from '../routes';

function Initialize() {
  const [players, setPlayers] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((authed) => {
      if (authed) {
        const userInfoObj = {
          fullName: authed.displayName,
          profileImage: authed.photoURL,
          uid: authed.uid,
        };
        setUser(userInfoObj);
        getPlayers(authed.uid).then(setPlayers);
      } else if (user || user === null) {
        setUser(false);
      }
    });
  }, []);

  return (
    <>
      <Container>
        {user ? (
          <>
            <Navigation />
            <Routes
              players={players}
              setPlayers={setPlayers}
              key={players.firebaseKey}
              user={user}
            />
          </>
        ) : (
          <SignIn user={user} />
        )}
      </Container>
    </>
  );
}

export default Initialize;
