import {NavLink} from 'react-router-dom';
import React, {useState} from "react";
import EntryApi from "../../api/EntryApi";
import {faFeatherPointed, faToilet} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Entry = ({ entry, maxEntry, setEdited}) => {
    const [editable, setEditable] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const toggleEditable = () => {
        setEditable(!editable);
    }

    const handleSubmit = () => {
        let orderNum = document.getElementById("order").value;
        let title = document.getElementById("title").value;

        entry.orderNum = orderNum;
        entry.title = title;

        if(title === '' || orderNum === ''){
            setErrorMessage('Title and Order may not be blank');
        } else {
            EntryApi.updateEntry(entry).then(() => {
                toggleEditable();
                setEdited(true);
            }).catch((err) => {
                console.log(err);
            });
        }
    }

    const createOrderOptions = (maxSize) => {
        let nums = [];
        for (let i=1;i<=maxSize;i++) {
            nums.push(i);
        }
        const orderOptions = nums.map(num => <option value = {num}>{num}</option>);
        return orderOptions;
    }

    if(!editable) {
        return (
            <div className="my-4 grid grid-cols-4 border-b-2 border-stone-200">
                <div className="p-1 m-0 col-span-3">
                    <NavLink class="mb-0 font-sans text-2xl font-bold text-blue-800 hover:text-blue-300"
                             to={{pathname: '/editEntry', state: {entry: {entry}}}}>
                        {entry.title}
                    </NavLink>
                    <h3 class="ml-3 my-0 font-sans text-base"> Order: {entry.orderNum}</h3>
                </div>
                <div class="col-span-1 text-center flex flex-col">
                    <div>
                        <button onClick={() => toggleEditable()} type="submit" class="mt-2 px-4 py-1 rounded-md text-slate-50 bg-blue-600 hover:bg-blue-900">
                            <FontAwesomeIcon icon={faFeatherPointed} />
                            Change title and order
                        </button>
                    </div>
                    <div>
                        <button className="my-2 px-4 py-1 rounded-md text-slate-50 bg-red-700 hover:bg-red-900">
                            <FontAwesomeIcon icon={faToilet} />
                            <NavLink class = "ml-1" to={{pathname: '/deleteConfirmation', state: {type: 'entry', obj: { entry }}}}>
                                Delete Entry
                            </NavLink>
                        </button>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="my-4 grid grid-cols-4 border-b-2 border-stone-200">
                <div className="p-1 m-0 col-span-3">
                    <div>
                        <input id="title" className="text-2xl mb-0 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                               defaultValue={entry.title}/>
                    </div>
                    <div class="inline-flex">
                        <h3 className="ml-3 my-0 font-sans text-base"> Order: </h3>
                        <select id="order" class="mr-2 px-4 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light">
                            { createOrderOptions(maxEntry) }
                        </select>
                    </div>
                    {errorMessage && <div className="error"> {errorMessage} </div>}
                </div>
                <div className="col-span-1 text-center flex flex-col">
                    <button onClick={() => handleSubmit()} type="submit"
                            className="mt-2 px-4 py-1 rounded-md text-slate-50 bg-green-800 hover:bg-green-950">
                        Save Change
                    </button>
                </div>
            </div>
        );
    }
}
export default Entry;