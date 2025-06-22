"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api"; 
import { Authenticated, Unauthenticated } from 'convex/react'
import { SignInButton, UserButton } from '@clerk/nextjs'
import TestForm from "@/components/custom/TestForm";

export default function Home() {
  const users = useQuery(api.users.getUser);
  const departments = useQuery(api.users.getDep);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-10">Welcome to Event Management</h1>
      <p className="text-center mt-4">Manage your events efficiently with our platform.</p>
      <div>
        <Authenticated>
          <UserButton />
          <Content />
        </Authenticated>
        <Unauthenticated>
          <SignInButton />
        </Unauthenticated>
      </div>
      <div className="flex justify-center mt-10">
        {users?.map((user) => (
          <div key={user.externalId}>{user.fullName}{user.studentId}</div>
        ))}

      </div>
      <p className="text-center mt-6">Get started by creating your first event!</p>

      <TestForm />

      <div>
            {departments?.map((dep) => (
          <div key={dep._id}>{dep.name}</div>
        ))}
      </div>
    </div>
  );
}

function Content() {
  const messages = useQuery(api.messages.getForCurrentUser)
  return <div>Authenticated content: {messages?.length}</div>
}