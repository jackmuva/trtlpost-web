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
import EditorSidebar from "../../reusable/Sidebar/EditorSidebar";

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

    return (
        <div>
            <EditorSidebar series={series} entry={entry} ejInstance={ejInstance} />
            <div className="mx-4 md:pl-20 flex items-center justify-center">
                <div class="p-6 mb-6 flex-col md:w-1/2 shadow-2xl rounded-2xl">
                    <div id='editorjs'></div>
                </div>
            </div>
        </div>
    );
}
export default EditEntryPage;