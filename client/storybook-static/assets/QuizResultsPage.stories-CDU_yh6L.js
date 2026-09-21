import{n as e}from"./chunk-DnJy8xQt.js";import{n as t,t as n}from"./StoreDecorator-BJ_JoLeP.js";import{m as r,o as i,t as a,u as o}from"./Attempt-CvVSDqVR.js";import{n as s,t as c}from"./RouterDecorator-z5vuYlPU.js";import l,{t as u}from"./QuizResultsPage-BLbGTF_Z.js";var d,f,p,m,h,g,_,v,y,b,x;e((()=>{o(),a(),u(),s(),t(),d={id:`1`,title:`UX/UI Best Practices Quiz`,description:`Проверьте свои знания`,authorId:`1`,isPublished:!0,createdAt:`2023-10-12T00:00:00.000Z`,attemptsCount:1241,questionsCount:2},f={id:`il1`,quizId:`1`,token:`demo-token`,label:`Общая ссылка`,maxUses:null,usedCount:5,expiresAt:null,isActive:!0,createdAt:`2023-10-12T00:00:00.000Z`,createdBy:`1`},p=[{id:`q1`,quizId:`1`,order:1,text:`Что такое Закон Фиттса?`,type:`single`,required:!0,options:[{id:`a`,text:`Чем дальше цель, тем больше времени`,isCorrect:!0},{id:`b`,text:`Время зависит от вариантов`,isCorrect:!1}]},{id:`q2`,quizId:`1`,order:2,text:`Опишите опыт UI/UX.`,type:`text`,required:!1,explanation:`Расскажите о проектах.`,options:[]}],m={id:`a1`,quizId:`1`,quizTitle:`UX/UI Best Practices Quiz`,inviteLinkToken:`demo-token`,label:`Общая ссылка`,createdAt:new Date().toISOString(),completedAt:new Date().toISOString()},h={title:`Pages/QuizResultsPage`,component:l,tags:[`autodocs`],parameters:{layout:`fullscreen`},decorators:[c]},g={decorators:[n({user:{authData:void 0,_inited:!0},inviteLink:{isLoading:!0},attempt:{isLoading:!0,isSubmitting:!1,sessionQuestions:[]}},{inviteLink:r,attempt:i})]},_={name:`Good result (50%)`,decorators:[n({user:{authData:void 0,_inited:!0},inviteLink:{session:{inviteLink:f,quiz:d,questions:p},isLoading:!1},attempt:{currentAttempt:{...m,answers:[{questionId:`q1`,selectedOptionIds:[`a`]},{questionId:`q2`,selectedOptionIds:[],textAnswer:`Figma 3 года`}],score:1,total:1},isLoading:!1,isSubmitting:!1,sessionQuestions:p}},{inviteLink:r,attempt:i})]},v={name:`Zero result (0%)`,decorators:[n({user:{authData:void 0,_inited:!0},inviteLink:{session:{inviteLink:f,quiz:d,questions:p},isLoading:!1},attempt:{currentAttempt:{...m,answers:[{questionId:`q1`,selectedOptionIds:[`b`]},{questionId:`q2`,selectedOptionIds:[]}],score:0,total:1},isLoading:!1,isSubmitting:!1,sessionQuestions:p}},{inviteLink:r,attempt:i})]},y={name:`Link exhausted (retry blocked)`,decorators:[n({user:{authData:void 0,_inited:!0},inviteLink:{session:{inviteLink:{...f,maxUses:5,usedCount:5},quiz:d,questions:p},isLoading:!1},attempt:{currentAttempt:{...m,answers:[{questionId:`q1`,selectedOptionIds:[`a`]}],score:1,total:1},isLoading:!1,isSubmitting:!1,sessionQuestions:p}},{inviteLink:r,attempt:i})]},b={decorators:[n({user:{authData:void 0,_inited:!0},inviteLink:{isLoading:!1},attempt:{isLoading:!1,isSubmitting:!1,sessionQuestions:[]}},{inviteLink:r,attempt:i})]},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  decorators: [StoreDecorator({
    user: {
      authData: undefined,
      _inited: true
    },
    inviteLink: {
      isLoading: true
    } as never,
    attempt: {
      isLoading: true,
      isSubmitting: false,
      sessionQuestions: []
    } as never
  }, {
    inviteLink: inviteLinkReducer,
    attempt: attemptReducer
  })]
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Good result (50%)',
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
      currentAttempt: {
        ...baseAttempt,
        answers: [{
          questionId: 'q1',
          selectedOptionIds: ['a']
        }, {
          questionId: 'q2',
          selectedOptionIds: [],
          textAnswer: 'Figma 3 года'
        }],
        score: 1,
        total: 1
      },
      isLoading: false,
      isSubmitting: false,
      sessionQuestions: mockQuestions
    } as never
  }, {
    inviteLink: inviteLinkReducer,
    attempt: attemptReducer
  })]
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Zero result (0%)',
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
      currentAttempt: {
        ...baseAttempt,
        answers: [{
          questionId: 'q1',
          selectedOptionIds: ['b']
        }, {
          questionId: 'q2',
          selectedOptionIds: []
        }],
        score: 0,
        total: 1
      },
      isLoading: false,
      isSubmitting: false,
      sessionQuestions: mockQuestions
    } as never
  }, {
    inviteLink: inviteLinkReducer,
    attempt: attemptReducer
  })]
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Link exhausted (retry blocked)',
  decorators: [StoreDecorator({
    user: {
      authData: undefined,
      _inited: true
    },
    inviteLink: {
      session: {
        inviteLink: {
          ...mockLink,
          maxUses: 5,
          usedCount: 5
        },
        quiz: mockQuiz,
        questions: mockQuestions
      },
      isLoading: false
    } as never,
    attempt: {
      currentAttempt: {
        ...baseAttempt,
        answers: [{
          questionId: 'q1',
          selectedOptionIds: ['a']
        }],
        score: 1,
        total: 1
      },
      isLoading: false,
      isSubmitting: false,
      sessionQuestions: mockQuestions
    } as never
  }, {
    inviteLink: inviteLinkReducer,
    attempt: attemptReducer
  })]
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  decorators: [StoreDecorator({
    user: {
      authData: undefined,
      _inited: true
    },
    inviteLink: {
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
}`,...b.parameters?.docs?.source}}},x=[`Loading`,`GoodResult`,`ZeroResult`,`LinkExhausted`,`NotFound`]}))();export{_ as GoodResult,y as LinkExhausted,g as Loading,b as NotFound,v as ZeroResult,x as __namedExportsOrder,h as default};