import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleLeft, faFloppyDisk} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import edjsHTML from "editorjs-html";
import EntryApi from "../../../../api/EntryApi";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";


function EditorSidebar({ejInstance, entry, series}){
    const navigate = useNavigate();
    function htmlLinkParser(block){
        return `<a href = "${block.data.link}"> ${block.data.link} </a>`;
    }
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

    return(
        <aside
            className="hidden md:flex mt-10 fixed top-20 left-0 z-40 w-64 h-screen pt-10 transition-transform -translate-x-full sm:translate-x-0
                                bg-slate-100 rounded-2xl">
            <div className="h-full px-3 overflow-y-auto">
                <ul className="space-y-2 font-medium">
                    <li className="hover:bg-gray-200 rounded-xl p-4 border-b-2">
                        <FontAwesomeIcon icon={faFloppyDisk} />
                        <button
                            className="pl-2 text-xl"
                            type="submit" onClick={() => handleSubmit()}>
                            Save Entry
                        </button>
                    </li>
                    <li className="hover:bg-gray-200 rounded-xl text-xl p-4 border-b-2">
                        <FontAwesomeIcon icon={faCircleLeft} />
                        <button
                            className="pl-2"
                            onClick={() => handleSubmit()}>
                            Return to Entries
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    )
}
export default EditorSidebar;