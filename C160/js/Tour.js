/* This code is registering a custom A-Frame component called "tour". The component has several
properties defined in its schema, including "state", "selectedCard", and "zoomAspectRatio". The
"init" function sets up the component by getting references to the places container and camera
elements, and creating the cards for each location. The "update" function listens for key events and
adjusts the zoom aspect ratio of the camera accordingly. The "tick" function checks the state of the
component and shows the view if the state is "view". The "createCards" function creates the
thumbnail cards for each location. The "createBorder", "createThumbNail", and "createTitleEl"
functions create the individual elements for each card. */
AFRAME.registerComponent("tour", {

  /* The `schema` property is defining the properties of the `tour` component and their default values.
  In this case, it defines three properties: `state`, `selectedCard`, and `zoomAspectRatio`. */
  schema: {
    state: { type: "string", default: "places-list" },
    selectedCard: { type: "string", default: "#card1" },
    zoomAspectRatio: { type: "number", default: 1 }
  },

  /* The `init` function is initializing the `tour` component by setting up references to the
  `placesContainer` and `cameraEl` elements, and creating the thumbnail cards for each location by
  calling the `createCards` function. The `placesContainer` is set to `this.el`, which refers to the
  element that the component is attached to. The `cameraEl` is set to the element with the ID
  `camera`. */
  init: function () {
    this.placesContainer = this.el;
    this.cameraEl = document.querySelector("#camera");
    this.createCards();
  },

  /* The `update` function listens for key events (specifically, the arrow up and arrow down keys) and
  adjusts the zoom aspect ratio of the camera accordingly. The `tick` function checks the state of
  the component and shows the view if the state is "view". The `hideEl` function hides the specified
  elements by setting their `visible` attribute to false. The `showView` function sets the material
  of the `#main-container` element to display the selected location's 360 image. The `createCards`
  function creates the thumbnail cards for each location by calling the `createBorder`,
  `createThumbNail`, and `createTitleEl` functions and appending them to the `placesContainer`
  element. */
  update: function () {
    window.addEventListener("keydown", e => {
      if (e.key === "ArrowUp") {
        if (
          (this.data.zoomAspectRatio <= 10 && this.data.state === "view") ||
          (this.data.zoomAspectRatio <= 10 && this.data.state === "change-view")
        ) {
          this.data.zoomAspectRatio += 0.002;
          this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
        }
      }
      if (e.key === "ArrowDown") {
        if (
          (this.data.zoomAspectRatio > 1 && this.data.state === "view") ||
          (this.data.zoomAspectRatio > 1 && this.data.state === "change-view")
        ) {
          this.data.zoomAspectRatio -= 0.002;
          this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
        }
      }
    });
  },

  /* The `tick` function is checking the state of the `tour` component. If the state is "view", it
  hides the `placesContainer` element by calling the `hideEl` function and shows the selected
  location's 360 image by calling the `showView` function. This function is called every frame, so
  it continuously checks the state of the component and updates the view accordingly. */
  tick: function () {
    const { state } = this.el.getAttribute("tour");

    if (state === "view") {
      this.hideEl([this.placesContainer]);
      this.showView();
    }
  },

  /* The `hideEl` function is a helper function that takes in a list of elements (`elList`) and sets
  their `visible` attribute to `false`. It does this by using the `map` method to iterate over each
  element in the list and setting its `visible` attribute to `false` using the `setAttribute`
  method. This function is used in the `tick` function to hide the `placesContainer` element when
  the state of the `tour` component is "view". */
  hideEl: function (elList) {
    elList.map(el => {
      el.setAttribute("visible", false);
    });
  },

  /* The `showView` function is setting the material of the `#main-container` element to display the
  selected location's 360 image. It first gets the value of the `selectedCard` property from the
  `data` object of the `tour` component. It then selects the `#main-container` element using
  `document.querySelector` and sets its `material` attribute to an object with a `src` property that
  points to the 360 image of the selected location and a `color` property set to white. */
  showView: function () {
    const { selectedCard } = this.data;
    const skyEl = document.querySelector("#main-container");
    skyEl.setAttribute("material", {
      src: `./assets/360_images/${selectedCard}/place-0.jpg`,
      color: "#fff"
    });
  },

  /* The `createCards` function is creating thumbnail cards for each location by iterating over an
  array of location data objects (`thumbNailsRef`) and calling the `createBorder`,
  `createThumbNail`, and `createTitleEl` functions to create the individual elements for each card.
  It then appends these elements to the `placesContainer` element, which is the element that the
  `tour` component is attached to. The function also sets the position of each card based on the
  previous card's position, and updates the `prevoiusXPosition` variable to keep track of the
  position of the last card. */
  createCards: function () {

    const thumbNailsRef = [
      {
        id: "taj-mahal",
        title: "Taj Mahal",
        url: "./assets/thumbnails/taj_mahal.png"
      },
      {
        id: "budapest",
        title: "Budapest",
        url: "./assets/thumbnails/budapest.jpg"
      },

      {
        id: "eiffel-tower",
        title: "Eiffel Tower",
        url: "./assets/thumbnails/eiffel_tower.png"
      },
      {
        id: "new-york-city",
        title: "New York City",
        url: "./assets/thumbnails/new_york_city.png"
      }
    ];
    let prevoiusXPosition = -60;
    for (var item of thumbNailsRef) {
      const posX = prevoiusXPosition + 25;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      // Border Element
      /* `const borderEl = this.createBorder(position, item.id);` is creating a border element for a
      location thumbnail by calling the `createBorder` function and passing in the `position` and
      `id` parameters. It then assigns the returned element to the `borderEl` constant. */
      const borderEl = this.createBorder(position, item.id);

      // Thubnail Element
      /* `const thumbNail = this.createThumbNail(item);` is creating a thumbnail element for a location
      by calling the `createThumbNail` function and passing in the `item` parameter. It then assigns
      the returned element to the `thumbNail` constant. */
      const thumbNail = this.createThumbNail(item);
      borderEl.appendChild(thumbNail);

      // Title Text Element
      /* This code is creating a text element for the title of a location by calling the
      `createTitleEl` function and passing in the `position` and `item` parameters. It then assigns
      the returned element to the `titleEl` constant and appends it to the `borderEl` element. */
      const titleEl = this.createTitleEl(position, item);
      borderEl.appendChild(titleEl);

      /* `this.placesContainer.appendChild(borderEl);` is appending the `borderEl` element (which
      contains the thumbnail and title elements for a location) to the `placesContainer` element.
      The `placesContainer` element is the element that the `tour` component is attached to, and it
      serves as a container for all of the location thumbnail cards. By appending each `borderEl`
      element to the `placesContainer` element, the function is adding each location card to the
      container. */
      this.placesContainer.appendChild(borderEl);
    }
  },


  /* The `createBorder` function is creating a border element for a location thumbnail. It takes in a
  `position` parameter for the position of the element and an `id` parameter for the ID of the
  element. It creates an `<a-entity>` element and sets its ID, visibility, geometry, position,
  material, and cursor-listener attributes. It then returns the created element. */
  createBorder: function (position, id) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("id", id);
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "ring",
      radiusInner: 9,
      radiusOuter: 10
    });
    entityEl.setAttribute("position", position);
    entityEl.setAttribute("material", {
      color: "#0077CC",
      opacity: 1
    });
    entityEl.setAttribute("cursor-listener", {});
    return entityEl;
  },


  /* The `createThumbNail` function is creating a thumbnail element for a location. It takes in an
  `item` parameter for the location data. It creates an `<a-entity>` element and sets its geometry
  attributes to a circle with a radius of 9. It then sets its material attributes to the `item` url
  and sets it to visible. Finally, it adds a `cursor-listener` component to the element and returns
  the created element. */
  createThumbNail: function (item) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "circle",
      radius: 9
    });
    entityEl.setAttribute("material", { src: item.url });
    entityEl.setAttribute("cursor-listener", {});
    return entityEl;
  },


  /* The `createTitleEl` function is creating a text element for the title of a location. It takes in a
  `position` parameter for the position of the element and an `item` parameter for the location
  data. It creates an `<a-entity>` element and sets its text attributes to the `item` title. It then
  sets the position of the element to `position` with a y-offset of -20 and sets it to visible.
  Finally, it returns the created element. */
  createTitleEl: function (position, item) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("text", {
      font: "exo2bold",
      align: "center",
      width: 60,
      color: "#e65100",
      value: item.title
    });
    const elPosition = position;
    elPosition.y = -20;
    entityEl.setAttribute("position", elPosition);
    entityEl.setAttribute("visible", true);
    return entityEl;
  },

});
