import { db } from "@/db/connection";
import {
  users,
  articles,
  articleTags,
  articleFavorites,
  comments,
  userFollows,
} from "./schema"; // Adjust the import path to your schema

async function seedDatabase() {
  // Seed Users
  const insertedUsers = await db
    .insert(users)
    .values([
      {
        email: "john.doe@example.com",
        username: "johndoe",
        bio: "Passionate writer and tech enthusiast",
        image: "https://example.com/johndoe.jpg",
        token: "sample-token-1",
      },
      {
        email: "jane.smith@example.com",
        username: "janesmith",
        bio: "Software engineer and avid reader",
        image: "https://example.com/janesmith.jpg",
        token: "sample-token-2",
      },
    ])
    .returning();

  // Seed Articles
  const insertedArticles = await db
    .insert(articles)
    .values([
      {
        slug: "first-article-about-tech",
        title: "Exploring Modern Web Technologies",
        description: "A deep dive into the latest web development trends",
        body: "In this article, we'll explore the cutting-edge technologies shaping web development...",
        authorId: insertedUsers[0].id,
      },
      {
        slug: "machine-learning-basics",
        title: "Introduction to Machine Learning",
        description: "Understanding the fundamentals of machine learning",
        body: "Machine learning is revolutionizing how we approach complex problems...",
        authorId: insertedUsers[1].id,
      },
    ])
    .returning();

  // Seed Article Tags
  await db.insert(articleTags).values([
    {
      articleId: insertedArticles[0].id,
      tag: "technology",
    },
    {
      articleId: insertedArticles[0].id,
      tag: "web-development",
    },
    {
      articleId: insertedArticles[1].id,
      tag: "machine-learning",
    },
    {
      articleId: insertedArticles[1].id,
      tag: "artificial-intelligence",
    },
  ]);

  // Seed Article Favorites
  await db.insert(articleFavorites).values([
    {
      articleId: insertedArticles[0].id,
      userId: insertedUsers[1].id,
    },
  ]);

  // Seed Comments
  await db.insert(comments).values([
    {
      body: "Great article! Very insightful.",
      articleId: insertedArticles[0].id,
      authorId: insertedUsers[1].id,
    },
    {
      body: "Looking forward to learning more about machine learning.",
      articleId: insertedArticles[1].id,
      authorId: insertedUsers[0].id,
    },
  ]);

  // Seed User Follows
  await db.insert(userFollows).values([
    {
      followerId: insertedUsers[0].id,
      followedId: insertedUsers[1].id,
    },
  ]);

  console.log("Database seeded successfully!");
}

// Run the seeding function
seedDatabase().catch(console.error);
