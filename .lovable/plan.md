

# Plan: Thêm Filter Công Nghệ cho Trang Dự Án

## Tổng Quan
Thêm một thanh filter cho phép lọc dự án theo các công nghệ/tag (React, Node.js, TypeScript, v.v.) vào trang `/projects`. Filter sẽ sử dụng phong cách Neobrutalism hiện có và có thể chọn nhiều tag cùng lúc.

## Phân Tích Hiện Trạng
- Trang `AllProjects.tsx` hiện có 8 dự án với nhiều tags khác nhau
- Các tags bao gồm: React, Node.js, Stripe, Next.js, TypeScript, Socket.io, API, Charts, Vue.js, Firebase, Tailwind, Canvas, WebGL, WebAssembly, AI, Web Audio, Python, OpenAI
- Chưa có state management cho filtering

## Thiết Kế Filter

### 1. UI/UX
- **Vị trí**: Đặt giữa phần mô tả và grid dự án
- **Layout**: Flexbox wrap với các button tags, có thêm nút "Tất cả" để reset
- **Styling**: NeoBadge với variant có thể click, active state khác màu
- **Counter**: Hiển thị số lượng dự án đang được lọc (vd: "8 dự án")

### 2. Logic Filter
```text
- Trích xuất tất cả unique tags từ allProjects
- State: selectedTags (array of strings)
- Nếu selectedTags rỗng → hiển thị tất cả
- Nếu có tags → hiển thị dự án có ít nhất 1 tag khớp
- Click tag → toggle (thêm/bớt khỏi selectedTags)
```

### 3. Animation
- Filter buttons có hiệu ứng hover/active
- Dự án filtered-out fade out với AnimatePresence
- Số đếm cập nhật với smooth transition

## Thay Đổi Code

### File: `src/pages/AllProjects.tsx`

**Thêm imports:**
```typescript
import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { Filter } from "lucide-react";
```

**Thêm state và logic filter:**
```typescript
const [selectedTags, setSelectedTags] = useState<string[]>([]);

// Extract unique tags
const allTags = useMemo(() => {
  const tags = new Set<string>();
  allProjects.forEach(project => {
    project.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}, []);

// Filter projects
const filteredProjects = useMemo(() => {
  if (selectedTags.length === 0) return allProjects;
  return allProjects.filter(project =>
    project.tags.some(tag => selectedTags.includes(tag))
  );
}, [selectedTags]);

// Toggle tag selection
const toggleTag = (tag: string) => {
  setSelectedTags(prev =>
    prev.includes(tag)
      ? prev.filter(t => t !== tag)
      : [...prev, tag]
  );
};
```

**Thêm UI Filter Section (sau phần mô tả, trước grid):**
```typescript
{/* Filter Section */}
<motion.div
  className="mb-8 space-y-4"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
>
  <div className="flex items-center justify-between flex-wrap gap-4">
    <div className="flex items-center gap-2">
      <Filter size={20} />
      <h3 className="text-lg font-bold">Lọc theo công nghệ:</h3>
    </div>
    <motion.div
      className="text-muted-foreground font-medium"
      key={filteredProjects.length}
      initial={{ scale: 1.2 }}
      animate={{ scale: 1 }}
    >
      {filteredProjects.length} dự án
    </motion.div>
  </div>
  
  <div className="flex flex-wrap gap-2">
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <NeoButton
        variant={selectedTags.length === 0 ? "primary" : "outline"}
        size="sm"
        onClick={() => setSelectedTags([])}
      >
        Tất cả
      </NeoButton>
    </motion.div>
    
    {allTags.map((tag) => {
      const isSelected = selectedTags.includes(tag);
      return (
        <motion.div
          key={tag}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={() => toggleTag(tag)}
            className={cn(
              "neo-badge cursor-pointer transition-all",
              isSelected ? "bg-accent" : "bg-background"
            )}
          >
            {tag}
          </button>
        </motion.div>
      );
    })}
  </div>
</motion.div>
```

**Cập nhật Grid với AnimatePresence:**
```typescript
<div className="grid md:grid-cols-2 gap-8">
  <AnimatePresence mode="popLayout">
    {filteredProjects.map((project, index) => (
      <motion.div
        key={project.title}
        layout
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ delay: index * 0.05, type: "spring", stiffness: 80 }}
        whileHover={{ y: -10, scale: 1.02 }}
      >
        {/* Existing NeoCard content */}
      </motion.div>
    ))}
  </AnimatePresence>
</div>
```

**Thêm import `cn` utility:**
```typescript
import { cn } from "@/lib/utils";
```

## Chi Tiết Kỹ Thuật

1. **State Management**: Sử dụng `useState` cho `selectedTags` (array string)
2. **Performance**: `useMemo` để tránh tính toán lại tags và filtered projects
3. **Animation**: `AnimatePresence` với `mode="popLayout"` để animate khi items xuất/nhập
4. **Accessibility**: Buttons có proper hover/active states
5. **Responsive**: Flexbox wrap tự động xuống dòng trên mobile

## Lưu Ý
- Nút "Tất cả" có màu khác khi active (variant="primary")
- Filter badges dùng bg-accent khi selected để nổi bật
- Grid items có `key={project.title}` để AnimatePresence hoạt động đúng
- Delay animation của filtered items ngắn hơn (0.05s) để phản hồi nhanh

