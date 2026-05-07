import { useState, type ReactNode, type ChangeEvent, type FormEvent } from 'react'
import { Button } from '@/shared/ui/Button/Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/Dialog/Dialog'
import { cn } from '@/shared/lib/utils/utils'

export interface ProfileData {
    firstName: string
    lastName: string
    avatarUrl: string
    email: string
}

interface EditProfileModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    initialData: ProfileData
    onSave: (data: ProfileData) => void
}

function Field({ label, className, children }: { label: string; className?: string; children: ReactNode }) {
    return (
        <div className={cn('space-y-1.5', className)}>
            <label className="text-sm font-medium">{label}</label>
            {children}
        </div>
    )
}

const inputClass =
    'w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30'

export function EditProfileModal({ open, onOpenChange, initialData, onSave }: EditProfileModalProps) {
    const [form, setForm] = useState<ProfileData>(initialData)

    function handleChange(field: keyof ProfileData) {
        return (e: ChangeEvent<HTMLInputElement>) =>
            setForm(prev => ({ ...prev, [field]: e.target.value }))
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        onSave(form)
        onOpenChange(false)
    }

    function handleOpenChange(value: boolean) {
        if (!value) setForm(initialData)
        onOpenChange(value)
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редактировать профиль</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Имя">
                            <input
                                className={inputClass}
                                value={form.firstName}
                                onChange={handleChange('firstName')}
                                placeholder="Имя"
                            />
                        </Field>
                        <Field label="Фамилия">
                            <input
                                className={inputClass}
                                value={form.lastName}
                                onChange={handleChange('lastName')}
                                placeholder="Фамилия"
                            />
                        </Field>
                    </div>
                    <Field label="Почта">
                        <input
                            className={inputClass}
                            type="email"
                            value={form.email}
                            onChange={handleChange('email')}
                            placeholder="example@mail.ru"
                        />
                    </Field>
                    <Field label="Ссылка на аватар">
                        <input
                            className={inputClass}
                            value={form.avatarUrl}
                            onChange={handleChange('avatarUrl')}
                            placeholder="https://..."
                        />
                    </Field>
                    <div className="flex justify-end gap-2 pt-2">
                        <Button type="button" variant="destructive" onClick={() => handleOpenChange(false)}>
                            Отмена
                        </Button>
                        <Button type="submit" variant="action">
                            Сохранить
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
