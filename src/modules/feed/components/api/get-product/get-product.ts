import { Dispatch, SetStateAction } from 'react';

export const getProductList = async (
  permalink: string,
  isLoading: Dispatch<SetStateAction<boolean>>
) => {
  const apiResponse = await fetch(
    `https://63e21a47109336b6cbff8c48.mockapi.io/${permalink}`
  ).then((res) => {
    isLoading(false);
    return res.json();
  });

  return await apiResponse;
};
