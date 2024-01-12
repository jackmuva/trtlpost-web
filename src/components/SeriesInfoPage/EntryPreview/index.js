import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import ImageTool from "@editorjs/image";
import LinkTool from "@editorjs/link";
import {useEffect, useRef} from "react";


function EntryPreview({entry}){
    let DEFAULT_INITIAL_DATA;
    const ejInstance = useRef();
    const initEditor = () => {
        console.log("initiating editor");
        const editor = new EditorJS({
            readOnly:true,
            holder: 'editorjs',
            onReady: () => {
                console.log("I'm ready");
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
                            byFile: 'https://trtlmail-rest.com/api/image/save', // Your backend file uploader endpoint
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
                        endpoint: 'https://trtlmail-rest.com/api/fetchUrl', // Your backend endpoint for url data fetching,
                        headers: {
                            'Authorization': 'Bearer ' + sessionStorage.getItem("jwt")
                        }
                    }
                }
            },
        }

        );
    };

    useEffect(() => {
        DEFAULT_INITIAL_DATA = JSON.parse(entry.entryJson);

        if (ejInstance.current === undefined) {
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