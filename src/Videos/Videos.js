import React from "react";
import Video from "./Video";
import { useGetVideosQuery } from "../features/api/apiSlice";
import VideoLoader from "../ui/loaders/VideoLoader";
import Error from "../ui/Error";
import Success from "../ui/Success";

const Videos = () => {
  const { data: videos, isLoading, isError } = useGetVideosQuery();
  console.log(videos, isError, isLoading);
  let content = null;

  if (isLoading) content = <VideoLoader />;

  if (!isLoading && isError) content = <Error />;

  if (!isLoading && isError && videos?.length === 0)
    content = <Success message="No video Found" />;

  if (!isLoading && !isError && videos?.length > 0)
    content = videos.map((video) => <Video key={video.id} video={video} />);
  return <>{content}</>;
};

export default Videos;
