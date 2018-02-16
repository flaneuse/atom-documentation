'use babel';

import {
  CompositeDisposable
} from 'atom';

// Configurable options


export default {
  subscriptions: null,

  config: {
     author_name: {
       title: 'Author Name',
       description: 'sets author name for file header',
       type: 'string',
       default: '',
       order: 0
     },
     author_email: {
       title: 'Author Email',
       description: 'sets author email address for file header',
       type: 'string',
       default: '',
       order: 1
     },
     license: {
       title: 'Author Name',
       description: 'sets author name for file header',
       type: 'string',
       default: 'MIT',
       order: 2
     },
     comment_chars: {
       title: 'comment syntax',
       description: 'sets what to append to the start of the inserted text to turn it into a comment. For instance, `#` for python or `//` for javascript',
       type: 'string',
       default: '',
       order: 3
     }
   },

  activate(state) {

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-documentation:filedoc': () => this.filedoc()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-documentation:funcdoc': () => this.funcdoc()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-documentation:section': () => this.section()
    }));

    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-documentation:minisection': () => this.minisection()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

// [Add section]
  section() {
    const tot_chars = 100; // total number of characters for a given area
    const min_chars = 5; // total number of characters for a given area

    var comment_chars = atom.config.get("atom-documentation.comment_chars")
    if(comment_chars != "") {
      comment_chars = comment_chars + " ";
    }

    const editor = atom.workspace.getActiveTextEditor()
    if (editor) {
      const selection = editor.getSelectedText();

      var len_divider = tot_chars - selection.length;

      if(len_divider < min_chars) {
        len_divider = min_chars
      }

      var section_text = comment_chars + '[] ' + selection + ' ' + '-'.repeat(len_divider)

      editor.insertText(section_text)
    }
  },

// [Add minisection]
  minisection() {
    const num_chars = 3; // total number of characters to add
    var comment_chars = atom.config.get("atom-documentation.comment_chars")
    if(comment_chars != "") {
      comment_chars = comment_chars + " ";
    }

    const editor = atom.workspace.getActiveTextEditor()
    if (editor) {
      const selection = editor.getSelectedText();


      var section_text = comment_chars + '-'.repeat(num_chars) + ' ' + selection + ' ' + '-'.repeat(num_chars)

      editor.insertText(section_text)
    }
  },

  filedoc() {
    const editor = atom.workspace.getActiveTextEditor()

    var filename = atom.workspace.getActiveTextEditor().buffer.file

    if(filename !== null){
        filename = filename.getBaseName()
    } else{
      filename = ''
    }

    if (editor) {
      const author_name = atom.config.get("atom-documentation.author_name")
      const author_email = atom.config.get("atom-documentation.author_email")
      const license = atom.config.get("atom-documentation.license")

      var comment_chars = atom.config.get("atom-documentation.comment_chars")
      if(comment_chars != "") {
        comment_chars = comment_chars + " ";
      }

      var months = {0: "January", 1: "February", 2: "March",
                    3: "April", 4: "May", 5: "June",
                    6: "July", 7: "August", 8: "September",
                    9: "October", 10: "November", 11: "Decemeber"} // Months are 0-indexed.

      var today = new Date();
      var day = today.getDate();
      var month = months[today.getMonth()];
      var year = today.getFullYear();

      var file_metadata =
          comment_chars +   "@name:        " + filename +
          "\n" + comment_chars + "@summary:     " +
          "\n" + comment_chars + "@description: " +
          "\n" + comment_chars + "@sources:     " +
          "\n" + comment_chars + "@depends:     " +
          "\n" + comment_chars + "@author:      " + author_name +
          "\n" + comment_chars + "@email:       " + author_email +
          "\n" + comment_chars + "@license:     " + license +
          "\n" + comment_chars + "@date:        " + day + " " + month + " " + year;


      editor.insertText(file_metadata)
    }
  },

  funcdoc() {
    const editor = atom.workspace.getActiveTextEditor()
    var comment_chars = atom.config.get("atom-documentation.comment_chars")
    if(comment_chars != "") {
      comment_chars = comment_chars + " ";
    }

    if (editor) {

      const selection = editor.getSelectedText();
      var func_metadata =
          comment_chars + "<<< " + selection + " >>>" +
          "\n" + comment_chars + "@name:        " +
          "\n" + comment_chars + "@summary:     " +
          "\n" + comment_chars + "@description: " +
          "\n" + comment_chars + "@inputs:      " +
          "\n" + comment_chars + "@outputs:     " +
          "\n" + comment_chars + "@examples:    "


      editor.insertText(func_metadata)
    }
  }

};
