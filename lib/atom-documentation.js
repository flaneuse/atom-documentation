'use babel';

import AtomDocumentationView from './atom-documentation-view';
import { CompositeDisposable } from 'atom';

export default {

  atomDocumentationView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomDocumentationView = new AtomDocumentationView(state.atomDocumentationViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomDocumentationView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-documentation:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomDocumentationView.destroy();
  },

  serialize() {
    return {
      atomDocumentationViewState: this.atomDocumentationView.serialize()
    };
  },

  toggle() {
    console.log('AtomDocumentation was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};


comment_file() {
  var file_comments = "@name: \n@title: \n"
  editor.insertText(file_comments);
}
