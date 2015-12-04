import Ember from 'ember';

export default Ember.Route.extend({
  asyncWriter: Ember.inject.service(),
  legacyLoader: Ember.inject.service(),

  beforeModel() {
    this.get('asyncWriter').install();
    window.WNYC_LEGACY_LOADER = this.get('legacyLoader');
    window.SM2_DEFER = true;
    window.SM2_OPTIONS = {
      bgColor: '#384043', 
      url: '/media/swf/soundmanager2_v297a-20140901'
    };
  }
});
