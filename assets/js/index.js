//get user input from tet and select box

//Send user input to second page

var submitButtonEl = document.getElementById("submit-button-opening-page");
var inputText = document.getElementById("search-input-opening-page")
console.log($("#form-page-1"))
var formValidation = $('#form-page-1').parsley();
$('#form-page-1').attr('data-parsley-minlength', 1);
//data-parsley-minlength="6"
//$("img").attr("width","500")
//comment for the sake of a comment
submitButtonEl.addEventListener("click", function(event){
    event.preventDefault()
    inputText.textContent = ""
    //TODO:
    if(formValidation.isValid() && inputText.trim() !=''){
        document.location = "./search.html?textInput=" + inputText.value.trim();
    }else{
        return;
    }
});

inputText.addEventListener("keypress",function(event){
    if (event.key === "Enter"){
        event.preventDefault();
        if(formValidation.isValid() && inputText.trim() !=''){
            document.location = "./search.html?textInput=" + inputText.value.trim();
        }else{
            return;
        }
    }
});