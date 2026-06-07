import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000)

  try {
    const deleted = await prisma.user.deleteMany({
      where: {
        createdAt: {
          lt: thirtyMinutesAgo,
        },
      },
    })

    return NextResponse.json({
      success: true,
      deleted: deleted.count,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Cron cleanup error:", error)
    return NextResponse.json({ error: "Cleanup failed" }, { status: 500 })
  }
}
