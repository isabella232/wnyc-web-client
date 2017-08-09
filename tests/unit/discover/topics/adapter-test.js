import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:discover/topics', 'Unit | Adapter | discover/topics', {
  // Specify the other units that are required for this test.
  needs: ['service:session']
});

test('it exists', function(assert) {
  let adapter = this.subject();
  assert.ok(adapter);
});
