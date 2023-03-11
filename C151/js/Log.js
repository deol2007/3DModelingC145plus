// Registering component in log-component.js


// For our log component, let’s define a message data property type via the schema. 
// The ‘message’ property type will have a ‘string’ type and have a ‘default’ value of Hello, World!


// Now, this component will log a simple message once when 
// the component’s entity is attached using the .init() handler.
// The component’s property values defined in the schema can be 
// accessed through this.data. this points to the entity at which the component is attached.

AFRAME.registerComponent('log', {
    schema: {
      message: {type: 'string', default: 'Hello, World!'}
    },
    init: function () {
        console.log(this.data.message);
      }
  });

