// index for router
import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Home from '../views/Home';
import NewPlayer from '../views/NewPlayer';
import Welcome from '../views/Welcome';

export default function Routes({ players, setPlayers, user }) {
  const [editPlayers, setEditPlayers] = useState({});
  return (
    <div>

      <Switch>
        <Route
          exact
          path="/team"
          component={() => (
            <Home
              players={players}
              setPlayers={setPlayers}
              setEditPlayers={setEditPlayers}
              user={user}
            />
          )}
        />
        <Route
          exact
          path="/new"
          component={() => (
            <NewPlayer
              obj={editPlayers}
              players={players}
              setPlayers={setPlayers}
              setEditPlayers={setEditPlayers}
              user={user}
            />
          )}
        />
        <Route exact patch="/" component={Welcome} />
      </Switch>

    </div>
  );
}

Routes.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    uid: PropTypes.string,
  }),
  players: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPlayers: PropTypes.func.isRequired,
};

Routes.defaultProps = { user: null };
