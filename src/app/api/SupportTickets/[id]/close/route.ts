import { type NextRequest, NextResponse } from "next/server"
import { closeTicket } from "../../supportTicket.service"

/**
 * POST /api/SupportTickets/:id/close
 * Closes a support ticket (admin only)
 * Implements requirement: Close a Ticket (Admin Only)
 */
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ticketId = Number.parseInt(params.id, 10)

    // Check if user is an admin
    // This is a placeholder for actual auth logic
    const currentUser = { id: 123, isAdmin: true } 

    if (!currentUser.isAdmin) {
      return NextResponse.json({ error: "Unauthorized. Only admins can close tickets" }, { status: 403 })
    }

    const result = await closeTicket(ticketId)

    if (!result) {
      return NextResponse.json({ error: "Support ticket not found" }, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (error: any) {
    console.error(`Error closing support ticket ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to close support ticket", message: error.message }, { status: 500 })
  }
}
