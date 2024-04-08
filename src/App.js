import Header from "./components/Header/header";
import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

const AboutPage = lazy(() => import("./components/AboutPage"));
const SignUpPage = lazy(() => import("./components/SignUpPage"));
const LoginPage = lazy(() => import("./components/LoginPage/LoginPage"));
const WriterDashboard = lazy(() => import("./components/WriterDashboard"));
const EditSeriesPage = lazy(() => import("./components/EditSeriesPage"));
const EditEntryPage = lazy(() => import("./components/EditEntryPage"));
const NewSeriesPage = lazy(() => import("./components/NewSeriesPage"));
const DeleteConfirmationPage = lazy(() => import("./components/DeleteConfirmationPage"));
const HomePage = lazy(() => import("./components/HomePage"));
const SeriesInfoPage = lazy(() => import("./components/SeriesInfoPage"));
const UnsubscribePage = lazy(() => import("./components/UnsubscribePage"));

function App() {
    const [user, setUser] = useState([]);

    return (
      <Router>
        <div class="max-w-full bg-zinc-50">
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
                    <Route path = "/about">
                        <AboutPage></AboutPage>
                    </Route>
                    <Route path = "/deleteConfirmation">
                        <DeleteConfirmationPage></DeleteConfirmationPage>
                    </Route>
                    <Route path = "/newSeries">
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
