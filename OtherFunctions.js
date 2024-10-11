function Delete(element){
    const DArr = JSON.parse(localStorage.getItem("History"));
    DArr.splice(DArr.indexOf(element.parentNode.innerText.trim()),1);
    localStorage.setItem("History",JSON.stringify(DArr));
    element.parentNode.remove();
    HistoryLoader();
    }
document.addEventListener("DOMContentLoaded",() =>{
    const HistoryIcon = document.getElementById("DropDown");
    const List = document.getElementById("CityList");
    let On = 0;
    HistoryIcon.addEventListener("click",() =>{
        if(On === 0){
            List.style.opacity = "1";
            On = 1;
        }
        else{
            List.style.opacity = "0";
            On = 0;
        }
    })
})