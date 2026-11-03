# 빌드 스테이지
FROM node:22-alpine AS builder

# DEPLOY_ENV 인자 정의 및 환경변수 설정
ARG PROFILES_ACTIVE
RUN echo "Builder stage - ${PROFILES_ACTIVE}"

WORKDIR /app

# pnpm 설치
RUN npm install -g pnpm

# 패키지 파일 복사
COPY package.json pnpm-lock.yaml ./

# 의존성 설치
RUN pnpm install --frozen-lockfile

# 소스 파일 복사
COPY . .

# 환경 파일 복사 (DEPLOY_ENV에 따라)
COPY .env.${PROFILES_ACTIVE} .env.local

# 환경 변수 설정 및 빌드
ENV NODE_ENV=production
RUN pnpm run build

# 실행 스테이지
FROM node:22-alpine AS runner

# DEPLOY_ENV 인자 정의 및 환경변수 설정
ARG PROFILES_ACTIVE
RUN echo "Runner stage - ${PROFILES_ACTIVE}"

WORKDIR /app

# 필요한 파일만 복사
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# 환경 변수 설정
ENV PORT=3000

EXPOSE ${PORT}

# 실행
CMD ["node", "server.js"]

# 이미지 빌드
# 개발 환경: docker build --build-arg PROFILES_ACTIVE=development -t kg-standard-user-web .
# 운영 환경: docker build --build-arg PROFILES_ACTIVE=production -t kg-standard-user-web .

# 컨테이너 실행
# 개발 환경: docker run -d -p 3000:3000 --restart=always --name kg-standard-user-web kg-standard-user-web
# 운영 환경: docker run -d -p 3001:3000 --restart=always --name kg-standard-user-web kg-standard-user-web

