import { useEffect, useState } from "react";
import Slider from "@/components/Slider";
import formattTime from '@/helpers/formattTime';

const SongControl = ({ audio }) => {

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    audio.current.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio.current.addEventLister("timeupdate", handleTimeUpdate);
    }
  }, []);

  const handleTimeUpdate = () => {
    setCurrentTime(audio.current.currentTime);
  }

  const duration = audio?.current?.duration ?? 0;

  return (
    <div className="flex gap-x-3 text-xs pt-2">
      <span className="opacity-50 w-12 text-right">{formattTime(currentTime)}</span>
      <Slider
        value={[currentTime]}
        max={duration}
        min={0}
        className="w-[400px]"
        onValueChange={(value) => {
          const [newCurrentTime] = value;
          audio.current.currentTime = newCurrentTime;
        }}
      />
      <span className="opacity-50 w-12">{formattTime(duration)}</span>
    </div>
  )
}

export default SongControl;