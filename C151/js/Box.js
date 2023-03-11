// Registering component in box-component.js
AFRAME.registerComponent("move-box", {
  schema: {
    moveX: { type: "number", default: 1 },
  },

  tick: function () {

    //by default this.data.moveX = 1
    // if the frame rate is 30 per second
    //then this tick function will be executed 30 times per second

    //each time the tick function is executed:--

    //1. the value of this.data.moveX will be increased by 0.01
    this.data.moveX = this.data.moveX + 0.01;

    //2. we find the access to property position and save it inside variable pos
    var pos = this.el.getAttribute("position");

    //3. we assign the new calculated value of this.data.moveX to the pos.x
    pos.x = this.data.moveX;

    //4. once the data is recieved, the pre-defined property of position is given the newly calculated value 
    this.el.setAttribute("position", {x: pos.x, y: pos.y, z: pos.z});
  }
});
