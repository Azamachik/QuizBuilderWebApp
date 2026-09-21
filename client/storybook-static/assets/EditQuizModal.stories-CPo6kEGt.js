import{n as e}from"./chunk-DnJy8xQt.js";import{n as t,t as n}from"./StoreDecorator-BJ_JoLeP.js";import{n as r,t as i}from"./EditQuizModal-0-QhZbcl.js";var a,o,s,c,l,u;e((()=>{r(),t(),a={id:`1`,title:`UX/UI Best Practices Quiz`,description:`Проверьте свои знания в области UX/UI дизайна`,authorId:`1`,isPublished:!0,createdAt:`2023-10-12T00:00:00.000Z`,attemptsCount:1240,questionsCount:5},o={title:`Features/EditQuiz/EditQuizModal`,component:i,tags:[`autodocs`],parameters:{layout:`centered`},decorators:[n({user:{authData:{id:`1`,username:`admin`,token:`token`},_inited:!0}})]},s={args:{quiz:a,onOpenChange:()=>{}}},c={args:{quiz:{...a,title:`Полный курс по UX исследованиям`,description:`Данный тест охватывает все аспекты пользовательских исследований: от интервью до A/B тестирования.`},onOpenChange:()=>{}}},l={args:{quiz:null,onOpenChange:()=>{}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    quiz: mockQuiz,
    onOpenChange: () => {}
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    quiz: {
      ...mockQuiz,
      title: 'Полный курс по UX исследованиям',
      description: 'Данный тест охватывает все аспекты пользовательских исследований: от интервью до A/B тестирования.'
    },
    onOpenChange: () => {}
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    quiz: null,
    onOpenChange: () => {}
  }
}`,...l.parameters?.docs?.source}}},u=[`WithQuiz`,`WithLongDescription`,`Closed`]}))();export{l as Closed,c as WithLongDescription,s as WithQuiz,u as __namedExportsOrder,o as default};