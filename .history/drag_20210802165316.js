// Event
function move(target, movingCallBack, dropCallback) {
  const { targetParent, targetParentRect, itemWidth, MaxWidth, shadow, shadow_status } = getTargetInfo_And_createShadow(target)
  document.onmousemove = (e) => {
    console.log(e)
    const left = e.clientX - targetParentRect.left - 21
    const top = e.clientY - targetParentRect.top - 21
    if (left >= 0 && (left + itemWidth) <= MaxWidth) {
      target.style.left = left + 'px'
    }
    if (top >= 0) {
      target.style.top = top + 'px'
    }
    if (typeof movingCallBack === 'function') {
      if ((Math.abs(shadow_status.top - top) >= 68) || (Math.abs(shadow_status.left - left) >= 68)) {
        shadow_status.top = top
        shadow_status.left = ((left + itemWidth) <= MaxWidth) ? left : (MaxWidth - itemWidth)
        movingCallBack(shadow, shadow_status)
      }
    }
  }
  document.onmouseup = (e) => {
    targetParent.removeChild(shadow)
    if (typeof dropCallback === 'function') {
      dropCallback()
    }
    document.onmousemove = null
    document.onmouseup = null
  }
}
function resize(target, movingCallBack, dropCallback) {
  const { targetRect, targetParent, MaxWidth, MaxHeight, shadow, shadow_status } = getTargetInfo_And_createShadow(target)
  const shadow_spacing = 24
  shadow.style.width = (Number.parseInt(shadow.style.width) + shadow_spacing) + 'px'
  shadow.style.height = (Number.parseInt(shadow.style.height) + shadow_spacing) + 'px'
  shadow_status.width += shadow_spacing
  shadow_status.height += shadow_spacing
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
      if ((Math.abs((shadow_status.width - shadow_spacing) - width) >= 12) || (Math.abs((shadow_status.height - shadow_spacing) - height) >= 12)) {
        shadow_status.width = (width >= 0) ? (width + shadow_spacing) : shadow_status.width
        shadow_status.height = (height >= 0) ? (height + shadow_spacing) : shadow_status.height
        movingCallBack(shadow, shadow_status)
      }
    }
  }
  document.onmouseup = (e) => {
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
  shadow.style.top = itemTop + 'px'
  shadow.style.left = itemLeft + 'px'
  shadow.style.width = itemWidth + 'px'
  shadow.style.height = itemHeight + 'px'
  shadow.style.border = 'thin #4E4A44 dashed'
  shadow.style.borderRadius = '8px'
  targetParent.appendChild(shadow)
  const shadow_status = {
    'top': itemTop,
    'left': itemLeft,
    'width': itemWidth + 12,
    'height': itemHeight + 12
  }
  return { targetRect, targetParent, targetParentRect, itemWidth, MaxWidth, MaxHeight, shadow, shadow_status }
}
