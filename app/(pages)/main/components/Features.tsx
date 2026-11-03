"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Activity, Users, BarChart3, Zap, Globe } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "보안 인증",
    subtitle: "JWT 기반 인증",
    description: "안전한 토큰 기반 인증 시스템으로 사용자 보안을 보장합니다.",
    color: "blue"
  },
  {
    icon: Activity,
    title: "실시간 모니터링",
    subtitle: "시스템 상태 추적",
    description: "API 상태와 시스템 성능을 실시간으로 모니터링합니다.",
    color: "green"
  },
  {
    icon: Users,
    title: "사용자 관리",
    subtitle: "중복 로그인 방지",
    description: "중복 로그인 방지와 사용자 세션 관리를 제공합니다.",
    color: "purple"
  },
  {
    icon: BarChart3,
    title: "데이터 분석",
    subtitle: "성능 지표",
    description: "API 응답 시간과 성능 지표를 분석하여 최적화합니다.",
    color: "orange"
  },
  {
    icon: Zap,
    title: "고성능",
    subtitle: "Turbopack 빌드",
    description: "Next.js 15와 Turbopack을 활용한 빠른 개발 환경을 제공합니다.",
    color: "red"
  },
  {
    icon: Globe,
    title: "반응형 디자인",
    subtitle: "모든 디바이스 지원",
    description: "모바일부터 데스크톱까지 모든 디바이스에서 최적화된 경험을 제공합니다.",
    color: "indigo"
  }
]

const colorClasses = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  purple: "bg-purple-100 text-purple-600",
  orange: "bg-orange-100 text-orange-600",
  red: "bg-red-100 text-red-600",
  indigo: "bg-indigo-100 text-indigo-600"
}

export default function Features() {
  return (
    <section className="py-16 bg-white/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">주요 기능</h3>
          <p className="text-gray-600">환급과정 심사를 위한 핵심 기능들을 확인하세요</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <p className="text-sm text-gray-500">{feature.subtitle}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
