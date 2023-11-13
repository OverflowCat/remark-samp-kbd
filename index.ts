import { visit } from "unist-util-visit";

export default function retextSampleKbd() {
  return (tree: any, file) => {
    console.log(JSON.stringify(tree));
    const stack = [];
    // console.log(tree);
    visit(tree, "SymbolNode", (node, index, parent) => {
      if (node.value !== "``") return;
      console.info(node);
      if (!stack.length) {
        stack.push({ node, parent, index });
        return;
      }
      const {
        node: prevNode,
        parent: prevParent,
        index: prevIndex,
      } = stack.pop();
      // if (prevParent !== parent) {
      //   file.message("`` is not closed", node);
      //   return;
      // }
      // replace ``text`` with <samp>text</samp>

      const newPrevNode = {
        type: "TextNode",
        value: "<samp>",
        children: [],
      };

      const newNode = {
        type: "TextNode",
        value: "</samp>",
        children: [],
      };

      parent.children[prevIndex] = newPrevNode;
      parent.children[index] = newNode;
    });
  };
}
