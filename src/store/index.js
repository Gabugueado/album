import { createStore } from 'vuex'

import nodeApi from "@/api/nodeApi";
import Swal from 'sweetalert2';

export default createStore({
	state: {
		videos: [],
		Toast: Swal.mixin({
			toast: true,
			position: 'top-end',
			showConfirmButton: false,
			timer: 3000,
			timerProgressBar: true,
			didOpen: (toast) => {
				toast.addEventListener('mouseenter', Swal.stopTimer)
				toast.addEventListener('mouseleave', Swal.resumeTimer)
			}
		})
	},
	getters: {
	},
	mutations: {
		cargarVideos(state, videos) {
			state.videos = [...state.videos, ...videos]
		},
		insertarVideo(state, video) {

			state.Toast.fire({
				icon: 'success',
				title: 'Álbum Actualizado'
			})
			state.videos = [video, ...state.videos]
		},
		eliminarVideo(state, id) {
			state.videos = state.videos.filter(video => video.id != id)
		},
	},
	actions: {
		// usando mysql
		// async MyAction  (/*{ commit }*/) => {
		// }
		async cargarVideos({ commit }) {
			const { data } = await nodeApi.get('/getAllVideos')
			const videos = []
			data.forEach((element, index) => {
				videos.push({ index, ...element })
			});
			const videosOrdenados = videos.sort((a, b) => a.orden - b.orden);
			commit('cargarVideos', videosOrdenados)

		},
		async insertarVideo({ commit, state }, video) {
			await nodeApi.post('/insertData', { ...video })
				.then(() => {
					commit('insertarVideo', video)
				}).catch(() => {
					state.Toast.fire({
						icon: 'error',
						title: 'el video ya existe'
					})
				})
		},
		async eliminarVideo({ commit, state }, video) {
			const { data } = await nodeApi.delete('/eliminarVideo/' + video.id)
			if (data.affectedRows == 0) {
				return state.Toast.fire({
					icon: 'error',
					title: 'no se a eliminado el video'
				})
			}
			state.Toast.fire({
				icon: 'success',
				title: 'video eliminado'
			})
			commit('eliminarVideo', video.id)
		},
		// usando firebase
		// async MyAction  (/*{ commit }*/) => {
		// }
		async obtenerVideos({ commit })  {
			const { data } = await nodeApi.get('/obtenerVideos')	
			commit('cargarVideos', data.reverse())
		},
		async insertarVideoFB({ commit, state }, video) {
			await nodeApi.post('/insertarVideo', { ...video })
			.then((response) => {
				commit('insertarVideo', video)
				state.Toast.fire({
					icon: 'success',
					title: response.data.message
				})
			}).catch((error) => {
				state.Toast.fire({
					icon: 'error',
					title: error.response.data.error
				})
			})
		},
		async eliminarVideoFB({ commit, state }, video) {
			
			await nodeApi.delete('/eliminarVideoFB/' + video.id)
			.then((response)=>{
				state.Toast.fire({
					icon: 'success',
					title: response.data
				})
			})
			.catch((error)=>{
				state.Toast.fire({
					icon: 'success',
					title: error.response.data
				})
			})
			commit('eliminarVideo', video.id)
		},
	},
	modules: {
	}
})
