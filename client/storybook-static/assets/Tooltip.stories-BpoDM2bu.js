import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-BGU0mfus.js";import{k as n,t as r}from"./lucide-react-BgQkwh6h.js";import{r as i,t as a}from"./Button-D2XfW02v.js";import{a as o,i as s,n as c,r as l,t as u}from"./Tooltip-BaFKnH-V.js";var d,f,p,m,h,g;e((()=>{r(),i(),o(),d=t(),f={title:`Shared/Tooltip`,component:u,tags:[`autodocs`],parameters:{layout:`centered`},decorators:[e=>(0,d.jsx)(l,{children:(0,d.jsx)(e,{})})]},p={render:()=>(0,d.jsxs)(u,{children:[(0,d.jsx)(s,{asChild:!0,children:(0,d.jsx)(a,{variant:`outline`,children:`Наведите`})}),(0,d.jsx)(c,{children:`Подсказка`})]})},m={render:()=>(0,d.jsxs)(u,{children:[(0,d.jsx)(s,{asChild:!0,children:(0,d.jsx)(`button`,{className:`rounded-full p-1 text-muted-foreground hover:text-foreground`,children:(0,d.jsx)(n,{className:`size-5`})})}),(0,d.jsx)(c,{children:`Дополнительная информация`})]})},h={render:()=>(0,d.jsx)(`div`,{className:`flex items-center gap-6`,children:[`top`,`right`,`bottom`,`left`].map(e=>(0,d.jsxs)(u,{children:[(0,d.jsx)(s,{asChild:!0,children:(0,d.jsx)(a,{variant:`outline`,size:`sm`,children:e})}),(0,d.jsxs)(c,{side:e,children:[`Позиция: `,e]})]},e))})},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Tooltip>
            <TooltipTrigger asChild>
                <Button variant='outline'>Наведите</Button>
            </TooltipTrigger>
            <TooltipContent>Подсказка</TooltipContent>
        </Tooltip>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Tooltip>
            <TooltipTrigger asChild>
                <button className='rounded-full p-1 text-muted-foreground hover:text-foreground'>
                    <Info className='size-5' />
                </button>
            </TooltipTrigger>
            <TooltipContent>Дополнительная информация</TooltipContent>
        </Tooltip>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div className='flex items-center gap-6'>
            {(['top', 'right', 'bottom', 'left'] as const).map(side => <Tooltip key={side}>
                    <TooltipTrigger asChild>
                        <Button variant='outline' size='sm'>{side}</Button>
                    </TooltipTrigger>
                    <TooltipContent side={side}>Позиция: {side}</TooltipContent>
                </Tooltip>)}
        </div>
}`,...h.parameters?.docs?.source}}},g=[`Default`,`OnIcon`,`Positions`]}))();export{p as Default,m as OnIcon,h as Positions,g as __namedExportsOrder,f as default};