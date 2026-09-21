import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-BGU0mfus.js";import{B as n,T as r,b as i,k as a,o,t as s}from"./lucide-react-BgQkwh6h.js";import{r as c,t as l}from"./Button-D2XfW02v.js";import{n as u,t as d}from"./useTheme-Cu_hukLm.js";import{n as f,r as p,t as m}from"./dist-DqQp_0B3.js";function h(e){let{theme:t}=u();return(0,g.jsx)(m,{theme:t,icons:{success:(0,g.jsx)(n,{className:`size-4`}),info:(0,g.jsx)(a,{className:`size-4`}),warning:(0,g.jsx)(o,{className:`size-4`}),error:(0,g.jsx)(i,{className:`size-4`}),loading:(0,g.jsx)(r,{className:`size-4 animate-spin`})},style:{"--normal-bg":`var(--popover)`,"--normal-text":`var(--popover-foreground)`,"--normal-border":`var(--border)`},...e})}var g,_=e((()=>{s(),f(),d(),g=t(),h.__docgenInfo={description:``,methods:[],displayName:`Toaster`}})),v,y,b,x,S,C,w;e((()=>{f(),c(),_(),v=t(),y={title:`Shared/Sonner`,component:h,tags:[`autodocs`],parameters:{layout:`centered`},decorators:[e=>(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(e,{}),(0,v.jsx)(h,{position:`top-center`,richColors:!0,closeButton:!0})]})]},b={render:()=>(0,v.jsx)(l,{variant:`action`,onClick:()=>p.success(`Изменения сохранены`),children:`Показать Success`})},x={render:()=>(0,v.jsx)(l,{variant:`destructive`,onClick:()=>p.error(`Ошибка при сохранении`),children:`Показать Error`})},S={render:()=>(0,v.jsx)(l,{variant:`outline`,onClick:()=>p.info(`Тест опубликован`),children:`Показать Info`})},C={render:()=>(0,v.jsxs)(`div`,{className:`flex flex-wrap gap-2`,children:[(0,v.jsx)(l,{variant:`action`,onClick:()=>p.success(`Сохранено`),children:`Success`}),(0,v.jsx)(l,{variant:`destructive`,onClick:()=>p.error(`Ошибка`),children:`Error`}),(0,v.jsx)(l,{variant:`outline`,onClick:()=>p.info(`Инфо`),children:`Info`}),(0,v.jsx)(l,{variant:`ghost`,onClick:()=>p.warning(`Предупреждение`),children:`Warning`}),(0,v.jsx)(l,{variant:`secondary`,onClick:()=>p(`Обычное уведомление`),children:`Default`})]})},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Button variant='action' onClick={() => toast.success('Изменения сохранены')}>
            Показать Success
        </Button>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Button variant='destructive' onClick={() => toast.error('Ошибка при сохранении')}>
            Показать Error
        </Button>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Button variant='outline' onClick={() => toast.info('Тест опубликован')}>
            Показать Info
        </Button>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <div className='flex flex-wrap gap-2'>
            <Button variant='action' onClick={() => toast.success('Сохранено')}>Success</Button>
            <Button variant='destructive' onClick={() => toast.error('Ошибка')}>Error</Button>
            <Button variant='outline' onClick={() => toast.info('Инфо')}>Info</Button>
            <Button variant='ghost' onClick={() => toast.warning('Предупреждение')}>Warning</Button>
            <Button variant='secondary' onClick={() => toast('Обычное уведомление')}>Default</Button>
        </div>
}`,...C.parameters?.docs?.source}}},w=[`Success`,`Error`,`Info`,`AllTypes`]}))();export{C as AllTypes,x as Error,S as Info,b as Success,w as __namedExportsOrder,y as default};