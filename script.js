const searchInput = document.querySelector("#search-input");
const   searchBtn = document.querySelector("#search-btn");
const searchResult = document.querySelector(".search-result");
const showMoreBtn = document.querySelector(".show-more-btn");

let keyword  = '';
let page = '1';
let accesskey = '73shk-fG9Xzlc-C0rK_DsKHPnh03M3FZZkFHAwMe35Y'

async function searchImages() {
    keyword = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

// for remove previous result data 
    if(page ===  1){
        searchResult.innerHTML = '';
    }

    console.log(data)

    const imageResults = data.results;

    imageResults.map((imageResult)=> {
        const image = document.createElement('img');
        image.classList.add('set-images');
        image.src = imageResult.urls.small;
        const imageLink = document.createElement("a");  // it's work as a button 

        imageLink.addEventListener("click", (e) => {
            e.preventDefault();
            const a = document.createElement("a");
            a.href = imageResult.urls.full;
            a.download = "Ravin-image.jpg"; // Downloaded file ka naam
            document.body.appendChild(a);
            a.target = "_blank";
            a.click();
            document.body.removeChild(a);
        });

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })

    if(imageResults == false){
        alert("Please Check Spelling Of Text");
    }else{
        showMoreBtn.style.display = "block";
    }
    
}

searchBtn.addEventListener("click", (e)=> {
    e.preventDefault();
    page = 1;
    searchImages();
})

showMoreBtn.addEventListener("click",()=> {
    page++;
    searchImages();
})