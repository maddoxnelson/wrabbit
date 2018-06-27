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
  }
}
