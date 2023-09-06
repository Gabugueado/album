import { ref } from "vue"
import youtubeApi from '@/api/youtubeApi'
import store from "@/store"

const useSearchBar = () => {


    const isOpen = ref(false)
    const url = ref('')
    const titulo = ref('')
    const descripcion = ref('')
    const img = ref('')

    const obtenerIdDeVideo = (url) => {
        // Expresión regular para buscar el ID del video en la URL, ya sea con la url youtube.com o youtu.be
        const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

        // Intenta hacer coincidir la expresión regular con la URL proporcionada
        const match = url.match(regex);

        if (match) {
            // Si se encontró una coincidencia, devuelve el ID del video
            return match[1];
        } else {
            // Si no se encontró una coincidencia, devuelve null o realiza un manejo de errores apropiado
            return null;
        }
    }
    function duracion(duration) {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    
        const horas = parseInt(match[1]) || 0;
        const minutos = parseInt(match[2]) || 0;
        const segundos = parseInt(match[3]) || 0;
    
        const minutosFormateados = minutos.toString();
        const segundosFormateados = segundos.toString().padStart(2, '0');
    
        let duracionFormateada = `${horas}:${minutosFormateados}:${segundosFormateados}`;
    
        // Elimina el cero inicial si la duración empieza con "0:"
        if (duracionFormateada.startsWith('0:')) {
            duracionFormateada = duracionFormateada.slice(2);
        }
    
        return duracionFormateada;
    }
    
    return {
        isOpen,
        url,
        closeModal: () => { isOpen.value = false },
        searchVideo: async () => {
            const idVideo = obtenerIdDeVideo(url.value)
            const { data } = await youtubeApi.get(`/videos?id=${idVideo}`)
            if (data.items.length <= 0){
                return store.state.Toast.fire({
                    icon: 'error',
                    title: 'enlace incorrecto '
                })
            }
            const { title, description, thumbnails } = data.items[0].snippet

            store.dispatch('insertarVideo', {
                id: idVideo,
                titulo: title,
                descripcion: description,
                duracion: duracion(data.items[0].contentDetails.duration),
                url: url.value,
                img: thumbnails.standard.url,
            })
            url.value = ''

        },
        titulo,
        descripcion,
        img,
    }

}

export default useSearchBar