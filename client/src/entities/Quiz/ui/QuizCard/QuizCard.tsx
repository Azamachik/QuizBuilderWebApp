import { ArrowRight, ClipboardList, Pencil, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/shared/ui/Card/Card';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import type { Quiz } from '../../model/types/Quiz';

interface QuizCardProps {
    quiz: Quiz;
    onEdit: (quiz: Quiz) => void;
}

export function QuizCard({ quiz, onEdit }: QuizCardProps) {
    return (
        <Card className='flex flex-col p-5'>
            <div className='flex items-center justify-between'>
                <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-action/10'>
                    <ClipboardList className='size-5 text-action' />
                </div>
                <StatusBadge status={quiz.status} />
            </div>

            <div className='mt-5 flex-1 space-y-1'>
                <h3 className='text-base font-bold leading-snug'>{quiz.title}</h3>
                <p className='text-sm text-muted-foreground'>{quiz.date}</p>
            </div>

            <div className='mt-6 flex items-center justify-between'>
                <div className='flex items-center gap-1.5 text-sm text-muted-foreground'>
                    <Users className='size-4 shrink-0' />
                    <span>{quiz.participants.toLocaleString('ru-RU')}</span>
                </div>
                <div className='flex items-center gap-1.5'>
                    <button
                        onClick={() => onEdit(quiz)}
                        className='flex h-8 w-8 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground'
                    >
                        <Pencil className='size-3.5' />
                    </button>
                    <Link
                        to={`/quizzes/${quiz.id}`}
                        className='flex h-8 w-8 items-center justify-center rounded-xl bg-action/10 text-action transition-colors hover:bg-action/20'
                    >
                        <ArrowRight className='size-4' />
                    </Link>
                </div>
            </div>
        </Card>
    );
}
