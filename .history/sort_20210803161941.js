(function() {
  const defaultOptions = {}
  const api = {
    config(options) {
      Object.assign(defaultOptions, options)
      return this
    },
    setParentElement(elm) {
      return this
    }
  }
  this.$sort = api
})()