AFRAME.registerComponent("game-play", {
    schema: { type: "string", default: "#ring1" },
    update: function () {
        //function call to check if the passed element 
        //has collieded with the plane 
        //here, elementID = any other object such as 
        //ring1, ring2, ring3, so on as well as it can be bird1, bird2, .....
        this.isCollided(this.data.elementId)
    },
    isCollided:
    //passed element is the rings and birds, elements other than the
    //main plane body
        function (passedElement) {
    //the constant element is set to the passed element,
    //when component is run, it will select the passed elements
            const element = document.querySelector(passedElement);
    //
            element.addEventListener("collide", (e) => {
                if (passedElement.includes("#ring")) {
                    console.log(passedElement + " collision");
                } else if (passedElement.includes("#hurdle")) {
                    console.log("bird collision");
                }
            });
        },
});