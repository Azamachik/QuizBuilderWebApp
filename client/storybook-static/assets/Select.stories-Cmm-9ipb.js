import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-BGU0mfus.js";import{a as n,i as r,n as i,o as a,r as o,t as s}from"./Select-DNUb96Nh.js";var c,l,u,d,f,p;e((()=>{a(),c=t(),l={title:`Shared/Select`,component:s,tags:[`autodocs`],parameters:{layout:`centered`}},u={render:()=>(0,c.jsxs)(s,{children:[(0,c.jsx)(r,{className:`w-48`,children:(0,c.jsx)(n,{placeholder:`Выберите тип`})}),(0,c.jsxs)(i,{children:[(0,c.jsx)(o,{value:`single`,children:`Один вариант`}),(0,c.jsx)(o,{value:`multiple`,children:`Несколько вариантов`}),(0,c.jsx)(o,{value:`text`,children:`Текстовый ответ`})]})]})},d={render:()=>(0,c.jsxs)(s,{defaultValue:`single`,children:[(0,c.jsx)(r,{className:`w-48`,children:(0,c.jsx)(n,{})}),(0,c.jsxs)(i,{children:[(0,c.jsx)(o,{value:`single`,children:`Один вариант`}),(0,c.jsx)(o,{value:`multiple`,children:`Несколько вариантов`}),(0,c.jsx)(o,{value:`text`,children:`Текстовый ответ`})]})]})},f={render:()=>(0,c.jsxs)(s,{disabled:!0,children:[(0,c.jsx)(r,{className:`w-48`,children:(0,c.jsx)(n,{placeholder:`Недоступно`})}),(0,c.jsx)(i,{children:(0,c.jsx)(o,{value:`single`,children:`Один вариант`})})]})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: () => <Select>
            <SelectTrigger className='w-48'>
                <SelectValue placeholder='Выберите тип' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='single'>Один вариант</SelectItem>
                <SelectItem value='multiple'>Несколько вариантов</SelectItem>
                <SelectItem value='text'>Текстовый ответ</SelectItem>
            </SelectContent>
        </Select>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <Select defaultValue='single'>
            <SelectTrigger className='w-48'>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='single'>Один вариант</SelectItem>
                <SelectItem value='multiple'>Несколько вариантов</SelectItem>
                <SelectItem value='text'>Текстовый ответ</SelectItem>
            </SelectContent>
        </Select>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <Select disabled>
            <SelectTrigger className='w-48'>
                <SelectValue placeholder='Недоступно' />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='single'>Один вариант</SelectItem>
            </SelectContent>
        </Select>
}`,...f.parameters?.docs?.source}}},p=[`Default`,`WithDefaultValue`,`Disabled`]}))();export{u as Default,f as Disabled,d as WithDefaultValue,p as __namedExportsOrder,l as default};