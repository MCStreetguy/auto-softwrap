'use babel';

export default {

  eventlistener: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    var _this = this;
    this.eventlistener = atom.workspace.observeTextEditors(function(e) {
      _this._run();
    });
    this._run();
  },

  _run() {
    atom.workspace.getTextEditors().forEach(function(e) {
      e.setSoftWrapped(true);
    })
  },

  deactivate() {
    this.eventlistener.dispose();
  },

  serialize() {
    return {};
  }
};
