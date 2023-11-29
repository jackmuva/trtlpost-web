import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import SeriesApi from "../../../api/SeriesApi";
import {useEffect, useState} from "react";
const SeriesFilter = ({ posts, setSearchResults, searchPageNum, setSearchPageNum, setSearched }) => {
    const [keyword, setKeyword] = useState("");

    const filtered = async (searchTerm) => {
        const rsp = SeriesApi.getSeriesByKeyword(searchTerm, searchPageNum);
        const series = await rsp;
        return setSearchResults(series);
    }

    const handleSubmit = () => {;
        if(keyword !== ""){
            setSearchPageNum(0);
            setSearched(true);
            return filtered(keyword);
        }
        if(keyword === ""){
            setSearched(false);
            return setSearchResults(posts)
        }
    }

    const handleSearchChange = (e) => {
        if(e.target.value){
            setKeyword(e.target.value);
        } else {
            setKeyword("");
        }
    }

    useEffect(() => {
        if(keyword !== ""){
            filtered(keyword);
        }
    }, [searchPageNum]);

    return (
        <div className="mb-1">
            <div className="inline-flex relative mb-0 flex w-1/4 flex-wrap items-stretch">
                <input
                    type="search"
                    className="relative m-4 block flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    placeholder="Search"
                    aria-label="Search"
                    id="search"
                    onChange={handleSearchChange}
                />
                <button type="submit" onClick={(e) => handleSubmit(e)}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </div>
    )
}

export default SeriesFilter;