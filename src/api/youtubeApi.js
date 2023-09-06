
import axios from "axios"


const  youtubeApi = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        key: 'AIzaSyDeeQTntF-MJmOImTRyNcaA-UlXoSXRFPI',
        // se agrega content Detail para agregar la duración del video
        // https://developers.google.com/youtube/v3/docs/videos?hl=es-419#contentDetails
        part: 'snippet,contentDetails',
    }
})

export default youtubeApi









