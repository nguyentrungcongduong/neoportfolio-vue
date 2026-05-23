import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import NeoCard from "@/components/NeoCard";
import NeoBadge from "@/components/NeoBadge";
import NeoButton from "@/components/NeoButton";
import { Calendar, Clock, ArrowRight, ArrowLeft, BookOpen } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import FloatingPet from "@/components/FloatingPet";
import { blogPosts } from "@/data/blogData";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
          <motion.div className="inline-flex items-center gap-2 mb-4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
            <BookOpen className="w-8 h-8" />
            <NeoBadge variant="primary" className="text-lg">Blog</NeoBadge>
          </motion.div>
          <motion.h1 className="text-4xl md:text-6xl font-black mb-4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            Tất Cả <span className="text-primary">Bài Viết</span> 📚
          </motion.h1>
          <motion.p className="text-xl text-muted-foreground max-w-2xl mx-auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            Chia sẻ kiến thức, tips & tricks về phát triển web
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 80 }}
              whileHover={{ y: -8, rotate: index % 2 === 0 ? 1 : -1 }}
            >
              <Link to={`/blog/${post.id}`}>
                <NeoCard className="h-full overflow-hidden group">
                  {/* Thumbnail Carousel */}
                  <div className="h-48 border-b-[3px] border-foreground -m-6 relative overflow-hidden">
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
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllBlogPosts;
