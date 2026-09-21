import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{O as n}from"./iframe-C_i6FxQI.js";import{t as r}from"./jsx-runtime-BGU0mfus.js";import{r as i,t as a}from"./Button-D2XfW02v.js";import{n as o,t as s}from"./ShareModal-4uEU8IXs.js";var c,l,u,d,f,p,m;t((()=>{c=e(n(),1),i(),o(),l=r(),u={title:`Pages/ProfilePage/ShareModal`,component:s,tags:[`autodocs`],parameters:{layout:`centered`}},d={args:{open:!1,onOpenChange:()=>{},username:`azamat.karimov`},render:()=>{let[e,t]=(0,c.useState)(!1);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(a,{variant:`outline`,onClick:()=>t(!0),children:`Поделиться профилем`}),(0,l.jsx)(s,{open:e,onOpenChange:t,username:`azamat.karimov`})]})}},f={args:{open:!0,onOpenChange:()=>{},username:`azamat.karimov`}},p={args:{open:!0,onOpenChange:()=>{},username:`very-long-username-that-might-overflow`}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    open: false,
    onOpenChange: () => {},
    username: 'azamat.karimov'
  },
  render: () => {
    const [open, setOpen] = useState(false);
    return <>
                <Button variant='outline' onClick={() => setOpen(true)}>Поделиться профилем</Button>
                <ShareModal open={open} onOpenChange={setOpen} username='azamat.karimov' />
            </>;
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    onOpenChange: () => {},
    username: 'azamat.karimov'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    onOpenChange: () => {},
    username: 'very-long-username-that-might-overflow'
  }
}`,...p.parameters?.docs?.source}}},m=[`Default`,`AlwaysOpen`,`LongUsername`]}))();export{f as AlwaysOpen,d as Default,p as LongUsername,m as __namedExportsOrder,u as default};