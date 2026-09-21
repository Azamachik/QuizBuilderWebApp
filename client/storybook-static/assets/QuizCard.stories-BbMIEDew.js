import{n as e}from"./chunk-DnJy8xQt.js";import{n as t,t as n}from"./TooltipDecorator-i0iOP1AV.js";import{n as r,t as i}from"./QuizCard-CfHRF8dc.js";import{n as a,t as o}from"./BrowserDecorator-D2ltNeqt.js";var s,c,l,u,d,f,p,m,h;e((()=>{r(),t(),a(),{fn:s}=__STORYBOOK_MODULE_TEST__,c={id:`1`,title:`UX/UI Best Practices Quiz`,description:`Проверьте свои знания в области UX/UI дизайна`,authorId:`1`,isPublished:!0,createdAt:`2023-10-12T00:00:00.000Z`,attemptsCount:1240,questionsCount:5},l={title:`Entities/Quiz/QuizCard`,component:i,tags:[`autodocs`],parameters:{layout:`centered`},decorators:[n,o],args:{onEdit:s(),onToggleStatus:s(),onCreateLink:s(),onDelete:s()}},u={args:{quiz:c}},d={args:{quiz:{...c,isPublished:!1,attemptsCount:0}}},f={args:{quiz:{...c,questionsCount:0,title:`Пустой тест`,isPublished:!1}}},p={args:{quiz:{...c,attemptsCount:98432,questionsCount:20,title:`Популярный тест`}}},m={args:{quiz:{...c,title:`Очень длинное название теста о проектировании пользовательских интерфейсов`,description:`Подробное описание теста для практикующих дизайнеров`}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    quiz: mockQuiz
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    quiz: {
      ...mockQuiz,
      isPublished: false,
      attemptsCount: 0
    }
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    quiz: {
      ...mockQuiz,
      questionsCount: 0,
      title: 'Пустой тест',
      isPublished: false
    }
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    quiz: {
      ...mockQuiz,
      attemptsCount: 98432,
      questionsCount: 20,
      title: 'Популярный тест'
    }
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    quiz: {
      ...mockQuiz,
      title: 'Очень длинное название теста о проектировании пользовательских интерфейсов',
      description: 'Подробное описание теста для практикующих дизайнеров'
    }
  }
}`,...m.parameters?.docs?.source}}},h=[`Published`,`Draft`,`NoQuestions`,`HighTraffic`,`LongTitle`]}))();export{d as Draft,p as HighTraffic,m as LongTitle,f as NoQuestions,u as Published,h as __namedExportsOrder,l as default};