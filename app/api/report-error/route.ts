import { NextRequest, NextResponse } from "next/server"

// Configuração do Google Sheets
const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL

interface ErrorReport {
  gameName: string
  gameId: string
  errorTypes: string[]
  description: string
  timestamp: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ErrorReport = await request.json()

    // Validação
    if (!body.gameName || !body.gameId || !body.errorTypes || !body.description) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes" },
        { status: 400 }
      )
    }

    // Se a URL do Google Sheets não estiver configurada, apenas loga no console
    if (!GOOGLE_SHEETS_URL) {
      console.log("Erro reportado (Google Sheets não configurado):", {
        ...body,
        errorTypes: body.errorTypes.join(", "),
      })
      
      return NextResponse.json({
        success: true,
        message: "Reporte recebido (modo console)",
      })
    }

    // Envia para o Google Sheets via webhook
    const response = await fetch(GOOGLE_SHEETS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gameName: body.gameName,
        gameId: body.gameId,
        errorTypes: body.errorTypes.join(", "),
        description: body.description,
        timestamp: body.timestamp,
        url: `${request.headers.get("origin")}/game/${body.gameId}`,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to send to Google Sheets")
    }

    return NextResponse.json({
      success: true,
      message: "Erro reportado com sucesso",
    })
  } catch (error) {
    console.error("Error processing report:", error)
    return NextResponse.json(
      { error: "Erro ao processar o reporte" },
      { status: 500 }
    )
  }
}
