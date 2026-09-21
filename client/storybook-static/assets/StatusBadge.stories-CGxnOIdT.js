import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-BGU0mfus.js";import{n,t as r}from"./TooltipDecorator-i0iOP1AV.js";import{n as i,t as a}from"./StatusBadge-ECe4xAbW.js";var o,s,c,l,u,d,f,p,m;e((()=>{i(),n(),o=t(),{fn:s}=__STORYBOOK_MODULE_TEST__,c={title:`Entities/Quiz/StatusBadge`,component:a,tags:[`autodocs`],parameters:{layout:`centered`},decorators:[r],argTypes:{status:{control:`boolean`},onClick:{action:`clicked`}}},l={args:{status:!0,onClick:s()}},u={args:{status:!1,onClick:s()}},d={args:{status:!0}},f={args:{status:!1}},p={args:{status:!0},render:()=>(0,o.jsxs)(`div`,{className:`flex items-center gap-4`,children:[(0,o.jsx)(a,{status:!0}),(0,o.jsx)(a,{status:!1})]})},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    status: true,
    onClick: fn()
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    status: false,
    onClick: fn()
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    status: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    status: false
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    status: true
  },
  render: () => <div className='flex items-center gap-4'>
            <StatusBadge status={true} />
            <StatusBadge status={false} />
        </div>
}`,...p.parameters?.docs?.source}}},m=[`Published`,`Draft`,`StaticPublished`,`StaticDraft`,`Both`]}))();export{p as Both,u as Draft,l as Published,f as StaticDraft,d as StaticPublished,m as __namedExportsOrder,c as default};