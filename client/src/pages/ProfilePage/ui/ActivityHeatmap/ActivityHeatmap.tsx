import { cn } from '@/shared/lib/utils/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/ui/Tooltip/Tooltip';
import { Card } from '@/shared/ui/Card/Card';

const MONTHS = ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
const MONTHS_GENITIVE = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
];
const DAY_LABELS = ['Пн', '', 'Ср', '', 'Пт', '', ''];

type HeatLevel = 0 | 1 | 2 | 3 | 4;

const CELL_SIZE = 14;
const CELL_GAP = 3;
const TOTAL_WEEKS = 53;

const TODAY = (() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
})();

function getMondayOf(date: Date): Date {
    const d = new Date(date);
    const dow = d.getDay();
    d.setDate(d.getDate() - (dow === 0 ? 6 : dow - 1));
    d.setHours(0, 0, 0, 0);
    return d;
}

const HEATMAP_START = (() => {
    const thisMonday = getMondayOf(TODAY);
    const start = new Date(thisMonday);
    start.setDate(thisMonday.getDate() - 52 * 7);
    return start;
})();

function getCellDate(wi: number, di: number): Date {
    const d = new Date(HEATMAP_START);
    d.setDate(HEATMAP_START.getDate() + wi * 7 + di);
    return d;
}

function toDateKey(date: Date): string {
    return date.toISOString().slice(0, 10);
}

function formatDate(date: Date): string {
    return `${date.getDate()} ${MONTHS_GENITIVE[date.getMonth()]} ${date.getFullYear()}`;
}

function countToLevel(count: number): HeatLevel {
    if (count === 0) return 0;
    if (count === 1) return 1;
    if (count === 2) return 2;
    if (count <= 4) return 3;
    return 4;
}

function cellColorClass(level: HeatLevel): string {
    const map: Record<HeatLevel, string> = {
        0: 'bg-muted',
        1: 'bg-[#9be9a8] dark:bg-[#1a4728]',
        2: 'bg-[#40c463] dark:bg-[#236336]',
        3: 'bg-[#30a14e] dark:bg-[#2ea04c]',
        4: 'bg-[#216e39] dark:bg-[#3dd966]',
    };
    return map[level];
}

function buildMonthLabels() {
    const labels: { wi: number; label: string }[] = [];
    const seen = new Set<number>();
    labels.push({ wi: 0, label: MONTHS[HEATMAP_START.getMonth()] });
    seen.add(HEATMAP_START.getMonth());

    for (let wi = 0; wi < TOTAL_WEEKS; wi++) {
        for (let di = 0; di < 7; di++) {
            const d = getCellDate(wi, di);
            if (d.getTime() > TODAY.getTime()) break;
            if (d.getDate() === 1) {
                const m = d.getMonth();
                if (!seen.has(m)) {
                    labels.push({ wi, label: MONTHS[m] });
                    seen.add(m);
                }
                break;
            }
        }
    }
    return labels;
}

function pluralQuiz(n: number) {
    if (n === 1) return 'тест создан';
    if (n >= 2 && n <= 4) return 'теста создано';
    return 'тестов создано';
}

interface ActivityHeatmapProps {
    quizDates?: string[];
}

export function ActivityHeatmap({ quizDates = [] }: ActivityHeatmapProps) {
    const countByDay: Record<string, number> = {};
    for (const iso of quizDates) {
        const key = iso.slice(0, 10);
        countByDay[key] = (countByDay[key] ?? 0) + 1;
    }

    const heatmapData: (HeatLevel | null)[][] = Array.from({ length: TOTAL_WEEKS }, (_, wi) =>
        Array.from({ length: 7 }, (_, di): HeatLevel | null => {
            const date = getCellDate(wi, di);
            if (date.getTime() > TODAY.getTime()) return null;
            return countToLevel(countByDay[toDateKey(date)] ?? 0);
        }),
    );

    const monthLabels = buildMonthLabels();
    const yearTotal = quizDates.filter((iso) => {
        const d = new Date(iso);
        return d >= HEATMAP_START && d <= TODAY;
    }).length;

    return (
        <Card className='p-6'>
            <div className='mb-5 flex items-center justify-between'>
                <h2 className='text-base font-semibold'>Активность</h2>
                <span className='text-xs text-muted-foreground'>
                    {yearTotal} {pluralQuiz(yearTotal)} за год
                </span>
            </div>

            <div className='flex gap-3'>
                <div className='flex shrink-0 flex-col gap-[3px]'>
                    {DAY_LABELS.map((label, i) => (
                        <div key={i} className='flex h-[14px] w-6 items-center'>
                            {label && (
                                <span className='text-[10px] leading-none text-muted-foreground'>{label}</span>
                            )}
                        </div>
                    ))}
                </div>

                <div className='min-w-0 flex-1 overflow-x-auto'>
                    <div className='flex gap-[3px]'>
                        {heatmapData.map((week, wi) => (
                            <div key={wi} className='flex flex-col gap-[3px]'>
                                {week.map((level, di) => {
                                    if (level === null) {
                                        return <div key={di} className='h-[14px] w-[14px]' />;
                                    }
                                    const date = getCellDate(wi, di);
                                    const count = countByDay[toDateKey(date)] ?? 0;
                                    return (
                                        <Tooltip key={di}>
                                            <TooltipTrigger asChild>
                                                <div
                                                    className={cn(
                                                        'h-[14px] w-[14px] cursor-default rounded-[3px]',
                                                        cellColorClass(level),
                                                    )}
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent className='text-center'>
                                                <div className='font-medium'>{formatDate(date)}</div>
                                                <div className='text-xs text-muted-foreground'>
                                                    {count === 0 ? 'Нет активности' : `${count} ${pluralQuiz(count)}`}
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    <div className='relative mt-1.5 h-4'>
                        {monthLabels.map(({ wi, label }) => (
                            <span
                                key={`${wi}-${label}`}
                                className='absolute text-[10px] text-muted-foreground'
                                style={{ left: wi * (CELL_SIZE + CELL_GAP) }}
                            >
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className='mt-3 flex items-center justify-end gap-1.5'>
                <span className='mr-1 text-[10px] text-muted-foreground'>Меньше</span>
                {([0, 1, 2, 3, 4] as HeatLevel[]).map((level) => (
                    <div key={level} className={cn('h-[14px] w-[14px] rounded-[3px]', cellColorClass(level))} />
                ))}
                <span className='ml-1 text-[10px] text-muted-foreground'>Больше</span>
            </div>
        </Card>
    );
}
