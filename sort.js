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
        key,
        top,
        height,
        left_index,
        width_index,
        'offsetY': (top + height),
        'offsetX': (left_index + width_index)
      })
    },
    sortByTopLeftOffsetX() {
      const arr = Array.from(options.ElementPositionMap)
      // console.log(arr)
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
    getElementCorrectTop({ elm, top, height, left_index, width_index, offsetY, offsetX }) {
      const correctTops = [0]
      options.ElementPositionMap.forEach((v, k) => {
        if ((!(left_index >= v.offsetX)) && (!(offsetX <= v.left_index)) && (offsetY > v.offsetY)) {
          correctTops.push(v.offsetY)
        }
      })
      return Math.max(...correctTops)
    },
    getElementCorrectLeft({ elm, top, height, left_index, width_index, offsetY, offsetX }) {
      const correctLefts = [((left_index <= 4) ? 0 : left_index)]
      options.ElementPositionMap.forEach((v, k) => {
        if ((!(top >= v.offsetY)) && (!(offsetY <= v.top)) && (offsetX > v.offsetX) && ((left_index - v.offsetX) <= 4)) {
          correctLefts.push(v.offsetX)
        }
      })
      return Math.max(...correctLefts)
    },
    getOverlayElements(obj) {
      const elements = []
      const arr = Array.from(options.ElementPositionMap)
      for (const map of arr) {
        const k = map[0]
        const v = map[1]
        if ((obj.key !== k) && this.checkOverlay_oneToOne(obj, v)) {
          elements.push(v)
        }
      }
      return elements
    },
    checkOverlay_allToAll() {
      let isOverlay = false
      const arr = Array.from(options.ElementPositionMap)
      for (const map of arr) {
        const k = map[0]
        const v = map[1]
        if (this.checkOverlay_oneToAll(v)) {
          isOverlay = true
          break
        }
      }
      return isOverlay
    },
    checkOverlay_oneToAll(obj) {
      let isOverlay = false
      const arr = Array.from(options.ElementPositionMap)
      for (const map of arr) {
        const k = map[0]
        const v = map[1]
        if ((obj.key !== k) && this.checkOverlay_oneToOne(obj, v)) {
          isOverlay = true
          break
        }
      }
      return isOverlay
    },
    checkOverlay_oneToOne(obj1, obj2) {
      // console.log('! checkOverLay_oneCompareWithOne ! ===> ' + obj1.key + '|' + obj2.key)
      // console.log('left < target.occupyW:', obj1.left_index, obj2.offsetX, (obj1.left_index < obj2.offsetX))
      // console.log('occupyW > target.left:', obj1.offsetX, obj2.left_index, (obj1.offsetX > obj2.left_index))
      // console.log('top < target.occupyH:', obj1.top, obj2.offsetY, (obj1.top < obj2.offsetY))
      // console.log('occupyH > target.top:', obj1.offsetY, obj2.top, (obj1.offsetY > obj2.top))
      // console.log('! checkOverLay_oneCompareWithOne !\n')
      // debugger
      return ((obj1.left_index < obj2.offsetX) && (obj1.offsetX > obj2.left_index) && (obj1.top < obj2.offsetY) && (obj1.offsetY > obj2.top))
    },
    setDraggingElementCorrectPosition(overlays, current) {
      const moveOverlays = []
      const correctLefts = [current.left_index]
      const correctTops = [current.top]
      for (const over of overlays) {
        let canMove = true
        if ((current.offsetX > over.offsetX) && ((over.offsetX - current.left_index) <= (current.width_index / 3))) {
          correctLefts.push(over.offsetX)
          canMove = false
        }
        if ((current.offsetY > over.offsetY) && ((current.top - over.top) > (over.height / 3))) {
          correctTops.push(over.offsetY)
          canMove = false
        }
        canMove && moveOverlays.push(over)
      }
      const correctLeft = Math.max(...correctLefts)
      const correctTop = Math.max(...correctTops)
      current.top = correctTop
      current.left_index = correctLeft
      current.offsetY = correctTop + current.height
      current.offsetX = correctLeft + current.width_index
      options.ElementPositionMap.set(current.key, current)

      return moveOverlays
    },
    moveOverlayElements(draggingElement) {
      const overlays = this.getOverlayElements(draggingElement)
      const moveOverlays = this.setDraggingElementCorrectPosition(overlays, draggingElement)
      const current = options.ElementPositionMap.get(draggingElement.key)
      for (const moveElm of moveOverlays) {
        moveElm.top = current.offsetY
        moveElm.offsetY = current.offsetY + moveElm.height
        options.ElementPositionMap.set(moveElm.key, moveElm)
        if (this.checkOverlay_oneToAll(moveElm)) {
          this.moveOverlayElements(moveElm)
        }
      }
      if (this.checkOverlay_oneToAll(current)) {
        this.moveOverlayElements(current)
      }
    },
    alignTop() {
      const map_arr = this.sortByTopLeftOffsetX()
      for (const eMap of map_arr) {
        const key = eMap[0]
        const value = eMap[1]
        const correctTop = this.getElementCorrectTop(value)
        value.top = correctTop
        value.offsetY = correctTop + value.height
        options.ElementPositionMap.set(key, value)
      }
      if (this.checkOverlay_allToAll()) {
        this.alignTop()
      }
    },
    alignLeft() {
      const map_arr = this.sortByTopLeftOffsetX()
      for (const eMap of map_arr) {
        const key = eMap[0]
        const value = eMap[1]
        const correctLeft = this.getElementCorrectLeft(value)
        value.left_index = correctLeft
        value.offsetX = correctLeft + value.width_index
        options.ElementPositionMap.set(key, value)
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
      this.alignTop()
      this.draw()
    },
    draw(obj) {
      options.ElementPositionMap.forEach((v, k) => {
        const left = v.left_index * options.grid_width
        const width = v.width_index * options.grid_width
        let htmlElm = null
        if (obj && obj.key === k) {
          htmlElm = obj.shadow
        } else {
          htmlElm = v.elm
        }
        htmlElm.style.transition = 'all .3s'
        htmlElm.style.top = v.top + 'px'
        htmlElm.style.left = left + 'px'
        htmlElm.style.width = width + 'px',
          htmlElm.style.height = v.height + 'px'

        setTimeout(() => {
          htmlElm.style.transition = 'unset'
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
      setTimeout(() => {
        util.defaultSort()
      }, 10)
    },
    addElement(elm) {
      util.setElementPositionMap(options.ElementPositionMap.size, elm)
      this.sort()
    },
    sort(object) {
      let drawObject = null
      if (object) {
        const { rect, top, left, width, height } = getElementRectInfo(object.elm)
        const vIter = options.ElementPositionMap.values()
        let map_value = null
        do {
          map_value = vIter.next().value
          if (!map_value) {
            break
          } else if (map_value.elm === object.elm) {
            util.setElementPositionMap(map_value.key, object.elm)
            const value = options.ElementPositionMap.get(map_value.key)
            util.moveOverlayElements(value)
            drawObject = { 'key': value.key, 'shadow': object.shadow }
            break
          }
        } while (map_value)
      }
      util.alignLeft()
      util.alignTop()
      util.draw(drawObject)
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