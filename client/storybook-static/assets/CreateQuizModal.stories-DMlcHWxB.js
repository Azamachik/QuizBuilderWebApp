import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{O as n}from"./iframe-C_i6FxQI.js";import{t as r}from"./jsx-runtime-BGU0mfus.js";import{r as i,t as a}from"./Button-D2XfW02v.js";import{n as o,t as s}from"./StoreDecorator-BJ_JoLeP.js";import{n as c,t as l}from"./CreateQuizModal-TZVQnN8y.js";var u,d,f,p,m,h;t((()=>{u=e(n(),1),i(),c(),o(),d=r(),f={title:`Features/CreateQuiz/CreateQuizModal`,component:l,tags:[`autodocs`],parameters:{layout:`centered`},decorators:[s({user:{authData:{id:`1`,username:`admin`,token:`token`},_inited:!0}})]},p={args:{open:!1,onOpenChange:()=>{}},render:e=>{let[t,n]=(0,u.useState)(!1);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(a,{variant:`action`,onClick:()=>n(!0),children:`Создать тест`}),(0,d.jsx)(l,{...e,open:t,onOpenChange:n})]})}},m={args:{open:!0,onOpenChange:()=>{}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    open: false,
    onOpenChange: () => {}
  },
  render: args => {
    const [open, setOpen] = useState(false);
    return <>
                <Button variant='action' onClick={() => setOpen(true)}>Создать тест</Button>
                <CreateQuizModal {...args} open={open} onOpenChange={setOpen} />
            </>;
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    onOpenChange: () => {}
  }
}`,...m.parameters?.docs?.source}}},h=[`Default`,`AlwaysOpen`]}))();export{m as AlwaysOpen,p as Default,h as __namedExportsOrder,f as default};