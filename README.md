#Behavioral Design Patterns in TypeScript

This repository contains small and clear code examples of Behavioral Design Patterns written in TypeScript with comments.
Behavioral patterns explain how objects and classes communicate, share responsibilities, and decide how tasks are performed.
They do not focus on how objects are created (that’s Creational patterns) or how they are connected (that’s Structural patterns).
Instead, they show how to organize interactions and responsibilities in a flexible way.


Introduction to Behavioral Design Patterns

Behavioral Design Patterns are patterns that define how objects interact and distribute work between them.

They help us build software that is:
    easy to extend behavior without changing existing code
    organized in terms of communication flow
    flexible when rules, responsibilities, or algorithms change

Unlike:
    Creational patterns → deal with how objects are created.
    Structural patterns → deal with how objects are connected.
    
  Behavioral patterns mainly answer the question: 
    “How do objects talk to each other and share responsibilities efficiently?” 
    They often use composition, delegation, and communication rules to ensure flexibility and reduce coupling.


Examples in real life:
A news agency notifies all subscribers when new news arrives (Observer).
A person can switch their route strategy in a navigation app (Strategy).
A vending machine changes behavior based on money inserted (State).
Behavioral patterns are very important in real-world projects because they make systems more dynamic, reusable, and easier to maintain.


📖 List of Behavioral Design Patterns

1. Chain of Responsibility
Idea: Pass a request along a chain of handlers until one of them processes it.
When to use: When you have multiple possible handlers and don’t want to hardcode which one should handle a request.
Benefits:
Removes tight coupling between sender and receiver.
Allows adding/removing handlers easily.
Real-life example: Customer service support levels – a customer issue may first go to a chatbot, then to a junior agent, and finally to a manager.

2. Command
Idea: Encapsulate a request as an object, allowing you to parameterize, queue, or log requests.
When to use: When you want to implement undo/redo, task scheduling, or logging.
Benefits:
Decouples sender and receiver.
Supports undo/redo operations.
Real-life example: A text editor where each action (typing, deleting, formatting) is a command that can be undone or redone.

3. Interpreter
Idea: Define a grammar and use objects to interpret sentences in that grammar.
When to use: When you need to evaluate or parse expressions in a specific domain.
Benefits:
Provides a flexible way to extend grammar rules.
Works well with simple, domain-specific languages.
Real-life example: A calculator that interprets mathematical expressions (3 + (2 * 5)).

4. Iterator
Idea: Provide a way to access elements of a collection sequentially without exposing its internal structure.
When to use: When you need a unified way to loop through different kinds of collections.
Benefits:
Simplifies collection traversal.
Makes collections interchangeable.
Real-life example: Browsing through a playlist of songs regardless of whether they’re stored in an array, set, or linked list.

5. Mediator
Idea: Define an object that centralizes communication between multiple objects.
When to use: When multiple objects communicate in complex ways, leading to a “spaghetti” of dependencies.
Benefits:
Reduces direct dependencies between objects.
Makes the system easier to modify.
Real-life example: An air traffic control system – planes don’t talk directly to each other but communicate via the control tower (mediator).

6. Memento
Idea: Capture and store an object’s state so that it can be restored later without violating encapsulation.
When to use: When you need undo/redo or to rollback an object to a previous state.
Benefits:
Preserves encapsulation (state is hidden from external objects).
Supports history tracking.
Real-life example: A video game save feature where the game’s state is stored and can be restored.

7. Observer
Idea: Define a one-to-many dependency so that when one object changes state, all its dependents are notified automatically.
When to use: When you need to notify multiple objects about changes in another object.
Benefits:
Decouples subjects and observers.
Supports dynamic subscriptions.
Real-life example: A weather app where multiple displays (mobile, desktop, smartwatch) automatically update when new weather data is available.

8. State
Idea: Allow an object to change its behavior when its internal state changes.
When to use: When an object’s behavior depends on its state, and it must change at runtime.
Benefits:
Eliminates complex conditionals (if/else or switch).
Makes state transitions explicit and organized.
Real-life example: A traffic light – its behavior changes depending on its state (red, yellow, green).

9. Strategy
Idea: Define a family of algorithms, encapsulate each one, and make them interchangeable at runtime.
When to use: When you want different algorithms to be used depending on context.
Benefits:
Eliminates if/else chains for selecting algorithms.
Promotes flexibility and reusability.
Real-life example: Different payment methods in an online store (credit card, PayPal, cryptocurrency).

10. Template Method
Idea: Define the structure of an algorithm but let subclasses redefine specific steps.
When to use: When different parts of an algorithm can vary but the overall process stays the same.
Benefits:
Promotes code reuse.
Enforces consistency across implementations.
Real-life example: Making coffee or tea – the steps are the same (boil water, brew drink, pour into cup), but the details differ.

11. Visitor
Idea: Represent an operation to be performed on elements of a complex object structure without modifying the objects.
When to use: When you want to add new operations to an object structure without changing the classes.
Benefits:
Makes it easy to add new operations.
Keeps element classes free of unrelated operations.
Real-life example: Tax calculation system where different tax rules (operations) are applied to different item types (elements).
