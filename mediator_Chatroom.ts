/*
Mediator Design Pattern - Chatroom Example

The Mediator pattern is a behavioral design pattern that defines an object (the Mediator) 
to handle communication between multiple objects (Colleagues). 
It reduces direct dependencies and makes the system loosely coupled.

In this example:
- IMediator = interface for mediator
- Chatroom = concrete mediator
- IUser = interface for users
- User = concrete colleague

How it works:
- Users (colleagues) don’t communicate directly.
- They use the Mediator (Chatroom).
- Mediator decides whether to deliver the message privately or broadcast it.

Cleaner communication
Loosely coupled system
Easy to extend and maintain
*/

// ========== Mediator interface ==========
interface IMediator {
  register(user: IUser): void;                         // method to register a user to the mediator
  send(message: string, from: IUser, to?: IUser): void; // method to send a message from one user to another (optional recipient)
}

// ========== Colleague interface ==========
interface IUser {
  name: string;                                        // name of the user
  chatroom: IMediator | null;                          // reference to the mediator (initially null)
  send(message: string, to?: IUser): void;            // method to send message (private or broadcast)
  receive(message: string, from: IUser): void;        // method to receive message
}

// ========== Concrete Mediator ==========
class Chatroom implements IMediator {
  private users: { [key: string]: IUser } = {};       // store all registered users by name

  // Register a user in the chatroom
  register(user: IUser): void {
    this.users[user.name] = user;                     // add user to the users list
    user.chatroom = this;                              // set mediator reference in the user
  }

  // Send a message from one user to another (or broadcast)
  send(message: string, from: IUser, to?: IUser): void {
    if (to) {
      // if a recipient is specified → private message
      to.receive(message, from);                      // deliver message to the specified user
    } else {
      // broadcast message to all users except sender
      Object.values(this.users).forEach(user => {
        if (user !== from) {                          // skip sender
          user.receive(message, from);               // deliver message to each user
        }
      });
    }
  }
}

// ========== Concrete Colleague ==========
class User implements IUser {
  name: string;                                        // user name
  chatroom: IMediator | null = null;                  // reference to mediator (initially null)

  constructor(name: string) {
    this.name = name;                                  // set the name
  }

  // Send a message using mediator
  send(message: string, to?: IUser): void {
    if (!this.chatroom) {                              // check if user is registered
      console.log(`${this.name} is not registered in a chatroom!`);
      return;                                         // exit if not registered
    }
    console.log(`${this.name} sends: "${message}"`);   // log message sending
    this.chatroom.send(message, this, to);            // delegate sending to the mediator
  }

  // Receive a message from another user
  receive(message: string, from: IUser): void {
    console.log(`${this.name} received a message from ${from.name}: "${message}"`); // log message reception
  }
}

// ========== Usage Example ==========
const chatroom = new Chatroom();                       // create a new chatroom mediator

const nonna = new User("Nonna");                       // create users
const anna = new User("Anna");
const ani = new User("Ani");

// Register users in the chatroom
chatroom.register(nonna);
chatroom.register(anna);
chatroom.register(ani);

// Nonna sends a private message to Anna
nonna.send("Hi Anna!", anna);

// Ani broadcasts a message to all users
ani.send("Hello everyone!");

/*
Output: 

Nonna sends: "Hi Anna!"
Anna received a message from Nonna: "Hi Anna!"

Ani sends: "Hello everyone!"
Nonna received a message from Ani: "Hello everyone!"
Anna received a message from Ani: "Hello everyone!"
*/
