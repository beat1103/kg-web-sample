## 컨텍스트 작성

### 컨텍스트 작성이 필요한 상황
- 얼럿, 로딩과 같은 기본 공유 컴포넌트

### 작성 방법
1. 컨텍스트 파일 생성
2. 해당 컨텍스트가 필요한 레이아웃에 래핑

### 예시
```typescript
export default function RootLayout({children,}: Readonly<{
   children: React.ReactNode
}>) {
   return (
      <html lang="en" suppressHydrationWarning>
        <body className={`${pretendard.className} antialiased`}>
          <ThemeProvider
               attribute="class"
               defaultTheme="light"
               enableSystem
               disableTransitionOnChange 
          >
             <LoadingProvider>
              <DialogProvider>
                {children}
              </DialogProvider>
             </LoadingProvider>
            <Toaster /> 
          </ThemeProvider>
        </body>
      </html>
  )
}
```