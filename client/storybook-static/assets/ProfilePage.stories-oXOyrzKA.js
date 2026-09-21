import{n as e}from"./chunk-DnJy8xQt.js";import{n as t,t as n}from"./TooltipDecorator-i0iOP1AV.js";import{n as r,t as i}from"./StoreDecorator-BJ_JoLeP.js";import{a,t as o}from"./Profile-BLqTaWY-.js";import{t as s,u as c}from"./Quiz-DVtsKB-C.js";import l,{t as u}from"./ProfilePage-Cg0fXbTD.js";var d,f,p,m,h,g,_,v,y,b,x;e((()=>{r(),t(),o(),s(),u(),d={id:`1`,username:`azamat`,email:`root@mail.ru`,token:`token_admin`,createdAt:`12.10.2023`},f={id:`1`,firstName:`Азамат`,lastName:`Каримов`,avatarUrl:``,createdAt:`12.10.2023`},p={...f,avatarUrl:`https://avatars.mds.yandex.net/i?id=173df4e04c7b771f188bb66f67851589-5652956-images-thumbs&n=13`},m=[{id:`1`,title:`UX/UI Best Practices`,description:``,authorId:`1`,isPublished:!0,createdAt:new Date(Date.now()-2*864e5).toISOString(),attemptsCount:1240,questionsCount:5},{id:`2`,title:`Figma Shortcuts`,description:``,authorId:`1`,isPublished:!1,createdAt:new Date(Date.now()-10*864e5).toISOString(),attemptsCount:389,questionsCount:12},{id:`3`,title:`TypeScript Advanced`,description:``,authorId:`1`,isPublished:!0,createdAt:new Date(Date.now()-30*864e5).toISOString(),attemptsCount:5600,questionsCount:30},{id:`4`,title:`React Performance`,description:``,authorId:`1`,isPublished:!0,createdAt:new Date(Date.now()-5*864e5).toISOString(),attemptsCount:820,questionsCount:18}],h={title:`Pages/ProfilePage`,component:l,tags:[`autodocs`],parameters:{layout:`fullscreen`},decorators:[n]},g={decorators:[i({user:{authData:d,_inited:!0},profile:{data:void 0,isLoading:!0},quizzes:{quizzes:[],isLoading:!1,currentQuizIsLoading:!1}},{profile:a,quizzes:c})]},_={decorators:[i({user:{authData:d,_inited:!0},profile:{data:f,isLoading:!1,createdAt:`12.10.2023`},quizzes:{quizzes:m,isLoading:!1,currentQuizIsLoading:!1}},{profile:a,quizzes:c})]},v={decorators:[i({user:{authData:d,_inited:!0},profile:{data:p,isLoading:!1,createdAt:`12.10.2023`},quizzes:{quizzes:m,isLoading:!1,currentQuizIsLoading:!1}},{profile:a,quizzes:c})]},y={decorators:[i({user:{authData:d,_inited:!0},profile:{data:f,isLoading:!1,createdAt:`12.10.2023`},quizzes:{quizzes:[],isLoading:!1,currentQuizIsLoading:!1}},{profile:a,quizzes:c})]},b={decorators:[i({user:{authData:d,_inited:!0},profile:{data:f,isLoading:!1,createdAt:`12.10.2023`},quizzes:{quizzes:Array.from({length:12},(e,t)=>({id:String(t+1),title:`Тест ${t+1}`,description:``,authorId:`1`,isPublished:t%3!=0,createdAt:new Date(Date.now()-t*3*864e5).toISOString(),attemptsCount:(t+1)*150,questionsCount:(t+1)*3})),isLoading:!1,currentQuizIsLoading:!1}},{profile:a,quizzes:c})]},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  decorators: [StoreDecorator({
    user: {
      authData: authUser,
      _inited: true
    },
    profile: {
      data: undefined,
      isLoading: true
    } as never,
    quizzes: {
      quizzes: [],
      isLoading: false,
      currentQuizIsLoading: false
    } as never
  }, {
    profile: profileReducer,
    quizzes: quizReducer
  })]
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  decorators: [StoreDecorator({
    user: {
      authData: authUser,
      _inited: true
    },
    profile: {
      data: mockProfile,
      isLoading: false,
      createdAt: '12.10.2023'
    } as never,
    quizzes: {
      quizzes: mockQuizzes,
      isLoading: false,
      currentQuizIsLoading: false
    } as never
  }, {
    profile: profileReducer,
    quizzes: quizReducer
  })]
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  decorators: [StoreDecorator({
    user: {
      authData: authUser,
      _inited: true
    },
    profile: {
      data: mockProfileWithAvatar,
      isLoading: false,
      createdAt: '12.10.2023'
    } as never,
    quizzes: {
      quizzes: mockQuizzes,
      isLoading: false,
      currentQuizIsLoading: false
    } as never
  }, {
    profile: profileReducer,
    quizzes: quizReducer
  })]
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  decorators: [StoreDecorator({
    user: {
      authData: authUser,
      _inited: true
    },
    profile: {
      data: mockProfile,
      isLoading: false,
      createdAt: '12.10.2023'
    } as never,
    quizzes: {
      quizzes: [],
      isLoading: false,
      currentQuizIsLoading: false
    } as never
  }, {
    profile: profileReducer,
    quizzes: quizReducer
  })]
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  decorators: [StoreDecorator({
    user: {
      authData: authUser,
      _inited: true
    },
    profile: {
      data: mockProfile,
      isLoading: false,
      createdAt: '12.10.2023'
    } as never,
    quizzes: {
      quizzes: Array.from({
        length: 12
      }, (_, i) => ({
        id: String(i + 1),
        title: \`Тест \${i + 1}\`,
        description: '',
        authorId: '1',
        isPublished: i % 3 !== 0,
        createdAt: new Date(Date.now() - i * 3 * 86400000).toISOString(),
        attemptsCount: (i + 1) * 150,
        questionsCount: (i + 1) * 3
      })),
      isLoading: false,
      currentQuizIsLoading: false
    } as never
  }, {
    profile: profileReducer,
    quizzes: quizReducer
  })]
}`,...b.parameters?.docs?.source}}},x=[`Loading`,`WithInitials`,`WithAvatar`,`NoQuizzes`,`ActiveUser`]}))();export{b as ActiveUser,g as Loading,y as NoQuizzes,v as WithAvatar,_ as WithInitials,x as __namedExportsOrder,h as default};