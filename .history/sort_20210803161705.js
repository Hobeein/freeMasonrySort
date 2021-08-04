(function() {
  const defaultOptions = {}
  const api = {
    config(options) {
      Object.assign(defaultOptions, options)
      return this
    }
  }
  this.sort = api
})()