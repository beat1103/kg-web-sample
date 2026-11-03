"use client"

import { Button } from "@/components/ui/button"
import { Activity, Settings } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            KG 에듀원 LMS
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            안전하고 효율적인 환급과정 심사를 위한 통합 관리 플랫폼입니다.
            <br />
            실시간 모니터링과 체계적인 심사 프로세스를 제공합니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/health-check">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                <Activity className="h-5 w-5 mr-2" />
                시스템 상태 확인
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-3">
              <Settings className="h-5 w-5 mr-2" />
              설정
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
