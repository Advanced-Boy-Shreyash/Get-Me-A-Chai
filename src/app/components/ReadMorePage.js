import React from 'react';

const ReadMorePage = () => {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">About Get-Me-A-Chai</h1>
      </header>
      <main>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Welcome to Get-Me-A-Chai</h2>
          <p>
            Get-Me-A-Chai is the premier platform for project builders to collect funds and bring their visions to life. Whether you are an artist, entrepreneur, developer, or social activist, Get-Me-A-Chai provides the tools and support you need to gather financial backing and connect with a community of supporters who believe in your project.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Why Choose Get-Me-A-Chai?</h2>
          <ul className="list-disc list-inside">
            <li><strong>User-Friendly Interface:</strong> Our platform is designed with simplicity and efficiency in mind. Easily create, manage, and share your project page with intuitive controls and clear navigation.</li>
            <li><strong>Support for All Types of Projects:</strong> No matter the size or scope of your project, Get-Me-A-Chai is here to help. From small community initiatives to large-scale innovations, our platform is versatile enough to accommodate a wide range of projects.</li>
            <li><strong>Engaged Community:</strong> Join a vibrant community of creators and supporters. Gain exposure, receive feedback, and foster relationships with like-minded individuals who are passionate about your project.</li>
            <li><strong>Secure Payment Processing:</strong> We prioritize the security of your funds and personal information. Get-Me-A-Chai exclusively supports Razorpay as our payment gateway to ensure seamless and secure transactions.</li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">How It Works</h2>
          <ol className="list-decimal list-inside">
            <li><strong>Create Your Project:</strong> Sign up and create a compelling project page. Share your story, set your funding goals, and upload multimedia content to engage potential supporters.</li>
            <li><strong>Promote Your Project:</strong> Leverage social media and our community features to spread the word about your project. The more visibility you generate, the higher your chances of success.</li>
            <li><strong>Collect Funds:</strong> Receive contributions directly to your Razorpay account. Monitor your progress with real-time analytics and keep your supporters updated on your journey.</li>
            <li><strong>Bring Your Vision to Life:</strong> Once you’ve reached your funding goal, withdraw your funds and start working on your project. Keep your backers informed with regular updates to maintain their support and interest.</li>
          </ol>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Important Information: Razorpay Account Required</h2>
          <p>To receive funds through Get-Me-A-Chai, it is essential that you have a Razorpay account. Razorpay is a leading payment gateway provider known for its reliability and security. Here’s why you need it:</p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Why Razorpay?</h3>
          <ul className="list-disc list-inside">
            <li><strong>Secure Transactions:</strong> Razorpay offers top-notch security features to protect your transactions and personal data.</li>
            <li><strong>Seamless Integration:</strong> Easily link your Razorpay account to Get-Me-A-Chai for smooth and hassle-free payment processing.</li>
            <li><strong>Real-Time Analytics:</strong> Monitor your fundraising efforts with real-time data and analytics provided by Razorpay.</li>
          </ul>
          <h3 className="text-xl font-semibold mt-4 mb-2">How to Set Up a Razorpay Account</h3>
          <ol className="list-decimal list-inside">
            <li><strong>Sign Up on Razorpay:</strong> Visit <a href="https://razorpay.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Razorpay’s website</a> and sign up for an account.</li>
            <li><strong>Verify Your Identity:</strong> Complete the necessary verification steps to ensure the security of your account.</li>
            <li><strong>Retrieve Your API Keys:</strong> After setting up your account, navigate to the API section to get your Razorpay Account ID and Secret Key.</li>
            <li><strong>Link to Get-Me-A-Chai:</strong> Enter your Razorpay Account ID and Secret Key on your Get-Me-A-Chai Dashboard to enable payment processing.</li>
          </ol>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Start Your Journey Today</h2>
          <p>Don&apos;t let funding be a barrier to your dreams. Join Get-Me-A-Chai and connect with a community that wants to see you succeed. Create your project today, share your vision, and start collecting the funds you need to make your project a reality.</p>
          <p>For more information or assistance, feel free to <a href="mailto:support@get-me-a-chai.com" className="text-blue-600 underline">contact our support team</a>. We’re here to help you every step of the way.</p>
        </section>
      </main>
      <footer className="text-center mt-8">
        <p><strong>Get-Me-A-Chai</strong> - Empowering creators, one chai at a time.</p>
      </footer>
    </div>
  );
};

export default ReadMorePage;
