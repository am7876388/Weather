function Delete(element){//The main delete function for the History
    const DArr = JSON.parse(localStorage.getItem("History"));
    DArr.splice(DArr.indexOf(element.parentNode.innerText.trim()),1);
    localStorage.setItem("History",JSON.stringify(DArr));
    element.parentNode.remove();
    HistoryLoader();
    }
document.addEventListener("DOMContentLoaded",() =>{//The function which changes the visiblility of the History
    const HistoryIcon = document.getElementById("DropDown");
    const List = document.getElementById("CityList");
    List.style.opacity = "0";
    HistoryIcon.addEventListener("click",() =>{
        if(List.style.opacity === "0"){
            List.style.opacity = "1";
        }
        else{
            List.style.opacity = "0";
        }
    })
    document.addEventListener("click",(event) =>{
        if(!HistoryIcon.contains(event.target) && !List.contains(event.target)){
            List.style.opacity = "0";
        }
    })
})