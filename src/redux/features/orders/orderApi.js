import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/getBaseUrl'

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/order`,
    credentials: 'include'
});

const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery,
    tagTypes: ['Orders'],
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: "/create-order",
                method: "POST",
                body: newOrder,
                credentials: "include"
            }),
            invalidatesTags: ["Orders"]
        }),
        getAllOrders: builder.query({
            query: () => "/get-all-order",
            providesTags: ["Orders"]
        }),
        getOrdersByEmail: builder.query({
            query: (email) => ({
                url: `/email/${email}`,
            }),
            providesTags: ["Orders"]
        }),
    })
})

export const { useCreateOrderMutation, useGetOrdersByEmailQuery } = ordersApi;
export default ordersApi;

