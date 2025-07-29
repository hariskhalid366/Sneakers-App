import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://skeaks.vercel.app';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl}),
  endpoints: builder => ({
    // get List of Products
    getProducts: builder.query({
      query: () => 'products',
    }),

    // get product by their id
    getProduct: builder.query({
      query: id => `products/${id}`,
    }),

    // get the orders from the database
    getOrder: builder.mutation({
      query: data => ({
        url: `api/orders/findorder`,
        method: 'POST',
        body: data,
      }),
    }),

    // create order to the database
    createOrder: builder.mutation({
      query: newOrder => ({
        url: 'api/orders/order',
        method: 'POST',
        body: newOrder,
      }),
    }),

    //payment intent
    createPaymentIntent: builder.mutation({
      query: data => ({url: 'payment/intents', method: 'POST', body: data}),
    }),

    //user register
    createUserAccount: builder.mutation({
      query: data => ({
        url: 'api/register',
        method: 'POST',
        body: data,
      }),
    }),

    // login User
    loginUserAccount: builder.mutation({
      query: data => ({
        url: 'api/login',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderMutation,
  useGetProductQuery,
  useGetProductsQuery,
  useCreatePaymentIntentMutation,
  useCreateUserAccountMutation,
  useLoginUserAccountMutation,
} = apiSlice;
