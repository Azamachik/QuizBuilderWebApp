import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-BGU0mfus.js";import{n,t as r}from"./TooltipDecorator-i0iOP1AV.js";import{n as i,t as a}from"./ActivityHeatmap-Dr0OQwBO.js";function o(e){let t=new Date;return t.setDate(t.getDate()-e),t.toISOString()}var s,c,l,u,d,f,p,m,h,g,_;e((()=>{i(),n(),s=t(),c=[o(3),o(10),o(10),o(25),o(40),o(40),o(40),o(60),o(75),o(90)],l=Array.from({length:60},(e,t)=>t%3==0||t%7==0?o(t):null).filter(Boolean),u=Array.from({length:200},()=>o(Math.floor(Math.random()*365))),d={title:`Pages/ProfilePage/ActivityHeatmap`,component:a,tags:[`autodocs`],parameters:{layout:`padded`},decorators:[r,e=>(0,s.jsx)(`div`,{className:`max-w-4xl`,children:(0,s.jsx)(e,{})})]},f={args:{quizDates:[]}},p={args:{quizDates:c}},m={args:{quizDates:l}},h={args:{quizDates:u}},g={args:{quizDates:Array.from({length:15},(e,t)=>o(t))}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    quizDates: []
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    quizDates: sparseDates
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    quizDates: activeDates
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    quizDates: veryActiveDates
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    quizDates: Array.from({
      length: 15
    }, (_, i) => daysAgo(i))
  }
}`,...g.parameters?.docs?.source}}},_=[`Empty`,`Sparse`,`Active`,`VeryActive`,`RecentBurst`]}))();export{m as Active,f as Empty,g as RecentBurst,p as Sparse,h as VeryActive,_ as __namedExportsOrder,d as default};