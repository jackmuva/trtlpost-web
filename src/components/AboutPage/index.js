

const AboutPage = () => {
    return(
        <div class="flex justify-center items-center w-screen">
            <div className="flex flex-col m-6 px-6 pt-4 pb-8 space-y-2 bg-white shadow-2xl rounded-2xl md:mx-52 w-1/2">
                <h2 className="font-sans test-4xl font-bold mb-0 mt-4">
                    Welcome to Trtlmail
                </h2>
                <p class="ml-8 mb-4 max-2-sm font-sans">
                    Trtlmail is a platform for readers and writers to read and subscribe to email series.
                    We look at email series as a set number of emails that writers do not need to consistently add to.
                    Writers can write out their emails and choose how often readers will receive them (i.e. every 2 days,
                    every week, every month, etc).
                    <br/><br/>
                    Readers after subscribing will receive the series in its entirety, from the first entry to
                    the last one.
                    <br/><br/>
                    If you are a reader, no need to make an account. Feel free to subscribe to a series just by putting
                    in your email. If you are looking to write an email series, sign up for an account!
                </p>

                <h2 className="font-sans text-2xl font-bold mb-0">
                    Main Idea behind Trtlmail
                </h2>
                <p className="ml-8 mb-8 max-2-sm font-sans">
                    There are two main ideas behind the idea for this platform. First, we thought that email series
                    are a great way for writers to write an "email newsletter" where they can write about things that they
                    are passionate or knowledgeable about, but aren't necessarily full time writers who can consistently
                    write a new entry for their newsletter every week.
                    <br/><br/>
                    Email Series are a way for them to write a newsletter that readers can receive with a clear beginning
                    and end. This is also great for readers because they can receive a series in its entirety even if they
                    subscribed months or years before the series' inception.
                    <br/><br/>
                    The second idea behind Trtlmail is for a slower medium for receiving content. With Youtube, Netflix, Medium,
                    and other great online platforms, it's easy to read and watch videos, shows, and articles to your heart's
                    content. They're really great platforms that we're glad exist. With Trtlmail, we wanted to offer a change
                    of pace and capture that feeling of anticipation and payoff of something that takes a bit longer like
                    getting that magazine once a month or waiting for that new TV episode every week.
                    <br/><br/>
                    We hope you like our platform and if you have any feedback or comments, feel free to email me at jackmu@umich.edu
                </p>
            </div>
        </div>
    );
}

export default AboutPage;