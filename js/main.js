const APIURL = "http://openlibrary.org/search.json?q=golang";
const IMGPATH = "https://covers.openlibrary.org/b/id/";
const SEARCHAPI = "http://openlibrary.org/search.json?q=";

const path = '../image/random.jpg'

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");


const showBooks = (books) => {
    // clear main
    main.innerHTML = ""
    const totalEl = document.createElement("div");
    totalEl.classList.add("total");
    totalEl.innerHTML = `<h4>Total search result: ${books.numFound}</h4>`;

    main.appendChild(totalEl);

    if (books.numFound === 0) {
        main.innerHTML = ""
        console.log("notfound area");
        const notFoundEl = document.createElement("div");
        notFoundEl.classList.add("not-found");
        notFoundEl.innerHTML = `<h4 class="not-found">Sorry, there is noting with this search result.</h4>`;
        main.appendChild(notFoundEl);
    }
    else {
        books.docs.forEach((book) => {
            let { author_name, title, cover_i, publish_date } = book;

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
                <d class="author-date"><h5>Author: ${author_name}</h5>
                <p>${publish_date}</p>
                </d>
            </div>
            <div class="overview">
                <h3>Author Details:</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid, sed.</p>
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

    if (searchTerm) {
        getBooks(SEARCHAPI + searchTerm);

        search.value = "";
    }
});