"use client"

import { useState, useMemo, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Utility functions
function formatNumber(num: number): string {
  return new Intl.NumberFormat("es-CL").format(Math.round(num))
}

function formatCurrency(num: number): string {
  return `$${formatNumber(num)}`
}

function formatPercent(num: number): string {
  return `${num.toFixed(2)}%`
}

// Header Component
function Header() {
  return (
    <header className="bg-[#0F172A] border-b border-[#1E293B] py-10 md:py-14 px-5">
      <div className="max-w-[1100px] mx-auto text-center">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/POLERONESPARA%20IMPRIMIR-01-XRqnSLEY2yFh6w6drj7DhBZabO7zkb.png"
          alt="IA-FILMS by Studio Bianchi"
          className="h-20 md:h-40 lg:h-48 mx-auto mb-5"
        />
        <h2 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
          Cotizador
        </h2>
        <p className="text-[#94A3B8] text-base md:text-lg max-w-2xl mx-auto text-balance">
          Generación de video con IA. Parámetros inteligentes, cálculos en tiempo real.
        </p>
      </div>
    </header>
  )
}

// Number Input with formatting
function NumberInputField({
  label,
  value,
  onChange,
  hint,
  min = 0,
  max,
  step = 1,
  isPercentage = false,
  isCurrency = false,
  readonly = false,
}: {
  label: string
  value: number | string
  onChange?: (value: number) => void
  hint?: string
  min?: number
  max?: number
  step?: number
  isPercentage?: boolean
  isCurrency?: boolean
  readonly?: boolean
}) {
  const [isFocused, setIsFocused] = useState(false)

  const displayValue = useMemo(() => {
    if (readonly) return value.toString()
    if (isFocused) return value.toString()
    if (typeof value === "number") {
      return formatNumber(value)
    }
    return value.toString()
  }, [value, isFocused, readonly])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value.replace(/\./g, "").replace(/,/g, "")
      const numValue = parseFloat(rawValue) || 0
      onChange?.(numValue)
    },
    [onChange]
  )

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-[#0F172A]">{label}</Label>
      <div className="relative">
        {isCurrency && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8] font-medium">
            $
          </span>
        )}
        <Input
          type={isFocused && !readonly ? "number" : "text"}
          value={displayValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          min={min}
          max={max}
          step={step}
          readOnly={readonly}
          className={`
            h-11 rounded-lg border border-[#E2E8F0] bg-white 
            text-[#0F172A] font-medium
            focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20
            transition-all duration-200
            ${isCurrency ? "pl-8" : ""}
            ${isPercentage ? "pr-8" : ""}
            ${readonly ? "bg-[#F8FAFC] cursor-not-allowed" : ""}
          `}
        />
        {isPercentage && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] font-medium">
            %
          </span>
        )}
      </div>
      {hint && <p className="text-xs text-[#94A3B8]">{hint}</p>}
    </div>
  )
}

// Section wrapper
function Section({
  title,
  children,
  highlighted = false,
}: {
  title: string
  children: React.ReactNode
  highlighted?: boolean
}) {
  return (
    <section className="mb-12 md:mb-20">
      <div className="max-w-[1100px] mx-auto px-5">
        <h3 className="text-lg md:text-xl font-bold text-white mb-6">{title}</h3>
        <Card
          className={`
            border rounded-xl shadow-sm
            ${highlighted
              ? "bg-[#F8FAFC] border-l-4 border-l-[#22C55E] border-t-[#E2E8F0] border-r-[#E2E8F0] border-b-[#E2E8F0]"
              : "bg-white border-[#E2E8F0]"
            }
          `}
        >
          <CardContent className="p-5 md:p-7">{children}</CardContent>
        </Card>
      </div>
    </section>
  )
}

// Result Card Component
function ResultCard({
  label,
  value,
  isTotal = false,
}: {
  label: string
  value: number
  isTotal?: boolean
}) {
  if (isTotal) {
    return (
      <div className="bg-gradient-to-br from-[#22C55E] to-[#16A34A] rounded-xl p-5 md:p-6 text-white shadow-lg hover:shadow-xl hover:shadow-[#22C55E]/20 transition-all duration-300 hover:-translate-y-0.5">
        <p className="text-sm font-medium text-white/90 mb-2">{label}</p>
        <p className="text-2xl md:text-3xl font-bold">{formatCurrency(value)}</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 md:p-6 hover:border-[#22C55E] hover:shadow-lg hover:shadow-[#22C55E]/10 transition-all duration-300 hover:-translate-y-0.5">
      <p className="text-sm font-medium text-[#94A3B8] mb-2">{label}</p>
      <p className="text-xl md:text-2xl font-bold text-[#22C55E]">
        {formatCurrency(value)}
      </p>
    </div>
  )
}

// Scenario Card Component
function ScenarioCard({
  emoji,
  name,
  cuadros,
  costoBase,
  utilidad,
  total,
  isActive,
}: {
  emoji: string
  name: string
  cuadros: number
  costoBase: number
  utilidad: number
  total: number
  isActive: boolean
}) {
  return (
    <div
      className={`
        bg-white border rounded-xl p-5 transition-all duration-300 hover:-translate-y-0.5
        ${isActive
          ? "border-[#22C55E] shadow-lg shadow-[#22C55E]/15"
          : "border-[#E2E8F0] hover:border-[#22C55E] hover:shadow-lg hover:shadow-[#22C55E]/10"
        }
      `}
    >
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl">{emoji}</span>
        <span className="font-bold text-[#0F172A]">{name}</span>
        {isActive && (
          <span className="ml-auto text-xs bg-[#22C55E] text-white px-2 py-1 rounded-full font-medium">
            Actual
          </span>
        )}
      </div>
      <div className="space-y-2 text-sm text-[#94A3B8] mb-4">
        <p>
          Cuadros: <span className="text-[#0F172A] font-medium">{cuadros}</span>
        </p>
        <p>
          Costo Base:{" "}
          <span className="text-[#0F172A] font-medium">{formatCurrency(costoBase)}</span>
        </p>
        <p>
          Utilidad:{" "}
          <span className="text-[#0F172A] font-medium">{formatCurrency(utilidad)}</span>
        </p>
      </div>
      <div className="bg-gradient-to-r from-[#22C55E] to-[#16A34A] rounded-lg p-3 text-center">
        <p className="text-white text-lg font-bold">{formatCurrency(total)}</p>
      </div>
    </div>
  )
}

// Breakdown Table Component
function BreakdownTable({
  items,
}: {
  items: Array<{
    concepto: string
    monto: number
    porcentajeTotal: number
    porcentajeVenta: number
    highlighted?: boolean
  }>
}) {
  return (
    <div className="overflow-x-auto -mx-5 md:mx-0">
      <table className="w-full min-w-[600px] text-sm">
        <thead>
          <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
            <th className="text-left py-3 px-4 font-semibold text-[#0F172A]">Concepto</th>
            <th className="text-right py-3 px-4 font-semibold text-[#0F172A]">Monto CLP</th>
            <th className="text-right py-3 px-4 font-semibold text-[#0F172A]">% Total</th>
            <th className="text-right py-3 px-4 font-semibold text-[#0F172A]">% Venta</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={item.concepto}
              className={`
                border-b border-[#E2E8F0] transition-colors
                ${item.highlighted ? "bg-[#F8FAFC]" : index % 2 === 0 ? "bg-white" : "bg-[#FAFBFC]"}
              `}
            >
              <td className="py-3 px-4 text-[#0F172A]">{item.concepto}</td>
              <td className="py-3 px-4 text-right font-mono text-[#0F172A]">
                {formatCurrency(item.monto)}
              </td>
              <td className="py-3 px-4 text-right font-mono text-[#22C55E]">
                {formatPercent(item.porcentajeTotal)}
              </td>
              <td className="py-3 px-4 text-right font-mono text-[#22C55E]">
                {formatPercent(item.porcentajeVenta)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// Footer Component
function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-white py-10 px-5">
      <div className="max-w-[1100px] mx-auto text-center">
        <p className="text-[#22C55E] font-bold text-lg mb-2">IA-FILMS × BangAI</p>
        <p className="text-[#94A3B8] text-sm mb-4">
          Cotizador Premium | Producción de Video con IA
        </p>
        <p className="text-[#94A3B8] text-xs">
          © 2026 BangAI. EL SISTEMA, NO LA SOLUCIÓN.
        </p>
      </div>
    </footer>
  )
}

// Main Cotizador Component
export function Cotizador() {
  // Project state
  const [proyecto, setProyecto] = useState("Comercial Limón Soda Zero")
  const [cuadros, setCuadros] = useState(15)

  // Profit parameters
  const [porcentajeUtilidad, setPorcentajeUtilidad] = useState(30)
  const [porcentajeHonorario, setPorcentajeHonorario] = useState(7)
  const [porcentajeSII, setPorcentajeSII] = useState(15.25)

  // Cost structure
  const [costoIA, setCostoIA] = useState(350000)
  const [costoPost, setCostoPost] = useState(50000)
  const [costoMusica, setCostoMusica] = useState(100000)
  const [costoLocucion, setCostoLocucion] = useState(200000)
  const [costoAudio, setCostoAudio] = useState(500000)
  const [costoAdmin, setCostoAdmin] = useState(300000)

  // Calculations
  const calculations = useMemo(() => {
    // Step 1: Base Cost
    const costoIATotal = cuadros * costoIA
    const costoPostTotal = cuadros * costoPost
    const costoBase =
      costoIATotal + costoPostTotal + costoMusica + costoLocucion + costoAudio + costoAdmin

    // Step 2: Initial Utility
    const utilidadInicial = costoBase * (porcentajeUtilidad / 100)
    const subtotalVenta = costoBase + utilidadInicial

    // Step 3: Producer Fee + SII Retention
    const honorarioLiquido = subtotalVenta * (porcentajeHonorario / 100)
    const retencionSII = honorarioLiquido * (porcentajeSII / 100)
    const totalHonorarioSII = honorarioLiquido + retencionSII

    // Step 4: Updated Total Cost
    const costoTotal = costoBase + totalHonorarioSII

    // Step 5: Final Utility
    const utilidadFinal = costoTotal * (porcentajeUtilidad / 100)
    const ventaNeta = costoTotal + utilidadFinal

    // Step 6: IVA and Total
    const iva = ventaNeta * 0.19
    const totalFactura = ventaNeta + iva

    return {
      costoIATotal,
      costoPostTotal,
      costoBase,
      utilidadInicial,
      subtotalVenta,
      honorarioLiquido,
      retencionSII,
      totalHonorarioSII,
      costoTotal,
      utilidadFinal,
      ventaNeta,
      iva,
      totalFactura,
    }
  }, [
    cuadros,
    costoIA,
    costoPost,
    costoMusica,
    costoLocucion,
    costoAudio,
    costoAdmin,
    porcentajeUtilidad,
    porcentajeHonorario,
    porcentajeSII,
  ])

  // Scenario calculations
  const calculateScenario = useCallback(
    (scenarioCuadros: number) => {
      const costoIATotal = scenarioCuadros * costoIA
      const costoPostTotal = scenarioCuadros * costoPost
      const costoBase =
        costoIATotal + costoPostTotal + costoMusica + costoLocucion + costoAudio + costoAdmin
      const utilidadInicial = costoBase * (porcentajeUtilidad / 100)
      const subtotalVenta = costoBase + utilidadInicial
      const honorarioLiquido = subtotalVenta * (porcentajeHonorario / 100)
      const retencionSII = honorarioLiquido * (porcentajeSII / 100)
      const totalHonorarioSII = honorarioLiquido + retencionSII
      const costoTotal = costoBase + totalHonorarioSII
      const utilidadFinal = costoTotal * (porcentajeUtilidad / 100)
      const ventaNeta = costoTotal + utilidadFinal
      const iva = ventaNeta * 0.19
      const totalFactura = ventaNeta + iva

      return { costoBase, utilidadInicial, totalFactura }
    },
    [
      costoIA,
      costoPost,
      costoMusica,
      costoLocucion,
      costoAudio,
      costoAdmin,
      porcentajeUtilidad,
      porcentajeHonorario,
      porcentajeSII,
    ]
  )

  const scenarios = useMemo(
    () => [
      { emoji: "🟡", name: "Básico", cuadros: 12 },
      { emoji: "🟢", name: "Estándar", cuadros: 15 },
      { emoji: "🔵", name: "Completo", cuadros: 18 },
      { emoji: "🔴", name: "Premium", cuadros: 20 },
    ],
    []
  )

  // Breakdown table items
  const breakdownItems = useMemo(() => {
    const total = calculations.totalFactura
    const venta = calculations.ventaNeta

    return [
      {
        concepto: "Generación IA",
        monto: calculations.costoIATotal,
        porcentajeTotal: (calculations.costoIATotal / total) * 100,
        porcentajeVenta: (calculations.costoIATotal / venta) * 100,
      },
      {
        concepto: "Post Producción",
        monto: calculations.costoPostTotal,
        porcentajeTotal: (calculations.costoPostTotal / total) * 100,
        porcentajeVenta: (calculations.costoPostTotal / venta) * 100,
      },
      {
        concepto: "Música",
        monto: costoMusica,
        porcentajeTotal: (costoMusica / total) * 100,
        porcentajeVenta: (costoMusica / venta) * 100,
      },
      {
        concepto: "Locución",
        monto: costoLocucion,
        porcentajeTotal: (costoLocucion / total) * 100,
        porcentajeVenta: (costoLocucion / venta) * 100,
      },
      {
        concepto: "Estudio de Audio",
        monto: costoAudio,
        porcentajeTotal: (costoAudio / total) * 100,
        porcentajeVenta: (costoAudio / venta) * 100,
      },
      {
        concepto: "Administración",
        monto: costoAdmin,
        porcentajeTotal: (costoAdmin / total) * 100,
        porcentajeVenta: (costoAdmin / venta) * 100,
      },
      {
        concepto: "Honorario Productor",
        monto: calculations.honorarioLiquido,
        porcentajeTotal: (calculations.honorarioLiquido / total) * 100,
        porcentajeVenta: (calculations.honorarioLiquido / venta) * 100,
        highlighted: true,
      },
      {
        concepto: "Retención SII",
        monto: calculations.retencionSII,
        porcentajeTotal: (calculations.retencionSII / total) * 100,
        porcentajeVenta: (calculations.retencionSII / venta) * 100,
        highlighted: true,
      },
      {
        concepto: "Utilidad Operativa",
        monto: calculations.utilidadFinal,
        porcentajeTotal: (calculations.utilidadFinal / total) * 100,
        porcentajeVenta: (calculations.utilidadFinal / venta) * 100,
        highlighted: true,
      },
      {
        concepto: "IVA 19%",
        monto: calculations.iva,
        porcentajeTotal: (calculations.iva / total) * 100,
        porcentajeVenta: (calculations.iva / venta) * 100,
      },
    ]
  }, [calculations, costoMusica, costoLocucion, costoAudio, costoAdmin])

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <Header />

      <main className="py-12 md:py-16">
        {/* Project Section */}
        <Section title="Proyecto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-[#0F172A]">Nombre del Proyecto</Label>
              <Input
                type="text"
                value={proyecto}
                onChange={(e) => setProyecto(e.target.value)}
                className="h-11 rounded-lg border border-[#E2E8F0] bg-white text-[#0F172A] font-medium focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20"
              />
            </div>
            <NumberInputField
              label="Número de Cuadros"
              value={cuadros}
              onChange={setCuadros}
              min={1}
              max={100}
            />
            <NumberInputField
              label="Duración Estimada"
              value="60 segundos"
              readonly
            />
          </div>
        </Section>

        {/* Cost Structure Section */}
        <Section title="Estructura de Costos">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <NumberInputField
              label="Generación IA ($/cuadro)"
              value={costoIA}
              onChange={setCostoIA}
              step={10000}
              isCurrency
            />
            <NumberInputField
              label="Post Producción ($/cuadro)"
              value={costoPost}
              onChange={setCostoPost}
              step={10000}
              isCurrency
            />
            <NumberInputField
              label="Música"
              value={costoMusica}
              onChange={setCostoMusica}
              isCurrency
            />
            <NumberInputField
              label="Locución"
              value={costoLocucion}
              onChange={setCostoLocucion}
              isCurrency
            />
            <NumberInputField
              label="Estudio de Audio"
              value={costoAudio}
              onChange={setCostoAudio}
              isCurrency
            />
            <NumberInputField
              label="Administración"
              value={costoAdmin}
              onChange={setCostoAdmin}
              isCurrency
            />
          </div>
        </Section>

        {/* Results Section */}
        <section className="mb-12 md:mb-20">
          <div className="max-w-[1100px] mx-auto px-5">
            <h3 className="text-lg md:text-xl font-bold text-white mb-6">Resultados</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              <ResultCard label="Costo Base" value={calculations.costoBase} />
              <ResultCard
                label={`Utilidad ${porcentajeUtilidad}%`}
                value={calculations.utilidadFinal}
              />
              <ResultCard
                label={`Honorario ${porcentajeHonorario}%`}
                value={calculations.honorarioLiquido}
              />
              <ResultCard label="Retención SII" value={calculations.retencionSII} />
              <ResultCard label="Costo Total" value={calculations.costoTotal} />
              <ResultCard label="Venta (sin IVA)" value={calculations.ventaNeta} />
              <ResultCard label="IVA 19%" value={calculations.iva} />
              <ResultCard label="TOTAL FACTURA" value={calculations.totalFactura} isTotal />
            </div>
          </div>
        </section>

        {/* Breakdown Table Section */}
        <Section title="Tabla de Desglose">
          <BreakdownTable items={breakdownItems} />
        </Section>

        {/* Profit Parameters Section */}
        <Section title="Parámetros de Ganancia" highlighted>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <NumberInputField
              label="Utilidad Empresa (%)"
              value={porcentajeUtilidad}
              onChange={setPorcentajeUtilidad}
              min={0}
              max={100}
              step={0.5}
              isPercentage
              hint="Margen de ganancia"
            />
            <NumberInputField
              label="Honorario Productor (%)"
              value={porcentajeHonorario}
              onChange={setPorcentajeHonorario}
              min={0}
              max={100}
              step={0.5}
              isPercentage
              hint="Sobre subtotal venta"
            />
            <NumberInputField
              label="Retención SII (%)"
              value={porcentajeSII}
              onChange={setPorcentajeSII}
              min={0}
              max={100}
              step={0.01}
              isPercentage
              hint="Sobre honorario productor"
            />
          </div>
        </Section>

        {/* Scenarios Section */}
        <section className="mb-12 md:mb-20">
          <div className="max-w-[1100px] mx-auto px-5">
            <h3 className="text-lg md:text-xl font-bold text-white mb-6">
              Comparativa de Escenarios
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {scenarios.map((scenario) => {
                const calc = calculateScenario(scenario.cuadros)
                return (
                  <ScenarioCard
                    key={scenario.name}
                    emoji={scenario.emoji}
                    name={scenario.name}
                    cuadros={scenario.cuadros}
                    costoBase={calc.costoBase}
                    utilidad={calc.utilidadInicial}
                    total={calc.totalFactura}
                    isActive={scenario.cuadros === cuadros}
                  />
                )
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
