import { cn } from '@/shared/lib/utils/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/Tooltip/Tooltip'
import { Card } from '@/shared/ui/Card/Card'

const MONTHS = ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
const DAY_LABELS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const MONTHS_GENITIVE = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

type HeatLevel = 0 | 1 | 2 | 3 | 4

function generateHeatmapData(): HeatLevel[][] {
    return Array.from({ length: 52 }, () =>
        Array.from({ length: 7 }, (): HeatLevel => {
            const r = Math.random()
            if (r < 0.40) return 0
            if (r < 0.65) return 1
            if (r < 0.82) return 2
            if (r < 0.93) return 3
            return 4
        })
    )
}

function getHeatmapStartDate(): Date {
    const today = new Date()
    const start = new Date(today)
    start.setDate(today.getDate() - 52 * 7)
    const dow = start.getDay()
    start.setDate(start.getDate() - (dow === 0 ? 6 : dow - 1))
    return start
}

function formatCellDate(wi: number, di: number, start: Date): string {
    const date = new Date(start)
    date.setDate(start.getDate() + wi * 7 + di)
    return `${date.getDate()} ${MONTHS_GENITIVE[date.getMonth()]} ${date.getFullYear()}`
}

const HEATMAP_DATA: HeatLevel[][] = generateHeatmapData()
const HEATMAP_START = getHeatmapStartDate()

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

export function ActivityHeatmap() {
    return (
        <Card className="p-6">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-base font-semibold">Активность</h2>
            </div>

            <div className="flex gap-3">
                <div className="flex shrink-0 flex-col gap-[3px]">
                    {DAY_LABELS.map((label, i) => (
                        <div key={i} className="flex h-[14px] w-6 items-center">
                            {label && (
                                <span className="text-[10px] leading-none text-muted-foreground">{label}</span>
                            )}
                        </div>
                    ))}
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex gap-[3px]">
                        {HEATMAP_DATA.map((week, wi) => (
                            <div key={wi} className="flex flex-col gap-[3px]">
                                {week.map((level, di) => (
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
                                            <div className="font-medium">{formatCellDate(wi, di, HEATMAP_START)}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {level === 0 ? 'Нет прохождений' : `${level * 5} прохождений`}
                                            </div>
                                        </TooltipContent>
                                    </Tooltip>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="mt-1.5 flex justify-between">
                        {MONTHS.map(month => (
                            <span key={month} className="text-[10px] text-muted-foreground">
                                {month}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

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