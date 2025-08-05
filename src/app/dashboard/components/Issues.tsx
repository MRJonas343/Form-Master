"use client";

import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Link,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import type { IssuesFromJira } from "@/interfaces/IssuesFromJira";

interface IssuesProps {
	tickets: IssuesFromJira;
}

export const Issues = ({ tickets }: IssuesProps) => {
	const t = useTranslations("IssuePage");

	return (
		<>
			<h1 className="mt-4 text-center font-bold text-2xl">{t("title")}</h1>
			<section className="mx-auto mt-3 grid w-[95%] max-w-[1300px] grid-cols-1 place-items-center gap-4 md:mt-7 md:grid-cols-2 xl:grid-cols-3">
				{tickets.issues.length > 0 ? (
					tickets.issues.map((issue) => (
						<Card className="w-[400px]" key={issue.id}>
							<CardHeader className="flex gap-3">
								<div className="flex flex-col">
									<p className="text-md">Issue : {issue.fields.summary}</p>
									<p className="text-gray-400 text-small">
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
									href={`${process.env.NEXT_PUBLIC_JIRA_DOMAIN}/browse/${issue.key}`}
									isExternal
									showAnchorIcon
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
