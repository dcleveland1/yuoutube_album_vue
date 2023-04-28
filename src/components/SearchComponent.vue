<template>
  <div class="searchBox">
    <v-container>
      <v-row>
        <v-col cols="6" offset="3" >
          <v-row>
            <v-col cols="12" >

              <span class="title">
                Añadir nuevo video
              </span>
            </v-col>
          </v-row>
            <v-row>
              <v-col cols="8" class="search_bar" >
                <v-text-field
                  label="Agregar url"
                  :rules="rules"
                  hide-details="auto"
                  v-model="msg"
                  class="search_input"
                ></v-text-field>
              </v-col>
              <v-col cols="4" class="search_bar">
                <v-btn @click="handleAdd" class="fill_content">
                  Añadir
                </v-btn>
              </v-col>

            </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" >
          <v-row>
            <v-col md="3" sm="12" v-for="(item,index) in videosList"  :key="index">
              <CardVideoComponent :item="item"/>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <template>
      <v-snackbar
        v-model="snackbar"
        :color="snackbarColor"
        :timeout="snackbarTimeout"
      >
        {{ snackbarMessage }}
      </v-snackbar>
    </template>

  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import YoutubeService from '../services/Youtube';
import YoutubeVideoAdapter from '../adapters/Youtube';
import { getVideoIdFromUrl } from '../utils';
import CardVideoComponent from './CardVideoComponent.vue';
import FirebaseService from '../services/db';

const msg = ref('https://www.youtube.com/watch?v=2gliGzb2_1I&t=21s&ab_channel=TheJazzHopCaf%C3%A9');
const store = useStore();

const snackbar = ref(false);
const snackbarMessage = ref('');
const snackbarColor = ref('success');
const snackbarTimeout = ref(3000);

const videosList = computed(() => store.getters.videos);
console.log(videosList.value);
const firebaseService = new FirebaseService();
const getInitialData = async () => {
  console.log('asdkjnaskjn');
  const temp = await firebaseService.getDataFromCollection();
  console.log(temp);
  await store.dispatch('initVideoListAction', temp);
  videosList.value = temp;
};
onMounted(() => {
  getInitialData();
});

const handleAdd = async () => {
  try {
    const videoUrl = getVideoIdFromUrl(msg.value);
    const data = await YoutubeService.getVideoData(videoUrl);
    const video = YoutubeVideoAdapter(data);
    const message = await store.dispatch('addVideoAction', video[0]);
    const temp = await firebaseService.addVideoToCollection(video[0]);
    console.log(temp);
    snackbar.value = true;
    snackbarMessage.value = message;
    snackbarColor.value = 'success';
    console.log(message); // El video fue agregado exitosamente
    console.log(videosList.value);
  } catch (error) {
    snackbar.value = true;
    snackbarMessage.value = error.message;
    snackbarColor.value = 'dangewr';
    console.error(error.message); // El video ya existe en la lista
  }
};
</script>
<style scoped>
  .searchBox {
  }
  .search_input{
    width:100%;
    height: 105%;
  }
  .search_bar{
    margin:0;
    padding:0;
    height:60px;
  }
  .fill_content{
    width:100%;
    height:100%;
  }
  .search_input_row{
  }
  .title{
    font-size: 20px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
  }
  .thumbnail{
    background: rgb(34,34,34);
    background: linear-gradient(180deg, rgba(34,34,34,0.7539390756302521) 9%,
     rgba(34,34,34,0.2413340336134454) 35%, rgba(34,34,34,0) 100%);
  }
</style>
