

# Plan: Thêm Auto-play cho Carousel

## Cách tiếp cận
Sử dụng plugin `embla-carousel-autoplay` — plugin chính thức của Embla Carousel (đã cài sẵn embla-carousel-react).

## Thay đổi

### 1. Cài package `embla-carousel-autoplay`

### 2. File: `src/pages/AllProjects.tsx`
- Import `Autoplay` từ `embla-carousel-autoplay`
- Thêm prop `plugins` vào `<Carousel>`:
```tsx
import Autoplay from "embla-carousel-autoplay";

<Carousel
  className="w-full"
  plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
>
```

`stopOnInteraction: true` sẽ dừng auto-play khi người dùng tương tác (click prev/next), tránh gây khó chịu.

Chỉ cần thay đổi duy nhất dòng `<Carousel className="w-full">` thành dòng có thêm `plugins` prop. Rất đơn giản, không ảnh hưởng gì khác.

