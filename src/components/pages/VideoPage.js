import React from "react";
import Player from "../../Video/Player";
import Description from "../../Video/Description";
import RelatedVideos from "../../Video/related/RelatedVideos";
import { useParams } from "react-router-dom";
import { useGetVideoQuery } from "../../features/api/apiSlice";
import PlayerLoader from "../../ui/loaders/PlayerLoader";
import DescriptionLoader from "../../ui/loaders/DescriptionLoader";
import Error from "../../ui/Error";
const VideoPage = () => {
  const { id } = useParams();
  const { data: video, isError, isLoading } = useGetVideoQuery(id);
  let content = null;
  if (isLoading) {
    content = (
      <>
        <PlayerLoader />
        <DescriptionLoader />
      </>
    );
  }

  if (!isLoading && isError) {
    content = <Error />;
  }

  if (!isLoading && !isError && video?.id) {
    content = (
      <>
        <Player thumbnail={video?.link} title={video?.title} />
        <Description video={video} />
      </>
    );
  }

  console.log(video);
  return (
    <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
      <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          <div className="col-span-full w-full space-y-8 lg:col-span-2">
            {content}
          </div>

          {video?.id && <RelatedVideos title={video.title} id={video.id} />}
        </div>
      </div>
    </section>
  );
};

export default VideoPage;
