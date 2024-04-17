import React from "react";


const AboutPage = () => {
    return(
        <>
            <div class="flex flex-col justify-center items-center w-screen space-y-2">
                <div className="flex flex-col m-6 px-6 pt-4 pb-8 space-y-2 md:mx-52 w-1/2">
                    <h2 className="font-sans text-4xl font-bold mb-0 mt-4 text-indigo-700">
                        A Platform to Create and Subscribe to Email Series
                    </h2>
                    <p class="ml-8 mb-4 max-2-sm font-sans text-xl">
                        We look at email series as a set number of emails that writers do not need to consistently add to.
                        Writers can write out their emails and choose how often readers will receive them (i.e. every 2 days,
                        every week, every month, etc).
                    </p>
                    <div class="flex justify-center items-center m-0">
                        <img src="images/email-series.png" className="rounded-r-2xl md:block" alt=""/>
                    </div>
                    <p className="ml-8 mb-4 max-2-sm font-sans text-xl">
                        Readers after subscribing will receive the series in its entirety, from the first entry to
                        the last one.
                        <br/><br/>
                        <b>If you are a reader</b>, no need to make an account. Feel free to subscribe to a series just by putting
                        in your email. If you are looking to write an email series, sign up for an account!
                        <br/><br/>
                    </p>

                    <div className="relative flex py-5 items-center">
                        <div className="flex-grow border-t border-green-100 border-4"></div>
                    </div>

                    <h2 className="font-sans text-4xl font-bold mb-0 mt-6 text-indigo-700">
                        Why TrtlPost?
                    </h2>
                    <div className="flex justify-center items-center m-0">
                        <img src="images/logo.png" className="rounded-r-2xl md:block" alt=""/>
                    </div>
                    <h3 className="font-sans text-3xl font-bold mb-0 mt-4 text-blue-600">
                        You don't have to be a full time newsletter writer
                    </h3>
                    <p className="ml-8 mb-4 max-2-sm font-sans text-xl">
                        We think that email series are a great way for writers to write an "email newsletter" where they
                        can write about things that they are passionate or knowledgeable about, but aren't necessarily
                        full time writers who can consistently write a new entry for their newsletter every week.
                        <br/><br/>
                        Email Series are a way for them to write a newsletter that readers can receive with a clear beginning
                        and end. This is also great for readers because they can receive a series in its entirety even if they
                        subscribed months or years after the series' inception.
                    </p>
                    <h3 className="font-sans text-3xl font-bold mb-0 mt-4 text-blue-600">
                        A slower more intentional reading experience
                    </h3>
                    <p className="ml-8 mb-4 max-2-sm font-sans text-xl">
                        The second idea behind TrtlPost is for a slower medium for receiving content. With Youtube, Netflix, Medium,
                        and other great online platforms, it's easy to read and watch videos, shows, and articles to your heart's
                        content. With TrtlPost, we wanted to offer a change of pace and capture that feeling of anticipation
                        and payoff of something that takes a bit longer like getting that magazine once a month or waiting
                        for that new TV episode every week.
                        <br/><br/>
                        We hope you like our platform and if you have any feedback or comments, feel free to email me at jackmu@umich.edu
                    </p>
                </div>
            </div>
        </>
    );
}

export default AboutPage;