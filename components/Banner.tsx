import Image from "next/image";
import { Movie } from "../typings";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";

interface Props {
  netflixOrigin: Movie[];
}
const baseUrl = "https://image.tmdb.org/t/p/original/";
const Banner = ({ netflixOrigin }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  useEffect(() => {
    setMovie(netflixOrigin[Math.floor(Math.random() * netflixOrigin.length)]);
  }, [netflixOrigin]);
  return (
    <div
      className={
        "flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] md:ml-10 lg:justify-end lg:pb-12"
      }
    >
      <div className={"absolute top-0 left-0 -z-10 h-[95vh] w-full"}>
        <Image
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          layout={"fill"}
          objectFit={"cover"}
        />
      </div>
      <h1 className={"text-2xl lg:text-4xl font-bold md:text-3xl"}>
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className={"max-w-xs text-xs md:max-w-lg lg:max-w-2xl lg:text-2xl"}>
        {movie?.overview}
      </p>
      <div className={"flex items-center space-x-3"}>
        <button className={"bannerButton bg-white text-black"}>
          <FaPlay className={"h-4 w-4 text-black md:w-6 md:h-6"} /> Play
        </button>
        <button className={"bannerButton bg-[gray]/70"}>
          <IoMdInformationCircle className={"h-5 w-5 md:h-8 md:w-8"} /> More
          Info
        </button>
      </div>
    </div>
  );
};
export default Banner;
