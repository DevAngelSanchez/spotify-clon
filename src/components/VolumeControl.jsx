import { usePlayerStore } from "@/store/playerStore";
import { Volume, VolumeSilence } from "@/components/Player";
import { useRef } from "react";
import Slider from "@/components/Slider";

const VolumeControl = () => {

  const volume = usePlayerStore(state => state.volume);
  const setVolume = usePlayerStore(state => state.setVolume);
  const previusVolume = useRef(volume);

  const isVolumeSilenced = volume < 0.1;

  const handleClickVolume = () => {
    if (isVolumeSilenced) {
      setVolume(previusVolume.current);
    } else {
      previusVolume.current = volume;
      setVolume(0);
    }
  }

  return (
    <div className="flex justify-center gap-x-2 text-white">
      <button className="opacity-70 hover:opacity-100 transition" onClick={handleClickVolume}>
        {volume < 0.1 ? <VolumeSilence /> : <Volume />}
      </button>
      <Slider
        defaultValue={[100]}
        max={100}
        min={0}
        value={[volume * 100]}
        className="w-24"
        onValueChange={(value) => {
          const [newVolumen] = value;
          const volumenValue = newVolumen / 100;
          setVolume(volumenValue);
        }}
      />
    </div>
  )
}

export default VolumeControl;