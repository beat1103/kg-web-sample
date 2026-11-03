import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 독립 실행형 애플리케이션으로 빌드 (컨테이너화에 최적화)
  output: "standalone",

  // URL 끝에 슬래시(/) 자동 추가 비활성화
  trailingSlash: false,

  // 'X-Powered-By: Next.js' HTTP 헤더 비활성화 (보안상 권장)
  poweredByHeader: false,

  // 컴파일러 설정
  compiler: {
    // 프로덕션 빌드에서 console.log 제거
    removeConsole: process.env.NODE_ENV === "production",
  },

  // 로깅 설정
  logging: {
    // API 요청 로깅 설정
    fetches: {
      // API 요청시 전체 URL 표시 활성화
      fullUrl: true,
    },
  },
};

export default nextConfig;
