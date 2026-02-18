"use client"

import { useState } from "react"
import { AlertCircle, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

interface ReportErrorDialogProps {
  gameName: string
  gameId: string
}

type ErrorType = "trailer" | "description" | "images" | "storeLink" | "requirements" | "other"

export function ReportErrorDialog({ gameName, gameId }: ReportErrorDialogProps) {
  const [open, setOpen] = useState(false)
  const [errorTypes, setErrorTypes] = useState<ErrorType[]>([])
  const [description, setDescription] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const errorOptions = [
    { value: "trailer" as ErrorType, label: "Trailer incorreto ou ausente" },
    { value: "description" as ErrorType, label: "Descrição incorreta" },
    { value: "images" as ErrorType, label: "Imagens/Screenshots incorretas" },
    { value: "storeLink" as ErrorType, label: "Link da loja quebrado" },
    { value: "requirements" as ErrorType, label: "Requisitos incorretos" },
    { value: "other" as ErrorType, label: "Outro problema" },
  ]

  const handleCheckboxChange = (type: ErrorType, checked: boolean) => {
    if (checked) {
      setErrorTypes([...errorTypes, type])
    } else {
      setErrorTypes(errorTypes.filter((t) => t !== type))
    }
  }

  const getBrasiliaTimestamp = () => {
    const now = new Date()
    
    // Formatar data no padrão de Brasília
    const formatter = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    
    const parts = formatter.formatToParts(now)
    const getValue = (type: string) => parts.find((p) => p.type === type)?.value || ""
    
    // Formato: DD/MM/YYYY HH:mm:ss
    return `${getValue("day")}/${getValue("month")}/${getValue("year")} ${getValue("hour")}:${getValue("minute")}:${getValue("second")}`
  }

  const handleSubmit = async () => {
    if (errorTypes.length === 0) {
      toast.error("Selecione pelo menos um tipo de erro")
      return
    }

    if (!description.trim()) {
      toast.error("Por favor, descreva o problema")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/report-error", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameName,
          gameId,
          errorTypes,
          description: description.trim(),
          timestamp: getBrasiliaTimestamp(),
        }),
      })

      if (response.ok) {
        toast.success("Erro reportado com sucesso! Obrigado pela contribuição.")
        setOpen(false)
        setErrorTypes([])
        setDescription("")
      } else {
        throw new Error("Failed to submit")
      }
    } catch (error) {
      console.error("Error submitting report:", error)
      toast.error("Erro ao enviar o reporte. Tente novamente mais tarde.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <AlertCircle className="h-4 w-4" />
          Reportar Erro
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reportar Erro</DialogTitle>
          <DialogDescription>
            Encontrou algum problema com as informações de <strong>{gameName}</strong>? 
            Ajude-nos a melhorar reportando o erro.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-3">
            <Label>Tipo de erro (selecione um ou mais)</Label>
            {errorOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox
                  id={option.value}
                  checked={errorTypes.includes(option.value)}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange(option.value, checked as boolean)
                  }
                />
                <label
                  htmlFor={option.value}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  {option.label}
                </label>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição do problema</Label>
            <Textarea
              id="description"
              placeholder="Descreva o problema encontrado em detalhes..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting} className="gap-2">
            {isSubmitting ? (
              <>Enviando...</>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Enviar Reporte
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
