import ENV from 'wqxr-web-client/config/environment';
import { helper } from 'ember-helper';
import { canonicalize } from 'wqxr-web-client/services/script-loader';
let { wnycURL } = ENV;
wnycURL = canonicalize(wnycURL);

export default helper(function([ url ]) {
  url = url || '';
  if (url.startsWith('/') || url.startsWith(wnycURL)) {
    return '';
  } else {
    return '_blank';
  }
});
