import { usePlayerStore } from "@/store/playerStore";
import { Volume, VolumeSilence } from "@/components/Player";
import Slider from "@/components/Slider";

const VolumeControl = () => {

  const volume = usePlayerStore(state => state.volume);
  const setVolume = usePlayerStore(state => state.setVolume);

  return (
    <div className="flex justify-center gap-x-2 text-white">
      {volume >= 0.1 ? <Volume /> : <VolumeSilence />}
      <Slider
        defaultValue={[100]}
        max={100}
        min={0}
        className="w-[95px]"
        onValueChange={(value) => {
          const [newVolumen] = value;
          const volumenValue = newVolumen / 100;
          volumenRef.current = volumenValue;
          audioRef.current.volume = volumenValue;
        }}
      />
    </div>
  )
}

export default VolumeControl;