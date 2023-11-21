import { Pause, Play } from "./Player";
import { usePlayerStore } from "@/store/playerStore";

const CardPlayButton = ({ id }) => {
  const { isPlaying, currentMusic, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state);

  const handleClick = () => {

    setCurrentMusic({
      playlist: {
        id
      }
    })

    setIsPlaying(!isPlaying);
  }

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id;

  return (
    <button onClick={handleClick} className="card-play-button rounded-full bg-green-500 p-2">
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  )
}

export default CardPlayButton;