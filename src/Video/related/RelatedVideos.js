import React from "react";
import RelatedSingleVideo from "./RelatedSingleVideo";
import { useGetRelatedVideosQuery } from "../../features/api/apiSlice";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import Error from "../../ui/Error";
import Success from "../../ui/Success";

const RelatedVideos = ({ title, id }) => {
  const {
    data: videos,
    isLoading,
    isError,
  } = useGetRelatedVideosQuery({ title, id });

  let content = null;

  if (isLoading) {
    content = (
      <>
        <RelatedVideoLoader />
        <RelatedVideoLoader />
        <RelatedVideoLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error />;
  }

  if (!isLoading && !isError && videos?.length === 0) {
    content = <Success message="No related video found" />;
  }

  if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map((video) => (
      <RelatedSingleVideo video={video} key={video.id} />
    ));
  }

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
};

export default RelatedVideos;
