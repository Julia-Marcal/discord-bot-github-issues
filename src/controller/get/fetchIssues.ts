import axios from 'axios';
require('dotenv').config();

export const fetchData = async (fetchUrl: string) => {
  try {
    const response = await axios.get(fetchUrl+'/issues', {
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

