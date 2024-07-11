import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import SeriesApi from "../../../api/SeriesApi";
import EntryApi from "../../../api/EntryApi";

const DeleteConfirmationPage = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const location = useLocation();
    const type = location.state.type;
    const obj = location.state.obj;
    const navigate = useNavigate();

    const decrementSeries = async() => {
        getSeriesById(obj.entry.seriesId).then((data) => {
            let series = data;
            series.numEntries = series.numEntries - 1;
            const updateSeries = async (ser) => {
                await SeriesApi.putSeries(ser);
            }
            updateSeries(series);
        });
    };

    const getSeriesById = async (id) => {
       const rsp = SeriesApi.getSeriesById(id);
       const series = await rsp;
       return series;
    }

    const handleSubmit = () => {
        if(type === "series"){
            SeriesApi.deleteSeries(obj.series.seriesId).then(() => {
                setErrorMessage("Deleted Successfully");
            });
        } else if (type === "entry"){
            EntryApi.deleteEntry(obj.entry.entryId).then(() => {
                decrementSeries().then(() => {
                    setErrorMessage("Deleted Successfully");
                });
            });
        } else if (type === "writer"){

        }
    };

    const redirectToSeries = () => {
        navigate("/editSeries", {state: {series:{ series: {seriesId: obj.entry.seriesId, email: obj.entry.email}}}});
    }

    if(errorMessage === "Deleted Successfully" && type === "series"){
        let redUrl = '/writer/' + obj?.series.penName;
        return <Navigate to = {redUrl} />
    } else if (errorMessage === "Deleted Successfully" && type === "entry"){
        redirectToSeries();
    } else if(errorMessage === "Deleted Successfully" && type === "writer"){
        return <Navigate to='/'/>
    }
    return(
        <div className="flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl
                md:flex-row md:space-y-0 md:mx-52 md:w-1/2">
            <div className="p-6 md:p-20">
                <p className="mb-2 max-2-sm font-sans text-gray-000">
                    Are you sure you would like to delete your {type}?
                </p>
                <div>
                    <button className="w-full md:w-auto h-1 flex justify-center items-center p-6 space-x-4 font-sans font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150"
                        onClick={() => handleSubmit()} type="submit">
                        Delete
                    </button>
                </div>
            </div>
            <div>
                <img src="images/malu.png" className="h-full hidden md:block rounded-r-2xl" alt="woman saying goodbye as you delete your email series"/>
            </div>
        </div>
    );
}

export default DeleteConfirmationPage;