type Second = number;

export function changeSecondToMinute(second: Second) {
  const minute = Math.floor(second / 60);
  const remainSecond = second - minute * 60;

  return `${minute}:${remainSecond}`;
}
