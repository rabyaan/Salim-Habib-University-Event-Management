// lib/convexClient.ts
import { api } from "../../convex/_generated/api";
import { fetchMutation } from "convex/nextjs";

export const createUserInConvex = async ({
  externalId,
  email,
  fullName,
}: {
  externalId: string;
  email: string;
  fullName?: string;
}) => {
  await fetchMutation(api.users.createUser, {
    externalId,
    email,
    fullName,
    studentId: undefined,
    departmentId: undefined,
    role: "student",
    profileComplete: false,
  });
};
