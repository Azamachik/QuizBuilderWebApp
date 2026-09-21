import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-BGU0mfus.js";import{a as n,i as r,n as i,r as a,t as o}from"./Accordion-DKmHgybu.js";var s,c,l,u,d,f,p;e((()=>{n(),s=t(),c={title:`Shared/Accordion`,component:o,tags:[`autodocs`],parameters:{layout:`centered`}},l=[{value:`q1`,trigger:`Как создать тест?`,content:`Нажмите кнопку «Создать тест» в панели управления.`},{value:`q2`,trigger:`Можно ли редактировать опубликованный тест?`,content:`Да, вы можете редактировать тест в любое время.`},{value:`q3`,trigger:`Как поделиться тестом?`,content:`Скопируйте ссылку из меню «Создать ссылку».`}],u={args:{type:`single`},render:()=>(0,s.jsx)(`div`,{className:`w-[480px]`,children:(0,s.jsx)(o,{type:`single`,collapsible:!0,className:`space-y-2`,children:l.map(({value:e,trigger:t,content:n})=>(0,s.jsxs)(a,{value:e,children:[(0,s.jsx)(r,{children:t}),(0,s.jsx)(i,{children:n})]},e))})})},d={args:{type:`multiple`},render:()=>(0,s.jsx)(`div`,{className:`w-[480px]`,children:(0,s.jsx)(o,{type:`multiple`,className:`space-y-2`,children:l.map(({value:e,trigger:t,content:n})=>(0,s.jsxs)(a,{value:e,children:[(0,s.jsx)(r,{children:t}),(0,s.jsx)(i,{children:n})]},e))})})},f={args:{type:`single`},render:()=>(0,s.jsx)(`div`,{className:`w-[480px]`,children:(0,s.jsx)(o,{type:`single`,defaultValue:`q1`,collapsible:!0,className:`space-y-2`,children:l.map(({value:e,trigger:t,content:n})=>(0,s.jsxs)(a,{value:e,children:[(0,s.jsx)(r,{children:t}),(0,s.jsx)(i,{children:n})]},e))})})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'single' as const
  },
  render: () => <div className='w-[480px]'>
            <Accordion type='single' collapsible className='space-y-2'>
                {items.map(({
        value,
        trigger,
        content
      }) => <AccordionItem key={value} value={value}>
                        <AccordionTrigger>{trigger}</AccordionTrigger>
                        <AccordionContent>{content}</AccordionContent>
                    </AccordionItem>)}
            </Accordion>
        </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'multiple' as const
  },
  render: () => <div className='w-[480px]'>
            <Accordion type='multiple' className='space-y-2'>
                {items.map(({
        value,
        trigger,
        content
      }) => <AccordionItem key={value} value={value}>
                        <AccordionTrigger>{trigger}</AccordionTrigger>
                        <AccordionContent>{content}</AccordionContent>
                    </AccordionItem>)}
            </Accordion>
        </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'single' as const
  },
  render: () => <div className='w-[480px]'>
            <Accordion type='single' defaultValue='q1' collapsible className='space-y-2'>
                {items.map(({
        value,
        trigger,
        content
      }) => <AccordionItem key={value} value={value}>
                        <AccordionTrigger>{trigger}</AccordionTrigger>
                        <AccordionContent>{content}</AccordionContent>
                    </AccordionItem>)}
            </Accordion>
        </div>
}`,...f.parameters?.docs?.source}}},p=[`Single`,`Multiple`,`DefaultOpen`]}))();export{f as DefaultOpen,d as Multiple,u as Single,p as __namedExportsOrder,c as default};