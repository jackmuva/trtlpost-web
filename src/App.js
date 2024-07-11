import Header from "./components/reusable/Header/header";
import React, { useState, Suspense, lazy } from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const AboutPage = lazy(() => import("./components/pages/AboutPage"));
const SignUpPage = lazy(() => import("./components/pages/SignUpPage"));
const LoginPage = lazy(() => import("./components/pages/LoginPage/LoginPage"));
const WriterDashboard = lazy(() => import("./components/pages/WriterDashboardPage"));
const EditSeriesPage = lazy(() => import("./components/pages/EditSeriesPage"));
const EditEntryPage = lazy(() => import("./components/pages/EditEntryPage"));
const NewSeriesPage = lazy(() => import("./components/pages/NewSeriesPage"));
const DeleteConfirmationPage = lazy(() => import("./components/pages/DeleteConfirmationPage"));
const HomePage = lazy(() => import("./components/pages/HomePage"));
const SeriesInfoPage = lazy(() => import("./components/pages/SeriesInfoPage"));
const UnsubscribePage = lazy(() => import("./components/pages/UnsubscribePage"));
const PasswordResetPage = lazy(() => import("./components/pages/PasswordResetPage"));
const PaymentPage = lazy(() => import("./components/pages/PaymentPage"));
const PaymentConfirmationPage = lazy(() => import("./components/pages/PaymentConfirmationPage"));

function App() {
    const [user, setUser] = useState([]);

    return (
      <Router>
        <div class="max-w-full h-screen bg-zinc-50 overflow-x-hidden">
            <ToastContainer />
            <Header />
            <Suspense fallback={
                <div className="flex items-center md:mx-52">
                    <div className="flex flex-col my-3 space-y-0 mx-6 min-w-full text-center items-center">
                        <p className="my-8 font-sans"> Loading... </p>
                    </div>
                </div>}
            >
                <Routes>
                    <Route path = "/changePassword/:token" element = {<PasswordResetPage/>}/>
                    <Route path = "/about" element = {<AboutPage></AboutPage>} />
                    <Route path = "/paymentConfirmation" element = {<PaymentConfirmationPage />} />
                    <Route path = "/payment/:seriesId" element = {<PaymentPage />} />
                    <Route path = "/deleteConfirmation" element = {<DeleteConfirmationPage />} />
                    <Route path = "/writer/:penName/newSeries" element = {<NewSeriesPage />}/>
                    <Route path = "/writer/:penName/editSeriesDetails/:seriesId" element = {<NewSeriesPage/>}/>
                    <Route path = "/editEntry" element = {<EditEntryPage/>}/>
                    <Route path = "/editSeries" element = {<EditSeriesPage/>}/>
                    <Route path = "/signup" element = {<SignUpPage/>}/>
                    <Route path = "/login" element = {<LoginPage setWriter={setUser}/>}/>
                    <Route path = "/writer/:penName" element = {<WriterDashboard/>}/>
                    <Route path = "/series/:seriesId" element = {<SeriesInfoPage/>}/>
                    <Route path = "/unsubscribe" element = {<UnsubscribePage/>}/>
                    <Route path = "/" element = {<HomePage/>}/>
                </Routes>
            </Suspense>
        </div>
      </Router>
  );
}

export default App;
