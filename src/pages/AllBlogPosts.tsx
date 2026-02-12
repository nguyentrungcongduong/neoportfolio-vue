import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NeoCard from "@/components/NeoCard";
import NeoBadge from "@/components/NeoBadge";
import NeoButton from "@/components/NeoButton";
import { Calendar, Clock, ArrowRight, ArrowLeft, BookOpen } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import FloatingPet from "@/components/FloatingPet";

const allBlogPosts = [
  { id: 1, title: "Tối ưu Performance React với useMemo và useCallback", excerpt: "Hướng dẫn chi tiết cách sử dụng useMemo và useCallback để tránh re-render không cần thiết.", category: "React", date: "15 Jan 2024", readTime: "5 min", emoji: "⚡", gradient: "from-yellow-400 to-orange-500" },
  { id: 2, title: "TypeScript Advanced Types: Generics và Utility Types", excerpt: "Khám phá sức mạnh của Generics và các Utility Types trong TypeScript.", category: "TypeScript", date: "10 Jan 2024", readTime: "8 min", emoji: "🔷", gradient: "from-blue-400 to-indigo-500" },
  { id: 3, title: "Tailwind CSS Tips & Tricks cho Developer", excerpt: "Những tips và tricks hữu ích khi làm việc với Tailwind CSS.", category: "CSS", date: "5 Jan 2024", readTime: "4 min", emoji: "🎨", gradient: "from-cyan-400 to-teal-500" },
  { id: 4, title: "Framer Motion: Tạo Animations Đẹp Mắt", excerpt: "Học cách sử dụng Framer Motion để tạo animations mượt mà.", category: "Animation", date: "1 Jan 2024", readTime: "6 min", emoji: "✨", gradient: "from-purple-400 to-pink-500" },
  { id: 5, title: "Docker cho Frontend Developer", excerpt: "Hướng dẫn sử dụng Docker để containerize ứng dụng frontend.", category: "DevOps", date: "25 Dec 2023", readTime: "7 min", emoji: "🐳", gradient: "from-sky-400 to-blue-600" },
  { id: 6, title: "GraphQL vs REST API: Khi nào nên dùng?", excerpt: "So sánh chi tiết giữa GraphQL và REST để chọn đúng cho dự án.", category: "API", date: "20 Dec 2023", readTime: "6 min", emoji: "🔗", gradient: "from-green-400 to-emerald-500" },
  { id: 7, title: "Testing React Components với Vitest", excerpt: "Viết unit test và integration test cho React components.", category: "Testing", date: "15 Dec 2023", readTime: "9 min", emoji: "🧪", gradient: "from-rose-400 to-red-500" },
  { id: 8, title: "State Management: Zustand vs Redux", excerpt: "So sánh hai thư viện quản lý state phổ biến nhất hiện nay.", category: "React", date: "10 Dec 2023", readTime: "5 min", emoji: "🏪", gradient: "from-amber-400 to-orange-600" },
];

const AllBlogPosts = () => {
  return (
    <div className="min-h-screen relative">
      <CustomCursor />
      <FloatingPet />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link to="/">
            <NeoButton variant="outline" size="sm">
              <ArrowLeft size={16} className="mr-2" /> Về trang chủ
            </NeoButton>
          </Link>
        </motion.div>

        <motion.div className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
          >
            <BookOpen className="w-8 h-8" />
            <NeoBadge variant="primary" className="text-lg">Blog</NeoBadge>
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl font-black mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Tất Cả <span className="text-primary">Bài Viết</span> 📚
          </motion.h1>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Chia sẻ kiến thức, tips & tricks về phát triển web
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {allBlogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 80 }}
              whileHover={{ y: -8, rotate: index % 2 === 0 ? 1 : -1 }}
            >
              <NeoCard className="h-full overflow-hidden group cursor-pointer">
                <div className={`h-48 bg-gradient-to-br ${post.gradient} flex items-center justify-center relative overflow-hidden`}>
                  <motion.span className="text-7xl" whileHover={{ scale: 1.2, rotate: 10 }}>
                    {post.emoji}
                  </motion.span>
                  <motion.div
                    className="absolute top-4 right-4 w-16 h-16 border-4 border-foreground/20 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <NeoBadge variant="secondary">{post.category}</NeoBadge>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{post.date}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{post.readTime}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-black mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <motion.div className="flex items-center gap-2 font-bold text-primary" whileHover={{ x: 5 }}>
                    Đọc thêm <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </div>
              </NeoCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBlogPosts;
