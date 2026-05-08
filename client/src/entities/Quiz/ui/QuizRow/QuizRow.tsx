import { ArrowRight, ClipboardList, Pencil, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/shared/ui/Card/Card';
import { StatusBadge } from '../StatusBadge/StatusBadge';
import type { Quiz } from '../../model/types/Quiz';

interface QuizRowProps {
    quiz: Quiz;
    onEdit: (quiz: Quiz) => void;
}

export function QuizRow({ quiz, onEdit }: QuizRowProps) {
    return (
        <Card className='flex items-center gap-4 px-5 py-4'>
            <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-action/10'>
                <ClipboardList className='size-5 text-action' />
            </div>

            <div className='min-w-0 flex-1'>
                <p className='font-semibold leading-snug'>{quiz.title}</p>
                <p className='text-sm text-muted-foreground'>{quiz.date}</p>
            </div>

            <StatusBadge status={quiz.status} />

            <div className='flex items-center gap-1.5 text-sm text-muted-foreground'>
                <Users className='size-4 shrink-0' />
                <span>{quiz.participants.toLocaleString('ru-RU')}</span>
            </div>

            <button
                onClick={() => onEdit(quiz)}
                className='flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground'
            >
                <Pencil className='size-3.5' />
            </button>
            <Link
                to={`/quizzes/${quiz.id}`}
                className='flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-action/10 text-action transition-colors hover:bg-action/20'
            >
                <ArrowRight className='size-4' />
            </Link>
        </Card>
    );
}
