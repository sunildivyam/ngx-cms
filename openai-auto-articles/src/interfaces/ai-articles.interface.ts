import { OpenaiPrompt } from "@annuadvent/ngx-tools/openai";

export interface ArticlePrompt {
    prompt: OpenaiPrompt;
    heading: string;
};
