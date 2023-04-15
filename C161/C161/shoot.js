/* This code is registering a new A-Frame component called "bullets" that allows the user to shoot
bullets in a virtual reality scene. The component listens for a "keydown" event and if the key
pressed is "z", it creates a new entity (bullet) with a sphere geometry and black material. The
position of the bullet is set to the position of the camera, and its velocity is set to the
direction the camera is facing multiplied by -10. Finally, the bullet entity is added to the scene. */

AFRAME.registerComponent("bullets", {
  /* The `init` function is a built-in function in A-Frame that is called when the component is
  initialized. In this code, the `init` function is calling the `shootBullet` function, which
  listens for a "keydown" event and creates a new entity (bullet) with a sphere geometry and black
  material when the "z" key is pressed. */
  init: function () {
    this.shootBullet();
  },
  shootBullet: function () {

    /* `window.addEventListener("keydown", (e) => {...}` is adding an event listener to the window
    object that listens for a "keydown" event. When the "keydown" event is triggered (i.e. when a
    key on the keyboard is pressed), the function inside the curly braces is executed. The `if
    (e.key === "z")` statement checks if the key that was pressed is the "z" key. If it is, the code
    inside the if statement is executed, which creates a new bullet entity and adds it to the scene. */
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        /* This code is creating a new entity (bullet) with a sphere geometry and black material. The
        `document.createElement("a-entity")` method creates a new HTML element with the tag name
        "a-entity" and assigns it to the variable `bullet`. The `setAttribute` method is then used
        to set the `geometry` and `material` components of the `bullet` entity. The `geometry`
        component is set to a sphere with a radius of 0.1, and the `material` component is set to a
        black color. This creates a black sphere that will be used as the visual representation of
        the bullet in the virtual reality scene. */
        var bullet = document.createElement("a-entity");

        bullet.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });

        bullet.setAttribute("material", "color", "black");

        /* This code is selecting the HTML element with the ID "camera" using
        `document.querySelector("#camera")` and storing it in the variable `cam`. It then gets the
        position of the camera using `cam.getAttribute("position")` and stores it in the variable
        `pos`. Finally, it sets the position of the `bullet` entity to the position of the camera by
        setting the `x`, `y`, and `z` attributes of the `position` component to the corresponding
        values of `pos`. This ensures that the bullet entity is created at the same position as the
        camera. */
        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        bullet.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        });

        /* `var camera = document.querySelector("#camera").object3D;` is selecting the HTML element
        with the ID "camera" and accessing its underlying Three.js object, which is stored in the
        `object3D` property. This allows the code to manipulate the camera's position and direction
        in Three.js space, which is necessary for calculating the direction that the camera is
        facing and setting the velocity of the bullet entity. */
        var camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js Vector
        /* `var direction = new THREE.Vector3(); camera.getWorldDirection(direction);` is getting the
        direction that the camera is facing as a Three.js Vector and storing it in the `direction`
        variable. The `getWorldDirection` method is a built-in method in Three.js that returns the
        direction that an object is facing in world space. By passing the `direction` variable as an
        argument to this method, the direction that the camera is facing is stored in the
        `direction` variable. This direction is then used to set the velocity of the bullet entity
        so that it moves away from the camera in the direction it is facing. */
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        /* `bullet.setAttribute("velocity", direction.multiplyScalar(-10));` is setting the velocity of
        the bullet entity. The direction of the camera is multiplied by -10 to give the bullet a
        negative velocity, which means it will move away from the camera in the direction it is
        facing. The velocity attribute is a custom attribute that is added to the bullet entity by
        the `bullets` component. It is used by another component, such as the `physics` component,
        to update the position of the bullet entity over time based on its velocity. */
        bullet.setAttribute("velocity", direction.multiplyScalar(-10));

        /* `var scene = document.querySelector("#scene");` is selecting the HTML element with the ID
        "scene" and assigning it to the variable `scene`. This element is the container for the
        A-Frame scene, and by assigning it to a variable, the code can manipulate the scene by
        adding or removing entities from it. */
        var scene = document.querySelector("#scene");

        /* `scene.appendChild(bullet);` is adding the newly created bullet entity to the scene. It
        appends the bullet entity as a child of the scene entity, which means it will be rendered in
        the virtual reality scene. */
        scene.appendChild(bullet);
      }
    });
  },
});


