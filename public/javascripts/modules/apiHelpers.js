import axios from 'axios';
import { customCallbackLibrary } from './customAPICallbacks';

async function callAPI(e) {
  const element = e.target.dataset.url ? e.target : e.target.closest('.api');
  const { url, callback } = element.dataset;
  const data = await axios(url).then(response => response.data);
  if (!callback || !customCallbackLibrary[callback]) return;
  customCallbackLibrary[callback]({ data, element: e.target });
}

export function api() {
  const apiTriggers = [...document.querySelectorAll('.api')];
  apiTriggers.forEach(trigger => trigger.addEventListener('click', callAPI));
}
