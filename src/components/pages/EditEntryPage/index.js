import {useNavigate, useLocation} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";
import EditorJS from "@editorjs/editorjs";
import EntryApi from "../../../api/EntryApi";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import LinkTool from "@editorjs/link";
import SeriesApi from "../../../api/SeriesApi";
import edjsHTML from "editorjs-html";
import {toast} from "react-toastify";
import EditorJsApi from "../../../api/EditorJsApi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleLeft, faFloppyDisk} from "@fortawesome/free-solid-svg-icons";

function EditEntryPage(){
    const navigate = useNavigate();
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
            autofocus: true,
            data: DEFAULT_INITIAL_DATA,
            tools: {
                header: Header,
                image: {
                    class: ImageTool,
                    config: {
                        endpoints: {
                            byFile: EditorJsApi.getSaveImageUrl(), // Your backend file uploader endpoint
                            byUrl: '', // Your endpoint that provides uploading by Url
                        },
                        additionalRequestHeaders: {
                            'Authorization': 'Bearer ' + sessionStorage.getItem("jwt")
                        },
                        additionalRequestData: {
                            'entryId': location.state.entry.entry.entryId
                        }
                    }
                },
                linkTool: {
                    class: LinkTool,
                    config: {
                        endpoint: EditorJsApi.getLinkUrl(), // Your backend endpoint for url data fetching,
                        headers: {
                            'Authorization': 'Bearer ' + sessionStorage.getItem("jwt")
                        }
                    }
                }
            },
        });
    };

    function htmlLinkParser(block){
        return `<a href = "${block.data.link}"> ${block.data.link} </a>`;
    }

    useEffect(() => {
        setEntry(location.state.entry.entry);
        DEFAULT_INITIAL_DATA = JSON.parse(location.state.entry.entry.entryJson);
        const fetchSeries = async () => {
            const rsp = SeriesApi.getSeriesById(location.state.entry.entry.seriesId);
            const ser = await rsp;
            setSeries(ser);
        }
        fetchSeries();

        if (ejInstance.current === undefined) {
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

        const edjsParser = edjsHTML({linkTool: htmlLinkParser});
        ejInstance.current?.save().then((outputData) => {
            const html = edjsParser.parse(outputData);
            entry.entryHtml = JSON.stringify(html);
            EntryApi.updateEntry(entry).then(() => {
                toast.success("Entry Saved");
                navigate('/editSeries', {state: {series: {series}}});
            });
        }).catch(() => {
            toast.error('Saving failed');
        });
    };

    return (
        <div>
            <aside
                className="mt-10 fixed top-20 left-0 z-40 w-64 h-screen pt-10 transition-transform -translate-x-full sm:translate-x-0 bg-gradient-to-t from-gray-200">
                <div className="h-full px-3 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        <li className="hover:bg-gray-200 rounded-xl p-4">
                            <FontAwesomeIcon icon={faFloppyDisk} />
                            <button
                                className="pl-2 text-xl"
                                type="submit" onClick={() => handleSubmit()}>
                                Save Entry
                            </button>
                        </li>
                        <li className="hover:bg-gray-200 rounded-xl pl-2 text-xl p-4">
                            <FontAwesomeIcon icon={faCircleLeft} />
                            <button onClick={() => handleSubmit()}>
                                Return to Entries
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
            <div className="pl-20 flex items-center justify-center">
                <div class="p-6 mb-6 flex-col w-1/2 shadow-2xl rounded-2xl">
                    <div id='editorjs'></div>
                </div>
            </div>
        </div>
    );
}
export default EditEntryPage;