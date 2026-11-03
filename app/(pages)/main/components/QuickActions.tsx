"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Activity, Users, BarChart3, Settings } from "lucide-react"
import Link from "next/link"

const quickActions = [
  {
    icon: Activity,
    title: "시스템 상태",
    description: "API 모니터링",
    href: "/health-check",
    gradient: "from-blue-50 to-blue-100",
    iconColor: "text-blue-600"
  },
  {
    icon: Users,
    title: "사용자 관리",
    description: "계정 관리",
    href: "#",
    gradient: "from-green-50 to-green-100",
    iconColor: "text-green-600"
  },
  {
    icon: BarChart3,
    title: "분석 대시보드",
    description: "성능 분석",
    href: "#",
    gradient: "from-purple-50 to-purple-100",
    iconColor: "text-purple-600"
  },
  {
    icon: Settings,
    title: "시스템 설정",
    description: "환경 설정",
    href: "#",
    gradient: "from-orange-50 to-orange-100",
    iconColor: "text-orange-600"
  }
]

export default function QuickActions() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">빠른 액션</h3>
          <p className="text-gray-600">자주 사용하는 기능에 빠르게 접근하세요</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Link key={index} href={action.href}>
                <Card className={`hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br ${action.gradient}`}>
                  <CardContent className="p-6 text-center">
                    <Icon className={`h-8 w-8 ${action.iconColor} mx-auto mb-3`} />
                    <h4 className="font-semibold text-gray-900 mb-2">{action.title}</h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
