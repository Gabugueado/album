<script setup >
import { computed, ref } from 'vue';
import store from '@/store'
import myVideo from './myVideo.vue';

store.dispatch('cargarVideos')

const videos = computed( () => store.state['videos']) 
const verVideo = ref(false)
const video = ref({})
const modalEliminar = ref(false)

const eliminarVideo = (element) =>{
    modalEliminar.value = true
    video.value = element
}

const verVideoModal = (element) => {
    verVideo.value = true
    video.value = element
}

const closeModal = () => {
    verVideo.value = false
    modalEliminar.value = false
}

</script>

<template>
    <div 
        v-if="videos"
        class="card-container" >
        <myVideo
            v-for="video in videos"
            :key="video.id"
            :video="video"
            @verVideoModal="verVideoModal"
            @eliminarVideo="eliminarVideo"
        />
    </div>
    <div v-else class="card-container">
        <h1>no hay videos aún</h1>
    </div>
    <template v-if="modalEliminar">
        <div class="modal-background fade-in">
            <div class="modal-container" style="height: 250px">

                <div class="modal-header">
                    <button class="cerrar-modal" @click="closeModal">&times;</button>
                </div>
                <div class="modal-body" >
                    <h2 class="mensaje">¿Seguro que quieres eliminar este video?</h2>
                </div>

                <div class="modal-footer">
                    <footer>
                        <button class="btn-cancelar" @click="closeModal">
                            <span>Cancelar</span>
                        </button>
                        <button class="btn-eliminar" @click="closeModal(); $store.dispatch('eliminarVideo', video)">
                            <span>Eliminar</span>
                        </button>
                    </footer>
                </div>

            </div>
        </div>    
    </template>
    <template v-if="verVideo">
        <div 
            class="modal-background fade-in">
            <div class="modal-container" style="height: 438px;">

                <div class="modal-header">
                    <button class="cerrar-modal" @click="closeModal">&times;</button>
                </div>

                <div class="modal-body" >
                    <div class="img-container" style=" position: relative;display: inline-block;" >
                        <iframe 
                            class="embed-responsive-item img"
                            :src="'https://www.youtube.com/embed/' + video.id + '?enablejsapi=1&controls=1&modestbranding=1&color=red&showinfo=0&widgetid=1'"
                            frameborder="0"
                            allowfullscreen >
                        </iframe>
                        <!-- <iframe frameborder="0" allowfullscreen="1" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            width="640" height="360" 
                            src="https://www.youtube.com/embed/bHQqvYy5KYo?origin=https%3A%2F%2Fdevelopers.google.com&amp;showinfo=0&amp;video-id=bHQqvYy5KYo&amp;enablejsapi=1&amp;widgetid=1" 
                            id="widget2" 
                            data-title="YouTube video player" 
                            title="Google I/O 2011: YouTube's iframe Player: The Future of Embedding">
                        </iframe> -->
                    </div>
                    <div class="descripcion-container">
                        <h3>{{ video.titulo }}</h3>
                        <p style="height: 75px;" >{{ video.descripcion }}</p>
                    </div>
                </div>
            </div>
        </div>
    </template>
</template>
<style scoped>
.ytp-impression-link{
    display: none;
}
</style>