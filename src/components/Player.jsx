import { useRef, useEffect } from "react";
import { usePlayerStore } from "@/store/playerStore";
import CurrentSong from "@/components/CurrentSong";
import VolumeControl from "@/components/VolumeControl";

export const Pause = () => (
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

export const Play = () => (
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
);

export const VolumeSilence = () => (
  <svg fill="currentColor" role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volumen apagado" viewBox="0 0 16 16" ><path d="M13.86 5.47a.75.75 0 0 0-1.061 0l-1.47 1.47-1.47-1.47A.75.75 0 0 0 8.8 6.53L10.269 8l-1.47 1.47a.75.75 0 1 0 1.06 1.06l1.47-1.47 1.47 1.47a.75.75 0 0 0 1.06-1.06L12.39 8l1.47-1.47a.75.75 0 0 0 0-1.06z"></path><path d="M10.116 1.5A.75.75 0 0 0 8.991.85l-6.925 4a3.642 3.642 0 0 0-1.33 4.967 3.639 3.639 0 0 0 1.33 1.332l6.925 4a.75.75 0 0 0 1.125-.649v-1.906a4.73 4.73 0 0 1-1.5-.694v1.3L2.817 9.852a2.141 2.141 0 0 1-.781-2.92c.187-.324.456-.594.78-.782l5.8-3.35v1.3c.45-.313.956-.55 1.5-.694V1.5z"></path></svg>
);

export const Volume = () => (
  <svg fill="currentColor" role="presentation" height="16" width="16" aria-hidden="true" aria-label="Volumen alto" id="volume-icon" viewBox="0 0 16 16"><path d="M9.741.85a.75.75 0 0 1 .375.65v13a.75.75 0 0 1-1.125.65l-6.925-4a3.642 3.642 0 0 1-1.33-4.967 3.639 3.639 0 0 1 1.33-1.332l6.925-4a.75.75 0 0 1 .75 0zm-6.924 5.3a2.139 2.139 0 0 0 0 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 0 1 0 4.88z"></path><path d="M11.5 13.614a5.752 5.752 0 0 0 0-11.228v1.55a4.252 4.252 0 0 1 0 8.127v1.55z"></path></svg>
);

export function Player() {

  const { currentMusic, isPlaying, setIsPlaying } = usePlayerStore(state => state);
  const audioRef = useRef();
  const volumenRef = useRef(1);

  useEffect(() => {
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    const { songs, song, playlist } = currentMusic;

    if (song) {
      const src = `/music/${playlist?.id}/0${song?.id}.mp3`;
      audioRef.current.src = src;
      audioRef.current.volume = volumenRef.current;
      audioRef.current.play();
    }
  }, [currentMusic])

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  }

  return (
    <div className="flex flex-row justify-between w-full px-4 z-50">
      <div>
        <CurrentSong {...currentMusic.song} />
      </div>

      <div className="grid place-content-center gap-4 flex-1">
        <div className="flex justify-center">
          <button className="bg-white rounded-full p-2" onClick={handleClick}>
            {isPlaying ? <Pause /> : <Play />}
          </button>
        </div>
      </div>

      <div className="grid place-content-center">
        <VolumeControl />
      </div>

      <audio ref={audioRef} />
    </div>
  )
}