export const customCallbackLibrary = {
  updateLockIcon: (options) => {
    const { data: bit, element } = options
    const lockIcon = element.closest('.lock-item')
    const openLock = lockIcon.querySelector('.lock-open')
    const closedLock = lockIcon.querySelector('.lock-closed')

    if (bit.privacy === 'world') {
      openLock.classList.remove('hidden')
      closedLock.classList.add('hidden')
    } else {
      openLock.classList.add('hidden')
      closedLock.classList.remove('hidden')
    }
  },
  updateTrustIcon: (options) => {
    const { data, element } = options
    const apiElement = element.closest('.trust-parent')
    const trustIcon = apiElement.querySelector('.trust-icon')
    const untrustIcon = apiElement.querySelector('.untrust-icon')
    const trustText = apiElement.querySelector('.trust-text')
    const isTrusted = data.trusted || false

    if (isTrusted) {
      trustIcon.classList.add('hidden')
      untrustIcon.classList.remove('hidden')
    } else {
      trustIcon.classList.remove('hidden')
      untrustIcon.classList.add('hidden')
    }

    trustText.innerHTML = data.message

  }
}
