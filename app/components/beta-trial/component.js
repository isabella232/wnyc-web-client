import { equal, readOnly } from '@ember/object/computed';
import { computed } from '@ember/object';
import Component from '@ember/component';
import { addAlienLanding } from 'nypr-django-for-ember/utils/alien-dom';
import config from 'wnyc-web-client/config/environment';

const { betaTrials: { betaInviteLanding, legacyNavLinkLanding } } = config;

export default Component.extend({
  modalTarget: 'site-chrome',
  betaInvite: 'beta-invite',
  legacyNavLink: 'beta-legacy-link',
  betaNav: 'beta-nav',
  isOpen: computed({
    get() {
      let regex = new RegExp(`wnyc_trial_${this.get('beta.id')}_interaction=(\\w+)`);
      let cookie = regex.exec(document.cookie) || [];
      return cookie[1] !== 'False' && this.get('isActive');
    },
    set(k, v) {
      return v;
    }
  }),
  isActive: equal('beta.status', 'active'),
  isRetired: equal('beta.status', 'retired'),
  preBeta: readOnly('beta.preBeta'),

  modalBody: computed(function() {
    let isRetired = this.get('isRetired');
    return `components/beta-trial/${isRetired ? 'exit-modal' : 'about-modal'}`;
  }),

  init() {
    this._super(...arguments);
    if (this.get('preBeta')) {
      addAlienLanding(this.get('betaInvite'), betaInviteLanding);
      addAlienLanding(this.get('legacyNavLink'), legacyNavLinkLanding);
    }
    if (this.get('isRetired')) {
      this.set('showModal', true);
    }
  },
  actions: {
    enterBeta() {
      this.get('enterBeta')();
    },
    exitBeta() {
      this.get('exitBeta')();
    },
    dismiss() {
      this.set('isOpen', false);

      let trialId = this.get('beta.id');
      this.get('onDismiss')(trialId);
    },
    openModal() {
      this.set('showModal', true);
    },
    closeModal() {
      if (this.get('isRetired')) {
        this._clearAllCookies();
      }
      this.set('showModal', false);
    }
  },

  _clearAllCookies() {
    let allInteractions = document.cookie.match(/wnyc_trial_\d+_interaction/g) || [];
    let activeTrial = document.cookie.match(/wnyc_trial_for_site_1/g) || [];
    allInteractions.concat(activeTrial).forEach(c => document.cookie = `${c}=; expires=${new Date(0)};`);
  }
});
