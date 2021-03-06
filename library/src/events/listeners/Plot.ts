/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import EventEmitter from '../EventEmitter';
import {clientEventTopics} from '../defaultTopics';

declare const cuAPI: any;

function run(emitter: EventEmitter, topic: string) {
  cuAPI.OnPlotStatus((plotOwned: boolean, permissions: number, charID: string, entityID: string) => {
    emitter.emit(topic, {
      plotOwned: plotOwned,
      permissions: permissions,
      charID: charID,
      entityID: entityID
    });
  });
}

export default class PlotListener {
  listening: boolean = false;
  type: string;
  topic: string = clientEventTopics.handlesPlot;
  start(emitter: EventEmitter): void {
    if (!this.listening) {
      this.listening = true;
      run(emitter, this.topic);
    }
  }
}
