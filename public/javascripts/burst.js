import '../sass/style.scss';
import 'regenerator-runtime/runtime';

import timedSprint from './modules/timedSprint';
import lengthSprint from './modules/lengthSprint';
import expandTextArea from './modules/editorHelpers';
import { prompt } from './modules/prompt';

timedSprint();
lengthSprint();
expandTextArea();
prompt();
