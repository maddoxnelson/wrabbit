import axios from 'axios'
import { customCallbackLibrary } from './customAPICallbacks'

async function callAPI(e) {
  const { url, payloadKey, payloadValue, callback } = e.target.dataset
  const data = await axios(url).then(response => response.data)
  customCallbackLibrary[callback]({ data, element: e.target })
}

export function api() {
  const apiTriggers = [...document.querySelectorAll('.api')]
  apiTriggers.forEach(trigger => trigger.addEventListener('click', callAPI))
}
