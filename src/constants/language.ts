export interface SttLanguageInterface {
  code: string;
  label: string;
}

export const SttLanguage: Record<string, SttLanguageInterface> = {
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
    label: "中国人",
  },
} as const;
