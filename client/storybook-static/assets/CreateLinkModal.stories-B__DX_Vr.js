import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{O as n}from"./iframe-C_i6FxQI.js";import{t as r}from"./jsx-runtime-BGU0mfus.js";import{r as i,t as a}from"./Button-D2XfW02v.js";import{n as o,t as s}from"./StoreDecorator-BJ_JoLeP.js";import{n as c,t as l}from"./CreateLinkModal-CL1rpGqR.js";var u,d,f,p,m,h;t((()=>{u=e(n(),1),i(),c(),o(),d=r(),f={title:`Features/CreateLink/CreateLinkModal`,component:l,tags:[`autodocs`],parameters:{layout:`centered`},decorators:[s({user:{authData:{id:`1`,username:`admin`,token:`token`},_inited:!0}})]},p={args:{quizId:`1`,open:!1,onOpenChange:()=>{}},render:e=>{let[t,n]=(0,u.useState)(!1);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(a,{variant:`outline`,onClick:()=>n(!0),children:`Создать ссылку`}),(0,d.jsx)(l,{...e,quizId:`1`,open:t,onOpenChange:n})]})}},m={args:{quizId:`1`,open:!0,onOpenChange:()=>{}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    quizId: '1',
    open: false,
    onOpenChange: () => {}
  },
  render: args => {
    const [open, setOpen] = useState(false);
    return <>
                <Button variant='outline' onClick={() => setOpen(true)}>Создать ссылку</Button>
                <CreateLinkModal {...args} quizId='1' open={open} onOpenChange={setOpen} />
            </>;
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    quizId: '1',
    open: true,
    onOpenChange: () => {}
  }
}`,...m.parameters?.docs?.source}}},h=[`Default`,`AlwaysOpen`]}))();export{m as AlwaysOpen,p as Default,h as __namedExportsOrder,f as default};