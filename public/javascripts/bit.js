import '../sass/style.scss';
import 'regenerator-runtime/runtime';
console.log('yo')
import timedSprint from './modules/timedSprint';
import lengthSprint from './modules/lengthSprint';
import { expandTextArea, deleteWarning, changePrivacy, changeTrust } from './modules/editorHelpers';
import { prompt } from './modules/prompt';
import { flashClickHandler } from './modules/flash';
import { loadInExistingBit } from './modules/sprintHelpers';
import { api } from './modules/apiHelpers';
import { bitFilter } from './modules/forms';
console.log('dude. wat. yes.')
console.log(bitFilter)

deleteWarning()
flashClickHandler();
timedSprint();
lengthSprint();
expandTextArea();
prompt();
changePrivacy();
loadInExistingBit();
api()
changeTrust();
console.log('start plz')
bitFilter.initialize();