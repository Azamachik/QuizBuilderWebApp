import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/shared/ui/Button/Button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/Dialog/Dialog'

interface ShareModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    username: string
}

export function ShareModal({ open, onOpenChange, username }: ShareModalProps) {
    const [copied, setCopied] = useState(false)

    const profileUrl = `${window.location.origin}/profile/${username}`

    function handleCopy() {
        navigator.clipboard.writeText(profileUrl).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Поделиться профилем</DialogTitle>
                </DialogHeader>
                <p className="mb-4 text-sm text-muted-foreground">
                    Скопируйте ссылку и отправьте её кому угодно.
                </p>
                <div className="flex gap-2">
                    <input
                        readOnly
                        value={profileUrl}
                        className="min-w-0 flex-1 rounded-xl border border-border bg-muted px-3 py-2 text-sm text-muted-foreground outline-none"
                    />
                    <Button type="button" variant="action" size="icon" onClick={handleCopy} className="shrink-0">
                        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
