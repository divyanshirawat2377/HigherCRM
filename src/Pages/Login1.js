import React, { useState } from "react";
import login from "../assests/login.jpg";

const LoginForm = () => {
    const [email, setEmail] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="h-screen flex bg-white">
            <div className="w-1/2 flex justify-center items-center">
                <img src={login} alt="Login Illustration" className="object-cover h-[100%]" />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col  items-center ml-[15%] mt-[12%] font-medium text-black rounded-none max-w-[350px]">
                <header className="text-center">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d9cb39f648d5a41315200385261ec9c618f5641ff5dcea3d517780a70a1023d?placeholderIfAbsent=true&apiKey=f4328c4a551b4b9fa165bba17dc932db"
                        alt="Login logo"
                        className="object-contain self-center aspect-square ml-[37%] w-[45px]"
                    />
                    <h1 className="mt-5 text-2xl font-semibold text-black">
                        Login with your account
                    </h1>
                    <p className="mt-1 text-base text-zinc-600">
                        Provide your registered email
                    </p>
                </header>
                <main className="mt-10">
                    <div>
                        <label htmlFor="emailInput" className="text-sm text-black">
                            Email
                        </label>
                        <div className="flex gap-5 px-3 py-3.5 mt-2 text-xs whitespace-nowrap rounded-xl border border-black border-solid bg-zinc-50 text-neutral-400">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/29fd2e30017df1de28c44da98f9ed87ee2383917ddf05dd846203fcd9ee14538?placeholderIfAbsent=true&apiKey=f4328c4a551b4b9fa165bba17dc932db"
                                alt="Email icon"
                                className="object-contain shrink-0 w-5 aspect-square"
                            />
                            <input
                                type="email"
                                id="emailInput"
                                value={email}
                                onChange={handleEmailChange}
                                placeholder="example@gmail.com"
                                className="flex-auto my-auto w-[266px] bg-transparent"
                                required
                                aria-required="true"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="px-16 py-3.5 mt-10 w-full text-sm text-white whitespace-nowrap bg-blue-700 rounded-xl hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
                    >
                        Continue
                    </button>
                </main>
            </form>
        </div>
    );
};
export default LoginForm;

