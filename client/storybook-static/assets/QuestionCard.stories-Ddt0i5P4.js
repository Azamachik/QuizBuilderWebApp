import{n as e}from"./chunk-DnJy8xQt.js";import{t}from"./jsx-runtime-BGU0mfus.js";import{n,t as r}from"./QuestionCard-NsSE-uRf.js";import{n as i,t as a}from"./TooltipDecorator-i0iOP1AV.js";var o,s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S;e((()=>{n(),i(),o=t(),{fn:s}=__STORYBOOK_MODULE_TEST__,c={onDragStart:s(),onDragEnter:s(),onDrop:s(),onDragEnd:s()},l={onDelete:s(),onDuplicate:s(),onToggleRequired:s(),onEdit:s(),...c},u={id:`q1`,quizId:`1`,order:1,text:`Что такое Закон Фиттса?`,type:`single`,required:!0,options:[{id:`a`,text:`Чем дальше и меньше цель, тем больше времени требуется`,isCorrect:!0},{id:`b`,text:`Время принятия решения зависит от количества вариантов`,isCorrect:!1},{id:`c`,text:`Люди запоминают первую и последнюю часть информации лучше`,isCorrect:!1}]},d={id:`q2`,quizId:`1`,order:2,text:`Какие из этих элементов относятся к UI?`,type:`multiple`,required:!1,options:[{id:`a`,text:`Типографика`,isCorrect:!0},{id:`b`,text:`Исследование аудитории`,isCorrect:!1},{id:`c`,text:`Цветовая палитра`,isCorrect:!0}]},f={id:`q3`,quizId:`1`,order:3,text:`Опишите ваш опыт работы с UI/UX.`,type:`text`,required:!1,explanation:`Расскажите о своих проектах и используемых инструментах.`,options:[]},p={title:`Entities/Question/QuestionCard`,component:r,tags:[`autodocs`],parameters:{layout:`padded`},decorators:[a,e=>(0,o.jsx)(`div`,{className:`max-w-2xl`,children:(0,o.jsx)(e,{})})],args:{...l,isDragging:!1,isEditing:!1}},m={args:{question:u}},h={args:{question:d}},g={args:{question:f}},_={args:{question:{...u,required:!0}}},v={args:{question:{...u,required:!1}}},y={args:{question:u,isDragging:!0}},b={args:{question:u,isEditing:!0}},x={args:{question:u},render:e=>(0,o.jsxs)(`div`,{className:`space-y-3`,children:[(0,o.jsx)(r,{...e,question:u}),(0,o.jsx)(r,{...e,question:d}),(0,o.jsx)(r,{...e,question:f})]})},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    question: singleQuestion
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    question: multipleQuestion
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    question: textQuestion
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    question: {
      ...singleQuestion,
      required: true
    }
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    question: {
      ...singleQuestion,
      required: false
    }
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    question: singleQuestion,
    isDragging: true
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    question: singleQuestion,
    isEditing: true
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    question: singleQuestion
  },
  render: args => <div className='space-y-3'>
            <QuestionCard {...args} question={singleQuestion} />
            <QuestionCard {...args} question={multipleQuestion} />
            <QuestionCard {...args} question={textQuestion} />
        </div>
}`,...x.parameters?.docs?.source}}},S=[`SingleChoice`,`MultipleChoice`,`TextAnswer`,`Required`,`Optional`,`Dragging`,`Editing`,`AllTypes`]}))();export{x as AllTypes,y as Dragging,b as Editing,h as MultipleChoice,v as Optional,_ as Required,m as SingleChoice,g as TextAnswer,S as __namedExportsOrder,p as default};