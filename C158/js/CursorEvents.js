/*
define a schema having selectedItemId as the data and write
a function, handlePlaceListState(), which will check for the selected thumbnail’s id.

To check if the place is selected-
● First, we'll get the id using the getAttribute() function and store it in the constant variable id.
● Then we'll create an array of all the ids of the places and call it placesId.
● Using the if condition we'll check if the placesId list contains the id.
● If the id is the same, then using the document.querySelector() method, select the places-container entity and 
set the cursor-listener component for the entity. Then we'll change the color of the
selected thumbnail ring using the setAttribute() method and then call the function.
*/

AFRAME.registerComponent("cursor-listener", {
  schema: {
    selectedItemId: { default: "", type: "string" },
  },
  init: function () {
    this.handleMouseEnterEvents();
    this.handleMouseLeaveEvents();
  },

  handleMouseEnterEvents: function () {
    // Mouse Enter Events
    this.el.addEventListener("mouseenter", () => {
      this.handlePlacesListState();
    });
  },

  handlePlacesListState: function () {
    const id = this.el.getAttribute("id");
    const placesId = ["taj-mahal", "budapest", "new-york-city", "eiffel-tower"];

    if (placesId.includes(id)) {
      const placeContainerEL = document.querySelector("#places-container");
      placeContainerEL.setAttribute("cursor-listener", {
        selectedItemId: id,
      });
      this.el.setAttribute("material", {
        color: "#D76B30",
        opacity: 1,
      });
    }
  },
  /*
  We can have another function that will revert the color when the mouse cursor is away from the thumbnail image and ring border.
  
  In the function, first, we'll add the event listeners to listen to the mouse events. Here we'll be checking for the mouseleave event.
  Inside the listener event-
   ● We’ll get the selectedItemId from the schema.
   ● If we have an id in the schema then, using document.querySelector(), we'll get the selected element and store it in the “el” variable.
   ● Using the getAttribute()method, get the id of that
  
  */
  handleMouseLeaveEvents: function () {
    //Cursor 'mouseleave' Events
    this.el.addEventListener("mouseleave", () => {
      //the constant is set to this.data
      const { selectedItemId } = this.data;
      //if the selectedItemId is defined, has a value
      if (selectedItemId) {
        //the constant el is equal to the selected element
        //query selector returns the first element with that id withing the document
        const el = document.querySelector(`#${selectedItemId}`);
        //id is equal to the attribute id
        const id = el.getAttribute("id");
        //if the constant id is equal to the constant selectedItemId,
        if (id == selectedItemId) {
          //the attribute material will be blue with a opacity of one
          el.setAttribute("material", {
            color: "#0077CC",
            opacity: 1,
          });
        }
      }
    });
  },
});

