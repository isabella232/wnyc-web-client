import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import ENV from '../config/environment';

export default Route.extend({
  session:       service(),
  discoverQueue: service('discover-queue'),
  discoverPrefs: service(),
  titleToken: 'Discover',

  setupController(controller) {
    // Don't use liquid fire in testing until we figure out why
    // it makes acceptance tests fail

    controller.set('useLiquid', ENV.environment !== 'testing');
  },
  beforeModel() {
    if (window.Modernizr.touchevents) {
      // Show download links
      this.replaceWith('discover.start');
    }
  },
  activate(){
    window.scrollTo(0,0);
  },
  actions: {
    resetPlaylist() {
      this.get('discoverQueue').emptyQueue();
    }
  }
});
