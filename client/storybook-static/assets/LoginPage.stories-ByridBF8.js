import{n as e}from"./chunk-DnJy8xQt.js";import{n as t,t as n}from"./BrowserDecorator-D2ltNeqt.js";import{n as r,t as i}from"./StoreDecorator-BJ_JoLeP.js";import a,{t as o}from"./LoginPage-BNX1E5Cm.js";var s,c,l,u,d;e((()=>{o(),r(),t(),s={title:`Pages/LoginPage`,component:a,tags:[`autodocs`],parameters:{layout:`fullscreen`},decorators:[n]},c={decorators:[i({user:{authData:void 0,_inited:!0},login:{email:``,password:``,isLoading:!1}})]},l={decorators:[i({user:{authData:void 0,_inited:!0},login:{email:``,password:``,isLoading:!0}})]},u={decorators:[i({user:{authData:void 0,_inited:!0},login:{email:`bad@mail.ru`,password:`wrong`,isLoading:!1,error:`Неверный логин или пароль`}})]},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  decorators: [StoreDecorator({
    user: {
      authData: undefined,
      _inited: true
    },
    login: {
      email: '',
      password: '',
      isLoading: false
    }
  })]
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  decorators: [StoreDecorator({
    user: {
      authData: undefined,
      _inited: true
    },
    login: {
      email: '',
      password: '',
      isLoading: true
    }
  })]
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  decorators: [StoreDecorator({
    user: {
      authData: undefined,
      _inited: true
    },
    login: {
      email: 'bad@mail.ru',
      password: 'wrong',
      isLoading: false,
      error: 'Неверный логин или пароль'
    }
  })]
}`,...u.parameters?.docs?.source}}},d=[`Default`,`Loading`,`WithError`]}))();export{c as Default,l as Loading,u as WithError,d as __namedExportsOrder,s as default};