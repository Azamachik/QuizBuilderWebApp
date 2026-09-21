import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{O as n}from"./iframe-C_i6FxQI.js";import{t as r}from"./jsx-runtime-BGU0mfus.js";import{r as i,t as a}from"./Button-D2XfW02v.js";import{n as o,t as s}from"./CreateQuestionModal-CEa4lTNk.js";var c,l,u,d,f,p,m,h;t((()=>{c=e(n(),1),i(),o(),l=r(),{fn:u}=__STORYBOOK_MODULE_TEST__,d={title:`Features/CreateQuestion/CreateQuestionModal`,component:s,tags:[`autodocs`],parameters:{layout:`centered`},args:{onSave:u()}},f={args:{open:!1,onOpenChange:()=>{}},render:e=>{let[t,n]=(0,c.useState)(!1);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(a,{variant:`action`,onClick:()=>n(!0),children:`Добавить вопрос`}),(0,l.jsx)(s,{...e,open:t,onOpenChange:n})]})}},p={args:{open:!1,onOpenChange:()=>{}},render:e=>{let[t,n]=(0,c.useState)(!1);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(a,{variant:`outline`,onClick:()=>n(!0),children:`Редактировать вопрос`}),(0,l.jsx)(s,{...e,open:t,onOpenChange:n,title:`Редактировать вопрос`,initialData:{text:`Что такое Закон Фиттса?`,type:`single`,required:!0,options:[{id:`a`,text:`Чем дальше и меньше цель`,isCorrect:!0},{id:`b`,text:`Время зависит от вариантов`,isCorrect:!1}]}})]})}},m={args:{open:!0,onOpenChange:()=>{}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    open: false,
    onOpenChange: () => {}
  },
  render: args => {
    const [open, setOpen] = useState(false);
    return <>
                <Button variant='action' onClick={() => setOpen(true)}>Добавить вопрос</Button>
                <CreateQuestionModal {...args} open={open} onOpenChange={setOpen} />
            </>;
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    open: false,
    onOpenChange: () => {}
  },
  render: args => {
    const [open, setOpen] = useState(false);
    return <>
                <Button variant='outline' onClick={() => setOpen(true)}>Редактировать вопрос</Button>
                <CreateQuestionModal {...args} open={open} onOpenChange={setOpen} title='Редактировать вопрос' initialData={{
        text: 'Что такое Закон Фиттса?',
        type: 'single',
        required: true,
        options: [{
          id: 'a',
          text: 'Чем дальше и меньше цель',
          isCorrect: true
        }, {
          id: 'b',
          text: 'Время зависит от вариантов',
          isCorrect: false
        }]
      }} />
            </>;
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    onOpenChange: () => {}
  }
}`,...m.parameters?.docs?.source}}},h=[`CreateMode`,`EditMode`,`AlwaysOpen`]}))();export{m as AlwaysOpen,f as CreateMode,p as EditMode,h as __namedExportsOrder,d as default};