export const getVideoIdFromUrl = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : false;
};

export const getTimeByYoutubeTimeApi = (time) => {
  console.log(time);
  const reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
  let hours = '00'; let minutes = '00'; let seconds = '00';
  let totalseconds;

  if (reptms.test(time)) {
    const matches = reptms.exec(time);
    if (matches[1]) hours = matches[1].length > 1 ? matches[1] : `0${matches[1]}`;
    if (matches[2]) minutes = matches[2].length > 1 ? matches[2] : `0${matches[2]}`;
    if (matches[3]) seconds = matches[3].length > 1 ? matches[3] : `0${matches[3]}`;
    totalseconds = `${hours}:${minutes}:${seconds}`;
  }
  return totalseconds;
};
