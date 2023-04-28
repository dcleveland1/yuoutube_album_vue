/* eslint-disable class-methods-use-this */
import axios from 'axios';

const API_KEY = 'AIzaSyBcyNpi_qemL3wORY3da5RN_dPAqKQ6uuU';

class YoutubeService {
  getVideoData(videoId) {
    return axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet&part=contentDetails`);
  }
}

export default new YoutubeService();
