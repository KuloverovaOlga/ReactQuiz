export const getDeclension = (number, titles) => {
  const abs = Math.abs(number) % 100;
  const count = abs % 10;

  if (abs > 10 && abs < 20) return titles[2];
  if (count > 1 && count < 5) return titles[1];
  if (count === 1) return titles[0];

  return titles[2];
};