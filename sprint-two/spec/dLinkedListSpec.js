describe('dlinkedList', function() {
  var linkedList;

  beforeEach(function() {
    linkedList = dLinkedList();
  });

  it('should have a head and tail', function() {
    expect(linkedList).to.have.property("head");
    expect(linkedList).to.have.property("tail");
  });

  it('Node should should have a value, prev, and next', function() {
    newNode = Node(1);
    expect(newNode).to.have.property("value");
    expect(newNode).to.have.property("prev");
    expect(newNode).to.have.property("next");
  });

  it('should have methods named "addToTail", "removeHead", "contains", "addToHead", and "removeTail" ', function() {
    expect(linkedList.addToTail).to.be.a("function");
    expect(linkedList.removeHead).to.be.a("function");
    expect(linkedList.contains).to.be.a("function");
    expect(linkedList.addToHead).to.be.a("function");
    expect(linkedList.removeTail).to.be.a("function");
  });

  it('should designate a new tail when new nodes are added to tail', function(){
    linkedList.addToTail(4);
    expect(linkedList.tail.value).to.equal(4);
    linkedList.addToTail(5);
    expect(linkedList.tail.value).to.equal(5);
  });

  it('should designate a new head and tail when new nodes are added to Head ', function(){
    linkedList.addToHead(6);
    expect(linkedList.head.value).to.equal(6);
    linkedList.addToHead(7);
    expect(linkedList.head.value).to.equal(7);
    expect(linkedList.tail.value).to.equal(6);
  });

  it('should remove the head from the list when removeHead is called', function(){
    linkedList.addToTail(4);
    linkedList.addToTail(5);
    expect(linkedList.head.value).to.equal(4);
    linkedList.removeHead();
    expect(linkedList.head.value).to.equal(5);
  });

  it('should remove the tail from the list when removeTail is called', function(){
    linkedList.addToHead(2);
    linkedList.addToHead(1);
    expect(linkedList.head.value).to.equal(1);
    linkedList.removeTail();
    expect(linkedList.head.value).to.equal(1);
  });

  it("should return the value of the former head when removeHead is called", function(){
    linkedList.addToTail(4);
    expect(linkedList.removeHead()).to.equal(4);
  });

  it("should return the value of the former tail when removeTail is called", function(){
    linkedList.addToTail(4);
    expect(linkedList.removeTail()).to.equal(4);
  });

  it("should contain a value that was added", function(){
    linkedList.addToTail(4);
    linkedList.addToTail(5);
    expect(linkedList.contains(4)).to.equal(true);
    expect(linkedList.contains(5)).to.equal(true);
    expect(linkedList.contains(6)).to.equal(false);
  });

  it('should not contain a value that was removed', function(){
    linkedList.addToTail(4);
    linkedList.addToTail(5);
    linkedList.removeHead();
    expect(linkedList.contains(4)).to.equal(false);
  });

  // add more tests here to test the functionality of linkedList
});
