(function() {
  const options = {
    parent: null,
    MaxWidth: 0,
    spacing: 12
  }
  const api = {
    config(opt) {
      Object.assign(options, opt)
      return this
    },
    setParentElement(elm) {
      options.parent = elm
      options.MaxWidth = elm.getBoundingClientRect().width
      return this
    },
    defaultSort() { }
  }
  this.$sort = api
})()