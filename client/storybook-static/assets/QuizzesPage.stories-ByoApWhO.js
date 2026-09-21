import{n as e}from"./chunk-DnJy8xQt.js";import{n as t,t as n}from"./TooltipDecorator-i0iOP1AV.js";import{n as r,t as i}from"./BrowserDecorator-D2ltNeqt.js";import{n as a,t as o}from"./StoreDecorator-BJ_JoLeP.js";import{t as s,u as c}from"./Quiz-DVtsKB-C.js";import l,{t as u}from"./QuizzesPage-Dyu3GfBh.js";var d,f,p,m,h,g,_,v;e((()=>{s(),u(),r(),a(),t(),d=[{id:`1`,title:`UX/UI Best Practices Quiz`,description:`Проверьте свои знания в области UX/UI дизайна`,authorId:`1`,isPublished:!0,createdAt:`2023-10-12T00:00:00.000Z`,attemptsCount:1240,questionsCount:5},{id:`2`,title:`Figma Shortcuts Masterclass`,description:``,authorId:`1`,isPublished:!1,createdAt:`2023-10-12T00:00:00.000Z`,attemptsCount:389,questionsCount:12},{id:`3`,title:`TypeScript Advanced Patterns`,description:`Продвинутые паттерны TypeScript`,authorId:`1`,isPublished:!0,createdAt:`2024-03-01T00:00:00.000Z`,attemptsCount:5600,questionsCount:30}],f={id:`1`,username:`admin`,email:`root@mail.ru`,token:`token_admin`},p={title:`Pages/QuizzesPage`,component:l,tags:[`autodocs`],parameters:{layout:`fullscreen`},decorators:[i,n]},m={decorators:[o({user:{authData:f,_inited:!0},quizzes:{quizzes:[],isLoading:!0,currentQuizIsLoading:!1}},{quizzes:c})]},h={decorators:[o({user:{authData:f,_inited:!0},quizzes:{quizzes:d,isLoading:!1,currentQuizIsLoading:!1}},{quizzes:c})]},g={decorators:[o({user:{authData:f,_inited:!0},quizzes:{quizzes:[],isLoading:!1,currentQuizIsLoading:!1}},{quizzes:c})]},_={decorators:[o({user:{authData:f,_inited:!0},quizzes:{quizzes:Array.from({length:9},(e,t)=>({id:String(t+1),title:`Тест ${t+1}`,description:``,authorId:`1`,isPublished:t%3!=0,createdAt:new Date(Date.now()-t*864e5).toISOString(),attemptsCount:(t+1)*100,questionsCount:(t+1)*2})),isLoading:!1,currentQuizIsLoading:!1}},{quizzes:c})]},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  decorators: [StoreDecorator({
    user: {
      authData: authUser,
      _inited: true
    },
    quizzes: {
      quizzes: [],
      isLoading: true,
      currentQuizIsLoading: false
    } as never
  }, {
    quizzes: quizReducer
  })]
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  decorators: [StoreDecorator({
    user: {
      authData: authUser,
      _inited: true
    },
    quizzes: {
      quizzes: mockQuizzes,
      isLoading: false,
      currentQuizIsLoading: false
    } as never
  }, {
    quizzes: quizReducer
  })]
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  decorators: [StoreDecorator({
    user: {
      authData: authUser,
      _inited: true
    },
    quizzes: {
      quizzes: [],
      isLoading: false,
      currentQuizIsLoading: false
    } as never
  }, {
    quizzes: quizReducer
  })]
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  decorators: [StoreDecorator({
    user: {
      authData: authUser,
      _inited: true
    },
    quizzes: {
      quizzes: Array.from({
        length: 9
      }, (_, i) => ({
        id: String(i + 1),
        title: \`Тест \${i + 1}\`,
        description: '',
        authorId: '1',
        isPublished: i % 3 !== 0,
        createdAt: new Date(Date.now() - i * 86400000).toISOString(),
        attemptsCount: (i + 1) * 100,
        questionsCount: (i + 1) * 2
      })),
      isLoading: false,
      currentQuizIsLoading: false
    } as never
  }, {
    quizzes: quizReducer
  })]
}`,..._.parameters?.docs?.source}}},v=[`Loading`,`WithQuizzes`,`Empty`,`ManyQuizzes`]}))();export{g as Empty,m as Loading,_ as ManyQuizzes,h as WithQuizzes,v as __namedExportsOrder,p as default};