'use babel';

import AutoSoftwrapView from './auto-softwrap-view';
import { CompositeDisposable } from 'atom';

export default {

  autoSoftwrapView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.autoSoftwrapView = new AutoSoftwrapView(state.autoSoftwrapViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.autoSoftwrapView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'auto-softwrap:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.autoSoftwrapView.destroy();
  },

  serialize() {
    return {
      autoSoftwrapViewState: this.autoSoftwrapView.serialize()
    };
  },

  toggle() {
    console.log('AutoSoftwrap was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
