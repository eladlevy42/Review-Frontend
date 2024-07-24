import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import api from "@/services/api.service";
import { Clock, Coffee, Mail, Phone } from "lucide-react";
import { useState } from "react";

function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, message } = formData;
    try {
      const response = await api.post("/contact/send", {
        name,
        email,
        message,
      });

      if (response.status === 200) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
        setLoading(false);
      } else {
        setStatus("failed");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setStatus("An error occurred.");
    }
  };

  return (
    <div className="relative h-screen">
      <img
        src="src/images/cc4f51f85f7374fbadac3f90f89a0d06.jpg"
        alt="Background"
        className="w-full h-full object-cover absolute top-0 left-0 blur-sm"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
        <div className="flex justify-center items-center h-full relative z-10">
          <div className="w-[800px] h-[450px] flex">
            <div className="relative w-[65%] h-full">
              <div className="absolute inset-0 gradient-teal">
                <form
                  onSubmit={handleSubmit}
                  className="w-full h-full p-12 space-y-5"
                >
                  <h3 className="font-bold text-white">Contact Us</h3>
                  <h1 className="font-bold text-white text-3xl ">
                    Get In Touch
                  </h1>

                  <Input
                    type="text"
                    name="name"
                    className=""
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="email"
                    name="email"
                    className=""
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Textarea
                    name="message"
                    className=""
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  <Button type="submit" variant="outline">
                    Submit Now
                  </Button>
                </form>
              </div>
            </div>
            <div className="relative w-[35%] h-full">
              <div className="absolute inset-0 gradient-white">
                <div className="w-full h-full p-12 space-y-5">
                  <h1 className="font-bold text-xl ">Contact Info</h1>
                  <div className="flex">
                    <div className="flex justify-center items-center mr-3">
                      <Coffee />
                    </div>
                    <div>
                      <h4 className="font-bold">New York Office</h4>
                      <p className="text-[10px]">
                        100 - 104 5th Ave. New York, NY 10011. United States.
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex justify-center items-center mr-3">
                      <Phone />
                    </div>
                    <div>
                      <h4 className="font-bold">Telephone</h4>
                      <p className="text-[10px]">(+123) 555 8888</p>
                      <p className="text-[10px]">(+456) 666 9999</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex justify-center items-center mr-3">
                      <Mail />
                    </div>
                    <div>
                      <h4 className="font-bold">Mail Us</h4>
                      <p className="text-[10px]">appbotreview@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex justify-center items-center mr-3">
                      <Clock />
                    </div>
                    <div>
                      <h4 className="font-bold">Opening Hours</h4>
                      <p className="text-[10px]">Mon-Fri: 10:00-18:00</p>
                      <p className="text-[10px]">Sat-Sun: 10:00-16:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
