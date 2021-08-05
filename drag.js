// Event
function move(event, target, movingCallBack, dropCallback) {
  const { targetParent, targetParentRect, itemWidth, MaxWidth, shadow } = getTargetInfo_And_createShadow(target)
  const oldOffsetX = event.offsetX
  const oldOffsetY = event.offsetY
  target.style.zIndex = 2
  document.onmousemove = (e) => {
    const left = e.clientX - oldOffsetX - targetParentRect.left
    const top = e.clientY - oldOffsetY - targetParentRect.top + targetParent.scrollTop
    if (left >= 0 && (left + itemWidth) <= MaxWidth) {
      target.style.left = left + 'px'
    }
    if (top >= 0) {
      target.style.top = top + 'px'
    }
    if (typeof movingCallBack === 'function') {
      movingCallBack(shadow)
    }
  }
  document.onmouseup = (e) => {
    target.style.zIndex = 1
    targetParent.removeChild(shadow)
    if (typeof dropCallback === 'function') {
      dropCallback()
    }
    document.onmousemove = null
    document.onmouseup = null
  }
}
function resize(event, target, movingCallBack, dropCallback) {
  const { targetRect, targetParent, MaxWidth, MaxHeight, shadow } = getTargetInfo_And_createShadow(target)
  target.style.zIndex = 2
  document.onmousemove = (e) => {
    const width = e.clientX - targetRect.left + 12
    const height = e.clientY - targetRect.top + 12
    if (width >= 0 && width <= MaxWidth) {
      target.style.width = width + 'px'
    }
    if (height >= 0 && height <= MaxHeight) {
      target.style.height = height + 'px'
    }
    if (typeof movingCallBack === 'function') {
      movingCallBack()
    }
  }
  document.onmouseup = (e) => {
    target.style.zIndex = 1
    targetParent.removeChild(shadow)
    if (typeof dropCallback === 'function') {
      dropCallback()
    }
    document.onmousemove = null
    document.onmouseup = null
  }
}

// Function
function getTargetInfo_And_createShadow(target) {
  const targetParent = target.parentElement
  const targetRect = target.getBoundingClientRect()
  const targetParentRect = targetParent.getBoundingClientRect()
  const itemTop = Number.parseInt(target.style.top)
  const itemLeft = Number.parseInt(target.style.left)
  const itemWidth = targetRect.width
  const itemHeight = targetRect.height
  const MaxWidth = targetParentRect.width
  const MaxHeight = targetParent.scrollHeight
  const shadow = document.createElement('div')
  shadow.classList.add('shadow')
  shadow.style.position = 'absolute'
  shadow.style.top = itemTop + 'px'
  shadow.style.left = itemLeft + 'px'
  shadow.style.width = itemWidth + 'px'
  shadow.style.height = itemHeight + 'px'
  shadow.style.border = 'thin #4E4A44 dashed'
  shadow.style.borderRadius = '0px'
  targetParent.appendChild(shadow)
  const shadow_status = {
    'top': itemTop,
    'left': itemLeft,
    'width': itemWidth + 12,
    'height': itemHeight + 12
  }
  return { targetRect, targetParent, targetParentRect, itemWidth, MaxWidth, MaxHeight, shadow, shadow_status }
}
