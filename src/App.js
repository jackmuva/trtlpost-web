import Header from "./components/Header/header";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import LoginPage from "./components/LoginPage/LoginPage";
import WriterDashboard from "./components/WriterDashboard";
import EditSeriesPage from "./components/EditSeriesPage";
import EditEntryPage from "./components/EditEntryPage";
import NewSeriesPage from "./components/NewSeriesPage";
import DeleteConfirmationPage from "./components/DeleteConfirmationPage";
import AboutPage from "./components/AboutPage";
import HomePage from "./components/HomePage";

function App() {
    const [user, setUser] = useState([]);

  return (
      <Router>
        <div class="max-w-full bg-zinc-50">
          <Header/>
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
                <Route path = "/writerDashboard">
                    <WriterDashboard></WriterDashboard>
                </Route>
                <Route path = "/">
                    <HomePage></HomePage>
                </Route>
            </Switch>
        </div>
      </Router>
  );
}

export default App;
