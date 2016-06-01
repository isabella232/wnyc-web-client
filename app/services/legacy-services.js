/*global wnyc*/
import Ember from 'ember';
import service from 'ember-service/inject';

const {
  Service,
  get,
} = Ember;

export default Service.extend({
  metrics: service(),

  streamStation(streamSlug) {
    if (!streamSlug) {
      wnyc.xdPlayer.openToAllStreams();
    } else {
      wnyc.xdPlayer.playStream(streamSlug);
    }
  },
  listen(id, title, show) {
    const metrics = get(this, 'metrics');
    try {
      wnyc.xdPlayer.playOnDemand(id);
    } catch(e) {
      console.warn('Cross Domain Player does not exist');
    }

    metrics.trackEvent({
      category: 'Cross-Domain Player',
      action: 'Click Through to Player',
      label: `${show} - ${title}`,
      model: {cmsPK: id}  // conform to how the data-warehouse metrics adapter expects
    });
  },
  queue(id) {
    try {
      wnyc.xdPlayer.addToPlaylist(id);
    } catch(e) {
      console.warn('Cross Domain Player does not exist');
    }
  },
});
