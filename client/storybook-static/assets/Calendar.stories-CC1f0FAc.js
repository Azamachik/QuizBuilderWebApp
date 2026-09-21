import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{O as n}from"./iframe-C_i6FxQI.js";import{t as r}from"./jsx-runtime-BGU0mfus.js";import{i,n as a,r as o,t as s}from"./Calendar-Dv1E45UZ.js";var c,l,u,d,f,p,m;t((()=>{c=e(n(),1),o(),a(),l=r(),u={title:`Shared/Calendar`,component:s,tags:[`autodocs`],parameters:{layout:`centered`}},d={render:()=>{let[e,t]=(0,c.useState)(new Date);return(0,l.jsxs)(`div`,{className:`rounded-2xl border border-border p-3`,children:[(0,l.jsx)(s,{mode:`single`,selected:e,onSelect:t,locale:i}),(0,l.jsx)(`p`,{className:`mt-2 text-center text-xs text-muted-foreground`,children:e?e.toLocaleDateString(`ru-RU`):`Дата не выбрана`})]})}},f={render:()=>{let[e,t]=(0,c.useState)();return(0,l.jsx)(`div`,{className:`rounded-2xl border border-border p-3`,children:(0,l.jsx)(s,{mode:`range`,selected:e,onSelect:t,locale:i})})}},p={render:()=>{let[e,t]=(0,c.useState)();return(0,l.jsxs)(`div`,{className:`rounded-2xl border border-border p-3`,children:[(0,l.jsx)(s,{mode:`single`,selected:e,onSelect:t,disabled:{before:new Date},locale:i}),(0,l.jsx)(`p`,{className:`mt-2 text-center text-xs text-muted-foreground`,children:`Прошедшие даты недоступны`})]})}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <div className='rounded-2xl border border-border p-3'>
                <Calendar mode='single' selected={date} onSelect={setDate} locale={ru} />
                <p className='mt-2 text-center text-xs text-muted-foreground'>
                    {date ? date.toLocaleDateString('ru-RU') : 'Дата не выбрана'}
                </p>
            </div>;
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [range, setRange] = useState<{
      from?: Date;
      to?: Date;
    } | undefined>();
    return <div className='rounded-2xl border border-border p-3'>
                <Calendar mode='range' selected={range as never} onSelect={setRange as never} locale={ru} />
            </div>;
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [date, setDate] = useState<Date | undefined>();
    return <div className='rounded-2xl border border-border p-3'>
                <Calendar mode='single' selected={date} onSelect={setDate} disabled={{
        before: new Date()
      }} locale={ru} />
                <p className='mt-2 text-center text-xs text-muted-foreground'>Прошедшие даты недоступны</p>
            </div>;
  }
}`,...p.parameters?.docs?.source}}},m=[`SingleSelect`,`RangeSelect`,`WithDisabledDates`]}))();export{f as RangeSelect,d as SingleSelect,p as WithDisabledDates,m as __namedExportsOrder,u as default};