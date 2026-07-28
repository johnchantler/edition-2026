import removeMarkdown from "remove-markdown";

// rendered styles for rendered content
export const renderedStyles = {
  p: "font-content text-primary text-sm",
  h2: "text-secondary text-xl pt-4",
  h3: "text-secondary text-lg pt-4",
  ol: "list-decimal pl-8",
  ul: "list-disc pl-4",
  a: "underline underline-offset-8 text-primary",
};

export const getExcerpt = (content?: string | null) => {
  if (!content) {
    return "";
  }

  const text = removeMarkdown(content);

  if (text.length > 300) {
    return `${text.slice(0, 300)}...`;
  }

  return text;
};
