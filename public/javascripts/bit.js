import '../sass/style.scss';
import 'regenerator-runtime/runtime';

import timedSprint from './modules/timedSprint';
import lengthSprint from './modules/lengthSprint';
import {
  expandTextArea, deleteWarning, changePrivacy, changeTrust,
} from './modules/editorHelpers';
import { prompt } from './modules/prompt';
import { flashClickHandler } from './modules/flash';
import { loadInExistingBit } from './modules/sprintHelpers';
import { api } from './modules/apiHelpers';

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
