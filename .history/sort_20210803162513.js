(function() {
  const options = {
    MaxWidth: 0,
    spacing: 12
  }
  const api = {
    config(opt) {
      Object.assign(options, opt)
      return this
    },
    setParentElement(elm) {
      options.MaxWidth = elm.getBoundingClientRect().width
      console.log(options)
      return this
    }
  }
  this.$sort = api
})()