import{n as e}from"./chunk-DnJy8xQt.js";import{n as t,t as n}from"./TooltipDecorator-i0iOP1AV.js";import{n as r,t as i}from"./StoreDecorator-BJ_JoLeP.js";import{t as a,u as o}from"./Quiz-DVtsKB-C.js";import{o as s,t as c}from"./Question-CDt5g9XO.js";import l,{t as u}from"./QuizEditorPage-CuU8JJJL.js";import{n as d,t as f}from"./RouterDecorator-z5vuYlPU.js";var p,m,h,g,_,v,y,b,x;e((()=>{a(),c(),u(),t(),r(),d(),p={id:`1`,title:`UX/UI Best Practices Quiz`,description:`Проверьте свои знания`,authorId:`1`,isPublished:!0,createdAt:`2023-10-12T00:00:00.000Z`,attemptsCount:1240,questionsCount:3},m=[{id:`q1`,quizId:`1`,order:1,text:`Что такое Закон Фиттса?`,type:`single`,required:!0,options:[{id:`a`,text:`Чем дальше цель, тем больше времени`,isCorrect:!0},{id:`b`,text:`Время зависит от количества вариантов`,isCorrect:!1}]},{id:`q2`,quizId:`1`,order:2,text:`Какие элементы относятся к UI?`,type:`multiple`,required:!1,options:[{id:`a`,text:`Типографика`,isCorrect:!0},{id:`b`,text:`Исследование аудитории`,isCorrect:!1}]},{id:`q3`,quizId:`1`,order:3,text:`Опишите опыт работы с UI/UX.`,type:`text`,required:!1,explanation:`Расскажите о проектах.`,options:[]}],h={id:`1`,username:`admin`,email:`root@mail.ru`,token:`token_admin`},g={title:`Pages/QuizEditorPage`,component:l,tags:[`autodocs`],parameters:{layout:`fullscreen`},decorators:[f,n]},_={decorators:[i({user:{authData:h,_inited:!0},quizzes:{quizzes:[],isLoading:!0,currentQuizIsLoading:!0},questions:{questions:[],formData:[],isLoading:!0,isSaving:!1}},{quizzes:o,questions:s})]},v={decorators:[i({user:{authData:h,_inited:!0},quizzes:{quizzes:[p],isLoading:!1,currentQuiz:p,currentQuizIsLoading:!1},questions:{questions:m,formData:m,isLoading:!1,isSaving:!1}},{quizzes:o,questions:s})]},y={decorators:[i({user:{authData:h,_inited:!0},quizzes:{quizzes:[p],isLoading:!1,currentQuiz:{...p,questionsCount:0},currentQuizIsLoading:!1},questions:{questions:[],formData:[],isLoading:!1,isSaving:!1}},{quizzes:o,questions:s})]},b={decorators:[i({user:{authData:h,_inited:!0},quizzes:{quizzes:[p],isLoading:!1,currentQuiz:p,currentQuizIsLoading:!1},questions:{questions:m,formData:m,isLoading:!1,isSaving:!0}},{quizzes:o,questions:s})]},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  decorators: [StoreDecorator({
    user: {
      authData: authUser,
      _inited: true
    },
    quizzes: {
      quizzes: [],
      isLoading: true,
      currentQuizIsLoading: true
    } as never,
    questions: {
      questions: [],
      formData: [],
      isLoading: true,
      isSaving: false
    } as never
  }, {
    quizzes: quizReducer,
    questions: questionReducer
  })]
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  decorators: [StoreDecorator({
    user: {
      authData: authUser,
      _inited: true
    },
    quizzes: {
      quizzes: [mockQuiz],
      isLoading: false,
      currentQuiz: mockQuiz,
      currentQuizIsLoading: false
    } as never,
    questions: {
      questions: mockQuestions,
      formData: mockQuestions,
      isLoading: false,
      isSaving: false
    } as never
  }, {
    quizzes: quizReducer,
    questions: questionReducer
  })]
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  decorators: [StoreDecorator({
    user: {
      authData: authUser,
      _inited: true
    },
    quizzes: {
      quizzes: [mockQuiz],
      isLoading: false,
      currentQuiz: {
        ...mockQuiz,
        questionsCount: 0
      },
      currentQuizIsLoading: false
    } as never,
    questions: {
      questions: [],
      formData: [],
      isLoading: false,
      isSaving: false
    } as never
  }, {
    quizzes: quizReducer,
    questions: questionReducer
  })]
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  decorators: [StoreDecorator({
    user: {
      authData: authUser,
      _inited: true
    },
    quizzes: {
      quizzes: [mockQuiz],
      isLoading: false,
      currentQuiz: mockQuiz,
      currentQuizIsLoading: false
    } as never,
    questions: {
      questions: mockQuestions,
      formData: mockQuestions,
      isLoading: false,
      isSaving: true
    } as never
  }, {
    quizzes: quizReducer,
    questions: questionReducer
  })]
}`,...b.parameters?.docs?.source}}},x=[`Loading`,`WithQuestions`,`Empty`,`Saving`]}))();export{y as Empty,_ as Loading,b as Saving,v as WithQuestions,x as __namedExportsOrder,g as default};