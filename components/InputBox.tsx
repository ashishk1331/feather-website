"use client";

import { addSubscriber } from "@/util/appwrite";
import {
	Check,
	CheckCircle,
	CircleNotch,
	IconWeight,
	MinusCircle,
	WarningCircle,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { twMerge } from "tailwind-merge";

type IconProps = {
	size: number;
	weight: IconWeight;
};

const iconProps: IconProps = {
	size: 20,
	weight: "fill",
};

const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

export default function InputBox() {
	const [email, setEmail] = React.useState("");
	const [isFocused, setIsFocused] = React.useState(false);
	const [isValidEmail, setIsValidEmail] = React.useState(false);
	const [isSubmitted, setIsSubmitted] = React.useState(false);
	const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
	const [isLoading, setIsLoading] = React.useState(false);

	const handleSubmit = React.useCallback(
		async function () {
			try {
				setIsLoading(true);

				if (email.trim().length === 0) {
					throw new Error("Enter an email first.");
				}

				if (!emailRegex.test(email.trim())) {
					throw new Error("Invalid email.");
				}

				const response = await addSubscriber(email.trim());

				console.log(response);

				setIsSubmitted(true);
			} catch (err: any) {
				setErrorMessage(err.message);
			} finally {
				setIsLoading(false);
			}
		},
		[email],
	);

	const appropriateIcon = React.useCallback(function (
		errorMessage: string | null,
		isFocused: boolean,
		isValidEmail: boolean,
		isSubmitted: boolean,
	) {
		if (errorMessage) {
			return <WarningCircle {...iconProps} className="fill-red-400" />;
		}
		if (isSubmitted || isValidEmail) {
			return <CheckCircle {...iconProps} className="fill-green-400" />;
		}
		return (
			<MinusCircle
				{...iconProps}
				className={twMerge(
					"fill-neutral-400 translate-y-px",
					isFocused && "animate-pulse",
				)}
			/>
		);
	},
	[]);

	React.useEffect(() => {
		if (email.trim().length > 0) {
			const isEmailValid = emailRegex.test(email.trim());
			setIsValidEmail(isEmailValid);

			if (isEmailValid) {
				setErrorMessage(null);
			}
		}
	}, [email]);

	return (
		<AnimatePresence>
			{!isSubmitted && (
				<motion.div
					key="input-box"
					initial={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="flex items-center space-x-2 md:mt-4"
				>
					{appropriateIcon(
						errorMessage,
						isFocused,
						isValidEmail,
						isSubmitted,
					)}
					<input
						value={email}
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						onChange={(event) => setEmail(event.target.value)}
						type="text"
						placeholder="type your email here"
						className="w-full p-2 outline-none leading-relaxed"
					/>
				</motion.div>
			)}
			{errorMessage !== null && errorMessage.length > 0 && (
				<p key="error-box" className="text-red-500 lowercase">
					{errorMessage}
				</p>
			)}
			<motion.button
				key="submit-button"
				type="button"
				onClick={handleSubmit}
				disabled={isLoading || isSubmitted}
				className={twMerge(
					"w-fit text-white bg-black p-3 px-6 flex items-center gap-3 mt-4",
					isSubmitted && "bg-neutral-600",
				)}
			>
				{isSubmitted && (
					<Check size={iconProps.size} className="fill-white" />
				)}
				{isLoading && !isSubmitted && (
					<CircleNotch
						size={iconProps.size}
						className="fill-white animate-spin"
					/>
				)}
				{isSubmitted ? "subscribed" : "subscribe"}
			</motion.button>
		</AnimatePresence>
	);
}
