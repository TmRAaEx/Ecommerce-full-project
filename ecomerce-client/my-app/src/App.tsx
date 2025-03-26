import "./App.css";
import {RouterProvider} from "react-router";
import {router} from "./Router.tsx";

export default function App() {
    return (
        <div className="App">
            <RouterProvider router={router}></RouterProvider>
        </div>
    );
}
