import { useEffect, useState } from "react";
import Slider from "@/components/Slider";

const SongControl = ({ audio }) => {

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    audio.current.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio.current.addEventLister("timeupdate", handleTimeUpdate);
    }
  }, []);

  const handleTimeUpdate = () => {
    setCurrentTime(audio?.current.currentTime);
  }

  const duration = audio?.current?.direction ?? 0;

  return (
    <div className="flex gap-x-3 text-xs pt-2">
      <span className="opacity-50">{currentTime}</span>
      <Slider
        defaultValue={[0]}
        value={[currentTime]}
        max={audio?.current?.direction ?? 0}
        min={0}
        className="w-[500px]"
        onValueChange={(value) => {
          audio.current.currentTime = value;
        }}
      />
      <span className="opacity-50">{duration}</span>
    </div>
  )
}

export default SongControl;