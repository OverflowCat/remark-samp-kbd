import { visit } from "unist-util-visit";

interface Position {
  start: {
    line: number;
    column: number;
    offset: number;
  };
  end: {
    line: number;
    column: number;
    offset: number;
  };
}

interface RemarkNode {
  type: string;
  value?: string;
  children?: RemarkNode[];
  position: Position;
}

interface InlineCodeNode extends RemarkNode {
  type: "inlineCode";
  value: string;
}

interface InlineCodeParentNode extends RemarkNode {
  type: Exclude<RemarkNode["type"], "inlineCode">;
  children: [InlineCodeNode, ...RemarkNode[]];
}

export default function remarkSampleKbd() {
  return (tree: any, file) => {
    const text = file.toString();
    visit(
      tree,
      "inlineCode",
      (node: InlineCodeNode, index: number, parent: InlineCodeParentNode) => {
        console.info(node);
        let leftCount = 0,
          rightCount = 0;
        let i = node.position.start.offset;
        let j = node.position.end.offset;
        while (text[i++] === "`") leftCount++;
        while (text[--j] === "`") rightCount++;
        if (leftCount == 0 || leftCount != rightCount) {
          console.warn(
            `Mismatched backticks at ${node.position.start.line}:${node.position.start.column}`
          );
        }
        console.log(leftCount, rightCount);
        const count = leftCount % 4;
        console.log(`We have 4k+${count} backticks`);
        // Use 4k+1 to 4k+4 numbers of ` to represent different semantics — code fragment (<code>), program output (<samp>), keyboard key (kbd) and mathematical variable / simple formula (var).
        const tag = [
          "var", // 4k+4
          "code", // 4k+1
          "samp", // 4k+2
          "kbd", // 4k+3
        ][count];
        if (!tag) {
          console.warn(
            `Invalid number of backticks at ${node.position.start.line}:${node.position.start.column}`
          );
          return;
        }
        console.log(`We have ${tag} tag`);
        if (tag === "code") {
          // inlineCode is already code
          return;
        }

        const start = node.position.start;
        const end = node.position.end;
        const seg1 = {
          line: start.line,
          column: start.column + leftCount,
          offset: start.offset + leftCount,
        };
        const seg2 = {
          line: end.line,
          column: end.column - rightCount,
          offset: end.offset - rightCount,
        };
        const newNodes = [
          {
            type: "html",
            value: `<${tag}>`,
            position: {
              start,
              end: seg1,
            },
          },
          {
            type: "text",
            value: node.value,
            position: { start: seg1, end: seg2 },
          },
          {
            type: "html",
            value: `</${tag}>`,
            position: { start: seg2, end },
          },
        ];
        parent.children.splice(index, 1, ...newNodes);
        console.info(parent);
      }
    );
  };
}
