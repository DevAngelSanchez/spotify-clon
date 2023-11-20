import { useRef, useState, useEffect } from "react"

const Pause = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_1"
    data-name="Layer 1"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  ><path
    d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm0,21c-4.962,0-9-4.038-9-9S7.038,3,12,3s9,4.038,9,9-4.038,9-9,9Zm-1-11.5v5c0,.829-.671,1.5-1.5,1.5s-1.5-.671-1.5-1.5v-5c0-.829.671-1.5,1.5-1.5s1.5.671,1.5,1.5Zm5,0v5c0,.829-.671,1.5-1.5,1.5s-1.5-.671-1.5-1.5v-5c0-.829.671-1.5,1.5-1.5s1.5.671,1.5,1.5Z"
  ></path></svg>
)

const Play = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_16"
    data-name="Layer 16"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  ><path
    d="M24,12A12,12,0,1,1,12,0,12.013,12.013,0,0,1,24,12ZM3,12a9,9,0,1,0,9-9A9.011,9.011,0,0,0,3,12Zm7-6V18l5.65-5.17a1.115,1.115,0,0,0,0-1.66Z"
  ></path></svg>
)

export function Player() {

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const audioRef = useRef();

  useEffect(() => {
    audioRef.current.src = "/music/1/01.mp3";
  }, []);

  const handleClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }


  return (
    <div className="flex flex-row justify-between w-full px-4 z-50">
      <div>
        currentSont...
      </div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
        </div>
      </div>

      <div className="grid place-content-center">
        volumen
      </div>

      <audio ref={audioRef} />
    </div>
  )
}