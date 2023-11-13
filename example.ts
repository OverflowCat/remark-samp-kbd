import { readFileSync } from "fs";
import { retext } from "retext";
import { reporter } from "vfile-reporter";
import retextSampleKbd from "./index.js";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";

const buffer = readFileSync("example.md");

retext()
  .use(retextSampleKbd)
  .use(remarkParse)
  .use(remarkRehype)
  .use(rehypeStringify)
  .process(buffer)
  .then((file) => {
    console.error(reporter(file));
    console.log(file.toString());
  });
