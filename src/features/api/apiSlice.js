import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  tagTypes: ["videos", "video", "relatedVideos"],
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      keepUnusedDataFor: 600,
      providesTags: ["videos"],
    }),
    getVideo: builder.query({
      query: (videoId) => `/videos/${videoId}`,
      providesTags: (result, error, arg) => [
        {
          type: "video",
          id: arg?.id,
        },
      ],
    }),
    getRelatedVideos: builder.query({
      query: ({ title }) => {
        //?title_like=VS%20Code%20Snippets&title_like=css
        const titleArr = title.split(" ");
        const queryStringArr = titleArr.map((title) => `title_like=${title}`);
        const queryString = queryStringArr.join("&");
        return `/videos/?${queryString}_limit=4`;
      },
      providesTags: (result, error, arg) => [
        {
          type: "relatedVideos",
          id: arg?.id,
        },
      ],
    }),

    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["videos"],
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (resutl, error, arg) => [
        "videos",
        {
          type: "video",
          id: arg.id,
        },
        {
          type: "relatedVideos",
          id: arg.id,
        },
      ],
    }),
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["videos"],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useGetRelatedVideosQuery,
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
} = apiSlice;
