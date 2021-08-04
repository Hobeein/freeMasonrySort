(function() {
  const options = {
    spacing: 12,
    MaxWidth: 0,
    parent: null,
    grid_width: 0,
    xAxis_grid_total: 100,
    ElementPositionMap: new Map()
  }
  const util = {
    setElementPositionMap(key, elm) {
      const { top, left, width, height } = getElementRectInfo(elm)
      const left_index = Math.round(left / options.grid_width)
      const width_index = Math.round(width / options.grid_width)
      options.ElementPositionMap.set(key, {
        elm,
        top,
        height,
        left_index,
        width_index,
        'offsetY': (top + height),
        'offsetX': (left_index + width_index)
      })
    },
    alignLeft() {
      options.ElementPositionMap.forEach((v, k) => {

      })
    }
  }
  const api = {
    config(opt) {
      Object.assign(options, opt)
      return this
    },
    setParentElement(elm) {
      options.parent = elm
      options.MaxWidth = elm.getBoundingClientRect().width
      options.grid_width = options.MaxWidth / options.xAxis_grid_total
      return this
    },
    setElement(...elms) {
      for (let i = 0; i < elms.length; i++) {
        const elm = elms[i];
        util.setElementPositionMap(i, elm)
      }
    },
    defaultSort() { }
  }
  this.$sort = api
})()

function getElementRectInfo(elm) {
  const rect = elm.getBoundingClientRect()
  const width = rect.width
  const height = rect.height
  const top = rect.style.top ? Number.parseInt(rect.style.top) : 0
  const left = rect.style.left ? Number.parseInt(rect.style.left) : 0

  return { rect, top, left, width, height }
}