import {trpc} from "@/utils/trpc";
import type React from "react";
import {useState} from "react";
import Head from "next/head";
import {usePlausible} from "next-plausible";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const btn =
    "inline-flex items-center px-3 py-1.5 mx-1 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

export default function Home() {
    const subscribeMutation = trpc.useMutation(["food.subscribe"]);
    const unsubscribeMutation = trpc.useMutation(["food.unsubscribe"]);
    const plausible = usePlausible();
    const [email, setEmail] = useState('')

    const okAction = () => toast("OK");

    const handleSubscribe = async (event: any) => {
        event.preventDefault()

        subscribeMutation.mutate({
            email
        })

        plausible('subscribe')
        okAction()
        // // Get data from the form.
        // const data = {
        //     first: event.target.first.value,
        //     last: event.target.last.value,
        // }
        //
        // // Send the data to the server in JSON format.
        // const JSONdata = JSON.stringify(data)
        //
        // // API endpoint where we send form data.
        // const endpoint = '/api/form'
        //
        // // Form the request for sending data to the server.
        // const options = {
        //     // The method is POST because we are sending data.
        //     method: 'POST',
        //     // Tell the server we're sending JSON.
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     // Body of the request is the JSON data we created above.
        //     body: JSONdata,
        // }
        //
        // // Send the form data to our forms API on Vercel and get a response.
        // const response = await fetch(endpoint, options)
        //
        // // Get the response data from server as JSON.
        // // If server returns the name submitted, that means the form works.
        // const result = await response.json()
        // alert(`Is this your full name: ${result.data}`)
    }

    const handleUnsubscribe = async (event: any) => {
        event.preventDefault()

        unsubscribeMutation.mutate({
            email
        })

        plausible('unsubscribe')
        okAction()
    }

    return (
        <div
            className="h-full w-full md:h-screen md:w-screen overflow-hidden flex flex-col justify-between items-center relative font-poppins bg-black">
            <Head>
                <title>Zachraň jídlo - Mailing List</title>
            </Head>
            <ToastContainer/>
            <div className="md:pt-10 w-full md:w-2/5 relative">
                <img
                    src='/meat.jpg'
                    className="animate-fade-in"
                />
            </div>
            <div className="p-8 flex justify-between items-center max-w-2xl flex-col animate-fade-in">
                <div className="w-full text-3xl text-center pb-6">
                    Nastavenie odberu noviniek
                </div>
                <form>
                    <div className='flex flex-col items-center justify-center'>
                        <input className='w-full text-black' type="email" id="email" name="email" required value={email}
                               onChange={(e) => setEmail(e.target.value)}/>
                        <div className='p-8'>
                            <button className={btn} type="submit" onClick={handleSubscribe}>Prihlásiť odber</button>
                            <button className={btn + ' bg-red-500 border-red-500 hover:bg-red-600 text-slate-200'}
                                    type="submit" onClick={handleUnsubscribe}>Zrušiť
                                odber
                            </button>
                        </div>

                    </div>
                </form>

                <div className="p-2"/>
            </div>
            <div className="w-full text-xl text-center pb-5">
                <span className="p-4"><a href='https://github.com/Marpheus/food-saving'>Github</a></span>
            </div>
        </div>
    );
}