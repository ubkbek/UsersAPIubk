// =====-===== Gel element from DOM =====-======
let elUserCounter = document.querySelector(".users__count")
let elPostCounter = document.querySelector(".posts__count")
let elCommentCounter = document.querySelector(".comments__count")

let elUserList = document.querySelector(".users__list")
let elPostList = document.querySelector(".posts__list")
let elCommentList = document.querySelector(".comments__list")

let elUserId = document.querySelector(".user_id")
let elPostId = document.querySelector(".post_id")
// console.log(elUserId);

let elUserTemplate = document.querySelector("#user-template").content;
let elPostTemplate = document.querySelector("#post-template").content;
let elCommentTemplate = document.querySelector("#commment-template").content;

let storage = window.localStorage
let savedPostId = JSON.parse(storage.getItem("postId"))
// console.log(savedPostId);
let savedCommentId = JSON.parse(storage.getItem("commentId"))
// console.log(savedCommentId);


if(savedPostId){
    ;(async function(){
        response = await fetch(`https://jsonplaceholder.typicode.com/user/${savedPostId}/posts`)
        data = await response.json()
        renderPosts(data, elPostList)
        // console.log(data);
        // dataset.userId.parentNode.style.backgroundColor='grey'
        // document.querySelector("userId").style.backgroundColor='grey';
    })();
}

if(savedCommentId){
    ;(async function(){
        response = await fetch(`https://jsonplaceholder.typicode.com/posts/${savedCommentId}/comments`)
        data = await response.json()
        renderComments(data, elCommentList)
        // console.log(data);
        // dataset.userId.parentNode.style.backgroundColor='grey'
        // document.querySelector("userId").style.backgroundColor='grey';
    })();
}


// =====-===== Users =====-=====
;(async function(){
    response = await fetch("https://jsonplaceholder.typicode.com/users")
    data = await response.json()
    renderUsers(data, elUserList)
})();

// ======-====== Posts ======-======
elUserList.addEventListener("click", (evt)=>{
    let userId = evt.target.dataset.userId
    if(userId){
        elCommentList.innerHTML = null
        elCommentCounter.innerHTML = null
        elPostId.textContent = null
        ;(async function(){
            response = await fetch(`https://jsonplaceholder.typicode.com/user/${userId}/posts`)
            data = await response.json()
            storage.setItem("postId", JSON.stringify(userId))
            storage.removeItem("commentId")
            renderPosts(data, elPostList)
            // console.log(data);
            // dataset.userId.parentNode.style.backgroundColor='grey'
            // document.querySelector("userId").style.backgroundColor='grey';
        })();
    }
})

// ======-====== Comments ======-======
elPostList.addEventListener("click", (evt)=>{
    let postId = evt.target.dataset.postId
    if(postId){
        ;(async function(){
            response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
            data = await response.json()
            storage.setItem("commentId", JSON.stringify(postId))
            renderComments(data, elCommentList)
            // console.log(data);
        })();
    }
})



// =====-===== render function for Users
function renderUsers(array, place){
    let virtualBox = document.createDocumentFragment();

    array.forEach(item => {
        copyUserCard = elUserTemplate.cloneNode(true)

        copyUserCard.querySelector(".user__username").innerHTML = item.name;
        copyUserCard.querySelector(".user__username").dataset.userId = item.id;
        copyUserCard.querySelector(".user__email").innerHTML = item.email;
        copyUserCard.querySelector(".user__country").innerHTML = item.address.city;
        copyUserCard.querySelector(".user__company").innerHTML = item.company.name;
        copyUserCard.querySelector(".user__website").innerHTML = item.website;

        virtualBox.appendChild(copyUserCard)
    });
    place.appendChild(virtualBox)
    elUserCounter.textContent = array.length;
}


// =====-===== render function for Posts
function renderPosts(array, place){
    place.innerHTML = null

    let virtualBox = document.createDocumentFragment();

    array.forEach(item => {
        let copyPostCard = elPostTemplate.cloneNode(true)
        copyPostCard.querySelector(".post-title").textContent = item.title;
        copyPostCard.querySelector(".post-title").dataset.postId = item.id;
        copyPostCard.querySelector(".post-info").textContent = item.body;

        virtualBox.appendChild(copyPostCard)
    });
    place.appendChild(virtualBox)
    elPostCounter.textContent = array.length
    elUserId.textContent = array[0].userId
}


// =====-===== render function for Comments
function renderComments(array, place){elCommentList
    place.innerHTML = null

    let virtualBox = document.createDocumentFragment();

    array.forEach(item => {
        let copyCommentCard = elCommentTemplate.cloneNode(true)
        copyCommentCard.querySelector(".comments__title").textContent = item.name;
        copyCommentCard.querySelector(".comments__email").textContent = item.email;
        copyCommentCard.querySelector(".comments__text").textContent = item.body;
        // console.log(copyCommentCard);

        virtualBox.appendChild(copyCommentCard)
    });
    place.appendChild(virtualBox)
    elCommentCounter.textContent = array.length
    elPostId.textContent = array[0].postId
}
