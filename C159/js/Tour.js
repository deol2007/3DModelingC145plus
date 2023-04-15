AFRAME.registerComponent("tour", {
  /* Defining the schema for the component. */
  schema: {
    state: { type: "string", default: "places-list" },
    selectedCard: { type: "string", default: "#card1" },
  },

  /* A function that hides all the elements in the elList array. */
  hideEl: function (elList) {
    elList.map(el => {
      //the element is set to not visible
      el.setAttribute("visible", false);
    });
  },
  /* Creating the cards. */
  init: function () {
    this.placesContainer = this.el;
    this.createCards();
  },


  /* *|CURSOR_MARCADOR|*
  
  How can we know if the state isupdated or not?
  We need to keep checking for thechange in the state continuously.
  A-Frame provides us with a function called .tick() function; this function
  calls itself continuously. Inside this function, we can check if
  the state is changed to view. If the state is changed, we will call the
  hideEl() function, pass the places container list, and call the showView() function.
  
  
  */
  tick: function () {
    /* Getting the state of the tour. */
    const { state } = this.el.getAttribute("tour");
    /* if the value of state is equal to 'view' */
    if (state === "view") {
      /* the elements are hidden */
      /* we are calling the function hideEl to hide the value of this.placesContainer : the thumbnails*/
      this.hideEl([this.placesContainer]);
      /* calling the funciton showView */
      this.showView();
    }

  },
  /* 
    showView is a function definition
    a function called showView() which will show the image of the selected card.
    We can get the image of the selected card and set it on the sky entity.

    To do so :-
    ● Get the data from the schema and store it in the selectedCard
    variable using the document.querySelector().
    ● Select the main container and set it in the skyEl variable.
    ● Set the image of the selected card, using the material attribute.
 
  */
  showView: function () {
    const { selectedCard } = this.data;

    //Set the 360 degree image to the sky element.
    const skyEl = document.querySelector("#main-container");

    skyEl.setAttribute("material", {
      //the name of the selectedCard constant is the same as the name of the file name in assets
      //therefore, the name of the selected card can be directly used to navigate to the image within the folder
      src: `./assets/360_images/${selectedCard}/place-0.jpg`,
      color: "white"
    });
  },


  createCards: function () {
    const thumbNailsRef = [
      {
        id: "taj-mahal",
        title: "Taj Mahal",
        url: "./assets/thumbnails/taj_mahal.png",
      },
      {
        id: "budapest",
        title: "Budapest",
        url: "./assets/thumbnails/budapest.jpg",
      },

      {
        id: "eiffel-tower",
        title: "Eiffel Tower",
        url: "./assets/thumbnails/eiffel_tower.jpg",
      },
      {
        id: "new-york-city",
        title: "New York City",
        url: "./assets/thumbnails/new_york_city.png",
      },
    ];
    let prevoiusXPosition = -60;

    for (var item of thumbNailsRef) {
      const posX = prevoiusXPosition + 25;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      // Border Element
      const borderEl = this.createBorder(position, item.id);

      // Thumbnail Element
      const thumbNail = this.createThumbNail(item);
      borderEl.appendChild(thumbNail);

      // Title Text Element
      const titleEl = this.createTitleEl(position, item);
      borderEl.appendChild(titleEl);

      this.placesContainer.appendChild(borderEl);
    }
  },
  createBorder: function (position, id) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("id", id);
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "ring",
      radiusInner: 9,
      radiusOuter: 10,
    });
    entityEl.setAttribute("position", position);
    entityEl.setAttribute("material", {
      color: "#0077CC",
      opacity: 1,
    });

    //Add cursor-listener component to the ring border entity to change it's color 
    //On Cursor 'mouseenter' and 'mouseleave' entity
    entityEl.setAttribute("cursor-listener", {});

    return entityEl;
  },
  createThumbNail: function (item) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "circle",
      radius: 9,
    });
    entityEl.setAttribute("material", { src: item.url });

    return entityEl;
  },
  createTitleEl: function (position, item) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("text", {
      font: "exo2bold",
      align: "center",
      width: 70,
      color: "#e65100",
      value: item.title,
    });
    const elPosition = position;
    elPosition.y = -20;
    entityEl.setAttribute("position", elPosition);
    entityEl.setAttribute("visible", true);

    return entityEl;
  },
});
