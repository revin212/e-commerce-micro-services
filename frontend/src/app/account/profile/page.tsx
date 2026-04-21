import { AccountSidebar } from "@/components/layout";
import { Button, Card, Input } from "@/components/ui";
import { api } from "@/lib/api/client/fetcher";
import type { Account } from "@/lib/api/contracts/account";

export default async function AccountProfilePage() {
  const account = await api.get<Account>("/account");
  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-[260px_1fr]">
      <AccountSidebar />
      <Card className="space-y-4">
        <h1 className="text-3xl font-semibold">Profile</h1>
        <div className="grid gap-3 md:grid-cols-2">
          <Input defaultValue={account.firstName} />
          <Input defaultValue={account.lastName} />
          <Input defaultValue={account.email} />
          <Input defaultValue={account.phone} />
        </div>
        <Button>Save Changes</Button>
      </Card>
    </div>
  );
}
