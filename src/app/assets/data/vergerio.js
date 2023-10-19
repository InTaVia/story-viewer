const story = {
    "title": "The Life of Vergerio",
    "id": "story-jakob",
    "slides": [
        {
            "id": "0",
            "sort": 0,
            "story": "story0",
            "visualizationSlots": {
                "vis-1": "visualization-irjq",
                "vis-2": null,
                "vis-3": null,
                "vis-4": null
            },
            "contentPaneSlots": {
                "cont-1": "contentPane-ftbk",
                "cont-2": null
            },
            "selected": true,
            "layout": "single-vis-content"
        },
        {
            "story": "story0",
            "id": "1",
            "visualizationSlots": {
                "vis-1": "visualization-ctjb",
                "vis-2": "visualization-zysj"
            },
            "contentPaneSlots": {
                "cont-1": null,
                "cont-2": null
            },
            "layout": "two-cols",
            "sort": 1,
            "selected": false
        }
    ],
    "properties": {
        "name": {
            "type": "text",
            "id": "name",
            "label": "Name",
            "sort": 1,
            "value": "The Life of Vergerio",
            "editable": true
        },
        "subtitle": {
            "type": "text",
            "id": "subtitle",
            "label": "Subtitle",
            "sort": 2,
            "value": "",
            "editable": true
        },
        "author": {
            "type": "text",
            "id": "author",
            "label": "Author",
            "sort": 3,
            "value": "InTaVia",
            "editable": true
        },
        "copyright": {
            "type": "text",
            "id": "copyright",
            "label": "Copyright",
            "sort": 4,
            "value": "InTaVia",
            "editable": true
        },
        "language": {
            "type": "select",
            "id": "language",
            "label": "Language",
            "sort": 5,
            "value": {
                "name": "English",
                "value": "english"
            },
            "options": [
                {
                    "name": "Deutsch",
                    "value": "german"
                },
                {
                    "name": "English",
                    "value": "english"
                }
            ],
            "editable": true
        },
        "font": {
            "type": "select",
            "id": "font",
            "label": "Font",
            "sort": 3,
            "value": {
                "name": "Sans Serif",
                "value": "Verdana, Arial, Helvetica, sans-serif",
                "font": "Verdana, Arial, Helvetica, sans-serif"
            },
            "options": [
                {
                    "name": "Serif",
                    "value": "Times, \"Times New Roman\", Georgia, serif",
                    "font": "Times, \"Times New Roman\", Georgia, serif"
                },
                {
                    "name": "Sans Serif",
                    "value": "Verdana, Arial, Helvetica, sans-serif",
                    "font": "Verdana, Arial, Helvetica, sans-serif"
                },
                {
                    "name": "Monospace",
                    "value": "\"Lucida Console\", Courier, monospace",
                    "font": "\"Lucida Console\", Courier, monospace"
                },
                {
                    "name": "Cursive",
                    "value": "cursive",
                    "font": "cursive"
                },
                {
                    "name": "Fantasy",
                    "value": "fantasy",
                    "font": "fantasy"
                }
            ],
            "editable": true
        }
    }
}

export default story;