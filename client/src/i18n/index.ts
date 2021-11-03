import en from './en.json';

type Locales = 'en';

export type Messages = {
  en: typeof en;
};

export type Content = {
  [k in Locales]: typeof messagesEn;
};

const messagesEn: Messages['en'] = en;

const content: Content = {
  en,
};

export default content;
