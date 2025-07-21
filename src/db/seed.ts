import { v4 as uuidv4 } from "uuid";
import type { QuestionsToSeed, UsersSeed } from "@/interfaces";
import { hashPassword } from "@/utils/password";
import { db } from ".";
import {
	answers,
	comments,
	filledForms,
	forms,
	formTags,
	likes,
	options,
	questions,
	tags,
	users,
} from "./schemas";
import "dotenv/config";

const usersToSeed: UsersSeed[] = [
	{
		name: "Admin",
		email: "admin@formmaster.com",
		password: process.env.ADMIN_PASSWORD ?? "",
		role: "admin",
		status: "active",
	},
	{
		name: "Bob",
		email: "bob@example.com",
		password: "password",
		role: "user",
		status: "active",
	},
	{
		name: "Charlie",
		email: "charlie@example.com",
		password: "password",
		role: "user",
		status: "blocked",
	},
	{
		name: "Diana",
		email: "diana@example.com",
		password: "password",
		role: "user",
		status: "active",
	},
	{
		name: "Eve",
		email: "eve@example.com",
		password: "password",
		role: "user",
		status: "active",
	},
	{
		name: "Frank",
		email: "frank@example.com",
		password: "password",
		role: "user",
		status: "active",
	},
	{
		name: "Grace",
		email: "grace@example.com",
		password: "password",
		role: "user",
		status: "blocked",
	},
	{
		name: "Hank",
		email: "hank@example.com",
		password: "password",
		role: "user",
		status: "active",
	},
	{
		name: "Ivy",
		email: "ivy@example.com",
		password: "password",
		role: "user",
		status: "blocked",
	},
	{
		name: "Jack",
		email: "jack@example.com",
		password: "password",
		role: "user",
		status: "active",
	},
	{
		name: "Kara",
		email: "kara@example.com",
		password: "password",
		role: "user",
		status: "active",
	},
	{
		name: "Leo",
		email: "leo@example.com",
		password: "password",
		role: "user",
		status: "blocked",
	},
	{
		name: "Mia",
		email: "mia@example.com",
		password: "password",
		role: "user",
		status: "active",
	},
	{
		name: "Nina",
		email: "nina@example.com",
		password: "password",
		role: "user",
		status: "active",
	},
	{
		name: "Oscar",
		email: "oscar@example.com",
		password: "password",
		role: "user",
		status: "active",
	},
	{
		name: "Paul",
		email: "paul@example.com",
		password: "password",
		role: "user",
		status: "blocked",
	},
	{
		name: "Quinn",
		email: "quinn@example.com",
		password: "password",
		role: "user",
		status: "active",
	},
	{
		name: "Rita",
		email: "rita@example.com",
		password: "password",
		role: "user",
		status: "blocked",
	},
	{
		name: "Sam",
		email: "sam@example.com",
		password: "password",
		role: "user",
		status: "active",
	},
	{
		name: "Tina",
		email: "tina@example.com",
		password: "password",
		role: "user",
		status: "blocked",
	},
];

const formsToSeed = [
	{
		author_id: 1,
		title: "What do you think about Apples?",
		topic: "Animals",
		description:
			"# This is a form about apples  \n I would like to know what do you think about **apples**, your opinions, your experiences and your feelings about them",
		isPublic: true,
		imageUrl: process.env.DEFAULT_IMAGE_URL ?? "",
	},
	{
		author_id: 1,
		title: "Do you like Dogs?",
		topic: "Pets",
		description:
			"# This is a form about dogs  \n I would like to know your experiences with dogs, your favorite breeds, and how they impact your life",
		isPublic: true,
		imageUrl: process.env.DEFAULT_IMAGE_URL ?? "",
	},
	{
		author_id: 2,
		title: "Your Thoughts on Climate Change?",
		topic: "Environment",
		description:
			"# This is a form about climate change  \n Share your thoughts, concerns, and actions you are taking to combat climate change",
		isPublic: true,
		imageUrl: process.env.DEFAULT_IMAGE_URL ?? "",
	},
	{
		author_id: 2,
		title: "Favorite Books of All Time",
		topic: "Literature",
		description:
			"# This is a form about favorite books  \n Tell us about your favorite books, why they are special to you, and how they have impacted your life",
		isPublic: true,
		imageUrl: process.env.DEFAULT_IMAGE_URL ?? "",
	},
	{
		author_id: 2,
		title: "Best Travel Destinations",
		topic: "Travel",
		description:
			"# This is a form about travel  \n Share your favorite travel destinations, experiences, and tips for fellow travelers",
		isPublic: true,
		imageUrl: process.env.DEFAULT_IMAGE_URL ?? "",
	},
	{
		author_id: 3,
		title: "Healthy Eating Habits",
		topic: "Health",
		description:
			"# This is a form about healthy eating  \n Share your tips, favorite recipes, and how healthy eating has improved your life",
		isPublic: true,
		imageUrl: process.env.DEFAULT_IMAGE_URL ?? "",
	},
	{
		author_id: 5,
		title: "Technological Innovations",
		topic: "Technology",
		description:
			"# This is a form about technology  \n Discuss the latest technological innovations, their impact on society, and future trends",
		isPublic: true,
		imageUrl: process.env.DEFAULT_IMAGE_URL ?? "",
	},
	{
		author_id: 8,
		title: "Music That Moves You",
		topic: "Music",
		description:
			"# This is a form about music  \n Share your favorite genres, artists, and how music influences your mood and daily life",
		isPublic: true,
		imageUrl: process.env.DEFAULT_IMAGE_URL ?? "",
	},
	{
		author_id: 9,
		title: "Fitness Routines",
		topic: "Fitness",
		description:
			"# This is a form about fitness  \n Describe your fitness routines, favorite workouts, and how you stay motivated",
		isPublic: true,
		imageUrl: process.env.DEFAULT_IMAGE_URL ?? "",
	},
	{
		author_id: 10,
		title: "The Future of Work",
		topic: "Business",
		description:
			"# This is a form about the future of work  \n Discuss trends, remote work, and how the workplace is evolving",
		isPublic: true,
		imageUrl: process.env.DEFAULT_IMAGE_URL ?? "",
	},
	{
		author_id: 11,
		title: "Learning New Languages",
		topic: "Education",
		description:
			"# This is a form about learning languages  \n Share your experiences, tips, and challenges in learning new languages",
		isPublic: true,
		imageUrl: process.env.DEFAULT_IMAGE_URL ?? "",
	},
	{
		author_id: 12,
		title: "Artistic Expressions",
		topic: "Art",
		description:
			"# This is a form about art  \n Discuss your favorite art forms, artists, and how art impacts your life",
		isPublic: true,
		imageUrl: process.env.DEFAULT_IMAGE_URL ?? "",
	},
	{
		author_id: 13,
		title: "Sustainable Living",
		topic: "Sustainability",
		description:
			"# This is a form about sustainable living  \n Share your practices, ideas, and how you contribute to a sustainable lifestyle",
		isPublic: true,
		imageUrl: process.env.DEFAULT_IMAGE_URL ?? "",
	},
	{
		author_id: 14,
		title: "Gaming Communities",
		topic: "Gaming",
		description:
			"# This is a form about gaming  \n Discuss your favorite games, communities, and how gaming has influenced your life",
		isPublic: true,
		imageUrl: process.env.DEFAULT_IMAGE_URL ?? "",
	},
	{
		author_id: 15,
		title: "Gardening Tips",
		topic: "Gardening",
		description:
			"# This is a form about gardening  \n Share your gardening tips, favorite plants, and how gardening benefits your well-being",
		isPublic: true,
		imageUrl: process.env.DEFAULT_IMAGE_URL ?? "",
	},
	{
		author_id: 16,
		title: "Cooking Adventures",
		topic: "Cooking",
		description:
			"# This is a form about cooking  \n Share your favorite recipes, cooking tips, and how cooking has become a part of your life",
		isPublic: true,
		imageUrl: process.env.DEFAULT_IMAGE_URL ?? "",
	},
	{
		author_id: 17,
		title: "Mental Health Awareness",
		topic: "Mental Health",
		description:
			"# This is a form about mental health  \n Discuss the importance of mental health, personal experiences, and ways to maintain mental well-being",
		isPublic: true,
		imageUrl: process.env.DEFAULT_IMAGE_URL ?? "",
	},
	{
		author_id: 18,
		title: "Fashion Trends",
		topic: "Fashion",
		description:
			"# This is a form about fashion  \n Share your favorite fashion trends, designers, and how fashion influences your identity",
		isPublic: true,
		imageUrl: process.env.DEFAULT_IMAGE_URL ?? "",
	},
	{
		author_id: 19,
		title: "Photography Techniques",
		topic: "Photography",
		description:
			"# This is a form about photography  \n Discuss your favorite photography techniques, equipment, and how photography has become a hobby",
		isPublic: true,
		imageUrl: process.env.DEFAULT_IMAGE_URL ?? "",
	},
	{
		author_id: 20,
		title: "Personal Finance Tips",
		topic: "Finance",
		description:
			"# This is a form about personal finance  \n Share your tips on budgeting, saving, and investing for a secure financial future",
		isPublic: true,
		imageUrl: process.env.DEFAULT_IMAGE_URL ?? "",
	},
];

const questionsToSeed: QuestionsToSeed[] = [
	{
		formId: 1,
		question: "What is your favorite type of apple?",
		description: "Please select your favorite apple variety.",
		displayInTable: true,
		order: 1,
		type: "multiple",
	},
	{
		formId: 1,
		question: "Why do you like or dislike apples?",
		description: "Share your reasons for liking or disliking apples.",
		displayInTable: false,
		order: 2,
		type: "long",
	},
	{
		formId: 1,
		question: "How often do you eat apples?",
		description: "Answer in number of times per week.",
		displayInTable: true,
		order: 3,
		type: "numeric",
	},
	{
		formId: 1,
		question: "What is your favorite way to consume apples?",
		description: "e.g., fresh, juice, pie.",
		displayInTable: true,
		order: 4,
		type: "short",
	},
	{
		formId: 1,
		question: "Are apples good for you?",
		description: "Yes or No.",
		displayInTable: true,
		order: 5,
		type: "single",
	},
	{
		formId: 2,
		question: "Do you have a dog?",
		description: "Yes or No.",
		displayInTable: true,
		order: 1,
		type: "single",
	},
	{
		formId: 2,
		question: "What is your favorite dog breed?",
		description: "If you have one, share your favorite breed.",
		displayInTable: false,
		order: 2,
		type: "short",
	},
	{
		formId: 2,
		question: "How many dogs have you had in your life?",
		description: "Provide the total number.",
		displayInTable: true,
		order: 3,
		type: "numeric",
	},
	{
		formId: 2,
		question: "Why do you think dogs are good companions?",
		description: "Explain the reasons why dogs make good companions.",
		displayInTable: false,
		order: 4,
		type: "long",
	},

	{
		formId: 3,
		question: "Do you believe climate change is real?",
		description: "Select Yes or No.",
		displayInTable: true,
		order: 1,
		type: "multiple",
	},
	{
		formId: 3,
		question: "What actions do you take to combat climate change?",
		description:
			"Share your actions, e.g., recycling, reducing carbon footprint.",
		displayInTable: false,
		order: 2,
		type: "long",
	},
	{
		formId: 3,
		question: "How concerned are you about climate change?",
		description: "Rate your concern on a scale of 1 to 10.",
		displayInTable: true,
		order: 3,
		type: "numeric",
	},
	{
		formId: 3,
		question: "What do you think is the biggest cause of climate change?",
		description: "Provide your opinion on the main cause.",
		displayInTable: false,
		order: 4,
		type: "short",
	},
	{
		formId: 4,
		question: "What is your favorite book?",
		description: "Name your favorite book.",
		displayInTable: true,
		order: 1,
		type: "short",
	},
	{
		formId: 4,
		question: "Why is this book special to you?",
		description: "Explain what makes the book special to you.",
		displayInTable: false,
		order: 2,
		type: "long",
	},
	{
		formId: 4,
		question: "How many books do you read per year?",
		description: "Provide the average number of books you read annually.",
		displayInTable: true,
		order: 3,
		type: "numeric",
	},
	{
		formId: 4,
		question: "Which genre do you enjoy the most?",
		description: "Select your favorite book genre.",
		displayInTable: true,
		order: 4,
		type: "multiple",
	},
	{
		formId: 5,
		question: "What is your favorite travel destination?",
		description: "Name your favorite place to visit.",
		displayInTable: true,
		order: 1,
		type: "short",
	},
	{
		formId: 5,
		question: "Why do you recommend this destination?",
		description: "Share the reasons why you recommend visiting this place.",
		displayInTable: false,
		order: 2,
		type: "long",
	},
	{
		formId: 5,
		question: "How many countries have you visited?",
		description: "Provide the total number of countries you've visited.",
		displayInTable: true,
		order: 3,
		type: "numeric",
	},
	{
		formId: 5,
		question: "What is your preferred type of travel?",
		description: "e.g., solo, family, adventure, luxury.",
		displayInTable: true,
		order: 4,
		type: "short",
	},
	{
		formId: 6,
		question: "What is your favorite healthy recipe?",
		description:
			"Share a recipe you love that's both delicious and nutritious.",
		displayInTable: true,
		order: 1,
		type: "long",
	},
	{
		formId: 6,
		question: "How many servings of fruits and vegetables do you eat per day?",
		description: "Please provide an approximate number of servings.",
		displayInTable: true,
		order: 2,
		type: "numeric",
	},
	{
		formId: 6,
		question: "What motivates you to maintain a healthy diet?",
		description: "Explain the main reasons why you prioritize healthy eating.",
		displayInTable: false,
		order: 3,
		type: "long",
	},
	{
		formId: 7,
		question:
			"What recent technological innovation has impressed you the most?",
		description:
			"Mention a recent innovation and explain why it caught your attention.",
		displayInTable: true,
		order: 1,
		type: "long",
	},
	{
		formId: 7,
		question: "How often do you update your tech devices?",
		description: "Provide an approximate frequency of updates.",
		displayInTable: true,
		order: 2,
		type: "numeric",
	},
	{
		formId: 7,
		question: "What do you think is the future of AI in everyday life?",
		description: "Share your thoughts on the role AI will play in the future.",
		displayInTable: false,
		order: 3,
		type: "long",
	},
	{
		formId: 8,
		question: "What genre of music resonates with you the most?",
		description: "Select your favorite genre or style of music.",
		displayInTable: true,
		order: 1,
		type: "single",
	},
	{
		formId: 8,
		question: "How often do you listen to music daily?",
		description: "Answer in approximate hours or times per day.",
		displayInTable: true,
		order: 2,
		type: "numeric",
	},
	{
		formId: 8,
		question: "How does music impact your mood?",
		description: "Explain the emotional effect music has on you.",
		displayInTable: false,
		order: 3,
		type: "long",
	},
	{
		formId: 9,
		question: "What is your preferred type of workout?",
		description: "e.g., cardio, strength training, yoga.",
		displayInTable: true,
		order: 1,
		type: "short",
	},
	{
		formId: 9,
		question: "How many days per week do you exercise?",
		description: "Provide the number of exercise days per week.",
		displayInTable: true,
		order: 2,
		type: "numeric",
	},
	{
		formId: 9,
		question: "What keeps you motivated to stay active?",
		description: "Explain your source of motivation for fitness.",
		displayInTable: false,
		order: 3,
		type: "long",
	},
	{
		formId: 10,
		question: "How do you feel about remote work?",
		description:
			"Share your thoughts on remote work and its impact on productivity.",
		displayInTable: true,
		order: 1,
		type: "long",
	},
	{
		formId: 10,
		question: "How many hours do you work remotely per week?",
		description: "Provide an approximate number of hours.",
		displayInTable: true,
		order: 2,
		type: "numeric",
	},
	{
		formId: 10,
		question:
			"What skills do you think will be essential in the future workplace?",
		description:
			"List the skills that will be important for future work environments.",
		displayInTable: false,
		order: 3,
		type: "long",
	},
	{
		formId: 11,
		question: "Which languages are you currently learning?",
		description: "List any languages you are actively learning.",
		displayInTable: true,
		order: 1,
		type: "short",
	},
	{
		formId: 11,
		question: "How much time do you spend studying languages weekly?",
		description: "Provide an estimate in hours per week.",
		displayInTable: true,
		order: 2,
		type: "numeric",
	},
	{
		formId: 11,
		question: "What challenges have you faced while learning a new language?",
		description:
			"Describe the main challenges in your language learning journey.",
		displayInTable: false,
		order: 3,
		type: "long",
	},
	{
		formId: 12,
		question: "What form of art do you enjoy the most?",
		description: "e.g., painting, music, sculpture, dance.",
		displayInTable: true,
		order: 1,
		type: "single",
	},
	{
		formId: 12,
		question: "How often do you engage in artistic activities?",
		description: "Answer in approximate times per month.",
		displayInTable: true,
		order: 2,
		type: "numeric",
	},
	{
		formId: 12,
		question: "How does art impact your life?",
		description:
			"Explain the influence of art on your mood, creativity, or lifestyle.",
		displayInTable: false,
		order: 3,
		type: "long",
	},
	{
		formId: 13,
		question: "What sustainable practices do you follow regularly?",
		description: "e.g., recycling, composting, reducing energy consumption.",
		displayInTable: true,
		order: 1,
		type: "short",
	},
	{
		formId: 13,
		question:
			"How many hours per week do you dedicate to sustainable activities?",
		description: "Provide an estimate in hours.",
		displayInTable: true,
		order: 2,
		type: "numeric",
	},
	{
		formId: 13,
		question: "What motivates you to live sustainably?",
		description: "Share the reasons behind your commitment to sustainability.",
		displayInTable: false,
		order: 3,
		type: "long",
	},
	{
		formId: 14,
		question: "What games do you play the most?",
		description: "List your favorite games or the ones you play frequently.",
		displayInTable: true,
		order: 1,
		type: "short",
	},
	{
		formId: 14,
		question: "How has gaming impacted your social life?",
		description:
			"Share how gaming has influenced your interactions and friendships.",
		displayInTable: false,
		order: 2,
		type: "long",
	},
	{
		formId: 15,
		question: "What are your top gardening tips?",
		description: "Provide advice for new and experienced gardeners alike.",
		displayInTable: true,
		order: 1,
		type: "short",
	},
	{
		formId: 15,
		question: "How much time do you spend gardening weekly?",
		description: "Estimate the number of hours spent gardening per week.",
		displayInTable: true,
		order: 2,
		type: "numeric",
	},
	{
		formId: 16,
		question: "What is your favorite type of cuisine to cook?",
		description: "e.g., Italian, Japanese, Mexican.",
		displayInTable: true,
		order: 1,
		type: "short",
	},
	{
		formId: 16,
		question: "How often do you try new recipes?",
		description: "Answer with an approximate number of times per month.",
		displayInTable: true,
		order: 2,
		type: "numeric",
	},
	{
		formId: 17,
		question: "What activities do you find helpful for mental well-being?",
		description:
			"List activities that contribute positively to your mental health.",
		displayInTable: true,
		order: 1,
		type: "short",
	},
	{
		formId: 17,
		question: "How do you manage stress on a daily basis?",
		description: "Describe your methods for coping with stress.",
		displayInTable: false,
		order: 2,
		type: "long",
	},
	{
		formId: 18,
		question: "What current fashion trends do you follow?",
		description:
			"List any fashion trends you enjoy or incorporate into your style.",
		displayInTable: true,
		order: 1,
		type: "short",
	},
	{
		formId: 18,
		question: "Who are your favorite fashion designers?",
		description: "Share some designers whose work you admire.",
		displayInTable: false,
		order: 2,
		type: "short",
	},
	{
		formId: 19,
		question: "What type of photography do you enjoy the most?",
		description: "e.g., landscape, portrait, street photography.",
		displayInTable: true,
		order: 1,
		type: "single",
	},
	{
		formId: 19,
		question: "What camera equipment do you use?",
		description: "List any cameras or lenses you frequently use.",
		displayInTable: false,
		order: 2,
		type: "short",
	},

	{
		formId: 20,
		question: "What is your primary method for managing a budget?",
		description:
			"e.g., using an app, spreadsheet, or manually tracking expenses.",
		displayInTable: true,
		order: 1,
		type: "short",
	},
	{
		formId: 20,
		question: "What are your top three tips for saving money?",
		description: "Provide advice on how to effectively save money.",
		displayInTable: false,
		order: 2,
		type: "long",
	},
];

const optionsToSeed = [
	{ questionId: 1, optionText: "Green" },
	{ questionId: 1, optionText: "Red" },
	{ questionId: 1, optionText: "Golden" },
	{ questionId: 1, optionText: "All of them are good" },
	//Do you believe climate change is real?
	{ questionId: 10, optionText: "Yes" },
	{ questionId: 10, optionText: "No" },
	{ questionId: 10, optionText: "I don't know" },
	//Which genre do you enjoy the most? books id 17
	{ questionId: 17, optionText: "Fiction" },
	{ questionId: 17, optionText: "Non-fiction" },
	{ questionId: 17, optionText: "Comedy" },
	{ questionId: 17, optionText: "Drama" },
];

const tagsToSeed = [
	{ tag: "Animals" },
	{ tag: "Business" },
	{ tag: "Education" },
	{ tag: "Environment" },
	{ tag: "Finance" },
	{ tag: "Health" },
	{ tag: "History" },
	{ tag: "Literature" },
	{ tag: "Maths" },
	{ tag: "Science" },
	{ tag: "Sports" },
	{ tag: "Technology" },
];

const formTagsToSeed = [
	{ form_id: 1, tag_id: 1 },
	{ form_id: 1, tag_id: 3 },
	{ form_id: 1, tag_id: 5 },
	{ form_id: 2, tag_id: 2 },
	{ form_id: 2, tag_id: 4 },
	{ form_id: 2, tag_id: 6 },
	{ form_id: 3, tag_id: 3 },
	{ form_id: 3, tag_id: 7 },
	{ form_id: 3, tag_id: 9 },
	{ form_id: 4, tag_id: 4 },
	{ form_id: 4, tag_id: 8 },
	{ form_id: 4, tag_id: 10 },
	{ form_id: 5, tag_id: 5 },
	{ form_id: 5, tag_id: 11 },
	{ form_id: 6, tag_id: 6 },
	{ form_id: 6, tag_id: 12 },
	{ form_id: 7, tag_id: 1 },
	{ form_id: 7, tag_id: 7 },
	{ form_id: 7, tag_id: 9 },
	{ form_id: 8, tag_id: 2 },
	{ form_id: 8, tag_id: 8 },
	{ form_id: 8, tag_id: 10 },
	{ form_id: 9, tag_id: 3 },
	{ form_id: 9, tag_id: 11 },
	{ form_id: 9, tag_id: 12 },
	{ form_id: 10, tag_id: 4 },
	{ form_id: 10, tag_id: 6 },
	{ form_id: 10, tag_id: 9 },
	{ form_id: 11, tag_id: 5 },
	{ form_id: 11, tag_id: 7 },
	{ form_id: 11, tag_id: 10 },
	{ form_id: 12, tag_id: 6 },
	{ form_id: 12, tag_id: 12 },
	{ form_id: 13, tag_id: 1 },
	{ form_id: 13, tag_id: 4 },
	{ form_id: 13, tag_id: 8 },
	{ form_id: 14, tag_id: 2 },
	{ form_id: 14, tag_id: 5 },
	{ form_id: 14, tag_id: 11 },
	{ form_id: 15, tag_id: 3 },
	{ form_id: 15, tag_id: 7 },
	{ form_id: 16, tag_id: 4 },
	{ form_id: 16, tag_id: 9 },
	{ form_id: 17, tag_id: 1 },
	{ form_id: 17, tag_id: 6 },
	{ form_id: 18, tag_id: 2 },
	{ form_id: 18, tag_id: 8 },
	{ form_id: 19, tag_id: 3 },
	{ form_id: 19, tag_id: 10 },
	{ form_id: 20, tag_id: 4 },
	{ form_id: 20, tag_id: 12 },
];

const totalForms = 20;
const totalUsers = 20;

const generateRandomLikes = () => {
	const randomFormId = Math.floor(Math.random() * totalForms) + 1;
	const randomUserId = Math.floor(Math.random() * totalUsers) + 1;

	return { form_id: randomFormId, user_id: randomUserId };
};

const likesToSeed = () => {
	const likes = [];

	for (let i = 0; i < 30; i++) {
		likes.push(generateRandomLikes());
	}

	return likes;
};

const commentsToSeed = [
	{ user_id: 1, form_id: 1, comment: "Great form!" },
	{ user_id: 2, form_id: 1, comment: "Very helpful, thanks!" },
	{ user_id: 3, form_id: 1, comment: "I loved the design!" },

	{ user_id: 1, form_id: 2, comment: "Interesting questions!" },
	{ user_id: 2, form_id: 2, comment: "Could use more options." },

	{ user_id: 1, form_id: 3, comment: "Simple and effective." },
	{ user_id: 3, form_id: 3, comment: "Good for feedback." },
	{ user_id: 2, form_id: 3, comment: "Loved it!" },

	{ user_id: 1, form_id: 4, comment: "I have some suggestions." },
	{ user_id: 3, form_id: 4, comment: "Great overall experience!" },
	{ user_id: 2, form_id: 4, comment: "Would recommend!" },

	{ user_id: 1, form_id: 5, comment: "Nice layout!" },
	{ user_id: 2, form_id: 5, comment: "Easy to fill out." },
	{ user_id: 3, form_id: 5, comment: "Good questions!" },
	{ user_id: 3, form_id: 5, comment: "I enjoyed this." },

	{ user_id: 1, form_id: 6, comment: "Not bad!" },
	{ user_id: 2, form_id: 6, comment: "Could be improved." },
	{ user_id: 1, form_id: 6, comment: "Very useful!" },

	{ user_id: 3, form_id: 7, comment: "Awesome form!" },
	{ user_id: 2, form_id: 7, comment: "Had some issues." },
	{ user_id: 1, form_id: 7, comment: "Will use again!" },
	{ user_id: 3, form_id: 7, comment: "Loved the design!" },

	{ user_id: 2, form_id: 8, comment: "Great job!" },
	{ user_id: 1, form_id: 8, comment: "I appreciate the effort." },
	{ user_id: 3, form_id: 8, comment: "Very helpful!" },
	{ user_id: 2, form_id: 8, comment: "Thanks for this!" },

	{ user_id: 1, form_id: 9, comment: "Would love to see more forms!" },
	{ user_id: 3, form_id: 9, comment: "Keep it up!" },

	{ user_id: 2, form_id: 10, comment: "Very insightful." },
	{ user_id: 1, form_id: 10, comment: "Had a great experience!" },
	{ user_id: 3, form_id: 10, comment: "Nice questions!" },
];

const filledFormsToSeed = [
	{
		form_id: 1,
		user_id: 1,
	},
	{
		form_id: 1,
		user_id: 2,
	},
	{
		form_id: 1,
		user_id: 3,
	},
	{
		form_id: 1,
		user_id: 5,
	},
	{
		form_id: 1,
		user_id: 4,
	},
	{
		form_id: 1,
		user_id: 6,
	},
	{
		form_id: 2,
		user_id: 3,
	},
	{
		form_id: 2,
		user_id: 4,
	},
	{
		form_id: 2,
		user_id: 5,
	},
	{
		form_id: 2,
		user_id: 2,
	},
	{
		form_id: 2,
		user_id: 7,
	},
	{
		form_id: 3,
		user_id: 6,
	},
	{
		form_id: 3,
		user_id: 2,
	},
	{
		form_id: 3,
		user_id: 8,
	},
	{
		form_id: 3,
		user_id: 9,
	},
	{
		form_id: 6,
		user_id: 3,
	},
	{
		form_id: 6,
		user_id: 5,
	},
	{
		form_id: 6,
		user_id: 8,
	},
	{
		form_id: 7,
		user_id: 4,
	},
	{
		form_id: 7,
		user_id: 2,
	},
	{
		form_id: 8,
		user_id: 3,
	},
];

const answersToSeed = [
	{ questionID: 1, filledFormID: 1, value: "Green" },
	{
		questionID: 2,
		filledFormID: 1,
		value: "Because I like them, I will buy them",
	},
	{ questionID: 3, filledFormID: 1, value: 4 },
	{ questionID: 4, filledFormID: 1, value: "Fresh" },

	{ questionID: 1, filledFormID: 2, value: "Golden" },
	{ questionID: 2, filledFormID: 2, value: "I love them" },
	{ questionID: 3, filledFormID: 2, value: 5 },
	{ questionID: 4, filledFormID: 2, value: "Frozen" },

	{ questionID: 1, filledFormID: 3, value: "All of them are good" },
	{ questionID: 2, filledFormID: 3, value: "I love them" },
	{ questionID: 3, filledFormID: 3, value: 5 },
	{ questionID: 4, filledFormID: 3, value: "Frozen" },

	{ questionID: 1, filledFormID: 4, value: "All of them are good" },
	{ questionID: 2, filledFormID: 4, value: "I love them" },
	{ questionID: 3, filledFormID: 4, value: 5 },
	{ questionID: 4, filledFormID: 4, value: "Frozen" },

	{ questionID: 1, filledFormID: 5, value: "All of them are good" },
	{ questionID: 2, filledFormID: 5, value: "I love them" },
	{ questionID: 3, filledFormID: 5, value: 5 },
	{ questionID: 4, filledFormID: 5, value: "Frozen" },

	{ questionID: 1, filledFormID: 6, value: "Red" },
	{ questionID: 2, filledFormID: 6, value: "I love them" },
	{ questionID: 3, filledFormID: 6, value: 5 },
	{ questionID: 4, filledFormID: 6, value: "Frozen" },
];

const seed = async () => {
	const usersToInsert = await Promise.all(
		usersToSeed.map(async (user, index) => ({
			id: uuidv4(),
			name: user.name,
			email: user.email,
			password: await hashPassword(user.password),
			role: user.role,
			status: user.status,
		})),
	);

	await db.insert(users).values(usersToInsert);

	// Create a mapping from old numeric IDs to new UUIDs
	const userIdMap: { [key: number]: string } = {};
	usersToInsert.forEach((user, index) => {
		userIdMap[index + 1] = user.id; // index + 1 because seed data uses 1-based indexing
	});

	// Update forms to use UUID author_ids
	const formsWithUuids = formsToSeed.map((form) => ({
		...form,
		author_id: userIdMap[form.author_id],
	}));

	// Update likes to use UUID user_ids
	const likesWithUuids = likesToSeed().map((like) => ({
		...like,
		user_id: userIdMap[like.user_id],
	}));

	// Update comments to use UUID user_ids
	const commentsWithUuids = commentsToSeed.map((comment) => ({
		...comment,
		user_id: userIdMap[comment.user_id],
	}));

	// Update filled forms to use UUID user_ids
	const filledFormsWithUuids = filledFormsToSeed.map((filledForm) => ({
		...filledForm,
		user_id: userIdMap[filledForm.user_id],
	}));

	await db.insert(forms).values(formsWithUuids);
	await db.insert(questions).values(questionsToSeed);
	await db.insert(tags).values(tagsToSeed);
	await db.insert(formTags).values(formTagsToSeed);
	await db.insert(likes).values(likesWithUuids);
	await db.insert(comments).values(commentsWithUuids);
	await db.insert(filledForms).values(filledFormsWithUuids);
	await db.insert(options).values(optionsToSeed);
	await db.insert(answers).values(answersToSeed);

	return "SUCCESS";
};

//*NOT WORKING, PLEASE DO IT MANUALLY BEFORE EXECUTING THE SEED
// const modifyColumnsToAddFullTextSearch = () => {
// 	sql`
//   ALTER TABLE forms ADD FULLTEXT(description, topic, title);

//   ALTER TABLE comments ADD FULLTEXT(comment);

//   ALTER TABLE questions ADD FULLTEXT(description, question);`;

// 	return "SUCCESS";
// };

// modifyColumnsToAddFullTextSearch();
seed();
