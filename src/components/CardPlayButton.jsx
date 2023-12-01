import { Pause, Play } from "./Player";
import { usePlayerStore } from "@/store/playerStore";

const CardPlayButton = ({ id, size = "small" }) => {
  const { isPlaying, currentMusic, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state);

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id;


  const handleClick = async () => {

    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    const response = await fetch(`/api/get-info-playlist.json?id=${id}`);
    const data = await response.json();
    const { songs, playlist } = data;
    setIsPlaying(true);
    setCurrentMusic({ songs, playlist, song: songs[0] });
  }

  const iconClassName = size === 'small' ? 'w-4 h-4' : 'w-6 h-6'

  return (
    <button onClick={handleClick} className="card-play-button rounded-full bg-green-500 p-2 hover:scale-105 hover:bg-green-400 transition duration-300 text-zinc-900">
      {isPlayingPlaylist ? <Pause className={iconClassName} /> : <Play className={iconClassName} />}
    </button>
  )
}

export default CardPlayButton;