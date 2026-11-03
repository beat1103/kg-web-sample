"use client"

import { Home, CheckCircle, Clock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg">연수원 시스템</span>
            </div>
            <p className="text-gray-400 text-sm">
              환급과정 심사를 위한 통합 관리 플랫폼
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">시스템</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Next.js 15.5.3</li>
              <li>React 19.1.0</li>
              <li>TypeScript</li>
              <li>Turbopack</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">기능</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>JWT 인증</li>
              <li>실시간 모니터링</li>
              <li>중복 로그인 방지</li>
              <li>API 프록시</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">상태</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-400">시스템 정상</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">실시간 업데이트</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2025 KG Standard User Web. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
