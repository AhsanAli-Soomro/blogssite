export default function About() {
    return (
        <div className="">
            {/* Hero Section */}
            <div className="relative">
                <div className="absolute bg-blue-500 inset-0">
                    <img
                        className="w-full h-full object-cover opacity-90"
                        src="/bg.jpg" 
                        alt="DailyPulse"
                    />
                    <div className="absolute inset-0  opacity-70"></div>
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-6 sm:py-32 lg:px-8 text-center">
                    <h1 className="text-5xl font-bold text-white tracking-tight sm:text-6xl lg:text-7xl">
                        Welcome to DailyPulse
                    </h1>
                    <p className="mt-6 text-xl text-gray-100 max-w-3xl mx-auto">
                        Your pulse on the latest news, trends, and topics. Explore blogs across every subject, every day.
                    </p>
                </div>
            </div>

            {/* About DailyPulse Section */}
            <div className="py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-extrabold text-blue-500 sm:text-5xl">
                        About DailyPulse
                    </h2>
                    <h1 className="mt-4 max-w-2xl mx-auto">
                        DailyPulse is your ultimate destination for diverse blogs and real-time news on every topic imaginable.
                        From the latest tech trends to lifestyle insights, we cover it all—curated by a team of passionate writers and experts in the field.
                    </h1>
                </div>

                <div className="mt-10 max-w-7xl mx-auto grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-24">
                    <div className="p-6 bg-blue-50 shadow-lg rounded-lg">
                        <h3 className="text-2xl font-bold text-blue-500">Our Mission</h3>
                        <p className="mt-4 text-gray-900 ">
                            Our mission is to keep the world informed, inspired, and connected through high-quality, accessible blog content. We aim to become the go-to platform for everyone’s daily reading—whether you’re seeking knowledge, news, or just a good story.
                        </p>
                    </div>

                    <div className="p-6 bg-blue-50 shadow-lg rounded-lg">
                        <h3 className="text-2xl font-bold text-blue-500">Our Vision</h3>
                        <p className="mt-4 text-gray-900">
                            To be the first stop for anyone seeking diverse, engaging, and up-to-the-minute blog content. We envision a future where DailyPulse is a household name, setting the pulse of conversation and trends worldwide.
                        </p>
                    </div>
                </div>
            </div>

            {/* Core Values Section */}
            <div className="py-16 ">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-extrabold text-blue-500 sm:text-5xl">Our Core Values</h2>
                    <p className="mt-4 text-lg  max-w-2xl mx-auto">
                        At DailyPulse, we are driven by the following core values:
                    </p>

                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Value 1 */}
                        <div className="shadow-lg rounded-lg p-6 text-center">
                            <h3 className="text-xl font-bold text-blue-500">Diversity</h3>
                            <p className=" mt-2">
                                We celebrate diverse voices, perspectives, and stories. Our platform is a space for everyone, from all walks of life.
                            </p>
                        </div>

                        {/* Value 2 */}
                        <div className="shadow-lg rounded-lg p-6 text-center">
                            <h3 className="text-xl font-bold text-blue-500">Accuracy</h3>
                            <p className=" mt-2">
                                We prioritize facts and accurate reporting, ensuring that our readers can trust the content they consume.
                            </p>
                        </div>

                        {/* Value 3 */}
                        <div className="shadow-lg rounded-lg p-6 text-center">
                            <h3 className="text-xl font-bold text-blue-500">Innovation</h3>
                            <p className=" mt-2">
                                We are committed to embracing new technologies and ideas, constantly evolving to meet our readers’ needs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Meet the Team Section */}
            <div className="py-16">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-extrabold text-blue-500 sm:text-5xl">Meet the Team</h2>
                    <p className="mt-4 text-lg  max-w-2xl mx-auto">
                        Our talented team of writers, editors, and strategists is the heart of DailyPulse. Meet the people who bring the pulse to life.
                    </p>

                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Team member 1 */}
                        <div className="bg-blue-50 shadow-lg rounded-lg p-6 text-center">
                            <img
                                className="mx-auto h-32 w-32 rounded-full"
                                src="https://via.placeholder.com/150" // Replace with team member image
                                alt="Team member"
                            />
                            <h3 className="mt-6 text-lg font-bold text-blue-500">Jane Doe</h3>
                            <p className="text-gray-900">Editor-in-Chief</p>
                        </div>

                        {/* Team member 2 */}
                        <div className="bg-blue-50 shadow-lg rounded-lg p-6 text-center">
                            <img
                                className="mx-auto h-32 w-32 rounded-full"
                                src="https://via.placeholder.com/150" // Replace with team member image
                                alt="Team member"
                            />
                            <h3 className="mt-6 text-lg font-bold text-blue-500">John Smith</h3>
                            <p className="text-gray-900">Senior Writer</p>
                        </div>

                        {/* Team member 3 */}
                        <div className="bg-blue-50 shadow-lg rounded-lg p-6 text-center">
                            <img
                                className="mx-auto h-32 w-32 rounded-full"
                                src="https://via.placeholder.com/150" // Replace with team member image
                                alt="Team member"
                            />
                            <h3 className="mt-6 text-lg font-bold text-blue-500">Sarah Lee</h3>
                            <p className="text-gray-900">Content Strategist</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Us Section */}
            <div className="py-16 bg-blue-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-extrabold text-blue-500 sm:text-5xl">Get in Touch</h2>
                    <p className="mt-4 text-lg text-gray-900 max-w-2xl mx-auto">
                        Have a story idea, a question, or just want to say hello? We'd love to hear from you.
                    </p>

                    <div className="mt-10 flex justify-center">
                        <a
                            href="mailto:info@dailypulse.com"
                            className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-500"
                        >
                            Email Us
                        </a>
                    </div>

                    <div className="mt-6 text-gray-500">
                        <p>123 Blog Lane, Content City, TX 75001</p>
                        <p>(123) 456-7890</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
