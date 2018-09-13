$(document).ready(() => {
   
    const articleContainer = $(".article-container");

    const initPage = () => {
        articleContainer.empty();
        $.get("/api/headlines?saved=false")
            .then(data => {
                console.log('got data from server')
                if (data && data.length) {
                    renderArticles(data);
                } else {
                    renderEmpty();
                }
            });

    }

    const renderArticles = (articles) => {
        const articlePanels = [];
        for (let i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        articleContainer.append(articlePanels);
    }

    const createPanel = (article) => {
        const panel = $(["<div class='panel panel-default'>",
            "<div class='panel-heading'>",
            "<h2>",
            article.headline,
            "<a class='btn btn-success save'>",
            "Save Article",
            "</a>",
            "</h2>",
            "</div>",
            "<div class='panel-link'>",
            article.url,
            "</div>",
            "<div class='panel-body'>",
            article.summary,
            "</div>",
            "</div>"
        ].join('      '));
        panel.data("_id", article._id);
        return panel;
    }

    const renderEmpty = () => {
        const emptyAlert = $(["<div class='alert alert-warning text-center'>",
            "<h4>Nothing New! . Try again later!</h4>",
            "</div>",
            "<div class ='panel panel-default'>", "<div class='panel-heading text-center'>",
            "<h3>What Would You Like To Do???</h3>",
            "</div>", "<div class='panel-body text-center'>",
            "<h4><a class = 'scrape-new'>Scraping New Articles</a></h4>",
            "<h4><a href='/saved'>Saved Articles</a></h4>",
            "</div>",
            "</div>"
        ].join('  '));
        articleContainer.append(emptyAlert);
    }

    const handleArticleSave = (event) => {
        event.preventDefault();

        let articletToSave = $(this).parents(".panel").data();
        articletToSave.saved = true;
        $.ajax({
            method: "PATCH",
            url: "/api/headlines",
            data: articletToSave
        }).then(data => {
            if (data.ok) {
                initPage();
            }
        });
    }
   
    const handleArticleScrape = (event) => {
        event.preventDefault();
        $.get("/api/fetch")
            .then(data => {
                console.log('data after fetch')
                initPage();
                bootbox.alert(`<h3 class='text-center m-top-80'> ${data.message} </h3>`);
            });

    }

    $(document).on("click", "btn.save", handleArticleSave);
    $(document).on("click", ".scrape-new", handleArticleScrape);

    initPage();
});
