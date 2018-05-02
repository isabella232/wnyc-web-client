import { scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';


export default Controller.extend({
  queryParams:  ['tab'],
  tab: null,
  metrics: service(),

  setTab(){
    if (location.hash.substr(1) === "transcript"){
      this.set("tab", 'transcript');
    }
  },

  init(){
    this._super(...arguments);
    scheduleOnce("afterRender", this, this.setTab);
    this.set('deviceIsIos', !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform));
  },

  actions: {
    onShowComments(story) {
      let metrics = this.get('metrics');
      let {containers:action, title:label} = story.get('analytics');

      metrics.trackEvent('GoogleAnalytics', {
        category: 'Displayed Comments',
        action,
        label
      });
    }
  }
});
