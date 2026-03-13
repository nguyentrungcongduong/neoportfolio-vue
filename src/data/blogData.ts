// Import placeholder images from projects
import blog1 from "@/assets/projects/ecommerce-1.png";
import blog2 from "@/assets/projects/ecommerce-2.png";
import blog3 from "@/assets/projects/task-1.png";
import blog4 from "@/assets/projects/task-2.png";
import blog5 from "@/assets/projects/weather-1.png";
import blog6 from "@/assets/projects/weather-2.png";
import blog7 from "@/assets/projects/portfolio-1.png";
import blog8 from "@/assets/projects/portfolio-2.png";

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  emoji: string;
  gradient: string;
  images: string[];
  content: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Tối ưu Performance React với useMemo và useCallback",
    excerpt: "Hướng dẫn chi tiết cách sử dụng useMemo và useCallback để tránh re-render không cần thiết.",
    category: "React",
    date: "15 Jan 2024",
    readTime: "5 min",
    emoji: "⚡",
    gradient: "from-yellow-400 to-orange-500",
    images: [blog1, blog2],
    content: [
      "React là một thư viện tuyệt vời cho việc xây dựng UI, nhưng khi ứng dụng trở nên phức tạp, vấn đề performance có thể xuất hiện. Một trong những nguyên nhân phổ biến nhất là re-render không cần thiết.",
      "## useMemo là gì?\n\n`useMemo` là một hook cho phép bạn cache kết quả của một phép tính giữa các lần re-render. Nó chỉ tính toán lại khi dependencies thay đổi.\n\n```tsx\nconst expensiveValue = useMemo(() => {\n  return computeExpensiveValue(a, b);\n}, [a, b]);\n```",
      "## useCallback là gì?\n\n`useCallback` là hook giúp cache một function definition giữa các lần re-render. Điều này đặc biệt hữu ích khi bạn truyền callback xuống child components.\n\n```tsx\nconst handleClick = useCallback(() => {\n  doSomething(a, b);\n}, [a, b]);\n```",
      "## Khi nào nên dùng?\n\n- **useMemo**: Khi bạn có phép tính phức tạp hoặc tạo object/array mới\n- **useCallback**: Khi truyền function xuống component được wrap bởi `React.memo`\n- **Không nên lạm dụng**: Chỉ optimize khi thực sự cần thiết, premature optimization có thể làm code khó đọc hơn",
      "## Kết luận\n\nViệc sử dụng đúng `useMemo` và `useCallback` có thể cải thiện đáng kể performance của ứng dụng React. Tuy nhiên, hãy nhớ đo lường trước và sau khi optimize để đảm bảo rằng việc optimization thực sự mang lại lợi ích.",
    ],
  },
  {
    id: 2,
    title: "TypeScript Advanced Types: Generics và Utility Types",
    excerpt: "Khám phá sức mạnh của Generics và các Utility Types trong TypeScript.",
    category: "TypeScript",
    date: "10 Jan 2024",
    readTime: "8 min",
    emoji: "🔷",
    gradient: "from-blue-400 to-indigo-500",
    images: [blog3, blog4],
    content: [
      "TypeScript cung cấp một hệ thống type mạnh mẽ giúp developer viết code an toàn hơn. Trong bài viết này, chúng ta sẽ khám phá Generics và Utility Types.",
      "## Generics\n\nGenerics cho phép bạn tạo các component có thể làm việc với nhiều types khác nhau mà vẫn giữ được type safety.\n\n```tsx\nfunction identity<T>(arg: T): T {\n  return arg;\n}\n\nconst result = identity<string>('hello');\n```",
      "## Utility Types\n\nTypeScript cung cấp nhiều utility types hữu ích:\n\n- `Partial<T>`: Biến tất cả properties thành optional\n- `Required<T>`: Biến tất cả properties thành required\n- `Pick<T, K>`: Chọn một subset của properties\n- `Omit<T, K>`: Loại bỏ một số properties",
      "## Conditional Types\n\n```tsx\ntype IsString<T> = T extends string ? 'yes' : 'no';\ntype A = IsString<string>; // 'yes'\ntype B = IsString<number>; // 'no'\n```\n\nConditional types cho phép bạn tạo logic phức tạp trong type system.",
      "## Kết luận\n\nViệc thành thạo Generics và Utility Types sẽ giúp bạn viết code TypeScript mạnh mẽ và linh hoạt hơn rất nhiều.",
    ],
  },
  {
    id: 3,
    title: "Tailwind CSS Tips & Tricks cho Developer",
    excerpt: "Những tips và tricks hữu ích khi làm việc với Tailwind CSS.",
    category: "CSS",
    date: "5 Jan 2024",
    readTime: "4 min",
    emoji: "🎨",
    gradient: "from-cyan-400 to-teal-500",
    images: [blog5, blog6],
    content: [
      "Tailwind CSS đã trở thành một trong những framework CSS phổ biến nhất. Dưới đây là một số tips giúp bạn làm việc hiệu quả hơn.",
      "## 1. Sử dụng @apply cho các pattern lặp lại\n\n```css\n.btn-primary {\n  @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600;\n}\n```",
      "## 2. Tận dụng Arbitrary Values\n\nKhi cần giá trị custom, sử dụng square bracket notation:\n\n```html\n<div class=\"top-[117px] grid-cols-[1fr_2fr]\">\n```",
      "## 3. Group và Peer Modifiers\n\n```html\n<div class=\"group\">\n  <p class=\"group-hover:text-blue-500\">Hover parent!</p>\n</div>\n```\n\nGroup và peer modifiers giúp bạn style dựa trên state của parent hoặc sibling elements.",
      "## Kết luận\n\nTailwind CSS rất mạnh mẽ khi bạn biết cách tận dụng đúng các tính năng của nó. Hãy thử áp dụng các tips này vào project của bạn!",
    ],
  },
  {
    id: 4,
    title: "Framer Motion: Tạo Animations Đẹp Mắt",
    excerpt: "Học cách sử dụng Framer Motion để tạo animations mượt mà.",
    category: "Animation",
    date: "1 Jan 2024",
    readTime: "6 min",
    emoji: "✨",
    gradient: "from-purple-400 to-pink-500",
    images: [blog7, blog8],
    content: [
      "Framer Motion là thư viện animation phổ biến nhất cho React. Nó cung cấp API declarative đơn giản để tạo các animations phức tạp.",
      "## Basic Animation\n\n```tsx\n<motion.div\n  initial={{ opacity: 0 }}\n  animate={{ opacity: 1 }}\n  transition={{ duration: 0.5 }}\n/>\n```",
      "## Gesture Animations\n\n```tsx\n<motion.button\n  whileHover={{ scale: 1.1 }}\n  whileTap={{ scale: 0.9 }}\n>\n  Click me\n</motion.button>\n```\n\nFramer Motion hỗ trợ nhiều gesture events: hover, tap, drag, focus, và pan.",
      "## Layout Animations\n\nMột trong những tính năng mạnh nhất là layout animations:\n\n```tsx\n<motion.div layout>\n  {isExpanded && <motion.p layout>Content</motion.p>}\n</motion.div>\n```\n\nChỉ cần thêm prop `layout`, Framer Motion sẽ tự động animate khi layout thay đổi.",
      "## Kết luận\n\nFramer Motion giúp việc tạo animations trở nên cực kỳ đơn giản và trực quan. Hãy thử nghiệm và sáng tạo!",
    ],
  },
  {
    id: 5,
    title: "Docker cho Frontend Developer",
    excerpt: "Hướng dẫn sử dụng Docker để containerize ứng dụng frontend.",
    category: "DevOps",
    date: "25 Dec 2023",
    readTime: "7 min",
    emoji: "🐳",
    gradient: "from-sky-400 to-blue-600",
    images: [blog1, blog3],
    content: [
      "Docker không chỉ dành cho backend developer. Frontend developer cũng có thể tận dụng Docker để tạo môi trường phát triển nhất quán và deploy dễ dàng hơn.",
      "## Dockerfile cơ bản\n\n```dockerfile\nFROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm install\nCOPY . .\nRUN npm run build\nEXPOSE 3000\nCMD [\"npm\", \"start\"]\n```",
      "## Multi-stage Build\n\nĐể giảm kích thước image, sử dụng multi-stage build:\n\n```dockerfile\n# Build stage\nFROM node:18-alpine AS builder\nWORKDIR /app\nCOPY . .\nRUN npm ci && npm run build\n\n# Production stage\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html\n```",
      "## Docker Compose\n\n```yaml\nversion: '3'\nservices:\n  frontend:\n    build: .\n    ports:\n      - '3000:3000'\n    volumes:\n      - .:/app\n      - /app/node_modules\n```",
      "## Kết luận\n\nDocker giúp đảm bảo ứng dụng chạy nhất quán trên mọi môi trường. Hãy bắt đầu containerize ứng dụng frontend của bạn ngay hôm nay!",
    ],
  },
  {
    id: 6,
    title: "GraphQL vs REST API: Khi nào nên dùng?",
    excerpt: "So sánh chi tiết giữa GraphQL và REST để chọn đúng cho dự án.",
    category: "API",
    date: "20 Dec 2023",
    readTime: "6 min",
    emoji: "🔗",
    gradient: "from-green-400 to-emerald-500",
    images: [blog2, blog4],
    content: [
      "Việc chọn giữa GraphQL và REST API là một quyết định quan trọng trong kiến trúc ứng dụng. Mỗi cái đều có ưu và nhược điểm riêng.",
      "## REST API\n\n**Ưu điểm:**\n- Đơn giản và dễ hiểu\n- Caching tốt với HTTP caching\n- Mature ecosystem\n\n**Nhược điểm:**\n- Over-fetching / Under-fetching\n- Nhiều endpoints",
      "## GraphQL\n\n**Ưu điểm:**\n- Lấy đúng data cần thiết\n- Một endpoint duy nhất\n- Strong typing với schema\n\n**Nhược điểm:**\n- Phức tạp hơn để setup\n- Caching khó hơn\n- Learning curve cao hơn",
      "## Khi nào chọn cái nào?\n\n- **REST**: Ứng dụng đơn giản, CRUD operations, public API\n- **GraphQL**: Ứng dụng phức tạp, mobile apps cần optimize bandwidth, nhiều data sources",
      "## Kết luận\n\nKhông có giải pháp nào là \"tốt nhất\" cho mọi trường hợp. Hãy đánh giá yêu cầu cụ thể của dự án trước khi quyết định.",
    ],
  },
  {
    id: 7,
    title: "Testing React Components với Vitest",
    excerpt: "Viết unit test và integration test cho React components.",
    category: "Testing",
    date: "15 Dec 2023",
    readTime: "9 min",
    emoji: "🧪",
    gradient: "from-rose-400 to-red-500",
    images: [blog5, blog7],
    content: [
      "Testing là một phần không thể thiếu trong phát triển phần mềm. Vitest là một test runner nhanh và hiện đại, tương thích hoàn hảo với Vite.",
      "## Setup Vitest\n\n```bash\nnpm install -D vitest @testing-library/react @testing-library/jest-dom\n```\n\n```ts\n// vitest.config.ts\nexport default defineConfig({\n  test: {\n    environment: 'jsdom',\n    globals: true,\n  },\n});\n```",
      "## Viết Test đầu tiên\n\n```tsx\nimport { render, screen } from '@testing-library/react';\nimport { describe, it, expect } from 'vitest';\nimport Button from './Button';\n\ndescribe('Button', () => {\n  it('renders correctly', () => {\n    render(<Button>Click me</Button>);\n    expect(screen.getByText('Click me')).toBeInTheDocument();\n  });\n});\n```",
      "## Testing User Interactions\n\n```tsx\nimport userEvent from '@testing-library/user-event';\n\nit('calls onClick when clicked', async () => {\n  const handleClick = vi.fn();\n  render(<Button onClick={handleClick}>Click</Button>);\n  await userEvent.click(screen.getByText('Click'));\n  expect(handleClick).toHaveBeenCalledOnce();\n});\n```",
      "## Kết luận\n\nVitest kết hợp với Testing Library tạo nên bộ đôi mạnh mẽ cho testing React components. Hãy viết test từ sớm và thường xuyên!",
    ],
  },
  {
    id: 8,
    title: "State Management: Zustand vs Redux",
    excerpt: "So sánh hai thư viện quản lý state phổ biến nhất hiện nay.",
    category: "React",
    date: "10 Dec 2023",
    readTime: "5 min",
    emoji: "🏪",
    gradient: "from-amber-400 to-orange-600",
    images: [blog6, blog8],
    content: [
      "State management là một vấn đề quan trọng trong React applications. Redux và Zustand là hai thư viện phổ biến nhất hiện nay.",
      "## Redux\n\n```tsx\n// Slice\nconst counterSlice = createSlice({\n  name: 'counter',\n  initialState: { value: 0 },\n  reducers: {\n    increment: state => { state.value += 1; },\n  },\n});\n```\n\nRedux có ecosystem lớn, DevTools mạnh mẽ, nhưng boilerplate nhiều.",
      "## Zustand\n\n```tsx\nconst useStore = create((set) => ({\n  count: 0,\n  increment: () => set((state) => ({ count: state.count + 1 })),\n}));\n\n// Usage\nconst count = useStore((state) => state.count);\n```\n\nZustand cực kỳ đơn giản, ít boilerplate, nhẹ (~1KB).",
      "## So sánh\n\n| Tiêu chí | Redux | Zustand |\n|----------|-------|--------|\n| Bundle size | ~7KB | ~1KB |\n| Boilerplate | Nhiều | Ít |\n| DevTools | Tuyệt vời | Tốt |\n| Learning curve | Cao | Thấp |\n| Middleware | Phong phú | Cơ bản |",
      "## Kết luận\n\n- **Redux**: Cho ứng dụng lớn, cần DevTools mạnh, team đã quen\n- **Zustand**: Cho ứng dụng vừa/nhỏ, cần đơn giản, nhanh setup",
    ],
  },
];
