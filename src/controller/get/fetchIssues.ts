import axios from "../../services/axios";
require('dotenv').config();

export const fetchData = async () => {
  try {
    const response = await axios.get('/issues', {
      headers: {
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });

    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

