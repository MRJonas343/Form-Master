import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/tmerge";

const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const combinedClassName = cn(
			"rounded-lg border bg-card text-card-foreground shadow-sm",
			className
		);
		return <div className={combinedClassName} ref={ref} {...props} />;
	}
);

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const combinedClassName = cn("flex flex-col space-y-1.5 p-6", className);
		return <div className={combinedClassName} ref={ref} {...props} />;
	}
);

const CardTitle = forwardRef<
	HTMLParagraphElement,
	HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
	const combinedClassName = cn(
		"font-semibold text-2xl leading-none tracking-tight",
		className
	);
	return <h3 className={combinedClassName} ref={ref} {...props} />;
});

const CardDescription = forwardRef<
	HTMLParagraphElement,
	HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
	const combinedClassName = cn("text-muted-foreground text-sm", className);
	return <p className={combinedClassName} ref={ref} {...props} />;
});

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const combinedClassName = cn("p-6 pt-0", className);
		return <div className={combinedClassName} ref={ref} {...props} />;
	}
);

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
	({ className, ...props }, ref) => {
		const combinedClassName = cn("flex items-center p-6 pt-0", className);
		return <div className={combinedClassName} ref={ref} {...props} />;
	}
);

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
};
