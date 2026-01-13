import NeoCard from "./NeoCard";
import NeoButton from "./NeoButton";
import NeoInput from "./NeoInput";
import NeoTextarea from "./NeoTextarea";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const ContactSection = () => {
  const contactInfo = [
    { icon: Mail, label: "Email", value: "hello@alexnguyen.dev" },
    { icon: Phone, label: "Phone", value: "+84 123 456 789" },
    { icon: MapPin, label: "Location", value: "Ho Chi Minh City, Vietnam" },
  ];

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Let's <span className="bg-primary px-2 inline-block transform rotate-1">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's create something amazing together!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <NeoCard className="space-y-6">
            <h3 className="text-2xl font-bold">Send a Message</h3>
            <form className="space-y-4">
              <div>
                <label className="block font-bold mb-2">Name</label>
                <NeoInput placeholder="Your name" />
              </div>
              <div>
                <label className="block font-bold mb-2">Email</label>
                <NeoInput type="email" placeholder="your@email.com" />
              </div>
              <div>
                <label className="block font-bold mb-2">Message</label>
                <NeoTextarea placeholder="Tell me about your project..." />
              </div>
              <NeoButton variant="primary" size="lg" className="w-full flex items-center justify-center gap-2">
                <Send size={20} />
                Send Message
              </NeoButton>
            </form>
          </NeoCard>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <NeoCard 
                key={index} 
                variant={index === 0 ? "primary" : index === 1 ? "secondary" : "accent"}
                className="flex items-center gap-4"
              >
                <div className="p-3 bg-background border-[3px] border-foreground shadow-neo-sm">
                  <info.icon size={24} />
                </div>
                <div>
                  <div className="font-bold uppercase text-sm">{info.label}</div>
                  <div className="text-lg font-medium">{info.value}</div>
                </div>
              </NeoCard>
            ))}

            <NeoCard variant="info" className="text-center">
              <h4 className="text-xl font-bold mb-2">Open for Opportunities</h4>
              <p className="mb-4">
                I'm currently available for freelance projects and full-time positions.
              </p>
              <NeoButton variant="primary">
                Download Resume
              </NeoButton>
            </NeoCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
