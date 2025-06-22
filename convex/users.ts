import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getUser = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const createUser = mutation({
  args: {
    externalId: v.string(),
    email: v.string(),
    fullName: v.optional(v.string()),
    studentId: v.optional(v.string()),
    departmentId: v.optional(v.id("departments")),
    role: v.optional(v.string()),
    profileComplete: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      ...args,
    });
  },
});


export const createDepartment = mutation({
  args: { name: v.string() },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("departments", { name: args.name });
  },
});

export const getDep = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("departments").collect();
  },
});