import { getTimeByYoutubeTimeApi } from '../../utils';

const YoutubeVideoAdapter = (data) => data.data.items.map((element) => ({
  title: element.snippet.title,
  description: element.snippet.description,
  thumbnail: element.snippet.thumbnails.high,
  duration: getTimeByYoutubeTimeApi(element.contentDetails.duration),
  id: element.id,
}));
export default YoutubeVideoAdapter;
