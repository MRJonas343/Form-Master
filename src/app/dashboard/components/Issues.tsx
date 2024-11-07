"use client";

import type { IssuesFromJira } from "@/interfaces/IssuesFromJira";
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Link,
} from "@nextui-org/react";

interface IssuesProps {
	tickets: IssuesFromJira;
}

export const Issues = ({ tickets }: IssuesProps) => {
	return (
		<section className="grid place-items-center gap-4 grid-cols-1  md:grid-cols-2 xl:grid-cols-3 w-[95%] mx-auto md:mt-7 mt-3">
			{tickets.issues.map((issue) => (
				<Card key={issue.id} className="w-[400px]">
					<CardHeader className="flex gap-3">
						<div className="flex flex-col">
							<p className="text-md">{issue.fields.summary}</p>
							<p className="text-small text-default-500">
								{issue.fields.status.name}
							</p>
							q
						</div>
					</CardHeader>
					<Divider />
					<CardBody>
						<p>{issue.fields.status.description}</p>
					</CardBody>
					<Divider />
					<CardFooter>
						<Link isExternal showAnchorIcon href={issue.self}>
							Visit Issue in Jira
						</Link>
					</CardFooter>
				</Card>
			))}
		</section>
	);
};
