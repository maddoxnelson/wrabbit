import '../sass/style.scss';
import 'babel-polyfill';

import timedSprint from './modules/timedSprint';
import lengthSprint from './modules/lengthSprint';
import {
  expandTextArea, deleteWarning, changePrivacy, changeTrust,
} from './modules/editorHelpers';
import prompt from './modules/prompt';
import flashClickHandler from './modules/flash';
import { loadInExistingBit } from './modules/sprintHelpers';
import api from './modules/apiHelpers';
import { calendar } from './modules/statsHelpers';

deleteWarning();
flashClickHandler();
timedSprint();
lengthSprint();
expandTextArea();
prompt();
changePrivacy();
loadInExistingBit();
api();
changeTrust();
console.log('cal')
calendar.initialize();