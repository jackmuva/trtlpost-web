import {Redirect, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import SeriesApi from "../../api/SeriesApi";
import {toast} from "react-toastify";


function NewSeriesPage() {
    const location = useLocation();
    const [series, setSeries] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        const fetchSeries = async() => {
            const rsp = SeriesApi.getSeriesById(location.state.series.series.seriesId);
            const ser = await rsp;
            setSeries(ser[0]);
        }
        if(location.state.type === 'edit'){
            fetchSeries();
        }
    }, []);
    
    function getDateTime() {
        let now     = new Date();
        let year    = now.getFullYear();
        let month   = now.getMonth()+1;
        let day     = now.getDate();
        let hour    = now.getHours();
        let minute  = now.getMinutes();
        let second  = now.getSeconds();
        if(month.toString().length === 1) {
            month = '0'+month;
        }
        if(day.toString().length === 1) {
            day = '0'+day;
        }
        if(hour.toString().length === 1) {
            hour = '0'+hour;
        }
        if(minute.toString().length === 1) {
            minute = '0'+minute;
        }
        if(second.toString().length === 1) {
            second = '0'+second;
        }
        let dateTime = year+'-'+month+'-'+day+'T'+hour+':'+minute+':'+second;
        return dateTime;
    }

    const handleSubmitForCreate = () => {
       let ser = {
            datetime: getDateTime(),
            numEntries: 0,
            title: null,
            summary: null,
            tags: null,
            cadence: null,
            penName: location.state.writer.writer[0].penName,
            email: location.state.writer.writer[0].email,
            published: false,
            numAllTimeReaders: 0,
            numCurrentReaders: 0
        }

        ser.title = document.getElementById("title").value;
        ser.summary = document.getElementById("summary").value;
        ser.tags = document.getElementById("tags").value;
        ser.cadence = document.getElementById("cadence").value;
        if (ser.title === '' || ser.summary === '' || ser.cadence === '') {
            setErrorMessage('Title, Summary, and Cadence may not be blank');
        } else {
            SeriesApi.postSeries(ser).then(() => {
                setErrorMessage('Created Successfully');
            });
        }
    }

    const handleSubmitForEdit = () => {
        console.log(series);
        let ser = {
            seriesId: series.seriesId,
            datetime: getDateTime(),
            numEntries: series.numEntries,
            title: series.title,
            summary: series.summary,
            tags: series.tags,
            cadence: series.cadence,
            penName: series.penName,
            email: series.email,
            published: series.published,
            numAllTimeReaders: series.numAllTimeReaders,
            numCurrentReaders: series.numCurrentReaders
        }

        ser.title = document.getElementById("title").value;
        ser.summary = document.getElementById("summary").value;
        ser.tags = document.getElementById("tags").value;
        ser.cadence = document.getElementById("cadence").value;
        if (ser.title === '' || ser.summary === '' || ser.cadence === '') {
            setErrorMessage('Title, Summary, and Cadence may not be blank');
        } else {
            SeriesApi.putSeries(ser).then(() => {
                toast.success("Series successfully edited");
                setErrorMessage('Edited Successfully');
            });
        }
    }

    if (errorMessage === 'Created Successfully') {
        let redUrl = '/writer/' + location.state.writer.writer[0].penName;
        return <Redirect to = {redUrl} />
    } else if (errorMessage === 'Edited Successfully') {
        let redUrl = '/writer/' + series.penName;
        return <Redirect to = {redUrl} />
    } else {
        return (
            <div className="flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl
                md:flex-row md:space-y-0 md:mx-52 w-fit">
                <div className="p-6 md:p-20">
                    <h2 className="font-sans text-4xl font-bold mb-2">Create a new email series</h2>
                    <p className="mb-2 max-2-sm font-sans font-light text-gray-600">
                        After creating, you will be able to add entries, edit this information, and publish from the writer home page
                    </p>
                    <input type="text" id="title" class="h-1 w-full p-6 mb-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                           placeholder="Title" defaultValue = {series?.title}/>
                    <textarea rows="4" id="summary" class="block w-full p-6 mb-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                           placeholder="Summary" defaultValue = {series?.summary}/>
                    <input type="text" id="tags" class="h-1 w-full p-6 mb-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                           placeholder="Any keyword you'd want your series to be searchable for (separate words with a comma)"
                            value = {series?.tags}/>
                    <div>
                        <p className="mb-2 max-2-sm font-sans font-light text-gray-600">
                            Specify number of days that subscribers will wait between emails
                        </p>
                        <input type="number" id="cadence"
                               className="h-1 p-6 mb-2 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
                               min="1" max="30"
                                defaultValue = {series?.cadence}/>
                    </div>
                    {errorMessage && <div class="text-red-700 my-2"> {errorMessage} </div>}
                    <div>
                        {series === null &&
                            <button class="w-full md:w-auto h-1 flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
                                onClick={() => handleSubmitForCreate()} type="submit">
                                Create
                            </button>
                        }
                        {series !== null &&
                            <button class="w-full md:w-auto h-1 flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
                                    onClick={() => handleSubmitForEdit()} type="submit">
                                Edit
                            </button>
                        }
                    </div>
                </div>
            </div>
        );
    }
};
export default NewSeriesPage;