import Header from "./components/reusable/Header/header";
import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
                <Switch>
                    <Route path = "/changePassword/:token">
                        <PasswordResetPage></PasswordResetPage>
                    </Route>
                    <Route path = "/about">
                        <AboutPage></AboutPage>
                    </Route>
                    <Route path = "/payment">
                        <PaymentPage></PaymentPage>
                    </Route>
                    <Route path = "/deleteConfirmation">
                        <DeleteConfirmationPage></DeleteConfirmationPage>
                    </Route>
                    <Route path = "/writer/:penName/newSeries">
                        <NewSeriesPage></NewSeriesPage>
                    </Route>
                    <Route path = "/writer/:penName/editSeriesDetails/:seriesId">
                        <NewSeriesPage></NewSeriesPage>
                    </Route>
                    <Route path = "/editEntry">
                        <EditEntryPage></EditEntryPage>
                    </Route>
                    <Route path = "/editSeries">
                        <EditSeriesPage></EditSeriesPage>
                    </Route>
                    <Route path = "/signup">
                        <SignUpPage></SignUpPage>
                    </Route>
                    <Route path = "/login">
                        <LoginPage setWriter = {setUser}></LoginPage>
                    </Route>
                    <Route path = "/writer/:penName">
                        <WriterDashboard></WriterDashboard>
                    </Route>
                    <Route path="/series/:seriesId">
                        <SeriesInfoPage></SeriesInfoPage>
                    </Route>
                    <Route path="/unsubscribe">
                        <UnsubscribePage></UnsubscribePage>
                    </Route>
                    <Route path = "/">
                        <HomePage></HomePage>
                    </Route>
                </Switch>
            </Suspense>
        </div>
      </Router>
  );
}

export default App;
