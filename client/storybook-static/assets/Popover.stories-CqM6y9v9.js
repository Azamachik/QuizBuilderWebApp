import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-BGU0mfus.js";import{q as n,t as r}from"./lucide-react-BgQkwh6h.js";import{r as i,t as a}from"./Button-D2XfW02v.js";import{i as o,n as s,r as c,t as l}from"./Popover-0kMgyBbo.js";var u,d,f,p,m,h;e((()=>{r(),i(),o(),u=t(),d={title:`Shared/Popover`,component:l,tags:[`autodocs`],parameters:{layout:`centered`}},f={render:()=>(0,u.jsxs)(l,{children:[(0,u.jsx)(c,{asChild:!0,children:(0,u.jsx)(a,{variant:`outline`,children:`Открыть`})}),(0,u.jsxs)(s,{className:`p-4`,children:[(0,u.jsx)(`p`,{className:`text-sm font-semibold`,children:`Заголовок`}),(0,u.jsx)(`p`,{className:`mt-1 text-xs text-muted-foreground`,children:`Содержимое всплывающего окна.`})]})]})},p={render:()=>(0,u.jsxs)(l,{children:[(0,u.jsx)(c,{asChild:!0,children:(0,u.jsxs)(`button`,{className:`flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm text-muted-foreground`,children:[(0,u.jsx)(n,{className:`size-4`}),`Выберите дату`]})}),(0,u.jsx)(s,{className:`p-4 w-64`,children:(0,u.jsx)(`p`,{className:`text-xs text-muted-foreground`,children:`Здесь будет Calendar компонент`})})]})},m={render:()=>(0,u.jsxs)(l,{children:[(0,u.jsx)(c,{asChild:!0,children:(0,u.jsx)(a,{variant:`outline`,children:`Настройки`})}),(0,u.jsxs)(s,{className:`p-4 w-64 space-y-3`,children:[(0,u.jsx)(`p`,{className:`text-sm font-semibold`,children:`Быстрые настройки`}),(0,u.jsx)(`input`,{className:`w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none`,placeholder:`Лимит использований`,type:`number`}),(0,u.jsx)(a,{variant:`action`,className:`w-full`,size:`sm`,children:`Применить`})]})]})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline'>Открыть</Button>
            </PopoverTrigger>
            <PopoverContent className='p-4'>
                <p className='text-sm font-semibold'>Заголовок</p>
                <p className='mt-1 text-xs text-muted-foreground'>Содержимое всплывающего окна.</p>
            </PopoverContent>
        </Popover>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Popover>
            <PopoverTrigger asChild>
                <button className='flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-sm text-muted-foreground'>
                    <CalendarIcon className='size-4' />
                    Выберите дату
                </button>
            </PopoverTrigger>
            <PopoverContent className='p-4 w-64'>
                <p className='text-xs text-muted-foreground'>Здесь будет Calendar компонент</p>
            </PopoverContent>
        </Popover>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline'>Настройки</Button>
            </PopoverTrigger>
            <PopoverContent className='p-4 w-64 space-y-3'>
                <p className='text-sm font-semibold'>Быстрые настройки</p>
                <input className='w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none' placeholder='Лимит использований' type='number' />
                <Button variant='action' className='w-full' size='sm'>Применить</Button>
            </PopoverContent>
        </Popover>
}`,...m.parameters?.docs?.source}}},h=[`Default`,`DatePicker`,`WithForm`]}))();export{p as DatePicker,f as Default,m as WithForm,h as __namedExportsOrder,d as default};