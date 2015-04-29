var book = function(name) {
  return {
    name: name,
    lastPageRead: 1,
    read: function(pages) {
      this.lastPageRead += pages
    }
  }
}

var practicalNode = book('Practical Node.js')
practicalNode.read(101)
console.log('last page read for ' + practicalNode.name + ' is ' + practicalNode.lastPageRead)