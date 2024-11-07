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
import { useTranslations } from "next-intl";

interface IssuesProps {
	tickets: IssuesFromJira;
}

export const Issues = ({ tickets }: IssuesProps) => {
	const t = useTranslations("IssuePage");

	return (
		<>
			<h1 className="text-center text-2xl font-bold mt-4">{t("title")}</h1>
			<section className="grid place-items-center gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-[95%] mx-auto md:mt-7 mt-3">
				{tickets.issues.length > 0 ? (
					tickets.issues.map((issue) => (
						<Card key={issue.id} className="w-[400px]">
							<CardHeader className="flex gap-3">
								<div className="flex flex-col">
									<p className="text-md">Issue : {issue.fields.summary}</p>
									<p className="text-small text-gray-400">
										Status : {issue.fields.status.name}
									</p>
								</div>
							</CardHeader>
							<Divider />
							<CardBody>
								<p>{issue.fields.description.content[0].content[0].text}</p>
							</CardBody>
							<Divider />
							<CardFooter>
								<Link
									isExternal
									showAnchorIcon
									href={`${process.env.NEXT_PUBLIC_JIRA_DOMAIN}/browse/${issue.key}`}
								>
									{t("visit")}
								</Link>
							</CardFooter>
						</Card>
					))
				) : (
					<p>{t("noIssues")}</p>
				)}
			</section>
		</>
	);
};
