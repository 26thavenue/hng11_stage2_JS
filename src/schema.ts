import { pgTable, text, timestamp, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { relations, InferModel } from 'drizzle-orm';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  firstName: text('firstName').notNull(),
  lastName: text('lastName').notNull(),
  phone: text('phone'),
  password: text('password').notNull(),
  accessToken: text('accessToken'),
  refreshToken: text('refreshToken'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const organisations = pgTable('organisations', {
  orgId: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

export const usersToOrganisations = pgTable('users_to_organisations', {
  userId: uuid('user_id').notNull().references(() => users.id),
  orgId: uuid('org_id').notNull().references(() => organisations.orgId),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
},
(t)=>({
    pk:primaryKey({columns:[t.userId, t.orgId]})
})
);

export const usersRelations = relations(users, ({ many }) => ({
  userOrganistions: many(usersToOrganisations),
}));

export const organisationsRelations = relations(organisations, ({ many }) => ({
  users: many(usersToOrganisations),
}));

export const usersToOrganisationsRelations = relations(usersToOrganisations, ({ one }) => ({
  user: one(users, {
    fields: [usersToOrganisations.userId],
    references: [users.id],
  }),
  organisation: one(organisations, {
    fields: [usersToOrganisations.orgId],
    references: [organisations.orgId],
  }),
}));


