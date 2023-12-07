import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import LinkTool from "@editorjs/link";
import {useEffect, useRef} from "react";


function EntryPreview({entry}){
    console.log(entry.entryJson);
    let DEFAULT_INITIAL_DATA;
    const ejInstance = useRef();
    const initEditor = () => {
        const editor = new EditorJS({
            readOnly:true,
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

    useEffect(() => {
        DEFAULT_INITIAL_DATA = JSON.parse(entry.entryJson);

        if (ejInstance.current === null) {
            initEditor();
        }

        return () => {
            ejInstance?.current?.destroy();
            ejInstance.current = null;
        };
    }, []);

    return(
        <div id='editorjs'></div>
    );
}
export default EntryPreview;