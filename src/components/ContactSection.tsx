import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import NeoCard from "./NeoCard";
import NeoButton from "./NeoButton";
import NeoInput from "./NeoInput";
import NeoTextarea from "./NeoTextarea";
import { Mail, MapPin, Phone, Send, Sparkles, CheckCircle, PartyPopper } from "lucide-react";

import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const ContactSection = () => {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const contactInfo = [
    { icon: Mail, label: "Email", value: "congduongnguyentrung@gmail.com" },
    { icon: Phone, label: "Phone", value: "+84 123 456 789" },
    { icon: MapPin, label: "Location", value: "Ho Chi Minh City, Vietnam" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const rightItemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSending(true);

    try {
      // NOTE: You need to replace these with your actual EmailJS credentials
      // Sign up at https://www.emailjs.com/
      await emailjs.sendForm(
        "service_nuwdahy", // Replace with your Service ID
        "template_vds0b6e", // Replace with your Template ID
        formRef.current,
        "-nZMAH2YHY1-RAxar" // Replace with your Public Key
      );

      setIsSubmitted(true);
      toast.success("Message sent successfully! 🚀");
      formRef.current.reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again later. ❌");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 overflow-hidden" ref={ref}>
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <motion.h2 className="text-4xl md:text-6xl font-bold mb-4">
            Let's{" "}
            <motion.span
              className="bg-primary px-2 inline-block text-shadow-neo"
              whileHover={{ rotate: -5, scale: 1.1 }}
              animate={isInView ? { rotate: [0, -3, 3, 0] } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Connect
            </motion.span>
            <motion.span
              className="inline-block ml-2"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="inline w-10 h-10 text-secondary" />
            </motion.span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            Have a project in mind? Let's create something amazing together! 🚀
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <NeoCard className="space-y-6">
              <motion.h3
                className="text-2xl font-bold flex items-center gap-2"
                whileHover={{ x: 10 }}
              >
                Send a Message 💬
              </motion.h3>
              <form className="space-y-4" onSubmit={handleSubmit} ref={formRef}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block font-bold mb-2">Name</label>
                  <NeoInput placeholder="Your name" name="from_name" required />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block font-bold mb-2">Email</label>
                  <NeoInput type="email" placeholder="your@email.com" name="from_email" required />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block font-bold mb-2">Message</label>
                  <NeoTextarea placeholder="Tell me about your project..." name="message" required />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <NeoButton
                    variant="primary"
                    size="lg"
                    className="w-full flex items-center justify-center gap-2 hover-jello"
                    type="submit"
                    disabled={isSending}
                  >
                    {isSending ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Sparkles size={20} />
                      </motion.div>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle size={20} />
                        Message Sent!
                        <PartyPopper size={20} />
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </NeoButton>
                </motion.div>
              </form>
            </NeoCard>
          </motion.div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={rightItemVariants}
                whileHover={{
                  x: 10,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 },
                }}
              >
                <NeoCard
                  variant={index === 0 ? "primary" : index === 1 ? "secondary" : "accent"}
                  className="flex items-center gap-4"
                >
                  <motion.div
                    className="p-3 bg-background border-[3px] border-foreground shadow-neo-sm"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <info.icon size={24} />
                  </motion.div>
                  <div>
                    <div className="font-bold uppercase text-sm">{info.label}</div>
                    {info.label === "Email" ? (
                      <a href={`mailto:${info.value}`} className="text-lg font-medium hover:text-primary transition-colors">
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-lg font-medium">{info.value}</div>
                    )}
                  </div>
                </NeoCard>
              </motion.div>
            ))}

            <motion.div
              variants={rightItemVariants}
              whileHover={{
                scale: 1.02,
                transition: { type: "spring", stiffness: 300 },
              }}
            >
              <NeoCard variant="info" className="text-center">
                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <h4 className="text-xl font-bold mb-2">Open for Opportunities 🌟</h4>
                  <p className="mb-4">
                    I'm currently available for freelance projects and full-time positions.
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <NeoButton variant="primary" className="hover-wobble">
                      Download Resume 📄
                    </NeoButton>
                  </motion.div>
                </motion.div>
              </NeoCard>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
