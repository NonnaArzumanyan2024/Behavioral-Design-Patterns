/*
State Design Pattern - Traffic Light System

The State pattern is a behavioral design pattern that allows an object 
to change its behavior when its internal state changes. 
It helps avoid many conditional statements and keeps code clean.

In this example:
- ITrafficLightState = interface for all traffic light states
- RedState, YellowState, GreenState = concrete states
- TrafficLight = context that changes its behavior based on current state

How it works:
- The TrafficLight object delegates behavior to its current state.
- Changing the state changes how the TrafficLight responds to actions.

Benefits:
Cleaner code
Easy to add new states
Loosely coupled system
*/




// ========== State interface ==========

interface ITrafficLightState {
  name: string;                             // name of the state
  next(light: TrafficLight): void;          // move to the next state
  action(): void;                           // behavior associated with this state
}

// ========== Concrete States ==========

// Red state - cars must stop
class RedState implements ITrafficLightState {
  name = "Red";                              // state name

  action(): void {
    console.log("Red -> Stop cars!");        // behavior of Red state
  }

  next(light: TrafficLight): void {
    light.setState(new GreenState());        // transition to Green state
  }
}

// Yellow state - cars should get ready
class YellowState implements ITrafficLightState {
  name = "Yellow";                           // state name

  action(): void {
    console.log("Yellow -> Get ready!");    // behavior of Yellow state
  }

  next(light: TrafficLight): void {
    light.setState(new RedState());          // transition to Red state
  }
}

// Green state - cars can go
class GreenState implements ITrafficLightState {
  name = "Green";                            // state name

  action(): void {
    console.log("Green -> Go!");             // behavior of Green state
  }

  next(light: TrafficLight): void {
    light.setState(new YellowState());       // transition to Yellow state
  }
}

// ========== Context ==========

class TrafficLight {
  private state: ITrafficLightState;         // current state of the traffic light

  constructor(initialState: ITrafficLightState) {
    this.state = initialState;               // initialize with initial state
  }

  // Change the current state
  setState(state: ITrafficLightState): void {
    console.log(`-> Changing state to ${state.name}`); // log state change
    this.state = state;                                // update current state
  }

  // Perform the action of the current state
  action(): void {
    this.state.action();                       // delegate behavior to current state
  }

  // Move to the next state
  next(): void {
    this.state.next(this);                     // delegate state transition to current state
  }
}

// ========== Usage Example ==========

const trafficLight = new TrafficLight(new RedState()); // start with Red state

// Simulate traffic light changes

trafficLight.action();  // Red -> Stop cars
trafficLight.next();    // transition to Green
trafficLight.action();  // Green -> Go
trafficLight.next();    // transition to Yellow
trafficLight.action();  // Yellow -> Get ready
trafficLight.next();    // transition back to Red
trafficLight.action();  // Red -> Stop cars

/*
Output:

Red -> Stop cars!
-> Changing state to Green
Green -> Go!
-> Changing state to Yellow
Yellow -> Get ready!
-> Changing state to Red
Red -> Stop cars!
*/