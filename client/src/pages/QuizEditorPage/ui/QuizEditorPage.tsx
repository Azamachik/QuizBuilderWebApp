import * as React from 'react';
import { Eye, Link2, Plus, Save, Send } from 'lucide-react';
import { Button } from '@/shared/ui/Button/Button';
import { useDragSort } from '@/features/DragSort';
import { QuestionCard } from '@/entities/Question';
import type { Question } from '@/entities/Question';
import { CreateQuestionModal } from '@/features/CreateQuestion';

const INITIAL_QUESTIONS: Question[] = [
    {
        id: '1',
        order: 1,
        text: 'Что такое Закон Фиттса?',
        type: 'single',
        options: [
            { id: 'a', text: 'Чем дальше и меньше цель, тем больше времени требуется на ее достижение', isCorrect: true },
            { id: 'b', text: 'Время принятия решения зависит от количества вариантов', isCorrect: false },
            { id: 'c', text: 'Люди запоминают первую и последнюю часть информации лучше', isCorrect: false }
        ],
        required: true
    },
    {
        id: '2',
        order: 2,
        text: 'Какие из этих элементов относятся к UI?',
        type: 'multiple',
        options: [
            { id: 'a', text: 'Типографика', isCorrect: true },
            { id: 'b', text: 'Исследование аудитории', isCorrect: false },
            { id: 'c', text: 'Цветовая палитра', isCorrect: true }
        ],
        required: false
    },
    {
        id: '3',
        order: 3,
        text: 'Опишите ваш опыт работы с UI/UX.',
        type: 'text',
        options: [],
        required: false
    }
];

export default function QuizEditorPage() {
    const [questions, setQuestions] = React.useState<Question[]>(INITIAL_QUESTIONS);
    const [createOpen, setCreateOpen] = React.useState(false);
    const [editingQuestion, setEditingQuestion] = React.useState<Question | null>(null);

    const sorted = [...questions].sort((a, b) => a.order - b.order);
    const { draggingId, getDragHandlers } = useDragSort(sorted, setQuestions);

    function handleCreate(data: Omit<Question, 'id' | 'order'>) {
        const newQuestion: Question = {
            ...data,
            id: crypto.randomUUID(),
            order: questions.length + 1
        };
        setQuestions((prev) => [...prev, newQuestion]);
    }

    function handleUpdate(id: string, data: Omit<Question, 'id' | 'order'>) {
        setQuestions((prev) => prev.map((q) => (q.id === id ? { ...data, id, order: q.order } : q)));
    }

    function handleDelete(id: string) {
        setQuestions((prev) => {
            const filtered = prev.filter((q) => q.id !== id);
            return filtered.map((q, i) => ({ ...q, order: i + 1 }));
        });
    }

    function handleDuplicate(id: string) {
        setQuestions((prev) => {
            const s = [...prev].sort((a, b) => a.order - b.order);
            const idx = s.findIndex((q) => q.id === id);
            if (idx === -1) return prev;
            const copy = { ...s[idx], id: crypto.randomUUID() };
            s.splice(idx + 1, 0, copy);
            return s.map((q, i) => ({ ...q, order: i + 1 }));
        });
    }

    function handleToggleRequired(id: string) {
        setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, required: !q.required } : q)));
    }

    return (
        <div className='min-h-screen bg-background pb-24'>
            <div className='mx-auto max-w-4xl px-6 py-8'>
                <div className='mb-8 rounded-3xl border border-border bg-card p-6'>
                    <h1 className='mb-2 text-3xl font-bold'>Основы UI/UX дизайна</h1>
                    <p className='text-sm text-muted-foreground'>
                        Тест для проверки базовых знаний в области проектирования интерфейсов. Время прохождения: 10 минут.
                    </p>
                </div>

                <div className='space-y-4'>
                    {sorted.map((q, index) => (
                        <QuestionCard
                            key={q.id}
                            question={q}
                            isDragging={draggingId === q.id}
                            isEditing={editingQuestion?.id === q.id}
                            onDelete={handleDelete}
                            onDuplicate={handleDuplicate}
                            onToggleRequired={handleToggleRequired}
                            onEdit={setEditingQuestion}
                            {...getDragHandlers(index, q.id)}
                        />
                    ))}

                    <Button
                        variant='ghost'
                        className='flex h-auto w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border py-10 hover:border-action/50 hover:bg-transparent'
                        onClick={() => setCreateOpen(true)}
                    >
                        <div className='flex h-10 w-10 items-center justify-center rounded-full bg-action'>
                            <Plus className='size-5 text-action-foreground' />
                        </div>
                        <span className='font-semibold'>Добавить новый вопрос</span>
                        <span className='text-xs text-muted-foreground'>Или выберите другой тип контента</span>
                    </Button>
                </div>
            </div>

            <div className='fixed bottom-0 left-0 right-0 flex items-center justify-center gap-3 border-t border-border bg-card px-6 py-3'>
                <Button variant='outline' className='gap-2'>
                    <Save className='size-4' /> Сохранить
                </Button>
                <Button variant='outline' className='gap-2'>
                    <Link2 className='size-4' /> Создать ссылку
                </Button>
                <Button variant='outline' className='gap-2'>
                    <Eye className='size-4' /> Предпросмотр
                </Button>
                <Button variant='action' className='gap-2'>
                    <Send className='size-4' /> Опубликовать
                </Button>
            </div>

            <CreateQuestionModal open={createOpen} onOpenChange={setCreateOpen} onSave={handleCreate} />
            <CreateQuestionModal
                open={!!editingQuestion}
                onOpenChange={(open) => {
                    if (!open) setEditingQuestion(null);
                }}
                onSave={(data) => {
                    if (!editingQuestion) return;
                    handleUpdate(editingQuestion.id, data);
                    setEditingQuestion(null);
                }}
                initialData={editingQuestion ?? undefined}
                title='Редактировать вопрос'
            />
        </div>
    );
}
