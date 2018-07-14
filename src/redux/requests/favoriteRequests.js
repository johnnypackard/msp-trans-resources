import axios from 'axios';

export function getFavorites() {
    const config = {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    };

    return axios.get('api/user', config)
        .then(response => response.data)
        .catch((error) => {throw error;});
}

export function addFavoriteToDatabase(action) {
    console.log('sending to redux', action);
    const data = {
        favorite: action.payload,
        userName: action.userName,
    };
    console.log('sending data to redux', data);
    
    return axios.post('api/user/addFavorite', data)
        .then(response => response.data)
        .catch((error) => { throw error; });
}

export function deleteFavoriteFromDatabase(action) {
    console.log('------DELETING favorite------');
    console.log(action);
    console.log(`api/user/deleteFavorite?objectId=${action.object_id}`);
    
    return axios.delete(`api/user/deleteFavorite?objectId=${action.object_id}`)
        .then(response => response.data)
        .catch((error) => {throw error;})  
}

export function updateFavorite(action) {
    console.log('------POST favorite------');
    console.log(action);
    
    return axios.put(`api/user/updateFavoriteComment`, {object_id: action.object_id, comment: action.comment})
        .then(response => response.data)
        .catch((error) => {throw error;})

}