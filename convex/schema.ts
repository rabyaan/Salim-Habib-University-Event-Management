import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    externalId: v.string(), // Clerk ID
    email: v.string(),
    fullName: v.optional(v.string()),
    studentId: v.optional(v.string()),
    departmentId: v.optional(v.id("departments")),
    role: v.optional(v.string()), // "student" | "organizer" | "admin"
    profileComplete: v.boolean(),
  }).index("byExternalId", ["externalId"]),

  departments: defineTable({
    name: v.string(),
  }),
});
