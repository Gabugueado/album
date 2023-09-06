<script setup>

const props = defineProps({
    video: Object,
});

</script>

<template>
    <div class="card">
        <span class="close-icon" @click="$emit('eliminarVideo', props.video)">
            &times;
        </span>
        <span class="video-duration">{{ props.video.duracion }}</span>
        <img 
        :src="video.img" 
        class="img-thumbnail" 
        @click="$emit('verVideoModal', video)"
        alt="Thumbnail del video"
        />
       
    </div>
</template>
