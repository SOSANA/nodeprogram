/**
 * Write a "class" book with functional inheritance pattern:
 * Takes the name option
 * Has a method read that takes number of pages
 * Remembers the number of the last page read
*/

var book = function(name) {
    return {
        name: name,
        lastPageRead: 1,
        read: function(pages) {
            this.lastPageRead += pages
        }
    }
}

var practicalNode = book('Practical Node.js');
practicalNode.read(101);
console.log('last page read for ' + practicalNode.name + ' is ' + practicalNode.lastPageRead);
