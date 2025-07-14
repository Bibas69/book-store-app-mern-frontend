import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/getBaseUrl'

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/book`,
    credentials: 'include',
    prepareHeaders : (Headers) => {
        const token = localStorage.getItem('token');
        if(token){
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers
    }
})

const booksApi = createApi({
    reducerPath: 'booksApi',
    tagTypes: ["Books"],
    baseQuery,
    endpoints: (builder) => ({
        getAllBooks: builder.query({
            query: () => '/get-all-books',
            providesTags: ["Books"]
        }),
        getBookById: builder.query({
            query: (id) => `/get-single-book/${id}`,
            providesTags : (result, error, id) => [{type: "Books", id}]
        }),
        addBook : builder.mutation({
            query: (newBook) => ({
                url: '/create-book',
                method: 'POST',
                body: newBook
            }),
            invalidatesTags: ["Books"]
        }),
        updateBook: builder.mutation({
            query : ({id, ...rest}) => ({
                url: `/update-book/${id}`,
                method: 'PUT',
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: (result, error, {id}) => ["Books", {type: "Books", id}]
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/delete-book/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result, error, id) => ["Books", {type: "Books", id}]
        })
    })
})

export const {useGetAllBooksQuery, useGetBookByIdQuery, useAddBookMutation, useUpdateBookMutation, useDeleteBookMutation} = booksApi;
export default booksApi;