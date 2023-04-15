/* 
This code is registering a new A-Frame component called "cursor-listener". 
This component listens  for click, mouseenter, and mouseleave events on the element it is attached to. 
When a click event is detected, it checks the state of the "tour" attribute on the #places-container element and performs
different actions depending on the state. If the state is "places-list", it checks if the clicked
element has an id that matches one of the predefined placesIds. 
If it does, it sets the "tour" attribute on the #places-container element to "view" and sets the selectedCard attribute 
to the id of the clicked element. If the state is "view" or "change-view", it calls the handleViewState
function. When a mouseenter event is detected, it checks the state of the "tour" attribute on the
#places-container element and calls the handlePlacesListState function if the state is
"places-list". When a mouseleave event is detected, it checks the state of the "tour" attribute on
the #places-container element and resets the color and opacity of the previously selected element if
the state is "places-list" and a selectedItemId is present. 
*/
AFRAME.registerComponent("cursor-listener", {
  schema: {
    selectedItemId: { default: "", type: "string" }
  },
  init: function () {
    this.handleClickEvents();
    this.handleMouseEnterEvents();
    this.handleMouseLeaveEvents();
  },



  /* The `handleClickEvents` function is registering a click event listener on the element that this
  component is attached to. When a click event is detected, it checks the state of the "tour"
  attribute on the #places-container element and performs different actions depending on the state.
  If the state is "places-list", it checks if the clicked element has an id that matches one of the
  predefined placesIds. If it does, it sets the "tour" attribute on the #places-container element to
  "view" and sets the selectedCard attribute to the id of the clicked element. If the state is
  "view" or "change-view", it calls the `handleViewState` function. */
  handleClickEvents: function () {
    //  Click Events
    this.el.addEventListener("click", evt => {
      const placesContainer = document.querySelector("#places-container");

      const { state } = placesContainer.getAttribute("tour");

      if (state === "places-list") {

        const id = this.el.getAttribute("id");

        const placesId = [
          "taj-mahal",
          "budapest",
          "new-york-city",
          "eiffel-tower"
        ];

        if (placesId.includes(id)) {
          placesContainer.setAttribute("tour", {
            state: "view",
            selectedCard: id
          });
        }
      }

      if (state === "view") {
        this.handleViewState();
      }
      if (state === "change-view") {
        this.handleViewState();
      }
    });
  },


  /* The `handleViewState` function is responsible for changing the state of the `#places-container`
  element to "change-view" and setting the 360 degree image to the `skyEl` element when a user clicks
  on one of the side view places. It first gets the id of the current element and the
  `selectedItemId` from the `cursor-listener` attribute of the `#places-container` element. If the id
  of the current element is included in the `sideViewPlacesId` array, it sets the state of the
  `#places-container` element to "change-view" and sets the 360 degree image to the `skyEl` element
  using the `src` attribute and the `selectedItemId` and `id` variables. */
  handleViewState: function () {
    const el = this.el;

    const id = el.getAttribute("id");

    const placesContainer = document.querySelector("#places-container");

    const { selectedItemId } = placesContainer.getAttribute("cursor-listener");

    //Keeping all the images as id of the images with .jpg extension
    const sideViewPlacesId = ["place-1", "place-2", "place-3", "place-4"];

    if (sideViewPlacesId.includes(id)) {

      placesContainer.setAttribute("tour", {
        state: "change-view"
      });

      const skyEl = document.querySelector("#main-container");

      //Set the 360 degree image to the sky element.
      skyEl.setAttribute("material", {
        src: `./assets/360_images/${selectedItemId}/${id}.jpg`,
        color: "#fff"
      });

    }
  },

  /* This code is defining a function called `handleMouseEnterEvents` as part of the `cursor-listener`
  component. This function adds a mouseenter event listener to the element that the component is
  attached to. When the mouse enters the element, the function checks the state of the `tour`
  attribute on the `#places-container` element. If the state is `places-list`, it calls the
  `handlePlacesListState` function. The purpose of this function is to handle the behavior of the
  element when the mouse enters it in the context of the `places-list` state. */
  handleMouseEnterEvents: function () {
    // Mouse Enter Events
    this.el.addEventListener("mouseenter", () => {
      const placeContainer = document.querySelector("#places-container");
      const { state } = placeContainer.getAttribute("tour");
      if (state === "places-list") {
        this.handlePlacesListState();
      }
    });
  },

  /* The `handlePlacesListState` function is responsible for handling the behavior of an element when
  the mouse enters it in the context of the `places-list` state. It first gets the id of the current
  element and checks if it is included in the `placesId` array, which contains the predefined ids of
  the places. If the id is included, it sets the `selectedItemId` attribute on the `cursor-listener`
  component of the `#places-container` element to the id of the current element. It also sets the
  color and opacity of the current element to a specific value using the `setAttribute` method. */
  handlePlacesListState: function () {
    const id = this.el.getAttribute("id");
    const placesId = ["taj-mahal", "budapest", "new-york-city", "eiffel-tower"];
    if (placesId.includes(id)) {
      const placeContainer = document.querySelector("#places-container");
      placeContainer.setAttribute("cursor-listener", {
        selectedItemId: id
      });
      this.el.setAttribute("material", {
        color: "#D76B30",
        opacity: 1
      });
    }
  },

  /* The `handleMouseLeaveEvents` function is defining a mouseleave event listener on the element that
  the `cursor-listener` component is attached to. When the mouse leaves the element, the function
  checks the state of the `tour` attribute on the `#places-container` element. If the state is
  `places-list`, it checks if the `selectedItemId` attribute is present on the `cursor-listener`
  component of the `#places-container` element. If it is, it gets the element with the id that matches
  the `selectedItemId` and sets its color and opacity to a specific value using the `setAttribute`
  method. This is done to reset the color and opacity of the previously selected element when the
  mouse leaves it. */
  handleMouseLeaveEvents: function () {
    // Mouse Leave Events
    this.el.addEventListener("mouseleave", () => {
      const placesContainer = document.querySelector("#places-container");
      const { state } = placesContainer.getAttribute("tour");
      if (state === "places-list") {
        const { selectedItemId } = this.data;
        if (selectedItemId) {
          const el = document.querySelector(`#${selectedItemId}`);
          const id = el.getAttribute("id");
          if (id == selectedItemId) {
            el.setAttribute("material", {
              color: "#0077CC",
              opacity: 1
            });
          }
        }
      }
    });
  },

});