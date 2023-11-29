function PaginationBar({ page, setPage, searchPageNum, setSearchPageNum, searched }){

    const increment = () => {
        if(searched){
            setSearchPageNum(searchPageNum + 1);
        } else {
            setPage(page + 1);
        }
    }

    const decrement = () => {
        if(searched){
            setSearchPageNum(searchPageNum - 1);
        } else {
            setPage(page - 1);
        }
    }

    return(
        <nav class="flex my-4">
            <div className="inline-flex -space-x-px text-sm">
                {((!searched && page !== 0) || (searched && searchPageNum !== 0)) && <div>
                    <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        onClick = {() => decrement()}>
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"/>
                        </svg>
                    </button>
                </div>}
                <div>
                    <div className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300">
                        {!searched && <>{page + 1}</>}
                        {searched && <>{searchPageNum + 1}</>}
                    </div>
                </div>
                <div>
                    <button className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            onClick={() => increment()} type="submit">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default PaginationBar;