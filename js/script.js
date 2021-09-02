const APIURL = "https://openlibrary.org/search.json?q=golang";
const IMGPATH = "https://covers.openlibrary.org/b/id/";
const SEARCHAPI = "https://openlibrary.org/search.json?q=";

const path = '../image/download.jpg'

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");


const showBooks = (bookDetails) => {
    // clear main
    main.innerHTML = ""
    const totalEl = document.createElement("div");
    totalEl.classList.add("total");
    totalEl.innerHTML = `<h4>Total search result: ${bookDetails.numFound}</h4>`;

    main.appendChild(totalEl);

    if (bookDetails.numFound === 0) {
        main.innerHTML = ""
        console.log("notfound area");
        const notFoundEl = document.createElement("div");
        notFoundEl.classList.add("not-found");
        notFoundEl.innerHTML = `<h4>Sorry, there is noting with this search result.</h4>`;
        main.appendChild(notFoundEl);
    }
    else {
        bookDetails.docs.forEach((bookItem) => {
            let { author_name, title, cover_i, publish_date } = bookItem;

            if (cover_i) {
                cover_i = `${IMGPATH}${cover_i}-M.jpg`
            } else {
                cover_i = path;
            }

            const bookList = document.createElement("div");
            bookList.classList.add("book");

            bookList.innerHTML = `
            <img
                src="${cover_i}"
                alt="${title}"
            />
            <div class="book-info">
                <h3>${title}</h3>
                <h5>Author: ${author_name}</h5>
                <p>${publish_date}</p>
            </div>
            <div class="overview">
                <h3>Author Details:</h3>
            </div>
        `;

            main.appendChild(bookList);
        });
    }

}


const getBooks = async (url) => {
    const resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showBooks(respData);
}

// initially get fav books
getBooks(APIURL);





form.addEventListener("click", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    console.log(searchTerm);

    if (searchTerm) {
        getBooks(SEARCHAPI + searchTerm);
        search.value = "";
    }
});