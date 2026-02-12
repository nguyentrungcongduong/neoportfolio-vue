import { motion } from "framer-motion";
import { Link, useParams, Navigate } from "react-router-dom";
import NeoCard from "@/components/NeoCard";
import NeoBadge from "@/components/NeoBadge";
import NeoButton from "@/components/NeoButton";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import FloatingPet from "@/components/FloatingPet";
import { blogPosts } from "@/data/blogData";

const BlogDetail = () => {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === Number(id));

  if (!post) return <Navigate to="/blog" replace />;

  const currentIndex = blogPosts.findIndex((p) => p.id === post.id);
  const prevPost = blogPosts[currentIndex - 1];
  const nextPost = blogPosts[currentIndex + 1];

  return (
    <div className="min-h-screen relative">
      <CustomCursor />
      <FloatingPet />

      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link to="/blog">
            <NeoButton variant="outline" size="sm">
              <ArrowLeft size={16} className="mr-2" /> Tất cả bài viết
            </NeoButton>
          </Link>
        </motion.div>

        {/* Hero Banner */}
        <motion.div
          className={`h-64 md:h-80 bg-gradient-to-br ${post.gradient} rounded-2xl border-[3px] border-foreground flex items-center justify-center relative overflow-hidden mb-8`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 80 }}
        >
          <motion.span
            className="text-8xl md:text-9xl"
            animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {post.emoji}
          </motion.span>
          <motion.div
            className="absolute top-6 right-6 w-20 h-20 border-4 border-foreground/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-6 left-6 w-12 h-12 bg-foreground/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Meta */}
        <motion.div
          className="flex flex-wrap items-center gap-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <NeoBadge variant="primary">{post.category}</NeoBadge>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" /> {post.date}
          </span>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" /> {post.readTime}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-3xl md:text-5xl font-black mb-8 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {post.title}
        </motion.h1>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <NeoCard className="prose prose-lg max-w-none">
            {post.content.map((block, i) => (
              <motion.div
                key={i}
                className="mb-6 last:mb-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                {block.split("\n").map((line, j) => {
                  if (line.startsWith("## ")) {
                    return (
                      <h2 key={j} className="text-2xl font-black mt-8 mb-4 text-primary">
                        {line.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (line.startsWith("```")) {
                    return null;
                  }
                  if (line.startsWith("- ")) {
                    return (
                      <li key={j} className="ml-4 text-muted-foreground">
                        {line.replace("- ", "")}
                      </li>
                    );
                  }
                  if (line.startsWith("|")) {
                    return (
                      <p key={j} className="font-mono text-sm text-muted-foreground">
                        {line}
                      </p>
                    );
                  }
                  if (line.trim() === "") return null;
                  return (
                    <p key={j} className="text-muted-foreground leading-relaxed mb-2">
                      {line}
                    </p>
                  );
                })}
              </motion.div>
            ))}
          </NeoCard>
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="flex justify-between mt-12 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {prevPost ? (
            <Link to={`/blog/${prevPost.id}`} className="flex-1">
              <NeoCard className="group cursor-pointer hover:-translate-y-1 transition-transform">
                <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                  <ArrowLeft className="w-4 h-4" /> Bài trước
                </p>
                <p className="font-bold group-hover:text-primary transition-colors line-clamp-1">
                  {prevPost.title}
                </p>
              </NeoCard>
            </Link>
          ) : <div className="flex-1" />}

          {nextPost ? (
            <Link to={`/blog/${nextPost.id}`} className="flex-1 text-right">
              <NeoCard className="group cursor-pointer hover:-translate-y-1 transition-transform">
                <p className="text-sm text-muted-foreground mb-1 flex items-center justify-end gap-1">
                  Bài sau <ArrowRight className="w-4 h-4" />
                </p>
                <p className="font-bold group-hover:text-primary transition-colors line-clamp-1">
                  {nextPost.title}
                </p>
              </NeoCard>
            </Link>
          ) : <div className="flex-1" />}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogDetail;
