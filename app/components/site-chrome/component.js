import Component from 'ember-component';
import service from 'ember-service/inject';
import BetaActionsMixin from 'wnyc-web-client/mixins/beta-actions';
import config from 'wnyc-web-client/config/environment';
import { or } from 'ember-computed';

export default Component.extend(BetaActionsMixin, {
  session: service(),
  metrics: service(),
  router: service(),
  currentUser: service(),
  donateURL: config.wnycDonateURL,
  classNameBindings: ['showPlayer:sitechrome--player-open'],
  defaultStream:  {slug: 'wnyc-fm939', name: 'WNYC 93.9 FM'},
  preferredStream: or('session.data.user-prefs-active-stream', 'defaultStream'),
  socialIcons: [
    {url: 'http://www.twitter.com/wnyc', icon: 'twitter'},
    {url: 'http://www.facebook.com/wnyc', icon: 'facebook'},
    {url: 'https://www.instagram.com/wnyc', icon: 'instagram'},
    {url: 'http://wnyc.tumblr.com/', icon: 'tumblr'},
  ],

  actions: {
    routeSearch(val) {
      this.get('router').transitionTo('djangorendered', ['search/'], {"q": val});
    },
  }
});
