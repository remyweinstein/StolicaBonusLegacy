/* global C, d, DOMAIN, getCodeByCity, openNews */

function drawNews(newsList) {
    
    if (!newsList) {
        return false;
    }
    
    const container = C(".news>div.container");
    container.html("");
    
    removeLoadOption("#news>div.container");
    newsList.forEach((news) => {
        const date   = news.date_to_post.split("-").reverse().join(".");
        let imageSrc = `${DOMAIN}/${news.image}`;
        let imgElem  = news.image ? `<img src="${imageSrc}">` : '';
        let catalog;
        let city = null;
        let code;

        if (news.catalog) {
            catalog = JSON.parse(news.catalog);

            if (!city) {
                content = JSON.parse(C().getStor(LS_CONTENTS));
                city    = content ? content.personal.city : null;
                //if (!city) return;
            }

            code = getCodeByCity(city);

            catalog = JSON.parse(news.catalog);
            imageSrc = `${DOMAIN}/app/assets/catalog/${catalog.dir}/${code}/1.jpg`
            imgElem  = `<img src="${imageSrc}">`;
        }
            
        const temp = `<div class="news__container animated animate__fadeIn">
                        ${imgElem}
                        <div class="news__container_details">
                            <p class="news__container_details_date">${date}</p>
                            <h4>${news.title}</h4>
                            <button class="button-primary">Подробнее</button>
                        </div>
                      </div>`;
        const newsContEl = C().strToNode(temp);

        container.el.prepend(newsContEl.el);
        newsContEl.el.addEventListener("click", () => openNews(news.id));
    });
}

C(".newsOverlay").bind("click", (e) => {
    if (e.target === e.currentTarget || e.target.type === "submit" || e.target.classList.contains("icon-cancel")) {
        C(".newsCatalogImage").els.forEach((el) => {
            el.parentNode.removeChild(el);
        });
        C(".newsOverlay").el.scrollTop = 0;
        hide(".newsOverlay");
        hide(".newsOverlay .icon-cancel");
        d.body.classList.remove("hideOverflow");
    }
});
