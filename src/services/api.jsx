import axios from 'axios';

const fetchLinks = async (_limit = 5, _page) => {
  return await axios
    .get(`${process.env.REACT_APP_SERVER_URL}?_page=${_page}&_limit=${_limit}`)
    .then((response) => response.data)
    .catch((error) => console.log('error', error));
};

const fetchCount = async () => {
  return await axios
    .get(`${process.env.REACT_APP_SERVER_URL}`)
    .then((response) => response.data.length)
    .catch((error) => console.log('error', error));
};

const updateLinkClicks = async (_id, _clicks) => {
  return await axios
    .patch(`${process.env.REACT_APP_SERVER_URL}/${_id}`, _clicks)
    .then((response) => response.data)
    .catch((error) => console.log('error', error));
};

const deleteLink = async (_id) => {
  return await axios
    .delete(`${process.env.REACT_APP_SERVER_URL}/${_id}`)
    .then((response) => console.log(response))
    .catch((error) => console.log('error', error));
};

const updateLinkData = async (_id, inputs) => {
  return await axios
    .put(`${process.env.REACT_APP_SERVER_URL}/${_id}`, inputs)
    .then((response) => response.data)
    .catch((error) => console.log('error', error));
};

const addNewLink = async (inputs) => {
  return await axios
    .post(`${process.env.REACT_APP_SERVER_URL}`, inputs)
    .then((response) => response.data)
    .catch((error) => console.log('error', error));
};

export default {
  fetchLinks,
  fetchCount,
  updateLinkClicks,
  deleteLink,
  updateLinkData,
  addNewLink,
};
