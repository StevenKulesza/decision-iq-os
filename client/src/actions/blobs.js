// Actions
import {
  FETCH_BLOBS_BEGIN,
  FETCH_BLOBS_SUCCESS,
  FETCH_BLOBS_FAILURE, 
  ADD_BLOB,
  DELETE_BLOB
} from './types'

export const fetchBlobsBegin = blobs => ({
  type: FETCH_BLOBS_BEGIN
});

export const fetchBlobsSuccess = blobs => ({
  type: FETCH_BLOBS_SUCCESS,
  payload: { blobs }
});

export const fetchBlobsError = error => ({
  type: FETCH_BLOBS_FAILURE,
  payload: { error }
});

// inital BLOBS fetch
export function fetchBlobs(client, flight) {
  return dispatch => {

    dispatch(fetchBlobsBegin());

    var url = "/blobs?"
    if(client) url += "client="+client;
    if(flight) url += "&flight="+flight;

    return fetch(url)
      .then(results => {
        return results.json()
      })
      .then(data => {
        var assets = [];
        /* eslint array-callback-return:0 */
        data.map(item => {
          let image = {};

          image.value = item.metadata.filename;
          image.type = item.metadata.filetype;
          image.label = item.metadata.filename;
          image.file = item.image;
          image.category = item.metadata.filecategory;
          image.thumb = item.thumb;
          image.size = item.metadata.filesize;
          image.lastModified = item.metadata.filemodified;

          assets.push(image);
        });
        dispatch(fetchBlobsSuccess(assets));
      })
      .catch(error => {
        dispatch(fetchBlobsError(error))
      })
  }
}

export function addBlob(blob) {
  return {
    type: ADD_BLOB,
    blob
  }
}

export function deleteBlob(blob, client, flight) {
  
  return dispatch => {

    const token = localStorage.getItem('jwtToken');
    
    fetch('/blobs/delete', {
      method: 'DELETE',
      headers: {
        "Authorization": "Bearer " + token,
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "blobName": client + '/' + flight + '/' + blob
      })
    })
    .then(response =>{
        dispatch(fetchBlobs(client, flight))
      }
    )

    return {
      type: DELETE_BLOB,
      blob
    }
  }
  
}