import { Pause, Play } from "./Player";
import { usePlayerStore } from "@/store/playerStore";

const CardPlayButton = ({ id }) => {
  const { isPlaying, currentMusic, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state);

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id;


  const handleClick = async () => {

    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    const response = await fetch(`api/get-info-playlist.json?id=${id}`);
    const data = await response.json();
    const { songs, playlist } = data;
    setIsPlaying(true);
    setCurrentMusic({ songs, playlist, song: songs[0] });
  }


  return (
    <button onClick={handleClick} className="card-play-button rounded-full bg-green-500 p-2">
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  )
}

export default CardPlayButton;