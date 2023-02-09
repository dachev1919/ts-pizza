import axios from 'axios';

export const getProductList = async (permalink: string) => {
  const apiResponse = axios.get(
    `https://63e21a47109336b6cbff8c48.mockapi.io/${permalink}`
  );

  return await apiResponse;
};
