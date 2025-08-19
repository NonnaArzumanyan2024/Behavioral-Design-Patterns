/*
Iterator Design Pattern - Social Network Friends Example

- Iterator is a behavioral design pattern that provides a way to access the elements of a collection (like arrays, lists, sets) sequentially 
  without exposing the underlying representation (the "how" it stores data).

- Key idea:
  Instead of exposing internal details of a collection, 
  we use an "iterator" object with methods like `next()` and `hasNext()`.

- Why it’s useful:
  ✔ Encapsulates traversal logic (no need to use for-loops everywhere)
  ✔ Allows multiple different ways to traverse a collection
  ✔ Makes collections easier to extend in the future

- Example:
  Think about scrolling through Facebook friends — you don’t see the database, 
  you just get each friend one by one through the interface.

In this example:
- We have a `SocialNetwork` class that stores a list of friends.
- We have a `FriendIterator` class to iterate through these friends one by one.
- "Nonna" is used as the user who has a list of friends.
*/




// =============== Iterator Interface =============== 

interface Iterator<T> {
  hasNext(): boolean; // checks if there are more elements
  next(): T | null;   // returns the next element or null if none
}


// =============== Concrete Iterator =============== 

// Iterator implementation for friends
class FriendIterator implements Iterator<string> {
  private position: number = 0; // current position in the list

  constructor(private friends: string[]) {}

  hasNext(): boolean {
    return this.position < this.friends.length; // true if we still have more friends
  }

  next(): string | null {
    if (this.hasNext()) {
      return this.friends[this.position++]; // return current friend, then move to next
    }
    return null; // no more friends left
  }
}


// =============== Social Network Class (Collection) ===============

// SocialNetwork class holds a list of friends
class SocialNetwork {
  private friends: string[];

  constructor(friends: string[]) {
    this.friends = friends;
  }

  // Factory method to create an iterator for the friends
  createIterator(): FriendIterator {
    return new FriendIterator(this.friends);
  }
}


// ===============  Usage Example =============== 

const nonnaFriends = new SocialNetwork([
  "Ani",
  "Ina",
  "Gohar",
  "Diana",
]);

// Nonna creates an iterator for her friends
const iterator = nonnaFriends.createIterator();

console.log("Nonna’s Friends:");

// Iterate through friends using Iterator Pattern
while (iterator.hasNext()) {
  console.log(iterator.next());
}

/*
Output:

Nonna’s Friends:
Ani
Ina
Gohar
Diana
*/
