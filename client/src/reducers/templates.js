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

  UPDATE_FRAME,
  ADD_FRAME,
  REMOVE_FRAME,

  UPDATE_PRODUCT,
  ADD_PRODUCT,
  REMOVE_PRODUCT,

  SET_VISUALIZER,
  SET_EVERGREEN

} from '../actions/types';

// initial state
const initialState = {
  loading: false,
  templates: [],
  templateSizes: [],
  error: null,
  selectedTemplate: 0,
  selectedTemplateType: 0
};

export default function templatesReducer(state = initialState, action) {
  // let newState = {
  //   ...state
  // };
  let updateTemplate;
  switch(action.type) {
    case FETCH_TEMPLATES_BEGIN:
      // Mark the state as "loading" & reset errors.
      return {
        ...state,
        loading: true,
        templates: [],
        error: null
      };

    case FETCH_TEMPLATES_SUCCESS:
      // All done: set loading "false".
      // Also, update templates from server
      return {
        ...state,
        loading: false,
        templates: action.payload.templates
      };

    case FETCH_TEMPLATES_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      return {
        ...state,
        loading: false,
        templates: [],
        error: action.payload.error
      };
    
    case ADD_TEMPLATE_SIZE:
      updateTemplate = {
        ...state.selectedTemplate
      };

      updateTemplate.sizes[action.templateSize].active = true;

      return {
        ...state,
        selectedTemplate: updateTemplate
      }

    case DELETE_TEMPLATE_SIZE:
      updateTemplate = {
        ...state.selectedTemplate
      };

      updateTemplate.sizes[action.templateSize].active = false;
      
      return {
        ...state,
        selectedTemplate: updateTemplate
      };
    

    case SELECTED_TEMPLATE:
      return {
        ...state,
        selectedTemplate: action.template
      };

    case SELECTED_TEMPLATE_TYPE:
      return {
        ...state,
        selectedTemplateType: action.templateType
      };

    case UPDATE_STYLE:
      updateTemplate = { ...state.selectedTemplate }
      
      updateTemplate
          .template
          .styles
          .styles[action.payload.audienceKey][action.payload.styleKey][action.payload.fieldKey]
          .value = action.payload.value;

      return { 
        ...state, 
        selectedTemplate: updateTemplate
      };
    
    case UPDATE_STYLES:
      updateTemplate = { ...state.selectedTemplate }
      
      updateTemplate
          .template
          .styles.styles = action.payload.data;

      return { 
        ...state, 
        selectedTemplate: updateTemplate
      };

      case COPY_AUDIENCE_OBJECT:
        // create the audience object needed in the feed
        // before selecting the audience

        // if audience styles does not exist, 
        // make a copy of default audience and
        // assign it to the new audience
        let styles, copy;
        
        updateTemplate = { ...state.selectedTemplate }

        styles = updateTemplate
          .template
          .styles
          .styles;
        
        if (updateTemplate
          .template
          .styles
          .styles[action.audience] === undefined || null
          ) {
            copy = JSON.parse( JSON.stringify( styles['all_audiences'] ) );
            copy.audience_id = action.audience;
            styles[action.audience] = copy;
          }
  
        return {
          ...state,
          selectedTemplate: updateTemplate
        };

    case SET_EVERGREEN:
      updateTemplate = { ...state.selectedTemplate };

      updateTemplate.evergreenFrame = action.payload.frameName

      var frames = updateTemplate.template.frames.frames;
      frames.map((frame, i) => {
        frame.evergreen = (frame.name === action.payload.frameName);
        return frame;
      });

      return {
        ...state,
        selectedTemplate: updateTemplate
      };

    case SET_VISUALIZER:
      updateTemplate = { ...state.selectedTemplate };

      updateTemplate.visualizer = {
        'tabKey': action.payload.tabKey,
        'objectKey': action.payload.objectKey
      }

      return {
        ...state,
        selectedTemplate: updateTemplate
      };

    //TODO: Make all updates object based and spread new values over old object
    case UPDATE_FRAME:
      updateTemplate = { ...state.selectedTemplate };

      updateTemplate.template.frames.frames[action.payload.frameKey] = {
        ...updateTemplate.template.frames.frames[action.payload.frameKey],
        ...action.payload.frame
      };


      return { 
        ...state, 
        selectedTemplate: updateTemplate
      };

    case ADD_FRAME:
      updateTemplate = { ...state.selectedTemplate };

      //TODO: DO NOT assume these ad sizes
      let newFrame = {
        "name": "New Frame",
        "clicktag": "",
        "image": {
          "160x600": {
            "label": "160x600",
            "type": "image",
            "value": "",
            "size": "160x600",
            "autoSelect": "(?=.*160x600)(?=.*New Frame).*$",
            "imageID": ""
          },
          "300x250": {
            "label": "300x250",
            "type": "image",
            "value": "",
            "size": "300x250",
            "autoSelect": "(?=.*300x250)(?=.*New Frame).*$",
            "imageID": ""
          },
          "300x600": {
            "label": "300x600",
            "type": "image",
            "value": "",
            "size": "300x600",
            "autoSelect": "(?=.*300x600)(?=.*New Frame).*$",
            "imageID": ""
          },
          "728x90": {
            "label": "728x90",
            "type": "image",
            "value": "",
            "size": "728x90",
            "autoSelect": "(?=.*160x600)(?=.*New Frame).*$",
            "imageID": ""
          }
        },
        "visible": false
      };

      updateTemplate.template.frames.frames.push({
        ...newFrame,
        ...action.payload
      });

      return { 
        ...state, 
        selectedTemplate: updateTemplate
      };

    case REMOVE_FRAME:
      updateTemplate = { ...state.selectedTemplate };

      let framesArray = updateTemplate.template.frames.frames;

      updateTemplate.template.frames.frames = [...framesArray.slice(0, action.index), ...framesArray.slice(action.index + 1)]

      return { 
        ...state, 
        selectedTemplate: updateTemplate
      };

    case UPDATE_PRODUCT:
      updateTemplate = { ...state.selectedTemplate };

      updateTemplate.template.products.products[action.payload.productKey][action.payload.fieldKey] = action.payload.value;

      return { 
        ...state, 
        selectedTemplate: updateTemplate
      };

    case ADD_PRODUCT:
      updateTemplate = { ...state.selectedTemplate };

      let newProduct = {
        id: "",
        division: "",
        weight: 1,
        product_id: "",
        image: {
          "label": "Image",
          "type": "image",
          "value": "",
          "imageID": ""
        },
        price: "",
        brand: "New Product",
        description: "The Product Description.",
        clicktag: ""
      }

      updateTemplate.template.products.products.push({
        ...newProduct,
        ...action.payload
      });

      return { 
        ...state, 
        selectedTemplate: updateTemplate
      };

    case REMOVE_PRODUCT:
      updateTemplate = { ...state.selectedTemplate };

      let productsArray = updateTemplate.template.products.products;

      updateTemplate.template.products.products = [...productsArray.slice(0, action.index), ...productsArray.slice(action.index + 1)]

      return { 
        ...state, 
        selectedTemplate: updateTemplate
      };
      
    default:
      return state;
  }
}
