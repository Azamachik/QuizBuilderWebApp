import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-BGU0mfus.js";import{n,t as r}from"./TooltipDecorator-i0iOP1AV.js";import{n as i,t as a}from"./BrowserDecorator-D2ltNeqt.js";import{n as o,t as s}from"./QuizRow-CX_arYWM.js";var c,l,u,d,f,p,m,h,g;e((()=>{o(),n(),i(),c=t(),{fn:l}=__STORYBOOK_MODULE_TEST__,u={id:`1`,title:`UX/UI Best Practices Quiz`,description:`Проверьте свои знания в области UX/UI дизайна`,authorId:`1`,isPublished:!0,createdAt:`2023-10-12T00:00:00.000Z`,attemptsCount:1240,questionsCount:5},d={title:`Entities/Quiz/QuizRow`,component:s,tags:[`autodocs`],parameters:{layout:`padded`},decorators:[r,a,e=>(0,c.jsx)(`div`,{className:`max-w-3xl`,children:(0,c.jsx)(e,{})})],args:{onEdit:l(),onToggleStatus:l(),onCreateLink:l(),onDelete:l()}},f={args:{quiz:u}},p={args:{quiz:{...u,isPublished:!1,attemptsCount:0}}},m={args:{quiz:{...u,questionsCount:0,isPublished:!1}}},h={args:{quiz:u},render:e=>(0,c.jsxs)(`div`,{className:`space-y-3`,children:[(0,c.jsx)(s,{...e,quiz:u}),(0,c.jsx)(s,{...e,quiz:{...u,id:`2`,title:`Figma Shortcuts`,isPublished:!1,attemptsCount:389,questionsCount:12}}),(0,c.jsx)(s,{...e,quiz:{...u,id:`3`,title:`TypeScript Advanced`,isPublished:!0,attemptsCount:5600,questionsCount:30}})]})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    quiz: mockQuiz
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    quiz: {
      ...mockQuiz,
      isPublished: false,
      attemptsCount: 0
    }
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    quiz: {
      ...mockQuiz,
      questionsCount: 0,
      isPublished: false
    }
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    quiz: mockQuiz
  },
  render: args => <div className='space-y-3'>
            <QuizRow {...args} quiz={mockQuiz} />
            <QuizRow {...args} quiz={{
      ...mockQuiz,
      id: '2',
      title: 'Figma Shortcuts',
      isPublished: false,
      attemptsCount: 389,
      questionsCount: 12
    }} />
            <QuizRow {...args} quiz={{
      ...mockQuiz,
      id: '3',
      title: 'TypeScript Advanced',
      isPublished: true,
      attemptsCount: 5600,
      questionsCount: 30
    }} />
        </div>
}`,...h.parameters?.docs?.source}}},g=[`Published`,`Draft`,`NoQuestions`,`List`]}))();export{p as Draft,h as List,m as NoQuestions,f as Published,g as __namedExportsOrder,d as default};