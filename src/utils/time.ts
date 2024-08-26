type Second = number

export function changeSecondToMinute(second: Second) {
  const minute = Math.floor(second / 60)
  const remainSecond = Math.ceil(second - minute * 60)

  const displayMinute = minute.toString().length === 1 ? `0${minute}` : minute
  const displaySecond =
    remainSecond.toString().length === 1 ? `0${remainSecond}` : remainSecond

  return `${displayMinute}:${displaySecond}`
}
