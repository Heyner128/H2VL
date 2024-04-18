import { JSDOM } from "jsdom";
import DOMPurify from "dompurify";
import {marked} from "marked";

export default function(markdown: string): string {
    const { sanitize } = DOMPurify(new JSDOM('').window);

    const parsedHTML = marked(markdown);

    if( parsedHTML instanceof Promise) throw new Error("Promise error markdown");

    return sanitize(parsedHTML);
}