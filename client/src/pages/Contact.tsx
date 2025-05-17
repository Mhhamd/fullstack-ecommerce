import type { FormEvent } from 'react';
import { FaFacebookF, FaInstagram, FaPinterest } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';

function Contact() {
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
    };
    return (
        <div className="w-screen border">
            <div className="flex justify-between items-center md:flex-row flex-col">
                {/* Left section */}
                <div className="flex items-start justify-center p-10 border-r w-full flex-col">
                    <div>
                        <h1 className="uppercase tracking-wide text-4xl">
                            contact us
                        </h1>
                        <p className="mt-3">
                            We’d love to hear from you! Whether you have a
                            question, feedback, or just want to say hello, feel
                            free to reach out using the details below.
                        </p>
                    </div>
                    <div className="mt-10">
                        <p className=" tracking-wide ">Email:</p>
                        <p className="mt-3 text-xl font-semibold uppercase">
                            support@mercadoX.com
                        </p>
                    </div>
                    <div className="mt-10">
                        <p className=" tracking-wide ">Phone:</p>
                        <p className="mt-3 text-xl font-semibold uppercase">
                            +8 (235)-555-65-89
                        </p>
                    </div>
                    <div className="mt-10">
                        <p className=" tracking-wide ">Address:</p>
                        <p className="mt-3 text-xl font-semibold uppercase">
                            1810 Stone Canyon Rd Longmont, Colorado(CO), 80503
                        </p>
                    </div>
                    <div className="mt-10">
                        <p className=" tracking-wide mb-4 ">Follow us:</p>
                        <div className="flex items-start gap-4 text-2xl">
                            <FaFacebookF className="hover:cursor-not-allowed hover:opacity-50 transition-all duration-300" />
                            <FaSquareXTwitter className="hover:cursor-not-allowed hover:opacity-50 transition-all duration-300" />
                            <FaPinterest className="hover:cursor-not-allowed hover:opacity-50 transition-all duration-300" />
                            <FaInstagram className="hover:cursor-not-allowed hover:opacity-50 transition-all duration-300" />
                        </div>
                    </div>
                </div>

                {/* Right section */}
                <form onSubmit={handleSubmit} className="w-full p-10">
                    <h2 className="text-2xl font-bold mb-6 uppercase">
                        If something is in your mind, let's discuss it and help
                        grow together.
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block mb-1 tracking-wide uppercase">
                                Name
                            </label>
                            <input
                                required
                                type="text"
                                className="w-full border border-black p-2 h-12 outline-none focus:border-black/50 transition-all duration-300"
                                placeholder="Your name"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block mb-1 tracking-wide uppercase">
                                {' '}
                                Email Address
                            </label>
                            <input
                                required
                                type="email"
                                className="w-full border border-black p-2 h-12 outline-none focus:border-black/50 transition-all duration-300"
                                placeholder="email@example.com"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block mb-1 tracking-wide uppercase">
                                {' '}
                                Category (optional)
                            </label>
                            <input
                                type="text"
                                className="w-full border border-black p-2 h-12 outline-none focus:border-black/50 transition-all duration-300"
                                placeholder="e.g. Travel, Design..."
                            />
                        </div>

                        {/* Budget */}
                        <div>
                            <label className="block mb-1 tracking-wide uppercase">
                                {' '}
                                Choose a Budget (USD)
                            </label>
                            <select
                                required
                                className="w-full border border-black p-2 h-12 outline-none focus:border-black/50 transition-all duration-300"
                            >
                                <option>Select one...</option>
                                <option>$100 - $500</option>
                                <option>$500 - $1,000</option>
                                <option>$1,000+</option>
                            </select>
                        </div>

                        {/* Message */}
                        <div className="md:col-span-2">
                            <label className="block mb-1 font-semibold">
                                Message
                            </label>
                            <textarea
                                required
                                className="w-full border border-black p-2 h-32 outline-none focus:border-black/50 transition-all duration-300"
                                placeholder="Tell me about your idea..."
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                className="border border-black px-6 py-2 font-semibold cursor-pointer duration-300 hover:bg-black hover:text-white transition"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Contact;
