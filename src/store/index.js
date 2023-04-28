import { createStore } from 'vuex';

export default createStore({
  state: {
    videos: [],
  },
  getters: {
    videos: (state) => state.videos,
  },
  mutations: {
    initVideoList(state, videos) {
      state.videos = videos;
    },
    addVideo(state, video) {
      state.videos = [...state.videos, video];
    },
    deleteVideo(state, videoId) {
      state.videos = state.videos.filter((video) => video.id !== videoId);
    },
  },
  actions: {
    async addVideoAction({ state, commit }, videoPayload) {
      console.log('VIDEOPAYLOAD', videoPayload);
      try {
        const videoId = videoPayload.id;
        const videoExists = state.videos.some((video) => video.id === videoId);
        if (videoExists) {
          throw new Error('El video ya existe en la lista');
        }
        commit('addVideo', videoPayload);
        console.log('STATE', state.videos);
        return 'El video fue agregado exitosamente';
      } catch (error) {
        throw new Error(error);
      }
    },
    async initVideoListAction({ commit }, videos) {
      commit('initVideoList', videos);
    },
    async deleteVideoAction({ commit }, videoId) {
      commit('deleteVideo', videoId);
    },
  },
  modules: {
  },
});
