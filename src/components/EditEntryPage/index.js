import {NavLink, useLocation} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import EditorJS from "@editorjs/editorjs";
import EntryApi from "../../api/EntryApi";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import LinkTool from "@editorjs/link";
import SeriesApi from "../../api/SeriesApi";
import edjsHTML from "editorjs-html";

function EditEntryPage(){
    const location = useLocation();
    let DEFAULT_INITIAL_DATA;
    const ejInstance = useRef();
    const [series, setSeries] = useState(null);
    const [entry, setEntry] = useState(null);

    const initEditor = () => {
        const editor = new EditorJS({
            holder: 'editorjs',
            onReady: () => {
                ejInstance.current = editor;
            },
            // autofocus: true,
            data: DEFAULT_INITIAL_DATA,
            tools: {
                header: Header,
                image: {
                    class: ImageTool,
                    config: {
                        endpoints: {
                            byFile: 'http://localhost:5000/api/image/save', // Your backend file uploader endpoint
                            byUrl: '', // Your endpoint that provides uploading by Url
                        },
                        additionalRequestHeaders: {
                            'Authorization': 'Bearer ' + sessionStorage.getItem("jwt")
                        }
                    }
                },
                linkTool: {
                    class: LinkTool,
                    config: {
                        endpoint: 'http://localhost:5000/api/fetchUrl', // Your backend endpoint for url data fetching,
                        headers: {
                            'Authorization': 'Bearer ' + sessionStorage.getItem("jwt")
                        }
                    }
                }
            },
        });
    };

    function htmlLinkParser(block){
        console.log(block);
        return `<a href = "${block.data.link}"> ${block.data.link} </a>`;
    }

    useEffect(() => {
        setEntry(location.state.entry.entry);
        DEFAULT_INITIAL_DATA = JSON.parse(location.state.entry.entry.entryJson);
        const fetchSeries = async () => {
            const rsp = SeriesApi.getSeriesById(location.state.entry.entry.seriesId);
            const ser = await rsp;
            setSeries(ser[0]);
        }
        fetchSeries();

        if (ejInstance.current === null) {
            initEditor();
        }

        return () => {
            ejInstance?.current?.destroy();
            ejInstance.current = null;
        };
    }, []);

    const handleSubmit = async () => {
        let content = await ejInstance.current.saver.save();
        entry.entryJson = JSON.stringify(content);
        EntryApi.updateEntry(entry).then(function (data){});

        const edjsParser = edjsHTML({linkTool: htmlLinkParser});
        ejInstance.current.save().then((outputData) => {
            const html = edjsParser.parse(outputData);
            entry.entryHtml = JSON.stringify(html);
            EntryApi.updateEntry(entry).then(function () {});
        }).catch((error) => {
            console.log('Saving failed: ', error)
        });
    };

    return (
        <div>
            <div className="flex sticky top-2 flex-col">
                <NavLink class="m-2 px-2 py-1 rounded-md text-center text-slate-50 bg-orange-700 hover:bg-orange-800 max-w-fit"
                         to={{pathname: '/editSeries', state: {series: {series}}}}>
                    Return to Entries
                </NavLink>
                <button class="m-2 px-2 py-1 rounded-md text-center text-slate-50 bg-green-800 hover:bg-green-950 max-w-fit"
                        type="submit" onClick={() => handleSubmit()}>
                    Save Entry
                </button>
            </div>
            <div className="flex items-center justify-center">
                <div class="p-6 flex-col w-1/2 shadow-2xl rounded-2xl">
                    <div id='editorjs'></div>
                </div>
            </div>
        </div>
    );
}
export default EditEntryPage;