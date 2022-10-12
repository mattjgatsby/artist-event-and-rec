//get user input from tet and select box

//Send user input to second page

var submitButtonEl = document.getElementById("submit-button-opening-page");
var inputText = document.getElementById("search-input-opening-page")


submitButtonEl.addEventListener("click", function(event){
    event.preventDefault()
    inputText.textContent = ""
    if(inputText.value != ""){
        document.location = "./second.html?textInput=" + inputText.value.trim();
    }else{
        return;
    }
});

inputText.addEventListener("keypress",function(event){
    if (event.key === "Enter"){
        event.preventDefault();
        
        document.location = "./second.html?textInput=" + inputText.value.trim();
    }
});