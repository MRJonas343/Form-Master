import { Code, Image, Link } from "@nextui-org/react";
import ReactMarkdown from "react-markdown";

export const MarkdownRenderArea = ({
	children,
}: {
	children: string | undefined;
}) => {
	return (
		<ReactMarkdown
			components={{
				h1: ({ children }) => (
					<h1 className="text-2xl font-semibold">{children}</h1>
				),
				h2: ({ children }) => (
					<h2 className="text-xl font-semibold">{children}</h2>
				),
				h3: ({ children }) => (
					<h3 className="text-lg font-semibold">{children}</h3>
				),
				h4: ({ children }) => (
					<h4 className="text-md font-semibold">{children}</h4>
				),
				h5: ({ children }) => (
					<h5 className="text-md font-semibold">{children}</h5>
				),
				h6: ({ children }) => (
					<h6 className="text-md font-semibold">{children}</h6>
				),
				p: ({ children }) => <p className="text-md my-2">{children}</p>,
				ul: ({ children }) => (
					<ul className="list-disc list-inside my-4">{children}</ul>
				),
				ol: ({ children }) => (
					<ol className="list-decimal list-inside my-4">{children}</ol>
				),
				li: ({ children }) => <li className="ml-4 text-md">{children}</li>,
				a: ({ href, children }) => <Link href={href}>{children}</Link>,
				blockquote: ({ children }) => (
					<blockquote className="border-l-4 border-gray-400 pl-4 italic text-gray-600 my-4">
						{children}
					</blockquote>
				),
				code: ({ children }) => <Code>{children}</Code>,
				img: ({ src, alt }) => <Image src={src || ""} alt={alt || "image"} />,
			}}
		>
			{children}
		</ReactMarkdown>
	);
};
