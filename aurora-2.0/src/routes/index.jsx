import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "../screens/NotFound";
import Home from "../screens/Home"
import LogIn from "../screens/LogIn";
import { useState } from "react";
import Dashboard from "../screens/Dashboard";
import Layout from "../components/Layout";
import Projects from "../screens/Projects";
import Team from "../screens/Team";
import Stadistics from "../screens/Stadistics";
import AddProject from "../screens/AddProject";
import ProjectDetail from "../screens/ProjectDetail";
import AddUser from "../screens/AddUser";
import UpdateUser from "../screens/UpdateUser.jsx";
import UpdateProject from "../screens/UpdateProject";
import AddTask from "../screens/AddTask";
export default function Routes() {
    const [userActive, setUserActive] = useState(true);
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/login" exact>
                    <LogIn />
                </Route>
                <Layout>
                    <Route path='/dashboard' exact>
                        {userActive ? <Dashboard /> : <NotFound />}
                    </Route>
                    <Route path='/projects' exact>
                        {userActive ? <Projects /> : <NotFound />}
                    </Route>
                    <Route path='/projects/add-project' exact>
                        {userActive ? <AddProject /> : <NotFound />}
                    </Route>
                    <Route path='/projects/add-user' exact>
                        {userActive ? <AddUser /> : <NotFound />}
                    </Route>
                    <Route path='/projects/project-detail/:id' exact>
                        {userActive ? <ProjectDetail /> : <NotFound />}
                    </Route>
                    <Route path='/projects/update-project/:id' exact>
                        {userActive ? <UpdateProject /> : <NotFound />}
                    </Route>
                    <Route path='/projects/update-user/:id' exact>
                        {userActive ? <UpdateUser /> : <NotFound />}
                    </Route>
                    <Route path='/projects/add-task' exact>
                        {userActive ? <AddTask /> : <NotFound />}
                    </Route>
                    <Route path='/team' exact>
                        {userActive ? <Team /> : <NotFound />}
                    </Route>
                    <Route path='/stadistics' exact>
                        {userActive ? <Stadistics /> : <NotFound />}
                    </Route>
                </Layout>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
}