import config from '../config/environment';
import DS from 'ember-data';
import wrapAjax from 'nypr-django-for-ember/utils/wrap-ajax'
// TODO: auth headers for native fetch
// import fetch from 'fetch';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:nypr',
  host: config.publisherAPI,
  namespace: `v1/list/comments`,
  
  query(store, type, query) {
    let url = [this.host, this.namespace, query.itemTypeId, query.itemId, ''].join('/');
    let options = this.ajaxOptions(url, 'GET', {});
    return wrapAjax(options);
  }
});
