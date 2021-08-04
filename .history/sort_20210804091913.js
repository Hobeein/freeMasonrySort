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
    alignTop() {
      const map_arr = this.sortByTopLeftOffsetX()
    },
    alignLeft() {
      const map_arr = this.sortByTopLeftOffsetX()
    },
    sortByTopLeftOffsetX() {
      const arr = Array.from(options.ElementPositionMap)
      arr.sort((a, b) => {
        if ((a[1].top - b[1].top) === 0) {
          if ((a[1].left_index - b[1].left_index) === 0) {
            return a[1].offsetX - b[1].offsetX
          }
          return a[1].left - b[1].left
        }
        return a[1].top - b[1].top
      })
      return arr
    },
    draw() {
      options.ElementPositionMap.forEach((v, k) => {
        v.elm.style.transition = 'all .3s'
        const left = v.left_index * options.grid_width
        const width = v.width_index * options.grid_width
        v.elm.style.top = v.top + 'px'
        v.elm.style.left = left + 'px'
        v.elm.style.width = width + 'px',
          v.elm.style.height = v.height + 'px'

        setTimeout(() => {
          v.elm.style.transition = 'unset'
        }, 300)
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
    defaultSort() {
      let offsetX_count = 0
      let offsetY_arr = []
      let max_offsetY = 0
      options.ElementPositionMap.forEach((v, k) => {
        if ((offsetX_count + v.width_index) <= options.xAxis_grid_total) {
          offsetY_arr.push((v.height + max_offsetY))
        } else {
          offsetX_count = 0
          max_offsetY = Math.max(...offsetY_arr)
          offsetY_arr = []
        }
        v.top = max_offsetY
        v.left_index = offsetX_count
        offsetX_count += v.width_index
        v.offsetY = (v.top + v.height)
        v.offsetX = (v.left_index + v.width_index)
        // console.log(v)
      })
      util.draw()
    }
  }
  this.$sort = api
})()

function getElementRectInfo(elm) {
  const rect = elm.getBoundingClientRect()
  const width = rect.width
  const height = rect.height
  const top = elm.style.top ? Number.parseInt(elm.style.top) : 0
  const left = elm.style.left ? Number.parseInt(elm.style.left) : 0

  return { rect, top, left, width, height }
}