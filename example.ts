import { readFileSync } from "fs";
import { retext } from "retext";
import { reporter } from "vfile-reporter";
import remarkSampleKbd from "./index.js";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";

const buffer = readFileSync("example.md");

retext()
.use(remarkParse)
  .use(remarkSampleKbd)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeStringify, { allowDangerousHtml: true })
  .process(buffer)
  .then((file) => {
    console.error(reporter(file));
    console.log(file.toString());
  });
