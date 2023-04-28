<script setup>
import { defineProps, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import FirebaseService from '../services/db';

const store = useStore();
const props = defineProps({
  item: Object,
});
const showDetails = ref(false);
const confirmDelete = ref(false);

const item = ref(props.item);
const firebaseService = new FirebaseService();
onMounted(() => {
  console.log(props.item);
});

const handleDelete = async (id) => {
  const message = await store.dispatch('deleteVideoAction', id);
  await firebaseService.deleteDocumentById(id);
  confirmDelete.value = false;
  console.log(message);
};
</script>

<template>
  <v-card>
    <v-row>
      <v-col cols="12">
        <v-card-text
            @click="showDetails = true">
          <v-img
            height="200"
            :src="item.thumbnail.url"
            cover
            gradient="to bottom,rgb(0,0,0,0.7) , rgba(0,0,0,0.1)"
          >
            <v-toolbar
              color="rgba(0, 0, 0, 0)"
              theme="dark"
              dense
              absolute
            >
              <v-toolbar-title class="text-h6">
                {{ item.title }}
              </v-toolbar-title>
              <template v-slot:append>
                <v-btn @click.stop="confirmDelete= true" icon="mdi-close"></v-btn>
              </template>
            </v-toolbar>
            <v-row class="fill-height" align="end" justify="end">
              <v-col class="text-right">
                <div class="subtitle-2 mr-3 text-white">{{ item.duration }}</div>
              </v-col>
            </v-row>
          </v-img>
        </v-card-text>

      </v-col>
    </v-row>
    <template>
    <v-dialog
          v-model="confirmDelete"
          persistent
          width="auto"
        >
          <v-card>
            <v-card-title class="text-h5">
              Eliminar video
            </v-card-title>
            <v-card-text>¿Esta seguro de eliminar el video? </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="grey-darken-1"
                variant="text"
                @click="confirmDelete = false"
              >
                Cancelar
              </v-btn>
              <v-btn
                color="red-darken-1"
                variant="text"
                @click="handleDelete(item.id)"
              >
                Confirmar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="showDetails"
          width="70%"
          height="auto"
        >
          <v-card>
            <v-container>
              <v-row>
                <v-col md="6" sm="12" offset="0">
                  <iframe title="item.title" style="width:100%; height: 100%;" :src="`https://www.youtube.com/embed/${item.id}`"
                    allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
                </v-col>
                <v-col md="6" sm="12">
                  <v-row>
                    <v-col cols="12">
                      {{ item.title }}
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12 max_height">
                      {{ item.description }}
                    </v-col>
                  </v-row>

                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>
    </template>
  </v-card>
</template>
<style>
.max_height{
  max-height: 297px;
  overflow-y: scroll;
}
</style>
