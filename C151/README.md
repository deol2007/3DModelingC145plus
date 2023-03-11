# PRO-C151-Teacher-Ref


# NOTES --

To write custom components, we use:
# AFRAME.registerComponent (name, definition)
-- name: is the component name; it is of string data type. Here ‘box’ is the name of the component.
-- definition: contains the component definition. It is a JavaScript object which has schema and lifecycle
handler methods(init, update, tick, remove, etc).


# overview of the basic structure of the component and terminology 
schema: is an object that defines the property names, their types, and
default values. The schema defines the shape of the data.

# Lifecycle Handler Methods:
init: This is used to set up the initial state. It is called once when the component is initialized.
update: This is used to modify the entity.
remove: This is used to undo all previous modifications to the entity.
tick: This is used for checking continuous changes. It is called on every render loop of the scene.


// Registering component in customizedComponenet.js
AFRAME.registerComponent("name", {
  schema: {
    //data
    //create a property and defines the data type (number, string, etc.)
  },

  init: function() 
  {
 // do something when the componenet is initialisewd (attched for the first time during the course of the program)
  
  }
  update: function() 
  {
    // do something when the data of componenet is updated
  }
  remove: function() 
  {
    
    // do something when the componenet or its entity  is detached
  }
  tick: function() 
  {
    
    // do something on every scene tick or frame (basically execution)
  }
});
