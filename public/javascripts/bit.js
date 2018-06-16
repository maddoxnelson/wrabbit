import '../sass/style.scss';
import 'regenerator-runtime/runtime';

import timedSprint from './modules/timedSprint';
import lengthSprint from './modules/lengthSprint';
import { expandTextArea, deleteWarning } from './modules/editorHelpers';
import { prompt } from './modules/prompt';
import { flashClickHandler } from './modules/flash'

deleteWarning()
flashClickHandler();
timedSprint();
lengthSprint();
expandTextArea();
prompt();
