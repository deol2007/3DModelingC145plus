/* This code is registering a new A-Frame component called "bullets". This component allows the user to
shoot bullets in the scene by pressing the "z" key. The bullets are created as a new entity with a
sphere geometry and black material. The position of the bullet is set to the position of the camera.
The velocity of the bullet is set to the direction the camera is facing, multiplied by -10. The
bullet is set as a dynamic entity with a sphere shape and mass of 0. The component also adds a
"collide" event listener to the bullet, which calls the "removeBullet" function when the bullet
collides with another entity. The "removeBullet" function removes the bullet from the scene and sets
the opacity of the entity it collided with to 0.6. */
AFRAME.registerComponent("bullets", {
  init: function () {
    this.shootBullet();
  },
  /* The `shootBullet` function is an event listener that listens for the "keydown" event on the window
  object. When the "z" key is pressed, it creates a new entity called "bullet" with a sphere
  geometry and black material. The position of the bullet is set to the position of the camera. The
  velocity of the bullet is set to the direction the camera is facing, multiplied by -10. The bullet
  is set as a dynamic entity with a sphere shape and mass of 0. Finally, the function adds a
  "collide" event listener to the bullet, which calls the `removeBullet` function when the bullet
  collides with another entity. The bullet entity is then appended to the scene. */
  shootBullet: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var bullet = document.createElement("a-entity");

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });

        bullet.setAttribute("material", "color", "black");

        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        });

        var camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js Vector
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        bullet.setAttribute("velocity", direction.multiplyScalar(-10));

        var scene = document.querySelector("#scene");

        //set the bullet as the dynamic entity
        bullet.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "0",
        });

        //add the collide event listener to the bullet
        bullet.addEventListener("collide", this.removeBullet);

        scene.appendChild(bullet);
      }
    });
  },

  /* This is the event listener function that is called when the bullet collides with another entity in
  the scene. It first checks if the entity that the bullet collided with has an id that includes the
  string "box". If it does, it sets the opacity of the entity to 0.2 and applies an impulse to the
  entity using the Cannon.js applyImpulse() method. The impulse is a small amount of force that is
  applied to the entity in a particular direction. The function then removes the event listener from
  the bullet and removes the bullet from the scene using the removeChild() method. */
  removeBullet: function (e) {
    //both entities have to be part of the same physics system, which means
    //the entities either static body or dynamic body to follow any physics

    //the e.detial.target.el gives the details about the original enitity on which the evert has been triggered
    console.log(e.detail.target.el);
    //the e.detial.body.el gives the details about the other entity which the original entity has touched
    //Other entity, which bullet touched.
    console.log(e.detail.body.el);

    //bullet element
    var element = e.detail.target.el;

    //element which is hit
    var elementHit = e.detail.body.el;
    //now, since the bullet is the child of the scene element in A-frame:
    //we should select the scene with the help of .querySelector and then we should use "removeChild" to
    //remove the child (bullet) from the scene
    //to make sure the bullet is removed from the scene after collison,
    //we set the opacity to 0.6
    if (elementHit.id.includes("box")) {
      elementHit.setAttribute("material", {
        opacity: 0.2,
        transparent: true,
      });



      // If we want to apply force or impulse or any other physics functionality over
      // the elements, we can use Cannon.js methods over the A-Frame entity elements.
      // Let's see how we can apply impulse on the box as soon as the bullet hits
      // the box. Impulse is the amount of very small
      // amount of force that can be applied over the body in a particular direction.
      // It's like giving a jerk to the body which is hit.
      
      // For this we will have to use the Cannon.js applyImpulse(impulse, worldPoint) method on the element body.
      //  The parameters:
      // ● impulse is of type Cannon.js Vec3. It is the amount of impulse to add to the body.
      // ● worldPoint is of type Cannon.js Vec3. It is the point
      // at which the force is applied.
      
      // To pass these parameters, we need
      // to create a new Cannon.js object using new CANNON.Vec3(), for the
      // impulse and the point. The CANNON.Vec3().copy() method is used to copy the elementHit position vector from the element.
      var impulse = new CANNON.Vec3(-2, 2, 1);
      var worldPoint = new CANNON.Vec3().copy(
        elementHit.getAttribute("position")
      );

      elementHit.body.applyImpulse(impulse, worldPoint);

      //remove event listener
      element.removeEventListener("collide", this.shoot);

      //remove the bullets from the scene
      var scene = document.querySelector("#scene");
      scene.removeChild(element);
    }
  },
});

// 