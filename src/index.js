//console.log('%c HI', 'color: firebrick')


/**
 * Challenge 1
 * 
 * We want to make sure the JavaScript we write executes when the DOM is fully
 *  loaded. Any code related to DOM manipulation should either go in `init` or in a
 *  function called within `init`.
 */


const init = () => {
    console.log("Hi");

function getAllDogImgs(){

    fetch('https://dog.ceo/api/breeds/image/random/4')
    .then(resp => resp.json())
    .then(data => //console.log(data)) //To see the data we're getting back
            { //access an att. in the object which is an array
                console.log(data)
                data.message.forEach(dogImg => buildImg(dogImg))
    })
}
getAllDogImgs()
//Where is my buildImg()?

function getAllDogBreeds(){
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(resp => resp.json())
    .then(breedData =>   
            { 

/**
 * Challenge 4: Dropdown MenuSet our dropdown menu here & add e.Listener with a
 * handle function to handle the event. I add this here bc I have access to all my 
 * dawgs in this func
 */
    let select = document.querySelector('select')

    select.addEventListener('change', (e) => 
        { console.log(e)
//confirms our func is working as expected
 //we pass in the handle func, which takes 2 arg our (e) and our breedData so the handleFilter() has access to the event and all of our dogs from the server       
            handleFilter(e, breedData)

        }
    )
/*** End Challenge 4 */

console.log(breedData) //confirms func performing as expected & it displays what data I am receiving from the server. How do I read it?
//I want to access the props of the Obj holding my list  of dog breeds which are arrays
//breedData is an arr containing a string at index[0] & an arr at index[1]
// ["string", "[str, str]"]                   
        let renderBreed = Object.entries(breedData.message)
            renderBreed.forEach(breed => buildDogBreed(breed))
        })
}
getAllDogBreeds()


//Dom Manipulation
function buildImg(dogImg){
    const div = document.getElementById("dog-image-container")
   // console.log(div) //console.log(dogImg) //div structure of 4 dog images
    const img = document.createElement('img')
    img.src = `${dogImg}` //set to dogs bc forEach is iterating the arr, which contains the URLs of the dogs
    img.style.width = "200px"
    div.appendChild(img)
}


/**
 * Challenge 2 - 
 * Building my dog breed structure and append the nested list to the DOM
*/

function buildDogBreed(breed){
    console.log(breed)//displays the data I am receiving from the server -confirms the data from the server is ["string", "[str, str]"]   
    //console.log(breed[0]) // displays arr of single breed
    //console.log(breed[1]) // displays arr of subBreed list
    let container = document.getElementById('dog-breeds')
    const li = document.createElement("li")//outer li
    const ul = document.createElement("ul")//inner ul
    li.textContent = `${breed[0]}`//set outer li to the list of dog breeds

//access our dog breeds obj extracting the sub dog breed list using breed[1] which is the second index containing a sublist of dog breeds. Once I access the list @ index[1] I want to append the subBreeds to the DOM as a nested <ul> LIST

    breed[1].forEach(subBreed => 
        { //console.log(subBreed) //confirms expectations
        const subLi = document.createElement("li")//inner li
            
        subLi.textContent = subBreed//set inner li to subBreed dogs
        ul.appendChild(subLi)//append inner li to inner ul
    })


/** Challenge 3 - Change the color 
 * Execute the code here bc we have access to the Li we want to use to add an E.Lisener. We Pass a handle func changeColor which will handle our click event
 * */    
    li.addEventListener('click', () => changeColor(li))
        li.appendChild(ul)//append inner ul to outer li
        //console.log(li)//displays the structure of the li's
        container.appendChild(li)
}

/**
 * Challenge 3 - Change the color 
 * 
*/

function changeColor(li){
    console.log(li)
    li.style.color = "DarkTurquoise"
}

/**
 * Challenge 4
 * 
 * I want to be able to filter all the dog from a dropdown menu by using the the e.listener called change
 * 
 * Thoughts:
 * Q: Where do I have access to all my dogs? 
 * A: (init fetch) - getAllDogs
 * 
 * Q: How do I want to accees my dogs breeds?
 * A: take all my dogs and filter them on click event
 * 
 * Q: How to target the lette in the dropdown menu?
 * A: e.target.value of the select 
 * 
 * After give access & pass all our dogs to the handleFilter() we want to filter the dogs that match the letter of the dropdown we havae selected
 * 
 * After setting up the functinality to match dog breeds w/ the selected letter in the dropdown. Since we already have the set up. we want to grab our container for the dog-breeds, clear the content on the page before rendering the selected dogs whose first letter matches the one selected on the dropdown. 
*/




//handler
function handleFilter(e, dogs){
    console.log(e, dogs)//once the dropdown menu is selected, we will see as list of dogs that match the first letter that dropdown menu

//I want to filter each dog in my obj to match the letter of the dropdown menu by select the value for the letter selected
console.log(e.target.value)
    let filter = Object.entries(dogs.message).filter(breed => breed[0].startsWith(e.target.value))
//based on the selection from the dropdown, the console.log() will give us the dog breeds that match the letter selected      
    console.log(filter) //Confirms what I expect to see

//Now that we have the functionality down. The next step is to append this to the DOM. since we already have a structure for the dog breeds we can reuse the code to fit our needs. 


let container = document.getElementById('dog-breeds')
container.innerHTML= ''
filter.forEach(breed => buildDogBreed(breed))
}

}

document.addEventListener('DOMContentLoaded', init);


//Once I get an understanding for this lab, refactor my code by following the steps in the lecture video starting the 40min mark.




/**
 * 
 * Data.message becomes an arr?
 * How to read the data that is sent in the console?
 */