import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import NeoCard from "./NeoCard";
import NeoBadge from "./NeoBadge";
import NeoButton from "./NeoButton";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Tối ưu Performance React với useMemo và useCallback",
    excerpt: "Hướng dẫn chi tiết cách sử dụng useMemo và useCallback để tránh re-render không cần thiết trong React applications.",
    category: "React",
    date: "15 Jan 2024",
    readTime: "5 min",
    emoji: "⚡",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    id: 2,
    title: "TypeScript Advanced Types: Generics và Utility Types",
    excerpt: "Khám phá sức mạnh của Generics và các Utility Types trong TypeScript để viết code type-safe và flexible hơn.",
    category: "TypeScript",
    date: "10 Jan 2024",
    readTime: "8 min",
    emoji: "🔷",
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    id: 3,
    title: "Tailwind CSS Tips & Tricks cho Developer",
    excerpt: "Những tips và tricks hữu ích khi làm việc với Tailwind CSS giúp tăng tốc workflow và tạo UI đẹp mắt.",
    category: "CSS",
    date: "5 Jan 2024",
    readTime: "4 min",
    emoji: "🎨",
    gradient: "from-cyan-400 to-teal-500",
  },
  {
    id: 4,
    title: "Framer Motion: Tạo Animations Đẹp Mắt",
    excerpt: "Học cách sử dụng Framer Motion để tạo các animations mượt mà và chuyên nghiệp cho React applications.",
    category: "Animation",
    date: "1 Jan 2024",
    readTime: "6 min",
    emoji: "✨",
    gradient: "from-purple-400 to-pink-500",
  },
];

const BlogSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
              Blog
            </NeoBadge>
          </motion.div>
          
          <motion.h2
            className="text-4xl md:text-5xl font-black mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Chia Sẻ <span className="text-primary">Kiến Thức</span> 📝
          </motion.h2>
          
          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            Những bài viết về công nghệ, tips & tricks, và kinh nghiệm phát triển web
          </motion.p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              whileHover={{ y: -8, rotate: index % 2 === 0 ? 1 : -1 }}
              transition={{ type: "spring" as const, stiffness: 300 }}
            >
              <NeoCard className="h-full overflow-hidden group cursor-pointer">
                {/* Thumbnail */}
                <div className={`h-48 bg-gradient-to-br ${post.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <motion.span
                    className="text-7xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring" as const }}
                  >
                    {post.emoji}
                  </motion.span>
                  
                  {/* Decorative shapes */}
                  <motion.div
                    className="absolute top-4 right-4 w-16 h-16 border-4 border-foreground/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute bottom-4 left-4 w-8 h-8 bg-foreground/10"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  />
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
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Read More */}
                  <motion.div
                    className="flex items-center gap-2 font-bold text-primary"
                    whileHover={{ x: 5 }}
                  >
                    Đọc thêm
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </motion.div>
                </div>
              </NeoCard>
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
            <NeoButton variant="secondary" size="lg" className="hover-jello">
              Xem tất cả bài viết 📚
            </NeoButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
