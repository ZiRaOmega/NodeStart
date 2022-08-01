var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

var search = document.getElementById('searchBar')
var searchb = search.addEventListener('keyup', function () {
    delay(function () {
        search_bar();
    }, 250);
})

function search_bar() {
    let searchbarr = document.getElementsByName('search')[0].value
    console.log(searchbarr);
    let counter = 0;
    let Links = document.getElementsByClassName("Links")[0];
    console.log(Links);
    let searchResult = document.querySelector(".searchResult");
    searchResult.innerHTML = "";
    let test = false;
    if (searchbarr.length > 0) {
        for (let i = 0; i < Links.children.length; i++) {
            const li_element = document.createElement("li")
            const hide_element = document.createElement("li")
            console.log(i)
            if (counter == 10) {
                test = true;
            }
            if (counter == 30) {
                break;
            }
            if (Links.children[i].innerText.toLowerCase().includes(searchbarr.toLowerCase()) && test == false) {
                counter++;
                li_element.innerHTML += Links.children[i].outerHTML;
                searchResult.appendChild(li_element);
            } else if (test == true && Links.children[i].innerText.toLowerCase().includes(searchbarr.toLowerCase())) {
                counter++
                hide_element.innerHTML += Links.children[i].outerHTML;
                hide_element.style.display = "none";
                hide_element.className = "hide";
                searchResult.appendChild(hide_element);
            }
        }
        let unhide_button = document.createElement("a");
        unhide_button.href = "#";
        unhide_button.innerHTML = "Show more";
        unhide_button.className = "hide_unhide";
        unhide_button.onclick = hide_unhide;
        searchResult.appendChild(unhide_button);
    }

    //searchResult.appendChild(hide_element);

}
function hide_unhide() {
    let hide_elements = document.getElementsByClassName("hide");
    let hide_button = document.getElementsByClassName("hide_unhide")[0];
    let counter = 0;
    let i;
    if (hide_button.innerHTML == "Hide") {
        for (i = 0; i < hide_elements.length; i++) {
            hide_elements[i].style.display = "none";
        }
        hide_button.innerHTML = "Show more";
    } else {
        for (i = 0; i < hide_elements.length; i++) {
            /* console.log(counter)
            console.log(i) */
            if (counter == 10) {
                return;
            }
            let hide_element = hide_elements[i];
            if (hide_element.style.display == "block" || hide_element.outerHTML == "<br>") {
                continue;
            } else {
                hide_element.style.display = "block";
                //console.log(hide_element)
                counter++;
            }

        }
        if (i >= hide_elements.length-1) {
            hide_button.innerHTML = "Hide";
            hide_button.onclick = hide_unhide;
        }
    }
}