/*  Preloaded
Preloaded for you is a class, struct or derived data type Node ( depending on the language ) 
used to construct linked lists in this Kata: */

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

/* Create a function parse which accepts exactly one argument string 
which is a string representation of a linked list. For example, given
 the following string representation of a linked list:

"1 -> 2 -> 3 -> null"

... your function should return:

new Node(1, new Node(2, new Node(3, null)))

Another example: given the following string input:

"0 -> 1 -> 4 -> 9 -> 16 -> null"
... your function should return:

new Node(0, new Node(1, new Node(4, new Node(9, new Node(16)))))*/

(string) => {
    if (string !== 'null') {
          return new Node(+string.slice(0, string.indexOf('->')),
                            parse(string.slice(string.indexOf('->')+3,)));
      } else {
          return null;
      }
  }
