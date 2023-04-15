// Registering component in Target.js


/*
We can have a loop that will run multiple times, and then we can call this createRing function inside it. 
Let’s use the .init() method, which is loaded as soon as the component is attached to the entity, to write this for loop.
Let's make 20 rings. 
Each ring that we create needs to have a unique id; to assign this unique id; 
we can use the counter value of the loop.
We can manipulate the string to generate a unique id by using template literal ${} to join strings.
We also need to have different positions for each ring.  
We can use the random function to generate a random number. 

In JavaScript, the Math.random() function gives the values between 0 and 1.
We can multiply the random number with a number to get the value between any other numbers. 
For example, Math.random()*100 will give random values between 0 and 100. 

We can also add and subtract to get the different range of numbers. 
For example, Math.random()*100 + (-50) will give random values between -50 and 50.
*/


AFRAME.registerComponent("target-ring", {
    init: function () {
        for (var i = 1; i <= 60; i++) {
            //id
            //template literals
            //used to create strings using the subsitution of placeholders
            var id = `ring${i}`;// i = 5

            //position variables   
            var posX = (Math.random() * 3000 + (-1000));//70
            var posY = (Math.random() * 2 + (-1));//42
            var posZ = (Math.random() * 3000 + -1000);//300

            var position = { x: posX, y: posY, z: posZ };

            //call the function
            this.createRings(id, position);//createRings(5, {x:70, y:42, z:300})
        }
    },
    createRings: function (id, position) {

        var terrainEl = document.querySelector("#terrain");

        var ringEl = document.createElement("a-entity");

        ringEl.setAttribute("id", 55);
        ringEl.setAttribute("position", position);

        ringEl.setAttribute("material", "color", "#ff9100");

        ringEl.setAttribute("geometry", { primitive: "torus", radius: 8 });

        terrainEl.appendChild(ringEl);
    }
});


