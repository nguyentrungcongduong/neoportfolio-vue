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
  titleEn: string;
  excerpt: string;
  excerptEn: string;
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
    title: "Xây dựng Hybrid RAG: Dense + Sparse Search cho hệ thống Q&A Pháp lý Việt Nam",
    titleEn: "Building Hybrid RAG: Dense + Sparse Search for Vietnamese Legal Q&A",
    excerpt: "Hành trình xây dựng luận văn tốt nghiệp: kết hợp Qdrant vector search + BM25 Okapi qua Reciprocal Rank Fusion để tạo hệ thống Q&A pháp lý thông minh.",
    excerptEn: "My graduation thesis journey: combining Qdrant vector search + BM25 Okapi via Reciprocal Rank Fusion to build a smart Vietnamese legal Q&A system.",
    category: "AI / RAG",
    date: "15 Jun 2026",
    readTime: "12 min",
    emoji: "⚖️",
    gradient: "from-purple-500 to-indigo-600",
    images: [blog1, blog2],
    content: [
      "Luận văn tốt nghiệp của mình là hệ thống Q&A pháp lý tiếng Việt dùng Hybrid RAG — một trong những bài toán khó nhất mình từng làm. Bài viết này chia sẻ kiến trúc, những khó khăn gặp phải và cách giải quyết.",
      "## Vấn đề: Tìm kiếm pháp lý thuần vector không đủ\n\nVăn bản pháp lý tiếng Việt có đặc điểm:\n- Rất nhiều thuật ngữ chuyên biệt (điều khoản, khoản, nghị định...)\n- Dense search tốt với ngữ nghĩa nhưng miss các từ khóa chính xác\n- Sparse search (BM25) giỏi exact match nhưng không hiểu ngữ cảnh\n\nGiải pháp: **Hybrid RAG** — kết hợp cả hai qua Reciprocal Rank Fusion (RRF)",
      "## Kiến trúc hệ thống\n\n```\nVue.js Frontend\n    ↓\nSpring Boot API Gateway (JWT auth)\n    ↓              ↓\nPython FastAPI   PostgreSQL\n(RAG Engine)        ↑\n    ↓          User data\nQdrant (dense)\n    +\nBM25 Index (sparse)\n    ↓\nRRF Fusion → Top-K chunks → LLM Answer\n```\n\n**Chunking strategy**: Phân cấp theo cấu trúc pháp lý (Chương → Điều → Khoản → Điểm), mỗi chunk giữ metadata cha để trả lời đúng ngữ cảnh.",
      "## Reciprocal Rank Fusion (RRF)\n\nRRF gộp kết quả từ 2 ranker:\n\n```python\ndef rrf_fusion(dense_results, sparse_results, k=60):\n    scores = {}\n    for rank, doc in enumerate(dense_results):\n        scores[doc.id] = scores.get(doc.id, 0) + 1/(k + rank + 1)\n    for rank, doc in enumerate(sparse_results):\n        scores[doc.id] = scores.get(doc.id, 0) + 1/(k + rank + 1)\n    return sorted(scores.items(), key=lambda x: x[1], reverse=True)\n```\n\nSau khi thử nhiều công thức, RRF với k=60 cho kết quả tốt nhất trên test set pháp lý.",
      "## Kết quả & Bài học\n\n- **Precision@5**: 78% so với 61% của pure dense search\n- BM25 worker warmup khi startup tránh cold start latency 3-4s đầu tiên\n- Microservices giúp scale Python RAG engine độc lập với Spring Boot gateway\n\n**Bài học**: Với domain-specific search như pháp lý, hybrid luôn thắng pure vector. Đừng over-engineer chunk size — thử nghiệm với dữ liệu thực mới biết con số đúng.",
    ],
  },
  {
    id: 2,
    title: "Xây dựng Collaborative Whiteboard Real-time với Yjs CRDT và Laravel Reverb",
    titleEn: "Building a Real-time Collaborative Whiteboard with Yjs CRDT and Laravel Reverb",
    excerpt: "Cách mình build một Miro clone hỗ trợ nhiều người dùng cùng vẽ đồng thời mà không conflict — sử dụng Yjs CRDT và WebSocket thuần với Laravel Reverb.",
    excerptEn: "How I built a Miro clone supporting concurrent multi-user drawing without conflicts — using Yjs CRDT and native WebSocket with Laravel Reverb.",
    category: "Real-time",
    date: "20 May 2026",
    readTime: "10 min",
    emoji: "🎨",
    gradient: "from-pink-400 to-rose-500",
    images: [blog3, blog4],
    content: [
      "Một trong những project thú vị nhất mình làm là Miro clone cho phép nhiều người dùng cùng vẽ, tạo sticky note, và text caption đồng thời mà không bị conflict. Bài viết này giải thích Yjs CRDT — công nghệ cốt lõi đằng sau.",
      "## CRDT là gì và tại sao cần nó?\n\nCRDT (Conflict-free Replicated Data Type) là cấu trúc dữ liệu cho phép nhiều node cùng chỉnh sửa và tự động merge mà không cần lock hay central coordinator.\n\nVí dụ naive (sai):\n```\nUser A: ['a', 'b', 'c']\nUser B: thêm 'x' sau 'b' → ['a', 'b', 'x', 'c']\nUser A: xóa 'b'         → ['a', 'c']\nMerge:  ???              → race condition!\n```\n\nYjs giải quyết bằng cách gán unique ID cho mỗi operation, không bao giờ xóa thật mà dùng tombstone.",
      "## Tích hợp Yjs + Laravel Reverb\n\n```javascript\n// Vue 3 client\nimport * as Y from 'yjs'\nimport { WebsocketProvider } from 'y-websocket'\n\nconst ydoc = new Y.Doc()\nconst provider = new WebsocketProvider(\n  'wss://your-reverb-server',\n  'whiteboard-room-1',\n  ydoc\n)\n\n// Shared canvas objects\nconst yObjects = ydoc.getMap('objects')\nyObjects.observe(event => {\n  // Re-render khi có thay đổi từ bất kỳ user nào\n  renderCanvas()\n})\n```\n\nLaravel Reverb (native WebSocket server của Laravel) xử lý broadcast mà không cần Pusher, rẻ hơn và control được.",
      "## Google OAuth 2.0 với PKCE Flow\n\nMình dùng PKCE (Proof Key for Code Exchange) thay vì implicit flow cho bảo mật tốt hơn:\n\n1. Client tạo `code_verifier` random\n2. Hash thành `code_challenge` (SHA-256)\n3. Gửi `code_challenge` lên Auth server\n4. Nhận `authorization_code`\n5. Đổi code lấy token, gửi kèm `code_verifier` để verify\n\nFlow này an toàn hơn vì token không bao giờ xuất hiện trong URL.",
      "## Kết luận\n\nYjs CRDT giải quyết elegantly bài toán concurrent editing mà OT (Operational Transform như Google Docs cũ) rất phức tạp để implement đúng. Nếu bạn cần build collaborative feature, Yjs + WebSocket là combo đáng xem xét đầu tiên.",
    ],
  },
  {
    id: 3,
    title: "Golang + Go/Gin: Tại sao mình chọn Go cho service xử lý thuật toán nặng",
    titleEn: "Golang + Go/Gin: Why I Chose Go for Compute-Heavy Algorithm Services",
    excerpt: "Trong dự án 3D Container Load Planning, mình dùng Go/Gin để xử lý bin packing algorithms thay vì Spring Boot. Đây là lý do và benchmark thực tế.",
    excerptEn: "In the 3D Container Load Planning project, I used Go/Gin instead of Spring Boot for bin packing algorithms. Here are the reasons and real benchmarks.",
    category: "Golang",
    date: "10 Apr 2026",
    readTime: "8 min",
    emoji: "📦",
    gradient: "from-cyan-400 to-teal-500",
    images: [blog5, blog6],
    content: [
      "Trong dự án 3D Container Load Planning — hệ thống tối ưu xếp hàng vào container tàu — mình quyết định dùng Go thay vì Java/Spring Boot cho computation service. Bài viết này giải thích quyết định đó.",
      "## Bài toán: 3D Bin Packing\n\nBin packing 3D là bài toán NP-hard: xếp các hộp (box) vào container sao cho:\n- Không overlap\n- Tận dụng tối đa không gian\n- Tôn trọng weight limit và fragility rules\n\nMình implement 3 algorithms:\n1. **OR-Tools CP-SAT** (Google): exact solver, tốt nhất nhưng chậm với nhiều items\n2. **BLF (Bottom-Left-Fill)**: heuristic nhanh, 85% optimal\n3. **BFD (Best Fit Decreasing)**: balance giữa tốc độ và chất lượng",
      "## Tại sao Go thay vì Java?\n\n```\nBenchmark (1000 boxes, 10 containers):\n\nSpring Boot (JVM warmup included):\n  - First request: 2.1s\n  - Subsequent: 380ms avg\n  - Memory: 512MB heap\n\nGo/Gin:\n  - First request: 45ms\n  - Subsequent: 38ms avg\n  - Memory: 28MB\n```\n\n**Kết luận**: Go không cần JVM warmup, goroutines rẻ hơn Java threads, và binary nhỏ hơn nhiều cho Docker image.",
      "## Redis Job Queue Pattern\n\n```go\n// Producer (API handler)\nfunc SubmitJob(c *gin.Context) {\n    jobID := uuid.New().String()\n    payload, _ := json.Marshal(request)\n    rdb.LPush(ctx, \"packing_jobs\", payload)\n    c.JSON(202, gin.H{\"job_id\": jobID})\n}\n\n// Worker (goroutine)\ngo func() {\n    for {\n        job := rdb.BRPop(ctx, 0, \"packing_jobs\")\n        result := runPackingAlgorithm(job)\n        rdb.Set(ctx, \"result:\"+jobID, result, time.Hour)\n    }\n}()\n```\n\nClient poll `/job/{id}/status` cho đến khi done. Pattern này giúp API không bị block trong khi thuật toán chạy.",
      "## Kết luận\n\nGo là lựa chọn tuyệt vời cho computation-heavy services. Java vẫn tốt hơn cho enterprise features (Spring ecosystem), nhưng khi cần raw performance với memory thấp, Go không có đối thủ trong ecosystem statically typed.",
    ],
  },
  {
    id: 4,
    title: "Từ Sinh Viên Đến Junior Dev: 2 Năm Tự Học và Những Bài Học Xương Máu",
    titleEn: "From Student to Junior Dev: 2 Years of Self-Learning and Hard-Won Lessons",
    excerpt: "Hành trình 2 năm của mình từ không biết gì về backend đến xây dựng hệ thống microservices, internship tại 3 công ty, và hoàn thành 14 dự án.",
    excerptEn: "My 2-year journey from knowing nothing about backend to building microservice systems, 3 internships, and completing 14 projects.",
    category: "Career",
    date: "01 Jul 2026",
    readTime: "7 min",
    emoji: "🚀",
    gradient: "from-yellow-400 to-lime-500",
    images: [blog7, blog8],
    content: [
      "Mình bắt đầu học lập trình nghiêm túc vào năm 3 đại học tại UTH (Đại học Giao thông vận tải TP.HCM). 2 năm sau, mình đã qua 3 lần internship, build 14 dự án, và đang làm remote backend tại GoPlay Tech. Đây là những gì mình học được.",
      "## Bài học 1: Build to learn, không phải learn to build\n\nNăm đầu mình xem tutorial liên tục nhưng không nhớ gì. Chuyển sang approach: **chọn một project, build đến khi xong, search Google khi cần**.\n\nProject đầu tiên: Multiple-Choice Exam website với Spring Boot + jQuery. Code xấu, kiến trúc tệ, nhưng mình hiểu HTTP request/response, session, database thật sự hoạt động thế nào — không phải qua tutorial.",
      "## Bài học 2: Internship dạy những thứ không có trong sách\n\n3 lần internship của mình:\n\n**Java Internship (2023)**: Học Spring Boot cơ bản, Git workflow theo team, code review\n**C# .NET Internship (2025)**: Clean Architecture, DDD, CQRS — thay đổi hoàn toàn cách mình nghĩ về code organization\n**CloudGO (2026)**: PHP CRM framework, làm việc với codebase 5+ năm tuổi — học cách đọc code người khác\n\nMỗi lần internship mình chọn công ty dạy **tech mới** so với những gì đã biết.",
      "## Bài học 3: Làm luận văn nghiêm túc\n\nNhiều bạn cùng lớp chọn đề tài đơn giản cho nhanh. Mình chọn Hybrid RAG System — đề tài phức tạp nhất mình có thể nghĩ ra.\n\nKết quả: 6 tháng stress, nhiều đêm debug Qdrant + Python FastAPI, nhưng mình học được:\n- Vector databases thực sự hoạt động thế nào\n- Microservices từ first principles\n- Cách đọc paper academic và implement\n\n**Tech stack không có nghĩa gì, problem-solving mới là kỹ năng thật.**",
      "## Gợi ý cho bạn đang bắt đầu\n\n1. **Build > Watch**: 30 phút code > 2 tiếng xem tutorial\n2. **Internship càng sớm càng tốt**: Môi trường thật dạy những thứ không có trong sách giáo khoa\n3. **Đừng chase framework**: Hiểu HTTP, database, auth — framework nào cũng học được trong vài tuần\n4. **Side projects là portfolio thật**: Recruiter xem code, không xem certificate\n5. **Đọc code người khác**: Open source và codebase cũ là giáo viên tốt nhất\n\nMình vẫn đang học mỗi ngày. Nếu bạn muốn hỏi gì, reach out qua email hoặc chat với AI bot trên portfolio này! 🥕",
    ],
  },
];
