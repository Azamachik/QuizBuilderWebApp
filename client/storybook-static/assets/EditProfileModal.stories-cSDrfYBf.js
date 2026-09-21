import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{O as n}from"./iframe-C_i6FxQI.js";import{t as r}from"./jsx-runtime-BGU0mfus.js";import{r as i,t as a}from"./Button-D2XfW02v.js";import{n as o,t as s}from"./EditProfileModal-C2mF6euc.js";var c,l,u,d,f,p,m,h,g;t((()=>{c=e(n(),1),i(),o(),l=r(),{fn:u}=__STORYBOOK_MODULE_TEST__,d={id:`1`,firstName:`Азамат`,lastName:`Каримов`,avatarUrl:``,createdAt:`12.10.2023`},f={title:`Pages/ProfilePage/EditProfileModal`,component:s,tags:[`autodocs`],parameters:{layout:`centered`},args:{onSave:u()}},p={args:{open:!1,onOpenChange:()=>{},initialData:d},render:e=>{let[t,n]=(0,c.useState)(!1);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(a,{variant:`action`,onClick:()=>n(!0),children:`Редактировать профиль`}),(0,l.jsx)(s,{...e,open:t,onOpenChange:n,initialData:d})]})}},m={args:{open:!0,onOpenChange:()=>{},initialData:d}},h={args:{open:!0,onOpenChange:()=>{},initialData:{...d,avatarUrl:`https://avatars.mds.yandex.net/i?id=173df4e04c7b771f188bb66f67851589-5652956-images-thumbs&n=13`}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    open: false,
    onOpenChange: () => {},
    initialData: mockProfile
  },
  render: args => {
    const [open, setOpen] = useState(false);
    return <>
                <Button variant='action' onClick={() => setOpen(true)}>Редактировать профиль</Button>
                <EditProfileModal {...args} open={open} onOpenChange={setOpen} initialData={mockProfile} />
            </>;
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    onOpenChange: () => {},
    initialData: mockProfile
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    open: true,
    onOpenChange: () => {},
    initialData: {
      ...mockProfile,
      avatarUrl: 'https://avatars.mds.yandex.net/i?id=173df4e04c7b771f188bb66f67851589-5652956-images-thumbs&n=13'
    }
  }
}`,...h.parameters?.docs?.source}}},g=[`Default`,`AlwaysOpen`,`WithAvatar`]}))();export{m as AlwaysOpen,p as Default,h as WithAvatar,g as __namedExportsOrder,f as default};