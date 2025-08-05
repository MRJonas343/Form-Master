import { ForceLogOut } from "@/components/ForceLogOut";

export default function page() {
	return (
		<div className="mt-10 flex w-full justify-center text-center font-semibold text-3xl">
			Sorry bro you are blocked 😭<ForceLogOut />
		</div>
	);
}
