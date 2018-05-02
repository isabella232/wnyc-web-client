import { alias } from '@ember/object/computed';
import Service, { inject as service } from '@ember/service';

export default Service.extend({
  session: service(),

  excludedStoryIds: alias('session.data.discover-excluded-story-ids'),

  setupComplete: false,
  currentSetupStep: 'start',

  init() {
    this._super(...arguments);
    this.setProperties({
      selectedTopicTags:[],
      selectedShowSlugs:[],
    });
    this.loadFromSession();
  },

  loadFromSession() {
    let session = this.get('session');
    let topics  = session.getWithDefault('data.discover-topics', []).slice();
    let shows   = session.getWithDefault('data.discover-excluded-shows', []).slice();
    let setupComplete = session.getWithDefault('data.discover-setup-complete', false);
    let currentSetupStep = session.getWithDefault('data.discover-current-setup-step', 'start');
    session.set('data.discover-excluded-story-ids', session.getWithDefault('data.discover-excluded-story-ids', []));

    this.set('selectedTopicTags', topics);
    this.set('excludedShowSlugs', shows);
    this.set('setupComplete', setupComplete);
    this.set('currentSetupStep', currentSetupStep);
  },

  setDefaultShows(slugs) {
    if ((this.get('selectedShowSlugs') || []).length === 0) {
      this.set('selectedShowSlugs', slugs);
    }
  },

  setDefaultTopics(tags) {
    if ((this.get('selectedTopicTags') || []).length === 0) {
      this.set('selectedTopicTags', tags);
    }
  },

  discard() {
    this.loadFromSession();
  },

  save() {
    let session = this.get('session');
    session.set('data.discover-excluded-shows', this.get('excludedShowSlugs').slice());
    session.set('data.discover-topics', this.get('selectedTopicTags').slice());
    session.set('data.discover-setup-complete', this.get('setupComplete'));
    session.set('data.discover-current-setup-step', this.get('currentSetupStep'));
  },


  // This works a little differently in that it gets persisted immediately.
  // Not a huge fan of how this is a special case, but oh well.
  excludeStoryId(id) {
    this.get('excludedStoryIds').pushObject(id);
  }
});
