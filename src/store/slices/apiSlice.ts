import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProduct } from '../../modules/feed/components/mini-product/MiniProduct';

// if you need to scale the application
export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://63e21a47109336b6cbff8c48.mockapi.io/',
  }),
  endpoints: (builder) => ({
    getProductsByPermalink: builder.query<IProduct[], string>({
      query: (permalink) => `${permalink}`,
    }),
  }),
});

export const { useGetProductsByPermalinkQuery } = productsApi;
