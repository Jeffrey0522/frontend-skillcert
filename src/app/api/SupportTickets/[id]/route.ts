import { type NextRequest, NextResponse } from "next/server"
import { getTicketById, assignTicketToAdmin, updateTicketStatus, deleteTicket } from "../supportTicket.service"
import type { TicketStatus } from "@/types/supportTicket"

/**
 * GET /api/SupportTickets/:id
 * Gets a specific ticket by ID
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ticketId = Number.parseInt(params.id, 10)
    const ticket = await getTicketById(ticketId)

    if (!ticket) {
      return NextResponse.json({ error: "Support ticket not found" }, { status: 404 })
    }

    // Check if user is authorized to view this ticket
    // This is a placeholder for actual auth logic
    const currentUser = { id: 123, isAdmin: true } // Replace with actual user from auth

    if (ticket.user_id !== currentUser.id && !currentUser.isAdmin) {
      return NextResponse.json({ error: "Unauthorized. You can only view your own tickets" }, { status: 403 })
    }

    return NextResponse.json(ticket)
  } catch (error: any) {
    console.error(`Error fetching support ticket ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch support ticket", message: error.message }, { status: 500 })
  }
}

/**
 * PATCH /api/SupportTickets/:id
 * Updates a support ticket
 * - Assign to admin (Assign a Ticket to an Admin - Admin Only)
 * - Update status (Update Ticket Status - Admin Only)
 */
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ticketId = Number.parseInt(params.id, 10)
    const body = await request.json()

    // Check if user is an admin
    // This is a placeholder for actual auth logic
    const currentUser = { id: 123, isAdmin: true } // Replace with actual user from auth

    if (!currentUser.isAdmin) {
      return NextResponse.json({ error: "Unauthorized. Only admins can update tickets" }, { status: 403 })
    }

    let result

    if (body.admin_id !== undefined) {
      // Assign ticket to admin
      result = await assignTicketToAdmin(ticketId, body.admin_id)
    } else if (body.status) {
      // Update ticket status
      result = await updateTicketStatus(ticketId, body.status as TicketStatus)
    } else {
      return NextResponse.json({ error: "Invalid update parameters" }, { status: 400 })
    }

    if (!result) {
      return NextResponse.json({ error: "Support ticket not found" }, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (error: any) {
    console.error(`Error updating support ticket ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update support ticket", message: error.message }, { status: 500 })
  }
}

/**
 * DELETE /api/SupportTickets/:id
 * Deletes a support ticket (admin only)
 * Implements requirement: Delete Ticket (Admin Only)
 */
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ticketId = Number.parseInt(params.id, 10)

    // Check if user is an admin
    // This is a placeholder for actual auth logic
    const currentUser = { id: 123, isAdmin: true } // Replace with actual user from auth

    if (!currentUser.isAdmin) {
      return NextResponse.json({ error: "Unauthorized. Only admins can delete tickets" }, { status: 403 })
    }

    const result = await deleteTicket(ticketId)

    if (!result) {
      return NextResponse.json({ error: "Support ticket not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Support ticket deleted successfully" }, { status: 200 })
  } catch (error: any) {
    console.error(`Error deleting support ticket ${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete support ticket", message: error.message }, { status: 500 })
  }
}

