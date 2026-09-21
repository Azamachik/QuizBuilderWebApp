import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{O as n}from"./iframe-C_i6FxQI.js";import{t as r}from"./jsx-runtime-BGU0mfus.js";import{r as i,t as a}from"./Button-D2XfW02v.js";import{a as o,i as s,n as c,r as l,t as u}from"./Dialog-5r3DbY04.js";var d,f,p,m,h,g,_;t((()=>{d=e(n(),1),i(),o(),f=r(),p={title:`Shared/Dialog`,component:u,tags:[`autodocs`],parameters:{layout:`centered`}},m={render:()=>{let[e,t]=(0,d.useState)(!1);return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(a,{variant:`action`,onClick:()=>t(!0),children:`Открыть диалог`}),(0,f.jsx)(u,{open:e,onOpenChange:t,children:(0,f.jsxs)(c,{children:[(0,f.jsx)(l,{children:(0,f.jsx)(s,{children:`Редактировать тест`})}),(0,f.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Содержимое модального окна. Нажмите × или кликните снаружи, чтобы закрыть.`}),(0,f.jsxs)(`div`,{className:`flex justify-end gap-2 pt-2`,children:[(0,f.jsx)(a,{variant:`outline`,onClick:()=>t(!1),children:`Отмена`}),(0,f.jsx)(a,{variant:`action`,onClick:()=>t(!1),children:`Сохранить`})]})]})})]})}},h={render:()=>{let[e,t]=(0,d.useState)(!1);return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(a,{variant:`outline`,onClick:()=>t(!0),children:`Создать тест`}),(0,f.jsx)(u,{open:e,onOpenChange:t,children:(0,f.jsxs)(c,{children:[(0,f.jsx)(l,{children:(0,f.jsx)(s,{children:`Новый тест`})}),(0,f.jsxs)(`div`,{className:`space-y-3`,children:[(0,f.jsx)(`input`,{className:`w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none`,placeholder:`Название теста`}),(0,f.jsx)(`textarea`,{className:`w-full resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none`,rows:3,placeholder:`Описание (необязательно)`})]}),(0,f.jsxs)(`div`,{className:`flex justify-end gap-2 pt-2`,children:[(0,f.jsx)(a,{variant:`outline`,onClick:()=>t(!1),children:`Отмена`}),(0,f.jsx)(a,{variant:`action`,onClick:()=>t(!1),children:`Создать`})]})]})})]})}},g={render:()=>(0,f.jsx)(u,{open:!0,children:(0,f.jsxs)(c,{className:`static translate-x-0 translate-y-0 shadow-none`,children:[(0,f.jsx)(l,{children:(0,f.jsx)(s,{children:`Всегда открыт`})}),(0,f.jsx)(`p`,{className:`text-sm text-muted-foreground`,children:`Диалог в статическом режиме для Storybook.`})]})})},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
                <Button variant='action' onClick={() => setOpen(true)}>Открыть диалог</Button>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Редактировать тест</DialogTitle>
                        </DialogHeader>
                        <p className='text-sm text-muted-foreground'>
                            Содержимое модального окна. Нажмите × или кликните снаружи, чтобы закрыть.
                        </p>
                        <div className='flex justify-end gap-2 pt-2'>
                            <Button variant='outline' onClick={() => setOpen(false)}>Отмена</Button>
                            <Button variant='action' onClick={() => setOpen(false)}>Сохранить</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </>;
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
                <Button variant='outline' onClick={() => setOpen(true)}>Создать тест</Button>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Новый тест</DialogTitle>
                        </DialogHeader>
                        <div className='space-y-3'>
                            <input className='w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none' placeholder='Название теста' />
                            <textarea className='w-full resize-none rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none' rows={3} placeholder='Описание (необязательно)' />
                        </div>
                        <div className='flex justify-end gap-2 pt-2'>
                            <Button variant='outline' onClick={() => setOpen(false)}>Отмена</Button>
                            <Button variant='action' onClick={() => setOpen(false)}>Создать</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </>;
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Dialog open>
            <DialogContent className='static translate-x-0 translate-y-0 shadow-none'>
                <DialogHeader>
                    <DialogTitle>Всегда открыт</DialogTitle>
                </DialogHeader>
                <p className='text-sm text-muted-foreground'>Диалог в статическом режиме для Storybook.</p>
            </DialogContent>
        </Dialog>
}`,...g.parameters?.docs?.source}}},_=[`Default`,`WithForm`,`AlwaysOpen`]}))();export{g as AlwaysOpen,m as Default,h as WithForm,_ as __namedExportsOrder,p as default};