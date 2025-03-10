/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import WithForbiddenState from 'nomad-ui/mixins/with-forbidden-state';
import notifyForbidden from 'nomad-ui/utils/notify-forbidden';
import classic from 'ember-classic-decorator';

@classic
export default class ServersRoute extends Route.extend(WithForbiddenState) {
  @service store;
  @service system;

  beforeModel() {
    return this.get('system.leader');
  }

  model() {
    return RSVP.hash({
      nodes: this.store.findAll('node'),
      agents: this.store.findAll('agent'),
    }).catch(notifyForbidden(this));
  }
}
