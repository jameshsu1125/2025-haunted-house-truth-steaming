export const getTimeline = (totalTime: number, min: number, max: number) => {
  const result = [];

  for (let i = 0; i < totalTime; i += Math.random() * (max - min) + min) {
    result.push(i);
  }

  return result;
};
