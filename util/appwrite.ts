import { Client, Databases, ID } from "appwrite";

const client = new Client()
	.setEndpoint("https://cloud.appwrite.io/v1")
	.setProject("altar-website");

const databases = new Databases(client);

export function addSubscriber(email: string) {
	const promise = databases.createDocument(
		"668d7fa800173a7afd76",
		"668d7fb500346e623f83",
		ID.unique(),
		{ email },
	);

	return promise;
}
