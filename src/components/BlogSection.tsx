import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import NeoCard from "./NeoCard";
import NeoBadge from "./NeoBadge";
import NeoButton from "./NeoButton";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/blogData";
import { useLang } from "@/context/LanguageContext";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const displayPosts = blogPosts.slice(0, 4);

const BlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, lang } = useLang();

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section id="blog" className="py-20 px-4 bg-secondary/30" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ type: "spring" as const, delay: 0.2 }}
          >
            <BookOpen className="w-8 h-8" />
            <NeoBadge variant="primary" className="text-lg">
              {t.blog.title}
            </NeoBadge>
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-5xl font-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            {t.blog.title} <span className="text-primary">{t.blog.titleHighlight}</span>
          </motion.h2>
          
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            {t.blog.subtitle}
          </motion.p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {displayPosts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              whileHover={{ y: -8, rotate: index % 2 === 0 ? 1 : -1 }}
              transition={{ type: "spring" as const, stiffness: 300 }}
            >
              <Link to={`/blog/${post.id}`}>
                <NeoCard className="h-full overflow-hidden group">
                {/* Thumbnail Carousel */}
                <div className="h-48 border-b-[3px] border-foreground -m-6 mb-4 relative overflow-hidden">
                  <Carousel className="w-full h-full">
                    <CarouselContent className="h-full">
                      {post.images.map((image, imgIndex) => (
                        <CarouselItem key={imgIndex} className="h-full">
                          <motion.div 
                            className="relative h-full overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                          >
                            <img 
                              src={image} 
                              alt={`${post.title} screenshot ${imgIndex + 1}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-2 py-1 border-2 border-foreground font-black shadow-neo-sm">
                              {post.emoji}
                            </div>
                          </motion.div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Category & Meta */}
                  <div className="flex items-center justify-between mb-4">
                    <motion.div whileHover={{ scale: 1.1 }}>
                      <NeoBadge variant="secondary">
                        {post.category}
                      </NeoBadge>
                    </motion.div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-black mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {lang === "en" ? post.titleEn : post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {lang === "en" ? post.excerptEn : post.excerpt}
                  </p>

                  {/* Read More */}
                  <motion.div
                    className="flex items-center gap-2 font-bold text-primary"
                    whileHover={{ x: 5 }}
                  >
                    {t.blog.readMore}
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </motion.div>
                </div>
              </NeoCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/blog">
              <NeoButton variant="secondary" size="lg" className="hover-jello">
                {t.blog.viewAll}
              </NeoButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
