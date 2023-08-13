import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { api } from "../utils/trpc";

export default function Home() {
  const user = useUser();
  const { data } = api.example.getAll.useQuery();
  const ctx = api.useContext();
  const { mutate, isLoading: isPosting } = api.example.add.useMutation({
    onSuccess: () => {
      void ctx.example.getAll.invalidate();
    },
  });

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      {!user.isSignedIn && <SignInButton />}
      {!!user.isSignedIn && <SignOutButton />}
      <button
        onClick={() =>
          mutate({
            amount: 1,
            doneAt: "2020-01-01T00:00:00Z",
            recipient: "abc",
            isCredit: true,
            desc:'test'
          })
        }
      >Add</button>
    </main>
  );
}
