/*
Chain of Responsibility Pattern - User Login Example

Description:
- The Chain of Responsibility pattern allows a request to pass through a chain of handlers.
- Each handler decides either to process the request or pass it to the next handler in the chain.
- This avoids coupling the sender of a request to its receiver and makes the system flexible.

In this project:
1. UserExistsHandler checks if the username exists.
2. PasswordHandler checks if the password is correct.
3. RoleHandler checks if the user has the right role.
4. If all checks pass, the user is successfully logged in.

This example demonstrates how to handle login validation step by step, 
without writing one big "if/else" block.
*/




// ==================== Handler Interface ====================

// Defines the common methods that all handlers must implement
interface Handler {
  setNext(handler: Handler): Handler;   // Method to link next handler
  handle(request: any): void;           // Method to process the request
}


// ==================== Abstract Handler ====================
// Provides default implementation of "setNext" and request passing
abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;  // Holds the next handler in chain

  // Link the next handler in the chain
  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;      // Return handler to allow chaining
  }

  // Handle request or pass it to the next handler
  public handle(request: any): void {
    if (this.nextHandler) {
      this.nextHandler.handle(request);    // Forward request if next exists
    }
  }
}


// ==================== Concrete Handlers ====================

// 1. Check if user exists
class UserExistsHandler extends AbstractHandler {
  // Fake database: usernames mapped to password and role
  private users: { [key: string]: { password: string; role: string } } = {
    "alice": { password: "1234", role: "admin" },
    "bob": { password: "abcd", role: "user" },
  };

  public handle(request: any): void {
    const { username } = request;

    // If user is not found in database, stop chain
    if (!this.users[username]) {
      console.log("User does not exist!");
      return;   // End the chain
    }

    // If user exists, attach their data (password & role) to request
    request.userData = this.users[username];

    // Pass request to next handler (PasswordHandler)
    super.handle(request);
  }
}


// 2. Check if password is correct
class PasswordHandler extends AbstractHandler {
  public handle(request: any): void {
    const { password, userData } = request;

    // If provided password does not match stored password, stop chain
    if (userData.password !== password) {
      console.log("Incorrect password!");
      return;   // End the chain
    }

    // If password matches, forward request to next handler (RoleHandler)
    super.handle(request);
  }
}


// 3. Check if user has the right role
class RoleHandler extends AbstractHandler {
  private requiredRole: string;   // The role required for login

  constructor(requiredRole: string) {
    super();
    this.requiredRole = requiredRole;
  }

  public handle(request: any): void {
    const { userData } = request;

    // If user’s role does not match required role, stop chain
    if (userData.role !== this.requiredRole) {
      console.log("Access denied! Role is not valid.");
      return;   // End the chain
    }

    // If role is valid, login is successful
    console.log("User successfully logged in!");
  }
}


// ==================== Usage ====================

// Create handlers
const userExists = new UserExistsHandler();    // Step 1: User validation
const passwordCheck = new PasswordHandler();   // Step 2: Password validation
const roleCheck = new RoleHandler("admin");    // Step 3: Role validation

// Build the chain: userExists -> passwordCheck -> roleCheck
userExists.setNext(passwordCheck).setNext(roleCheck);


// ==================== Test Cases ====================

console.log("--- Test 1: Wrong user ---");
// User "charlie" does not exist -> Chain stops at UserExistsHandler
userExists.handle({ username: "charlie", password: "1234" });

console.log("--- Test 2: Wrong password ---");
// User "alice" exists but password is wrong -> Chain stops at PasswordHandler
userExists.handle({ username: "alice", password: "wrongpass" });

console.log("--- Test 3: Wrong role ---");
// User "bob" exists, password is correct, but role != admin -> Chain stops at RoleHandler
userExists.handle({ username: "bob", password: "abcd" });

console.log("--- Test 4: Correct login ---");
// User "alice" exists, password correct, role = admin -> All checks pass
userExists.handle({ username: "alice", password: "1234" });
