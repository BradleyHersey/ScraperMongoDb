$(document).ready(() => {
    const articleContainer = $(".article-container");
    $(document).on("click", ".btn.delete", handleArticleDelete);
    $(document).on("click", ".btn.notes", handleArticleNotes);
    $(document).on("click", ".btn.save", handleNoteSave);
    $(document).on("click", ".btn.note-delete", handleNoteDelete);
    initPage();
    const initPage = () => {
        articleContainer.empty();
        $.get("/api/headline?saved=true").then(data => {
            if (data && data.length) {
                renderArticles(data);
            } else {
                renderEmpty();
            }
        });
    }
    const renderArticles = (articles) => {
        let articlePanels = [];
        for (let i = 0; i < articles.length; i++) {
            articlePanels.push(createPanel(articles[i]));
        }
        articleContainer.append(articlePanels);
    }

    const createPanel = (article) => {
        let panel = $(["<div class='panel panel-default'>",
            "<div class='panel-heading'>",
            "<h2>",
            article.headline,
            "<a class='btn btn-danger delete'>",
            "Delete Saved Article",
            "</a>",
            "<a class='btn btn-info notes'>Notes</a>",
            "</h2>",
            "</div>",
            "<div class='panel-body'>",
            article.summary,
            "</div>",
            "</div>"
        ].join(""));
        panel.data("_id", article._id);
        return panel;
    }
    const renderEmpty = () => {
        let emptyAlert = $(["<div class='alert alert-warning text-center'>",
            "<h4>Nothing New! . Try again later!</h4>",
            "</div>",
            "<div class ='panel panel-default'>",
            "<div class='panel-heading text-center'>",
            "<h3>Look At What We Have???</h3>",
            "</div>",
            "<div class='panel-body text-center'>",
            "<h4><a class = 'scrape-new'>Scraping New Articles</a></h4>",
            "<h4><a>href='/'>Browse Articles</a></h4>",
            "</div>",
            "</div>"
        ].join(""));
        articleContainer.append(emptyAlert);
    }
    const renderNotesList = (data) => {
        let notesToRender = [];
        let currentNote;
        if (!data.notes.length) {
            currentNote = [
                "<li class='list-group-item'>",
                "NO!!! notes for this article.",
                "</li>"
            ].join("");
            notesToRender.push(currentNote);
        } else {
            for (let i = 0; i < data.notes.length; i++) {
                currentNote = $([
                    "<li class='list-group-item note'>",
                    data.notes[i].noteText,
                    "<button class='btn btn-danger note-delete'>x</button>",
                    "</li>"
                ].join(""));
                currentNote.children("button").data("_id", data.notes[i]._id);
                notesToRender.push(currentNote);
            }
        }
        $(".note-container").append(notesToRender);
    }
    const handleArticleDelete = () => {
        let articleToDelete = $(this).parents(".panel").data();
        $.ajax({
            method: "DELETE",
            url: "/api/headlines/" + articleToDelete._id
        }).then(data => {
            if (data.ok) {
                initPage();
            }
        });
    }
    const handleArticleNotes = () => {
        let currentArticle = $(this).parents(".panel").data();
        $.get("/api/notes/" + currentArticle._id).then(data => {
            let modalText = [
                "<div class='container-fluid text-center'>",
                "<h3>Notes for Article:",
                currentArticle._id,
                "</h3>",
                "<hr/>",
                "<ul class='list-group note-container'>",
                "</ul>",
                "<textarea pleaceholder='New Notes'rows='5' cols='70'></textarea>",
                "<button class='btn btn-success save'>Save Note</button>",
            ].join("");
            bootbox.dialog({
                message: modalText,
                closeButton: true
            });
            let noteData = {
                _id: currentArticle._id,
                notes: data || []
            };
            $(".btn.save").data("article", noteData);
            renderNotesList(noteData);
        });

    }
    const handleNoteSave = () => {
        let noteData;
        let newNote = $(".bootbox-body textarea").val().trim();
        if (newNote) {
            noteData = {
                _id: $(this).data("article")._id,
                noteText: newNote
            };
            $.post("/api/notes", noteData)
                .then(() => {
                    bootbox.hideAll();
                });
        }
    }
    const handleNoteDelete = () => {
        let noteToDelete = $(this).data("_id");
        $.ajax({
            url: "/api/notes/" + noteToDelete,
            method: "DELETE"
        }).then(() => {
            bootbox.hideAll();
        });
    }
});console.log("7");