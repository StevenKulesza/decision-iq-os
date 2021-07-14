// Packages
import axios from 'axios'

// Actions
import {
  FETCH_TEMPLATES_BEGIN,
  FETCH_TEMPLATES_SUCCESS,
  FETCH_TEMPLATES_FAILURE,

  ADD_TEMPLATE_SIZE, 
  DELETE_TEMPLATE_SIZE,
  SELECTED_TEMPLATE,
  SELECTED_TEMPLATE_TYPE,

  COPY_AUDIENCE_OBJECT,

  UPDATE_STYLE,
  UPDATE_STYLES,

  UPDATE_PRODUCT,
  ADD_PRODUCT,
  REMOVE_PRODUCT,

  UPDATE_FRAME,
  ADD_FRAME,
  REMOVE_FRAME,

  SET_VISUALIZER,
  SET_EVERGREEN
} from './types';

export const fetchTemplatesBegin = templates => ({
  type: FETCH_TEMPLATES_BEGIN
});

export const fetchTemplatesSuccess = templates => ({
  type: FETCH_TEMPLATES_SUCCESS,
  payload: { templates }
});

export const fetchTemplatesError = error => ({
  type: FETCH_TEMPLATES_FAILURE,
  payload: { error }
});

// inital template fetch
export function fetchTemplates() {
  return dispatch => {
    let token = localStorage.getItem('jwtToken');

    dispatch(fetchTemplatesBegin());
    
    return axios({
      method:'get',
      url:'/templates/',
      headers: {'Authorization': 'Bearer ' +  token}
    })
    .then(res => {
      dispatch(fetchTemplatesSuccess(res.data));
    })
    .catch(error => {
      dispatch(fetchTemplatesError(error))
    });
  }
}


export function addTemplateSize(templateSize) {
  return {
    type: ADD_TEMPLATE_SIZE,
    templateSize
  }
}

export function deleteTemplateSize(templateSize) {
  return {
    type: DELETE_TEMPLATE_SIZE,
    templateSize
  }
}

export function selectTemplate(template) {
  return {
    type: SELECTED_TEMPLATE,
    template
  }
}

export function selectTemplateType(templateType) {
  return {
    type: SELECTED_TEMPLATE_TYPE,
    templateType
  }
}

export function updateStyle(styleKey, fieldKey, audienceKey, value) {
  return {
    type: UPDATE_STYLE,
    payload: {
        'styleKey': styleKey,
        'fieldKey': fieldKey,
        'audienceKey': audienceKey,
        'value': value
    }
  }
}

export function updateStyles(data) {
  return {
    type: UPDATE_STYLES,
    payload: {
        'data': data
    }
  }
}

export function copyAudienceObject(audience) {
  return {
    type: COPY_AUDIENCE_OBJECT,
    audience
  }
}

export function setVisualizer(tabKey, objectKey){
  return {
    type: SET_VISUALIZER,
    payload: {
      'tabKey': tabKey,
      'objectKey': objectKey
    }
  }
}

export function setEvergreen(frameName){
  return {
    type: SET_EVERGREEN,
    payload: {
      'frameName': frameName
    }
  }
}

export function updateProduct(productKey, fieldKey, value) {
  return {
    type: UPDATE_PRODUCT,
    payload: {
      'productKey': productKey,
      'fieldKey': fieldKey,
      'value': value
    }
  }
}

export function updateFrame(frameKey, frame) {
  return {
    type: UPDATE_FRAME,
    payload: {
      'frameKey': frameKey,
      'frame': frame
    }
  }
}

export function removeFrame(index) {
  return {
    type: REMOVE_FRAME,
    index: index
  }
}

export function addProduct(data) {
  return {
    type: ADD_PRODUCT,
    payload: data
  }
}

export function addFrame(data) {
  return {
    type: ADD_FRAME,
    payload: data
  }
}

export function removeProduct(index) {
  return {
    type: REMOVE_PRODUCT,
    index: index
  }
}
