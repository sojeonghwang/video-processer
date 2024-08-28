export interface LanguageInterface {
  code: string;
  label: string;
}

export const SttLanguage: Record<string, LanguageInterface> = {
  KO: {
    code: "ko-KR",
    label: "한국어",
  },
  EN: {
    code: "en-US",
    label: "English",
  },
  JA: {
    code: "ja",
    label: "日本語",
  },
  CN: {
    code: "zh-cn",
    label: "中文",
  },
} as const;

export const TranslationLanguage: Record<string, LanguageInterface> = {
  KO: {
    code: "ko",
    label: "한국어",
  },
  EN: {
    code: "en",
    label: "English",
  },
  JA: {
    code: "ja",
    label: "日本語",
  },
  CN: {
    code: "zh-CN",
    label: "中文",
  },
} as const;
