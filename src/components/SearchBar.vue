<template>
    <div class="searchBar-container">
        <!-- $store.commit('inserData') -->
        <form @submit.prevent="searchVideo">
            <h2 class="titulo">Añadir nuevo video</h2>
            <input class="input" placeholder="Añadir" type="text" v-model="url">
            <button class="submit" type="submit">
                Añadir
            </button>
        </form>
    </div>

    
</template>

<script setup>
import useSearchBar from '@/composables/useSearchBar'
        const {
            isOpen,
            url,
            closeModal,
            searchVideo,
            titulo,
            descripcion,
            img,

        } = useSearchBar()
        
        isOpen
        url
        closeModal
        searchVideo
        titulo
        descripcion
        img
</script>
    