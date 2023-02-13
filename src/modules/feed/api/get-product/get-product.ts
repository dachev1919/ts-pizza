import axios from 'axios';

export const getProductList = async (permalink: string) => {
  return await axios.get(
    `https://63e21a47109336b6cbff8c48.mockapi.io/${permalink}`
  );
};
