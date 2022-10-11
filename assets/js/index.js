//get user input from tet and select box

//Send user input to second page

var submitButtonEl = document.getElementById("submitButtonPlaceholder");
var inputText = document.getElementById("searchInputPlaceHolder");

submitButtonEl.addEventListener("click", function(){
    if(inputText.value != "" || inputText.value != null){
        console.log(textInput.value);
        document.location = "./second.html?textInput=" + inputText.value.trim();
    }else{
        return;
    }
})
