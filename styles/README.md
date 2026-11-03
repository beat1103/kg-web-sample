## Style Css 작성 가이드

퍼블리셔가 작성하는 스타일 가이드입니다.

# css 작업 규칙

1. 공통요소는 무조건 컨포넌트로 모듈화해서 진행 하고 component.css에서 적용

2. 공통으로 class가 아닌 경우 특정 페이지에서만 적용이 된다면  페이지명 class를 가지고 진행

 ※ 로그인 페이지라면 [class*="login"] (하위페이지에도 필요하다면 적용 가능하게 하기 위함 )
    로그인 -> 아이디 찾기 :[class*="login"].find-id

3. 반응형은 기준을 tailwindcss로 잡는다.

breakpoint

 - sm: 640px
 - md:768px
 - lg:1024px
 - xl: 1280px
 - 2xl:1536px

 그리고 상위 breakpoint에서 css가 적용되어 있다면, 하위 breakpoint에서는 중복으로 사용하지 않는다.


    