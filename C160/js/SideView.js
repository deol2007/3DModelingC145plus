AFRAME.registerComponent("place-side-view", {
  /* Defining an initialization function for a component in A-Frame, which calls the `createPlaces()`
  function when the component is initialized. */
  init: function () {
    this.createPlaces();
  },

  tick: function () {
    const placesContainer = document.querySelector("#places-container");
    const { state } = placesContainer.getAttribute("tour")
    if ((state === "view") || (state === "change-view")) {
      this.el.setAttribute("visible", true);
    }
    else {
      this.el.setAttribute("visible", false);
    }
  },
  /* The `createPlace` function is defining a loop that creates four thumbnail entities with different
  positions and appends them to the `side-view-container` element. The positions are calculated
  based on the previous position values, which are initialized to -150 and 30 for the x and y
  coordinates, respectively. The function `createPlaceThumbNail` is called to create each thumbnail
  entity with a specific position and index number. */

  createPlaces: function () {
    const sideViewContainer = document.querySelector(
      "#side-view-container"
    );

    let prevoiusXPosition = -150;
    let prevoiusYPosition = 30;

    for (var i = 1; i <= 4; i++) {
      const position = {
        x: (prevoiusXPosition += 50),
        y: (prevoiusYPosition += 2),
        z: -40
      };
      /* These lines of code are creating a thumbnail entity using the `createPlaceThumbNail` function and
      passing in the `position` and `i` values as arguments. The returned entity is then appended to the
      `side-view-container` element using the `appendChild` method. */
      const entityEl = this.createPlaceThumbNail(position, i);
      sideViewContainer.appendChild(entityEl);
    }
  },



  /* `createPlaceThumbNail` is a function that creates a thumbnail entity for a place. It creates an
  `a-entity` element, sets its visibility to true, sets its ID to `place-`, sets its geometry
  to a circle with a radius of 2.5, sets its material to an image of a helicopter with an opacity of
  0.9, sets its position to the given `position` argument, and adds a `cursor-listener` component to
  the entity. */
  createPlaceThumbNail: function (positionInput, idInput) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("visible", true);

    entityEl.setAttribute("id", `place-${idInput}`);

    entityEl.setAttribute("geometry", {
      primitive: "circle",
      radius: 2.5
    });

    entityEl.setAttribute("material", {
      src: "./assets/helicopter.png",
      opacity: 0.9
    });

    entityEl.setAttribute("position", positionInput);
    entityEl.setAttribute("cursor-listener", {});
    return entityEl;
  }
});