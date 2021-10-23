import axios from 'axios';
import firebaseConfig from '../apiKeys';

const baseURL = firebaseConfig.databaseURL;

const getPlayers = (uid) => new Promise((resolve, reject) => {
  axios
    .get(`${baseURL}/players.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createPlayer = (object, uid) => new Promise((resolve, reject) => {
  axios
    .post(`${baseURL}/players.json`, object)
    .then((response) => {
      axios
        .patch(`${baseURL}/players/${response.data.name}.json`, {
          firebaseKey: response.data.name,
        })
        .then(() => getPlayers(uid).then(resolve));
    })
    .catch(reject);
});

const deletePlayer = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios
    .delete(`${baseURL}/players/${firebaseKey}.json`)
    .then(() => getPlayers(uid).then(resolve))
    .catch(reject);
});

const updatePlayer = (playerObj, uid) => new Promise((resolve, reject) => {
  axios
    .patch(`${baseURL}/players/${playerObj.firebaseKey}.json`, playerObj)
    .then(() => getPlayers(uid).then(resolve))
    .catch(reject);
});

export {
  getPlayers,
  createPlayer,
  deletePlayer,
  updatePlayer,
};
