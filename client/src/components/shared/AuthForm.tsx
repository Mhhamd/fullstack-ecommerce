import type React from 'react';
import { Link } from 'react-router-dom';

type Fields = {
    name: string;
    type: string;
    id: string;
    placeholder: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

type AuthFormProps = {
    title: string;
    onSubmit: (e: React.FormEvent) => void;
    fields: Fields[];
    buttonText: string;
    error?: string;
    linkTo: string;
    linkText: string;
    isLoading: boolean;
};

export default function AuthForm({
    title,
    onSubmit,
    fields,
    buttonText,
    error,
    isLoading,
    linkTo,
    linkText,
}: AuthFormProps) {
    return (
        <div className="h-[80vh] bg-gray-100 flex flex-col justify-center items-center px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-2xl ">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {title}
                    </h1>
                </div>

                <form onSubmit={onSubmit} className="space-y-6">
                    {fields.map((field, index) => {
                        return (
                            <div key={index}>
                                <label
                                    htmlFor={field.id}
                                    className="block text-sm capitalize font-medium text-gray-700 mb-1"
                                >
                                    {field.name}
                                </label>
                                <input
                                    type={field.type}
                                    id={field.id}
                                    value={field.value}
                                    onChange={field.onChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all duration-300"
                                    placeholder={field.placeholder}
                                />
                            </div>
                        );
                    })}
                    <div className="flex items-center justify-between w-full">
                        <div className="text-sm text-red-600">
                            {error && <p>{error}</p>}
                        </div>
                        <Link
                            className="text-gray-700 underline hover:opacity-70 transition-all duration-300 text-sm"
                            to={linkTo}
                        >
                            {linkText}
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-black text-white py-2 rounded-md hover:bg-white hover:text-black border transition-all duration-300  ${
                            isLoading
                                ? 'opacity-50 cursor-not-allowed'
                                : 'cursor-pointer'
                        }`}
                    >
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    );
}
