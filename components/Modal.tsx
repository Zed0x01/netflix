import MuiModal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { AiOutlineClose } from "react-icons/ai";
import { Element, Genre } from "../typings";
import axios from "axios";
import ReactPlayer from "react-player/lazy";
import { FaPlay } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineLike, AiOutlinePause } from "react-icons/ai";
import { BsFillVolumeUpFill, BsVolumeMuteFill } from "react-icons/bs";

const Modal = () => {
  const API_KEY = "a775c338e426cfa3758912304da77910";
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false);
  const [play, setPlay] = useState(true);
  const handelClose = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (!currentMovie) return;
    async function fetchMovie() {
      const data = await axios
        .get(
          `https://api.themoviedb.org/3/${
            currentMovie?.media_type === "tv" ? "tv" : "movie"
          }/${
            currentMovie?.id
          }?api_key=${API_KEY}&language=en-US&append_to_response=videos`
        )
        .then((res) => res.data);
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [currentMovie]);
  console.log(trailer);
  return (
    <MuiModal
      open={showModal}
      className={
        "fixed !top-7 left-0 right-0 mx-auto w-full max-w-5xl overflow-y-scroll rounded-md scrollbar-hide"
      }
      onClose={handelClose}
    >
      <>
        <button
          onClick={handelClose}
          className={
            "modalButton absolute right-5 !z-40 top-5 border-none h-9 w-9 bg-[#181818]"
          }
        >
          <AiOutlineClose className={"h-6 w-6"} />
        </button>
        <div className={"relative pt-[56.25%]"}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing={play}
            muted={muted}
          />
          <div
            className={
              "absolute bottom-10 flex w-full items-center justify-between px-10"
            }
          >
            <div className={"flex space-x-2"}>
              <button
                onClick={() => setPlay((prev) => !prev)}
                className={
                  "flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]"
                }
              >
                {!play ? (
                  <FaPlay className={"w-7 h-7 text-black"} />
                ) : (
                  <AiOutlinePause className={"w-7 h-7 text-black"} />
                )}
                {!play ? "Play" : "Pause"}
              </button>
              <button className={"modalButton"}>
                <AiOutlinePlus className={"h-7 w-7"} />
              </button>
              <button className={"modalButton"}>
                <AiOutlineLike className={"h-7 w-7"} />
              </button>
            </div>
            <button
              className={"modalButton ml-2"}
              onClick={() => setMuted((prev) => !prev)}
            >
              {!muted ? (
                <BsFillVolumeUpFill className={"w-7 h-7"} />
              ) : (
                <BsVolumeMuteFill className={"w-7 h-7"} />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {currentMovie!.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {currentMovie?.release_date || currentMovie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{currentMovie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres:</span>{" "}
                  {genres.map((genre) => genre.name).join(", ")}
                </div>

                <div>
                  <span className="text-[gray]">Original language:</span>{" "}
                  {currentMovie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{" "}
                  {currentMovie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};
export default Modal;
