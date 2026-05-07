import { cn } from '@/shared/lib/utils/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/Tooltip/Tooltip'
import { Card } from '@/shared/ui/Card/Card'

const MONTHS = ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
const MONTHS_GENITIVE = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
// Only show Mon / Wed / Fri to avoid clutter
const DAY_LABELS = ['Пн', '', 'Ср', '', 'Пт', '', '']

type HeatLevel = 0 | 1 | 2 | 3 | 4

const CELL_SIZE = 14
const CELL_GAP = 3
const TOTAL_WEEKS = 53 // extra week to always reach today

// ── date helpers ────────────────────────────────────────────────────────────

const TODAY = (() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
})()

function getMondayOf(date: Date): Date {
    const d = new Date(date)
    const dow = d.getDay() // 0 = Sun
    d.setDate(d.getDate() - (dow === 0 ? 6 : dow - 1))
    d.setHours(0, 0, 0, 0)
    return d
}

// First Monday of the grid: 52 full weeks before the current week's Monday
const HEATMAP_START = (() => {
    const thisMonday = getMondayOf(TODAY)
    const start = new Date(thisMonday)
    start.setDate(thisMonday.getDate() - 52 * 7)
    return start
})()

function getCellDate(wi: number, di: number): Date {
    const d = new Date(HEATMAP_START)
    d.setDate(HEATMAP_START.getDate() + wi * 7 + di)
    return d
}

function formatDate(date: Date): string {
    return `${date.getDate()} ${MONTHS_GENITIVE[date.getMonth()]} ${date.getFullYear()}`
}

// ── data ────────────────────────────────────────────────────────────────────

// null = future (not yet happened)
const HEATMAP_DATA: (HeatLevel | null)[][] = Array.from({ length: TOTAL_WEEKS }, (_, wi) =>
    Array.from({ length: 7 }, (_, di): HeatLevel | null => {
        const date = getCellDate(wi, di)
        if (date.getTime() > TODAY.getTime()) return null
        const r = Math.random()
        if (r < 0.40) return 0
        if (r < 0.65) return 1
        if (r < 0.82) return 2
        if (r < 0.93) return 3
        return 4
    })
)

// Month labels: positioned at the week column that contains the 1st of each month.
// The first month (may not have its 1st visible) is always shown at wi=0.
const MONTH_LABELS: { wi: number; label: string }[] = (() => {
    const labels: { wi: number; label: string }[] = []
    const seen = new Set<number>()

    const startMonth = HEATMAP_START.getMonth()
    labels.push({ wi: 0, label: MONTHS[startMonth] })
    seen.add(startMonth)

    for (let wi = 0; wi < TOTAL_WEEKS; wi++) {
        for (let di = 0; di < 7; di++) {
            const d = getCellDate(wi, di)
            if (d.getTime() > TODAY.getTime()) break
            if (d.getDate() === 1) {
                const m = d.getMonth()
                if (!seen.has(m)) {
                    labels.push({ wi, label: MONTHS[m] })
                    seen.add(m)
                }
                break
            }
        }
    }

    return labels
})()

// ── styles ──────────────────────────────────────────────────────────────────

function cellColorClass(level: HeatLevel): string {
    const map: Record<HeatLevel, string> = {
        0: 'bg-muted',
        1: 'bg-[#9be9a8] dark:bg-[#1a4728]',
        2: 'bg-[#40c463] dark:bg-[#236336]',
        3: 'bg-[#30a14e] dark:bg-[#2ea04c]',
        4: 'bg-[#216e39] dark:bg-[#3dd966]',
    }
    return map[level]
}

// ── component ────────────────────────────────────────────────────────────────

export function ActivityHeatmap() {
    return (
        <Card className="p-6">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-base font-semibold">Активность</h2>
            </div>

            <div className="flex gap-3">
                {/* Day labels */}
                <div className="flex shrink-0 flex-col gap-[3px]">
                    {DAY_LABELS.map((label, i) => (
                        <div key={i} className="flex h-[14px] w-6 items-center">
                            {label && (
                                <span className="text-[10px] leading-none text-muted-foreground">{label}</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Grid + month labels */}
                <div className="min-w-0 flex-1">
                    <div className="flex gap-[3px]">
                        {HEATMAP_DATA.map((week, wi) => (
                            <div key={wi} className="flex flex-col gap-[3px]">
                                {week.map((level, di) => {
                                    if (level === null) {
                                        return <div key={di} className="h-[14px] w-[14px]" />
                                    }
                                    return (
                                        <Tooltip key={di}>
                                            <TooltipTrigger asChild>
                                                <div
                                                    className={cn(
                                                        'h-[14px] w-[14px] cursor-default rounded-[3px]',
                                                        cellColorClass(level)
                                                    )}
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent className="text-center">
                                                <div className="font-medium">{formatDate(getCellDate(wi, di))}</div>
                                                <div className="text-xs text-muted-foreground">
                                                    {level === 0 ? 'Нет прохождений' : `${level * 5} прохождений`}
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                    )
                                })}
                            </div>
                        ))}
                    </div>

                    {/* Month labels — absolutely positioned at the correct column */}
                    <div className="relative mt-1.5 h-4">
                        {MONTH_LABELS.map(({ wi, label }) => (
                            <span
                                key={`${wi}-${label}`}
                                className="absolute text-[10px] text-muted-foreground"
                                style={{ left: wi * (CELL_SIZE + CELL_GAP) }}
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Legend */}
            <div className="mt-3 flex items-center justify-end gap-1.5">
                {([0, 1, 2, 3, 4] as HeatLevel[]).map(level => (
                    <div
                        key={level}
                        className={cn('h-[14px] w-[14px] rounded-[3px]', cellColorClass(level))}
                    />
                ))}
            </div>
        </Card>
    )
}
