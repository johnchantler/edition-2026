import removeMarkdown from "remove-markdown";

// rendered styles for rendered content
export const renderedStyles = {
  p: "font-content text-primary even:pl-2 last:pl-0 first:indent-0 indent-2 last:indent-2 text-sm",
  h2: "text-secondary lowercase text-lg pt-4",
  h3: "text-secondary lowercase text-lg pt-4",
  ol: "list-decimal pl-8",
  ul: "list-disc pl-4",
  a: "underline underline-offset-4 text-primary",
  blockquote: "font-content text-highlight border-l-2",
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
