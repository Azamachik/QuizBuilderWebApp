import{n as e}from"./chunk-DnJy8xQt.js";import{n as t,t as n}from"./BrowserDecorator-D2ltNeqt.js";import{n as r,r as i}from"./AuthByEmail-DxIBNrF3.js";import{n as a,t as o}from"./StoreDecorator-BJ_JoLeP.js";var s,c,l,u,d;e((()=>{i(),t(),a(),s={title:`Features/AuthByEmail/LoginForm`,component:r,tags:[`autodocs`],parameters:{layout:`centered`},decorators:[n]},c={decorators:[o({user:{authData:void 0,_inited:!0},login:{email:``,password:``,isLoading:!1}})]},l={decorators:[o({user:{authData:void 0,_inited:!0},login:{email:`root@mail.ru`,password:`1234`,isLoading:!0}})]},u={decorators:[o({user:{authData:void 0,_inited:!0},login:{email:`wrong@mail.ru`,password:`bad`,isLoading:!1,error:`Неверный логин или пароль`}})]},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
      email: 'root@mail.ru',
      password: '1234',
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
      email: 'wrong@mail.ru',
      password: 'bad',
      isLoading: false,
      error: 'Неверный логин или пароль'
    }
  })]
}`,...u.parameters?.docs?.source}}},d=[`Default`,`Loading`,`WithError`]}))();export{c as Default,l as Loading,u as WithError,d as __namedExportsOrder,s as default};