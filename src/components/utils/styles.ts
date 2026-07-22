import removeMarkdown from "remove-markdown";

// rendered styles for rendered content
export const renderedStyles = {
  p: "text-primary",
  h2: "text-secondary pt-4",
  h3: "text-secondary pt-4",
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
