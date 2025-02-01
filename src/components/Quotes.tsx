import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import useSWR from "swr";
import { useLoadingBar } from "react-top-loading-bar";

const Quotes = () => {
    const { start, complete } = useLoadingBar({
        color: "#19ba99",
        height: 10,
        shadow: false,
    });
    const url = "https://api.adviceslip.com/advice";
    console.log(url);

    const fetcher = async (url: string) => {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    };

    const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
        revalidateOnFocus: false,
    });

    useEffect(() => {
        if (isLoading) start();
        else complete();
    }, [isLoading, start, complete]);

    async function newQuote(e: React.FormEvent) {
        e.preventDefault();
        await fetch(url, {
            method: "GET",
        });
        mutate(); // Ververs de data opnieuw via SWR
    }

    const saveQuote = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Quote saved!");
    };

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error loading quote</p>}
            <ToastContainer />
            <div className="card">
                <div className="header">
                    <h1>ADVICE: #{data?.slip?.id}</h1>
                    <p>"{data?.slip?.advice}"</p>
                </div>

                <form className="saveQuote" onSubmit={saveQuote}>
                    <button className="submit" type="submit">
                        <i className="icon-attachment"></i>
                    </button>
                </form>

                <form className="newQuote" onSubmit={newQuote}>
                    <button className="submit" type="submit">
                        <i className="icon-dice"></i>
                    </button>
                </form>
            </div>
        </>
    );
};

export default Quotes;
