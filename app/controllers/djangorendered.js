import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['next', 'q'],
  next: null,
  q: null
});
