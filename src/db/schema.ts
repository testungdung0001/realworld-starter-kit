import { sql } from 'drizzle-orm'
import { 
    sqliteTable, 
  text, 
  integer, 
  uniqueIndex,
  primaryKey
} from 'drizzle-orm/sqlite-core'

// Users Table
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').unique().notNull(),
  username: text('username').unique().notNull(),
  token: text('token'),
  bio: text('bio'),
  image: text('image'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`null`),
}, (table) => ({
  usernameIdx: uniqueIndex('username_idx').on(table.username),
  emailIdx: uniqueIndex('email_idx').on(table.email)
}))

// Articles Table
export const articles = sqliteTable('articles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').unique().notNull(),
  title: text('title').notNull(),
  description: text('description'),
  body: text('body'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`null`),
  authorId: integer('author_id').references(() => users.id).notNull(),
}, (table) => ({
  slugIdx: uniqueIndex('slug_idx').on(table.slug)
}))

// Article Tags Junction Table
export const articleTags = sqliteTable('article_tags', {
  articleId: integer('article_id').references(() => articles.id).notNull(),
  tag: text('tag').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
}, (table) => ({
  pk: primaryKey({ columns: [table.articleId, table.tag] })
}))

// Article Favorites Junction Table
export const articleFavorites = sqliteTable('article_favorites', {
  articleId: integer('article_id').references(() => articles.id).notNull(),
  userId: integer('user_id').references(() => users.id).notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
}, (table) => ({
  pk: primaryKey({ columns: [table.articleId, table.userId] })
}))

// Comments Table
export const comments = sqliteTable('comments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  body: text('body').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').default(sql`null`),
  articleId: integer('article_id').references(() => articles.id).notNull(),
  authorId: integer('author_id').references(() => users.id).notNull()
})

// User Follows Junction Table
export const userFollows = sqliteTable('user_follows', {
  followerId: integer('follower_id').references(() => users.id).notNull(),
  followedId: integer('followed_id').references(() => users.id).notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
}, (table) => ({
  pk: primaryKey({ columns: [table.followerId, table.followedId] })
}))