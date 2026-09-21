import{n as e}from"./chunk-DnJy8xQt.js";import{n as t,t as n}from"./StoreDecorator-BJ_JoLeP.js";import{m as r,o as i,t as a,u as o}from"./Attempt-CvVSDqVR.js";import{n as s,t as c}from"./RouterDecorator-z5vuYlPU.js";import l,{t as u}from"./QuizTakingPage-VyAMWFAC.js";var d,f,p,m,h,g,_,v,y;e((()=>{o(),a(),u(),s(),t(),d={id:`1`,title:`UX/UI Best Practices Quiz`,description:`Проверьте свои знания`,authorId:`1`,isPublished:!0,createdAt:`2023-10-12T00:00:00.000Z`,attemptsCount:1240,questionsCount:3},f={id:`il1`,quizId:`1`,token:`demo-token`,label:`Общая ссылка`,maxUses:null,usedCount:4,expiresAt:null,isActive:!0,createdAt:`2023-10-12T00:00:00.000Z`,createdBy:`1`},p=[{id:`q1`,quizId:`1`,order:1,text:`Что такое Закон Фиттса?`,type:`single`,required:!0,options:[{id:`a`,text:`Чем дальше цель, тем больше времени`,isCorrect:!0},{id:`b`,text:`Время зависит от вариантов`,isCorrect:!1},{id:`c`,text:`Первое и последнее запоминается лучше`,isCorrect:!1}]},{id:`q2`,quizId:`1`,order:2,text:`Какие элементы относятся к UI?`,type:`multiple`,required:!1,options:[{id:`a`,text:`Типографика`,isCorrect:!0},{id:`b`,text:`Исследование аудитории`,isCorrect:!1}]},{id:`q3`,quizId:`1`,order:3,text:`Опишите ваш опыт.`,type:`text`,required:!1,options:[]}],m={title:`Pages/QuizTakingPage`,component:l,tags:[`autodocs`],parameters:{layout:`fullscreen`},decorators:[c]},h={decorators:[n({user:{authData:void 0,_inited:!0},inviteLink:{isLoading:!0},attempt:{isLoading:!1,isSubmitting:!1,sessionQuestions:[]}},{inviteLink:r,attempt:i})]},g={decorators:[n({user:{authData:void 0,_inited:!0},inviteLink:{session:{inviteLink:f,quiz:d,questions:p},isLoading:!1},attempt:{isLoading:!1,isSubmitting:!1,sessionQuestions:[]}},{inviteLink:r,attempt:i})]},_={decorators:[n({user:{authData:void 0,_inited:!0},inviteLink:{isLoading:!1,error:`Ссылка недействительна или тест не опубликован`},attempt:{isLoading:!1,isSubmitting:!1,sessionQuestions:[]}},{inviteLink:r,attempt:i})]},v={decorators:[n({user:{authData:void 0,_inited:!0},inviteLink:{session:{inviteLink:f,quiz:{...d,questionsCount:0},questions:[]},isLoading:!1},attempt:{isLoading:!1,isSubmitting:!1,sessionQuestions:[]}},{inviteLink:r,attempt:i})]},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  decorators: [StoreDecorator({
    user: {
      authData: undefined,
      _inited: true
    },
    inviteLink: {
      isLoading: true
    } as never,
    attempt: {
      isLoading: false,
      isSubmitting: false,
      sessionQuestions: []
    } as never
  }, {
    inviteLink: inviteLinkReducer,
    attempt: attemptReducer
  })]
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  decorators: [StoreDecorator({
    user: {
      authData: undefined,
      _inited: true
    },
    inviteLink: {
      session: {
        inviteLink: mockLink,
        quiz: mockQuiz,
        questions: mockQuestions
      },
      isLoading: false
    } as never,
    attempt: {
      isLoading: false,
      isSubmitting: false,
      sessionQuestions: []
    } as never
  }, {
    inviteLink: inviteLinkReducer,
    attempt: attemptReducer
  })]
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  decorators: [StoreDecorator({
    user: {
      authData: undefined,
      _inited: true
    },
    inviteLink: {
      isLoading: false,
      error: 'Ссылка недействительна или тест не опубликован'
    } as never,
    attempt: {
      isLoading: false,
      isSubmitting: false,
      sessionQuestions: []
    } as never
  }, {
    inviteLink: inviteLinkReducer,
    attempt: attemptReducer
  })]
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  decorators: [StoreDecorator({
    user: {
      authData: undefined,
      _inited: true
    },
    inviteLink: {
      session: {
        inviteLink: mockLink,
        quiz: {
          ...mockQuiz,
          questionsCount: 0
        },
        questions: []
      },
      isLoading: false
    } as never,
    attempt: {
      isLoading: false,
      isSubmitting: false,
      sessionQuestions: []
    } as never
  }, {
    inviteLink: inviteLinkReducer,
    attempt: attemptReducer
  })]
}`,...v.parameters?.docs?.source}}},y=[`Loading`,`FirstQuestion`,`Error`,`NoQuestions`]}))();export{_ as Error,g as FirstQuestion,h as Loading,v as NoQuestions,y as __namedExportsOrder,m as default};