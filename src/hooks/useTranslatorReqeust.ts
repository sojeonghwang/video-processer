import { useState } from "react";

function useTranslator() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const requestTranslator = async (
    source: string,
    target: string,
    textList: string
  ) => {
    try {
      setIsLoading(true);
      if (!source || !target) {
        alert("번역할 언어를 선택해주세요.");
        return;
      }
      const response = await fetch("/api/translator", {
        method: "POST",
        body: JSON.stringify({
          prompt: textList,
          source,
          target,
        }),
      });

      if (!response.ok) {
        alert("번역에 실패했습니다.");
        return;
      }
      const {
        data: {
          message: {
            result: { translatedText },
          },
        },
      } = await response.json();

      return translatedText;
    } catch (exception) {
      alert("번역에 실패했습니다.");
      console.error(`[handleTranslator] - ${exception}`);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, requestTranslator };
}

export default useTranslator;
