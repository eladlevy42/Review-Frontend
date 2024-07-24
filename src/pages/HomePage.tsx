import { Input } from "@/components/ui/input";
import {
  AlarmClock,
  BarChart3,
  CirclePlay,
  Droplet,
  Laptop,
  Layers,
  Rocket,
  Send,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Homepage = () => {
  return (
    <div className="relative h-[730px]">
      <img
        src="src/images/0a9313aafc4735dfd99dda1369bf6171.jpg"
        alt="Background Image"
        className="w-full h-screen object-cover blur-sm"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
        <p className="text-white text-xl mt-4">
          Welcome to the best review site
        </p>
        <h1 className="text-white text-9xl font-bold">BizGenius Reviews</h1>
        <p className="text-white text-xl mt-4">
          Streamline feedback and boost your reputation with our business review
          app
        </p>
        <br />
        <CirclePlay className="size-24 text-white hover:text-red-teal cursor-pointer transition duration-200 ease-in-out" />
      </div>
      <div className="flex justify-center gap-10 items-center relative bottom-28">
        {[
          {
            src: "src/images/137f4e75bf88429461f6f97b8aa9392f.jpg",
            title: "Enhanced Feedback",
            text: "Streamline review collection and insights.",
            opacity: "opacity-60",
          },
          {
            src: "src/images/58883ef2b7e6d63cf6b15ce54368d800.jpg",
            title: "Increased Visibility",
            text: "Showcase positive reviews to attract customers.",
            opacity: "opacity-70",
          },
          {
            src: "src/images/c0a0cbd04b31bab637517b8a5f94e8d7.jpg",
            title: "Improved Reputation",
            text: "Address feedback to manage reputation.",
            opacity: "opacity-80",
          },
        ].map((item, index) => (
          <div key={index} className="relative">
            <img
              src={item.src}
              alt={`Image ${index + 1}`}
              className="w-[300px] h-[200px] object-cover"
            />
            <div
              className={`absolute inset-0 bg-teal-800 ${item.opacity} z-10`}
            ></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center p-4 z-20 text-center">
              <h3 className="text-white font-bold">{item.title}</h3>
              <p className="text-white mt-2">{item.text}</p>
              <button className="mt-4 px-4 py-2 bg-white text-black rounded hover:bg-gray-100 text-xs">
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center p-4 md:p-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-teal-600">
          SOMETHING NEW
        </h1>
        <hr className="w-32 md:w-40 border-t border-black mb-4 md:mb-6" />
        <p className="max-w-[500px] text-center text-gray-600">
          Stay ahead of the curve with our freshest reviews and insights. Our
          team is constantly updating our database with the latest products,
          services, and experiences. Dive into the most recent trends and see
          what’s hot right now.
        </p>
      </div>
      <div className="flex justify-center items-center">
        <img
          className="w-[900px]"
          src="src/images/removethe_bg-removebg-preview.png"
          alt=""
        />
      </div>
      <div className="flex justify-center items-center">
        <p className="text-xs max-w-[400px] text-center">
          This review app is a game-changer for anyone looking to provide and
          read insightful feedback with ease. Its user-friendly interface and
          intuitive design make it incredibly simple to navigate, whether you're
          submitting a review or browsing through others. The app's advanced
          filtering options allow you to sort reviews by various criteria,
          helping you quickly find the most relevant insights.
        </p>
      </div>

      <br />

      <div className="grid grid-rows-2 grid-cols-3">
        <div className="bg-teal-800 flex flex-col items-center justify-center p-4 text-white h-[200px]">
          <Rocket />
          <h1 className="text-lg font-bold">Increased Visibility</h1>
          <p className="text-sm text-gray-200">
            Boosts brand presence and awareness.
          </p>
        </div>
        <div className="bg-teal-600 flex flex-col items-center justify-center p-4 text-white h-[200px]">
          <Laptop />
          <h1 className="text-lg font-bold">Customer Insights</h1>
          <p className="text-sm text-gray-200">
            Understand customer preferences and issues.
          </p>
        </div>
        <div className="bg-teal-800 flex flex-col items-center justify-center p-4 text-white h-[200px]">
          <Layers />
          <h1 className="text-lg font-bold">Enhanced Credibility</h1>
          <p className="text-sm text-gray-200">
            Builds trust through positive feedback.
          </p>
        </div>
        <div className="bg-teal-600 flex flex-col items-center justify-center p-4 text-white h-[200px]">
          <Droplet />
          <h1 className="text-lg font-bold">Improved SEO</h1>
          <p className="text-sm text-gray-200">
            Positive reviews can improve search rankings.
          </p>
        </div>
        <div className="bg-teal-800 flex flex-col items-center justify-center p-4 text-white h-[200px]">
          <AlarmClock />
          <h1 className="text-lg font-bold">Higher Engagement</h1>
          <p className="text-sm text-gray-200">
            Encourages customer interaction and loyalty.
          </p>
        </div>
        <div className="bg-teal-600 flex flex-col items-center justify-center p-4 text-white h-[200px]">
          <BarChart3 />
          <h1 className="text-lg font-bold">Performance Tracking</h1>
          <p className="text-sm text-gray-200">
            Monitor and respond to business performance.
          </p>
        </div>
      </div>
      <div className="bg-[#333333] w-full p-12 pl-60 flex gap-10">
        <div>
          <p className="text-white text-bold text-4xl font-bold pb-5">
            Subscribe on <span className="text-teal-500">Our News</span>
          </p>
          <p className="text-gray-300 text-xs">
            Subscribe to our newsletter for the latest reviews and updates.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Input
            className=" bg-transparent border-white text-white w-[35rem] mr-3"
            placeholder="Your Email"
            type="email"
          />
          <Send className="text-white cursor-pointer" />
        </div>
      </div>
      <div className="flex items-center justify-center gap-20">
        <img
          src="src/images/Screenshot 2024-07-22 145736.png"
          alt=""
          className="w-[500px]"
        />
        <div>
          <h1 className="text-5xl font-bold max-w-96 text-teal-700 mb-6">
            CLEAR YOUR MIND & DO RIGHT CHOICE
          </h1>
          <hr className="w-32 md:w-40 border-t border-black mb-4 md:mb-6" />
          <p className="text-gray-400 text-xs max-w-96">
            Clear Your Mind & Make the Right Choice" encourages mental clarity
            to make informed, positive decisions by eliminating distractions and
            focusing on what matters.
          </p>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                How can I leave a review for a product?
              </AccordionTrigger>
              <AccordionContent className="max-w-96">
                To leave a review, navigate to the product page, scroll down to
                the reviews section, and click on the "Write a Review" button.
                Fill out the form with your rating, title, and detailed review,
                then click "Submit."
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Can I edit or delete my review after posting it?
              </AccordionTrigger>
              <AccordionContent className="max-w-96">
                Yes, you can edit or delete your review. Go to your profile,
                find the review you want to modify, and click on the "Edit" or
                "Delete" button. Make your changes or confirm the deletion.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                How can I filter reviews to find the most helpful ones?
              </AccordionTrigger>
              <AccordionContent className="max-w-96">
                On the product page, you can use the filter options to sort
                reviews by rating, date, or helpfulness. You can also use the
                search bar within the reviews section to find specific keywords
                or topics.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                How are reviews moderated for inappropriate content?
              </AccordionTrigger>
              <AccordionContent className="max-w-96">
                Reviews are automatically scanned for inappropriate content
                using AI moderation tools. Additionally, our moderation team
                manually reviews flagged content to ensure compliance with our
                guidelines. Inappropriate reviews are removed promptly.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div className="flex justify-center items-center h-20 bg-[#333333]">
        <p className="text-[#dbdbdb] text-xs">
          &copy; All rights reserved. Made by Yuval Maderer, Elad Levy, Omer
          Sidi
        </p>
      </div>
      <div className="flex gap-[0.1rem] bg-[#333333]">
        <div className="bg-[#242424] text-[#dbdbdb] w-full flex justify-center items-center h-20 text-xs">
          <a href="#">FACEBOOK</a>
        </div>
        <div className="bg-[#242424] text-[#dbdbdb] w-full flex justify-center items-center h-20 text-xs">
          <a href="#">TWITTER</a>
        </div>
        <div className="bg-[#242424] text-[#dbdbdb] w-full flex justify-center items-center h-20 text-xs">
          <a href="#">GITHUB</a>
        </div>
        <div className="bg-[#242424] text-[#dbdbdb] w-full flex justify-center items-center h-20 text-xs">
          <a href="#">LINKEDIN</a>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
