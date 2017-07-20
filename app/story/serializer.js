import DS from 'ember-data';
import { camelizeObj } from 'wnyc-web-client/helpers/camelize-object';

//dasherized versions of names in model bc they haven't been processsed yet
const propertiesWithChildren = [
  'appearances',
  'chunks',
  'headers',
  'image-main',
  'playlist',
  'producing-organizations',
  'segments',
  'series',
  'show-producing-orgs',
  'slideshow'
];

export default DS.JSONAPISerializer.extend({
  extractId: (modelClass, {attributes}) => attributes.slug,

  normalizeResponse(store, primaryModelClass, payload, id, requestType) {

    for (var prop of propertiesWithChildren) {
      //if we have the property, process it
      if (payload.data.attributes && payload.data.attributes.hasOwnProperty(prop)){
        payload.data.attributes[prop] = camelizeObj(payload.data.attributes[prop]);
      }
    }

    return this._super(store, primaryModelClass, payload, id, requestType);
  },

});
