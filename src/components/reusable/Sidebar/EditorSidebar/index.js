import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleLeft, faFloppyDisk} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import edjsHTML from "editorjs-html";
import EntryApi from "../../../../api/EntryApi";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


function EditorSidebar({ejInstance, entry, series, view}){
    const navigate = useNavigate();
    function htmlLinkParser(block){
        return `<a href = "${block.data.link}"> ${block.data.link} </a>`;
    }
    const handleSubmit = async(callbackFunction) => {
        let content = await ejInstance.current.saver.save();
        entry.entryJson = JSON.stringify(content);

        const edjsParser = edjsHTML({linkTool: htmlLinkParser});
        ejInstance.current?.save().then((outputData) => {
            const html = edjsParser.parse(outputData);
            entry.entryHtml = JSON.stringify(html);
            EntryApi.updateEntry(entry).then(() => {
                toast.success("Entry Saved");
                callbackFunction();
            });
        }).catch(() => {
            toast.error('Saving failed');
        });
    };

    const redirectToSeries = async() => {
        const redirect = () => {
            navigate('/editSeries', {state: {series: {series}}});
        }
        await handleSubmit(redirect);
    }

    return(
        <div className={`${view?'' : 'hidden md:flex'}`}>
            <aside className="md:ml-4 ml-2 px-2 pt-10 h-screen w-1/2 md:w-64 z-40 fixed bg-slate-100 rounded-2xl">
                <div className="h-full px-3 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        <li className="hover:bg-gray-200 rounded-xl p-4 border-b-2">
                            <FontAwesomeIcon icon={faFloppyDisk} />
                            <button
                                className="pl-2 text-xl"
                                type="submit" onClick={() => handleSubmit(() => {})}>
                                Save Entry
                            </button>
                        </li>
                        <li className="hover:bg-gray-200 rounded-xl text-xl p-4 border-b-2">
                            <FontAwesomeIcon icon={faCircleLeft} />
                            <button
                                className="pl-2"
                                onClick={() => redirectToSeries()}>
                                Return to Entries
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    )
}
export default EditorSidebar;