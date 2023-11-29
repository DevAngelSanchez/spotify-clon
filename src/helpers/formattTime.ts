const formattTime = (time: number) => {
  if (time === null) "0:00";

  const seconds: number = Math.floor(time % 60);
  const minutes: number = Math.floor(time / 60);
}

export default formattTime;