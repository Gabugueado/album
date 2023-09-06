<template>
    <SearchBar/>
    <AlbumVideos/>
</template>

<script>
// @ is an alias to /src
import SearchBar from '@/components/SearchBar.vue';
import AlbumVideos from '@/components/albumVideos.vue';


export default {
  name: 'HomeView',
  components: {
    SearchBar,
    AlbumVideos,
  },
  setup(){
  }
}
</script>

