import "./App.css";
import Quotes from "./components/Quotes";
import { LoadingBarContainer } from "react-top-loading-bar";
function App() {
    return (
        <>
            <LoadingBarContainer>
                <Quotes />
            </LoadingBarContainer>
        </>
    );
}

export default App;
