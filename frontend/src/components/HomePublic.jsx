import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, useUser, SignInButton, SignUpButton } from '@clerk/clerk-react';

const HomePublic = () => {
    const navigate = useNavigate();
    const { isSignedIn } = useUser();

    // Redirect signed-in users to dashboard
    useEffect(() => {
        if (isSignedIn) {
            navigate('/home');
        }
    }, [isSignedIn, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
                <h1 className="text-3xl font-bold mb-6 text-gray-900">
                    Welcome to <span className="text-indigo-600">Study Helper</span>
                </h1>
                <p className="text-gray-600 mb-8">
                    Upload your PDF or TXT files and generate summaries, questions, or full study guides.
                </p>

                <SignedOut>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <SignInButton afterSignInUrl="/home">
                            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                                Sign In
                            </button>
                        </SignInButton>

                        <SignUpButton afterSignUpUrl="/home">
                            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                                Sign Up
                            </button>
                        </SignUpButton>
                    </div>
                </SignedOut>

                <SignedIn>
                    <p className="text-gray-500 mt-4 animate-pulse">
                        Redirecting to your dashboard...
                    </p>
                </SignedIn>
            </div>
        </div>
    );
};

export default HomePublic;
